// material-ui
import { Grid } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { CONTENT_SET_CHEMICAL_CHART_DATA, RESET_TRANSCRIPT_CONTENT_CHARTS_STATES } from 'store/actions';
import api from 'routes/api.json';

// project imports
import { gridSpacing } from 'store/constant';
import MyResponsiveBar from './barChart';
import SniperForLoading from 'ui-component/sniper for loding/SniperForLoading';
import chartMaker from './chartMaker';
import { toast } from 'react-toastify';

// ==============================|| BrassicaLnc Statistics ||============================== //

function Statistics() {
    // eslint-disable-next-line prefer-const
    let nameDataObj = [];
    const [canChemicalChartsRender, setCanChemicalChartsRender] = useState(false);
    const [Charts, setCharts] = useState(false);
    const [relationshipChart, setRelationship] = useState(false);
    const [filtrationStepsChart, setFiltrationStepsChart] = useState(false);
    const [subdivisionLncRNAsChart, setSubdivisionLncRNAsChart] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        chartMaker(`${api.mainURL}/statistic/`)
            .then((res) => setCharts(res))
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
        },
        []
    );

    return (
        <>
            {!canChemicalChartsRender && <SniperForLoading />}
            {canChemicalChartsRender &&
                // eslint-disable-next-line array-callback-return
                Object.keys(Charts).map((key) => {
                    nameDataObj = [];
                    const cats = [];
                    // if (key === 'subdivisionLncRNAs') {
                    //     const cats = [];
                    //     Object.keys(Charts[key][0].data).map(
                    //         // eslint-disable-next-line array-callback-return
                    //         (key2) => {
                    //             cats.push(key2);
                    //             nameDataObj.push([Charts[key][0].data[key2]][0]);
                    //         }
                    //     );

                    //     return (
                    //         <MyResponsiveBar
                    //             key={key}
                    //             chartType="pie"
                    //             chartTitle={Charts[key][0].name}
                    //             dataCategories={cats}
                    //             dataSeries={nameDataObj}
                    //             dataUnit=""
                    //         />
                    //     );
                    // }

                    Object.keys(Charts[key][0].data).map(
                        // eslint-disable-next-line array-callback-return
                        (key2) => {
                            cats.push(key2);
                            nameDataObj.push([Charts[key][0].data[key2]][0]);
                        }
                    );

                    return (
                        <MyResponsiveBar
                            key={key}
                            chartType="pie"
                            chartTitle={Charts[key][0].name}
                            dataCategories={cats}
                            dataSeries={nameDataObj}
                            dataUnit=""
                        />
                    );
                })}
        </>
    );
}

export default Statistics;
