/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-alert */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import axios from 'axios';

import {
    // CAN_TRANSCRIPTS_RENDER,
    // SET_TRANSCRIPTS_TABLES_DATA,
    SET_TRANSCRIPT_ID,
    // CONTENT_SET_CSV_TABLE_DATA,
    // CAN_CONTENT_CSV_TABLE_RENDER,
    // CONTENT_SET_GTF_TABLE_DATA,
    // CAN_CONTENT_GTF_TABLE_RENDER,
    CONTENT_SET_SEQUENCE
    // CONTENT_SET_CHEMICAL_CHART_DATA
} from 'store/actions';

import { Box, Grid, FormGroup, FormControlLabel, MenuItem, Select, FormControl, Paper } from '@mui/material';
import Accordion from 'ui-component/Accordion';
// import { SimpleTable } from 'ui-component/Table';
import Tabs from 'ui-component/Tabs';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
// import MyResponsiveBar from 'ui-component/charts/barChart';

import colors from 'assets/scss/_themes-vars.module.scss';
import ChartCostructor from './ChartCostructor';
import Lnc from './tables/Lnc';
import Gft from './tables/Gft';
import SmallRna from './tables/SmallRna';
import Target from './tables/Target';
import PremiRNA from './tables/PremiRNA';
import api from 'routes/api.json';

// Sequence Getter Function
// const sequenceCreator = async (getTableDataFromServerAPI) => {
//     const rows = [];
//     await axios.get(api.mainURL + getTableDataFromServerAPI).then((res) => res.data.data.map((a) => rows.push(a.sequence)));

//     return rows;
// };

function Transcriptions() {
    const [value, setValue] = useState('1');
    const [lncData, setLncData] = useState();
    const [GftData, setGftData] = useState();
    const [SmallRnaData, setSmallRnaData] = useState();
    const [premiRNAData, setpremiRNAData] = useState();
    const [TargetData, setTargetData] = useState();

    const GetAllData = async (transcriptID) => {
        await axios
            .post(`${api.mainURL}/lncRNA/transcript/each/`, { tranId: transcriptID })
            .then((response) => {
                // console.log(response.data);
                setLncData(response.data.lnc);
                setGftData(response.data.gtf);
                setSmallRnaData(response.data.smallRNA);
                setpremiRNAData(response.data.premiRNA);
                setTargetData(response.data.target_downgene);
            })
            .catch((error) => {
                // console.log(error);
            });
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const transcriptIdFromURL = useParams().transcriptID;
    // console.log(transcriptIdFromURL);
    // const transcriptID = useSelector((state) => state.transcrsipts.content.transcriptID);

    // const sequence = useSelector((state) => state.transcrsipts.content.sequence);

    // const [canChemicalChartsRender, setCanChemicalChartsRender] = useState(false);
    // const [chemicalExpressionSelected, setChemicalExpressionSelected] = useState(-2);

    useEffect(async () => {
        await GetAllData(transcriptIdFromURL);
    }, []);
    return (
        <>
            <h1 style={{ color: colors.secondary200 }}>{transcriptIdFromURL}</h1>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange}>
                            <Tab label="lncRNA" value="1" />
                            {GftData && GftData.length > 0 ? <Tab label="Annotation" value="2" /> : null}
                            {SmallRnaData && SmallRnaData.length > 0 ? <Tab label="Small Rna" value="3" /> : null}
                            {premiRNAData && premiRNAData.length > 0 ? <Tab label="Prime Rna" value="4" /> : null}
                            {TargetData && TargetData.length > 0 ? <Tab label="Downstream target genes" value="5" /> : null}
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <Lnc lncData={lncData} />
                    </TabPanel>
                    <TabPanel value="2">
                        <Gft GftData={GftData} />
                    </TabPanel>
                    <TabPanel value="3">
                        <SmallRna SmallRnaData={SmallRnaData} />
                    </TabPanel>
                    <TabPanel value="4">
                        <PremiRNA premiRNAData={premiRNAData} />
                    </TabPanel>
                    <TabPanel value="5">
                        <Target TargetData={TargetData} />
                    </TabPanel>
                </TabContext>
            </Box>

            <Tabs
                firstGroup={<ChartCostructor transcriptId={transcriptIdFromURL} chartAPI="abiotic" />}
                secondGroup={<ChartCostructor transcriptId={transcriptIdFromURL} chartAPI="biotic" />}
                thirdGroup={<ChartCostructor transcriptId={transcriptIdFromURL} chartAPI="chemical" />}
                fourthGroup={<ChartCostructor transcriptId={transcriptIdFromURL} chartAPI="developmental" />}
                fifthGroup={<ChartCostructor transcriptId={transcriptIdFromURL} chartAPI="genetics" />}
            />
            {/* <button type="button" onClick={() => console.log(chemicalChartsDetails.dataSeries[1])}>
                sdf
            </button> */}
        </>
    );
}

export default Transcriptions;
