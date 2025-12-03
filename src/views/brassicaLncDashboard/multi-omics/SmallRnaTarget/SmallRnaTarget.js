/* eslint-disable prefer-template */
/* eslint-disable camelcase */
import { useEffect, useState } from 'react';

import axios from 'axios';

import { Grid, TablePagination, Divider } from '@mui/material';
import { gridSpacing } from 'store/constant';
import SearchSmallRna from './SearchSmallRna';
import Etms from './Etms';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { toast } from 'react-toastify';
import api from 'routes/api.json';

const headCells = [
    { id: 'lncRNAID', numeric: false, disablePadding: true, label: 'LncRNA ID' },
    {
        id: 'MiRNAID',
        numeric: true,
        disablePadding: false,
        label: 'miRNA ID'
    },
    {
        id: 'expectation',
        numeric: true,
        disablePadding: false,
        label: 'Expectation'
    },
    {
        id: 'lncrna_start',
        numeric: true,
        disablePadding: false,
        label: 'LncRNA '
    },
    {
        id: 'lncrna_end',
        numeric: true,
        disablePadding: false,
        label: 'LncRNA'
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
        id: 'inhibition',
        numeric: true,
        disablePadding: false,
        label: 'Inhibition'
    },
    {
        id: 'lncrna_aligned_fragment',
        numeric: true,
        disablePadding: false,
        label: 'LncRNA aligned fragment'
    },
    {
        id: 'mirna_aligned_fragment',
        numeric: true,
        disablePadding: false,
        label: 'miRNA aligned fragment'
    }
];

function createData(
    id,
    lncRNAID,
    MiRNAID,
    expectation,
    lncrna_start,
    lncrna_end,
    mirna_start,
    mirna_end,
    inhibition,
    lncrna_aligned_fragment,
    mirna_aligned_fragment
) {
    return {
        id,
        lncRNAID,
        MiRNAID,
        expectation,
        lncrna_start,
        lncrna_end,
        mirna_start,
        mirna_end,
        inhibition,
        lncrna_aligned_fragment,
        mirna_aligned_fragment
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
                    a.expectation,
                    a.lncrna_start,
                    a.lncrna_end,
                    a.mirna_start,
                    a.mirna_end,
                    a.inhibition,
                    a.lncrna_aligned_fragment,
                    a.mirna_aligned_fragment
                )
            )
        );
        countOfPagesInBsckend.push(res.data.pages);
        tootalrows.push(res.data.count);
        tootalpage.push(res.data.page);
    });
    return { rows, countOfPagesInBsckend, tootalrows, tootalpage };
};

function SmallRnaTarget() {
    const [TableRows, setTableRows] = useState([]);
    const [count, setCount] = useState();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchId, setSearchId] = useState('');
    const [searchItem, setSearchItem] = useState({
        expectation: {
            partOne: '',
            partTwo: ''
        },
        binding_locus: {
            partOne: '',
            partTwo: ''
        },
        inhibition: '',
        search: ''
    });
    const searchQuerys = (others) => {
        setSearchItem(others);
    };
    const handleSelectSearch = (item) => {
        setSearchId(item);
        // dispatch({
        //     type: SMALLRNA_SEARCH_SET_PATH,
        //     path: `/lncRNA/small_rna_target/?search=${item}`
        // });
    };
    // ? pagination functionv
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        // console.log(event.target.value);
        setRowsPerPage(event.target.value);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        makeRows(
            `${api.mainURL}/lncRNA/small_rna_target/?page=${page + 1}&search=${
                searchId.length > 0 ? searchId : searchItem.search
            }&per_page=${rowsPerPage}&inhibition=${searchItem.inhibition}&expectation=${
                searchItem.expectation.partOne && searchItem.expectation.partOne + ',' + searchItem.expectation.partTwo
            }&binding_locus=${
                searchItem.binding_locus.partOne && searchItem.binding_locus.partOne + ',' + searchItem.binding_locus.partTwo
            }`
        )
            .then(async (res) => {
                // console.log('resss', res);
                await setTableRows(res.rows);
                await setCount(res.tootalrows);
                // await setData(res);
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
    }, [page, searchId, rowsPerPage, searchItem]);

    return (
        <>
            <Grid container direction="row" spacing={gridSpacing}>
                <Grid item xs={12}>
                    {/* <TranscriptsSearcher
                                handleSubmitSearch={handleSubmitSearch}
                                handleResetSearchFields={handleResetSearchFields}
                            /> */}
                    <SearchSmallRna handleSelectSearch={handleSelectSearch} searchQuerys={searchQuerys} />
                </Grid>
            </Grid>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {headCells.map((column) => (
                                <TableCell align="center" key={column.id}>
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {TableRows &&
                            TableRows.map((row) => (
                                <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell align="center">{row.lncRNAID}</TableCell>
                                    <TableCell align="center">{row.MiRNAID}</TableCell>
                                    <TableCell align="center">{row.expectation}</TableCell>
                                    <TableCell align="center">{row.lncrna_start}</TableCell>
                                    <TableCell align="center">{row.lncrna_end}</TableCell>
                                    <TableCell align="center">{row.mirna_start}</TableCell>
                                    <TableCell align="center">{row.mirna_end}</TableCell>
                                    <TableCell align="center">{row.inhibition}</TableCell>
                                    <TableCell align="center">{row.lncrna_aligned_fragment}</TableCell>
                                    <TableCell align="center">{row.mirna_aligned_fragment}</TableCell>
                                    {/* <TableCell align="center">{row.bitscore}</TableCell> */}
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                component="div"
                count={count && count}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    );
}

export default SmallRnaTarget;
