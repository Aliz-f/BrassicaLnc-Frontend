import React, { useEffect, useState } from 'react';
import { FormControl, FormControlLabel, Grid, MenuItem, RadioGroup, Select } from '@mui/material';
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { CONTENT_SET_CHEMICAL_CHART_DATA, RESET_TRANSCRIPT_CONTENT_CHARTS_STATES, RESET_TRANSCRIPT_STATES } from 'store/actions';
import MyResponsiveBar from 'ui-component/charts/barChart';
import chartMaker from './chartMaker';
import Button from 'ui-component/Button';
import colors from 'assets/scss/_themes-vars.module.scss';
import Radio from 'ui-component/Radio';
import axios from 'axios';
import SniperForLoading from 'ui-component/sniper for loding/SniperForLoading';
import api from 'routes/api.json';
import { toast } from 'react-toastify';

const ChartCostructor = ({ transcriptId, chartAPI }) => {
    const chemicalChartsDetails = useSelector((state) => state.transcrsipts.content.charts.chemical);
    const [canChemicalChartsRender, setCanChemicalChartsRender] = useState(false);
    const [chemicalExpressionSelected, setChemicalExpressionSelected] = useState(-2);
    const [barOrLinePlot, setBarOrLinePlot] = useState('bar');

    const dispatch = useDispatch();

    const handleRadioChange = (event) => {
        event.preventDefault();
        setBarOrLinePlot(event.target.value);
    };

    const handleOnChange = (event) => {
        setChemicalExpressionSelected(event.target.value);
    };

    const cancelTokenSource = axios.CancelToken.source();

    useEffect(() => {
        chartMaker(`/lncRNA/${chartAPI}/`, transcriptId, cancelTokenSource)
            .then((chemicalChartDetails) =>
                dispatch({
                    type: CONTENT_SET_CHEMICAL_CHART_DATA,
                    chemicalCahartData: {
                        chartTitles: chemicalChartDetails.chartTitleList,
                        chartDescriptionsList: chemicalChartDetails.descriptions,
                        chartUnits: chemicalChartDetails.dataUnitsList,
                        dataSeries: chemicalChartDetails.dataSeriesList,
                        chartCategories: chemicalChartDetails.dataCategoriesList,
                        linePlot: { data: chemicalChartDetails.dataForLinePlot, namesSerie: chemicalChartDetails.nameForLinePlot }
                    }
                })
            )
            .then(() => setCanChemicalChartsRender(true))
            .catch(() =>
                toast.warn('server error. please try again later.', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light'
                })
            );
    }, []);

    useEffect(
        () => () => {
            dispatch({
                type: RESET_TRANSCRIPT_CONTENT_CHARTS_STATES
            });
            cancelTokenSource.cancel();
        },
        []
    );

    return (
        <>
            {!canChemicalChartsRender && <SniperForLoading />}
            {
                canChemicalChartsRender && (
                    // chemicalChartsDetails.chartUnits.map((dataUnit, index) => (
                    //  console.log(chemicalChartsDetails.chartTitles[index])
                    // return null;
                    <>
                        <Grid container alignItems="center" justifyContent="space-around" spacing={2}>
                            <Grid item xs={12} sm={4} sx={{ mb: '18px' }}>
                                <h3>Choose expression to show chart</h3>
                            </Grid>

                            <Grid item xs={12} sm={4} sx={{ mb: '18px' }}>
                                <Box sx={{ minWidth: 266, pl: '16px' }}>
                                    <FormControl fullWidth>
                                        <Select
                                            name="input-advanced-classification"
                                            value={chemicalExpressionSelected}
                                            onChange={handleOnChange}
                                            displayEmpty
                                            inputProps={{ 'aria-label': 'Without label' }}
                                        >
                                            <MenuItem value={-2}>
                                                <em>Choose Expression</em>
                                            </MenuItem>
                                            {chemicalChartsDetails.chartTitles.map((item, index) => (
                                                <MenuItem key={index} value={index}>
                                                    {item}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Grid>

                            <Grid item xs={12} sm={4} sx={{ mb: '18px' }} alignItems="center" justifyContent="space-around">
                                <RadioGroup
                                    name="formats"
                                    sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}
                                    value={barOrLinePlot}
                                    onChange={(event) => handleRadioChange(event)}
                                >
                                    <FormControlLabel value="bar" control={<Radio />} label="Bar Plot" />
                                    <FormControlLabel value="line" control={<Radio />} label="Line Plot" />
                                </RadioGroup>
                            </Grid>

                            <Grid item xs={12} sm={6} sx={{ mb: '18px' }}>
                                <h3>Download fpkm file in csv format for this group</h3>
                            </Grid>
                            <Grid item xs={12} sm={6} sx={{ mb: '18px' }}>
                                <Button
                                    onClick={() =>
                                        window.open(`${api.mainURL}/download/fpkm/csv/?id=${transcriptId}&group=${chartAPI}`, '_blank')
                                    }
                                >
                                    Download
                                </Button>
                            </Grid>
                        </Grid>
                        {/* <Grid container direction="row">
                            
                        </Grid> */}

                        {chemicalExpressionSelected !== -2 && barOrLinePlot === 'bar' && (
                            <>
                                <MyResponsiveBar
                                    chartType="bar"
                                    chartTitle={chemicalChartsDetails.chartTitles[chemicalExpressionSelected]}
                                    chartDescription={chemicalChartsDetails.chartDescriptionsList[chemicalExpressionSelected]}
                                    dataCategories={[chemicalChartsDetails.chartCategories[chemicalExpressionSelected]]}
                                    dataSeries={chemicalChartsDetails.dataSeries[chemicalExpressionSelected]}
                                    dataUnit=""
                                />
                            </>
                        )}
                        {chemicalExpressionSelected !== -2 && barOrLinePlot === 'line' && chemicalExpressionSelected > -1 && (
                            <MyResponsiveBar
                                chartType="line"
                                chartTitle={chemicalChartsDetails.chartTitles[chemicalExpressionSelected]}
                                chartDescription={chemicalChartsDetails.chartDescriptionsList[chemicalExpressionSelected]}
                                dataCategories={chemicalChartsDetails.linePlot.namesSerie[chemicalExpressionSelected]}
                                dataSeries={[
                                    {
                                        name: chemicalChartsDetails.chartTitles[chemicalExpressionSelected],
                                        data: chemicalChartsDetails.linePlot.data[chemicalExpressionSelected]
                                    }
                                ]}
                                dataUnit=""
                            />
                        )}
                    </>
                )
                // ))
            }
        </>
    );
};

export default ChartCostructor;
