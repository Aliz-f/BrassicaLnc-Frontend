/* eslint-disable camelcase */
import { useEffect, useState } from 'react';

import axios from 'axios';

// import api from 'routes/api.json';

// import TranscriptsSearcher from '../search/forTranscriptsView/TranscriptsSearcher';
// import TopOfTables from './topOfTables';
// import { Grid, TablePagination, Divider } from '@mui/material';
// import { gridSpacing } from 'store/constant';
// import { TableWithCheckbox } from 'ui-component/Table';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { toast } from 'react-toastify';
import api from 'routes/api.json';

const headCells = [
    { id: 'lncRNAID', numeric: false, disablePadding: true, label: 'lncRNA ID' },
    {
        id: 'MiRNAID',
        numeric: true,
        disablePadding: false,
        label: 'miRNA ID'
    },
    {
        id: 'Score',
        numeric: true,
        disablePadding: false,
        label: 'Score'
    },
    {
        id: 'lncrna_start',
        numeric: true,
        disablePadding: false,
        label: 'LncRNA Start'
    },
    {
        id: 'lncrna_end',
        numeric: true,
        disablePadding: false,
        label: 'LncRNA End'
    },
    {
        id: 'mirna_start',
        numeric: true,
        disablePadding: false,
        label: 'miRNA Start'
    },
    {
        id: 'mirna_end',
        numeric: true,
        disablePadding: false,
        label: 'miRNA End'
    },
    {
        id: 'alignment',
        numeric: true,
        disablePadding: false,
        label: 'Alignment'
    },
    {
        id: 'lnc_alignment',
        numeric: true,
        disablePadding: false,
        label: 'lncRNA alignment fragment'
    },
    {
        id: 'mirna_alignment',
        numeric: true,
        disablePadding: false,
        label: 'miRNA alignment fragment'
    }
];

function createData(
    id,
    lncRNAID,
    MiRNAID,
    score,
    lncrna_start,
    lncrna_end,
    mirna_start,
    mirna_end,
    alignment,
    lnc_alignment,
    mirna_alignment
) {
    return {
        id,
        lncRNAID,
        MiRNAID,
        score,
        lncrna_start,
        lncrna_end,
        mirna_start,
        mirna_end,
        alignment,
        lnc_alignment,
        mirna_alignment
    };
}

const makeRows = async (getTableDataFromServerAPI) => {
    const rows = [];
    const countOfPagesInBsckend = [];
    const tootalrows = [];
    const tootalpage = [];

    await axios.get(getTableDataFromServerAPI).then((res) => {
        // console.log(res.data);
        res.data.data.map((a) =>
            rows.push(
                createData(
                    a.id,
                    a.lncrna_id,
                    a.mirna_id,
                    a.score,
                    a.lncrna_start,
                    a.lncrna_end,
                    a.mirna_start,
                    a.mirna_end,
                    a.alignment,
                    a.lnc_alignment,
                    a.mirna_alignment
                )
            )
        );
        // countOfPagesInBsckend.push(res.data.pages);
        tootalrows.push(res.data.count);
        // tootalpage.push(res.data.page);
    });
    return { rows, countOfPagesInBsckend, tootalrows, tootalpage };
};

function Etms() {
    const [TableRows, setTableRows] = useState([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        makeRows(`${api.mainURL}/lncRNA/etms/`)
            .then(async (res) => {
                // console.log('resss', res);
                await setTableRows(res.rows);
            })

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

    return (
        <>
            {true && (
                <>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    {headCells.map((item) => (
                                        <TableCell align="center" key={item.id}>
                                            {item.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {TableRows &&
                                    TableRows.map((row) => (
                                        <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell align="center">{row.lncRNAID}</TableCell>
                                            <TableCell align="center">{row.MiRNAID}</TableCell>
                                            <TableCell align="center">{row.score}</TableCell>
                                            <TableCell align="center">{row.lncrna_start}</TableCell>
                                            <TableCell align="center">{row.lncrna_end}</TableCell>
                                            <TableCell align="center">{row.mirna_start}</TableCell>
                                            <TableCell align="center">{row.mirna_end}</TableCell>
                                            <TableCell align="center">{row.alignment}</TableCell>
                                            <TableCell align="center">{row.lnc_alignment}</TableCell>
                                            <TableCell align="center">{row.mirna_alignment}</TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
            )}
        </>
    );
}

export default Etms;
