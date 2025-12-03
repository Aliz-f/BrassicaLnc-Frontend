/* eslint-disable prefer-template */
/* eslint-disable camelcase */
import { useEffect, useState } from 'react';
import { Grid, TablePagination, Divider } from '@mui/material';
import { gridSpacing } from 'store/constant';
import { TableWithCheckbox } from 'ui-component/Table';
import SearchPremiRna from './SearchPremiRna';
import { IconCloudDownload, IconDownloadOff } from '@tabler/icons';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import { toast } from 'react-toastify';
import api from 'routes/api.json';

const headCells = [
    {
        id: 'lncrna_id',
        numeric: false,
        disablePadding: true,
        label: 'LncRNA ID'
    },
    {
        id: 'premi_rna',
        numeric: true,
        disablePadding: false,
        label: 'Pre-miRNA'
    },
    {
        id: 'identity',
        numeric: true,
        disablePadding: false,
        label: 'Identity(%)'
    },
    {
        id: 'alignment_length',
        numeric: true,
        disablePadding: false,
        label: 'Alignment Length'
    },
    {
        id: 'mismatches',
        numeric: true,
        disablePadding: false,
        label: 'Mismatches'
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
        id: 'premi_rna_start',
        numeric: true,
        disablePadding: false,
        label: 'miRNA Start'
    },
    {
        id: 'premi_rna_end',
        numeric: true,
        disablePadding: false,
        label: 'miRNA End'
    },
    {
        id: 'e_value',
        numeric: true,
        disablePadding: false,
        label: 'E-value'
    },
    {
        id: 'bitscore',
        numeric: true,
        disablePadding: false,
        label: 'Bitscore'
    },
    {
        id: 'Structure',
        numeric: true,
        disablePadding: false,
        label: 'Structure'
    }
];

function createData(
    id,
    lncrna_id,
    premi_rna,
    identity,
    alignment_length,
    mismatches,
    lncrna_start,
    lncrna_end,
    premi_rna_start,
    premi_rna_end,
    e_value,
    bitscore,
    structure
) {
    return {
        id,
        lncrna_id,
        premi_rna,
        identity,
        alignment_length,
        mismatches,
        lncrna_start,
        lncrna_end,
        premi_rna_start,
        premi_rna_end,
        e_value,
        bitscore,
        structure
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
                    a.premi_rna,
                    a.identity,
                    a.alignment_length,
                    a.mismatches,
                    a.lncrna_start,
                    a.lncrna_end,
                    a.premi_rna_start,
                    a.premi_rna_end,
                    a.e_value,
                    a.bitscore,
                    a.structure
                )
            )
        );
        // countOfPagesInBsckend.push(res.data.pages);
        tootalrows.push(res.data.count);
        tootalpage.push(res.data.page);
    });
    return { rows, countOfPagesInBsckend, tootalrows, tootalpage };
};

function PremiRna() {
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
        pre_mirna: ''
    });
    const searchQuerys = (others) => {
        setSearchItem(others);
    };
    const handleSelectSearch = (item) => {
        setSearchId(item);
    };
    // ? pagination functionv
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value);
    };
    // ? download function for download the structure
    const handleDownload = async (lncrna_id) => {
        window.open(`${api.mainURL}/download/premi_rna/structure/?transcript=${lncrna_id}`, '_blank');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        makeRows(
            `${api.mainURL}/lncRNA/premi_rna/?page=${page + 1}&search=${searchId}&pre_mirna=${
                searchItem.pre_mirna
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
                // await setPage(res.tootalpage);
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
            <h1>Premi Rna</h1>
            <Divider sx={{ p: 2 }} />
            <Grid container direction="row" spacing={gridSpacing}>
                <Grid item xs={12}>
                    {/* <TranscriptsSearcher
                                handleSubmitSearch={handleSubmitSearch}
                                handleResetSearchFields={handleResetSearchFields}
                            /> */}
                    <SearchPremiRna handleSelectSearch={handleSelectSearch} searchQuerys={searchQuerys} />
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
                                    <TableCell align="center">{row.lncrna_id}</TableCell>
                                    <TableCell align="center">{row.premi_rna}</TableCell>
                                    <TableCell align="center">{row.identity}</TableCell>
                                    <TableCell align="center">{row.alignment_length}</TableCell>
                                    <TableCell align="center">{row.mismatches}</TableCell>
                                    <TableCell align="center">{row.lncrna_start}</TableCell>
                                    <TableCell align="center">{row.lncrna_end}</TableCell>
                                    <TableCell align="center">{row.premi_rna_start}</TableCell>
                                    <TableCell align="center">{row.premi_rna_end}</TableCell>
                                    <TableCell align="center">{row.e_value}</TableCell>
                                    <TableCell align="center">{row.bitscore}</TableCell>
                                    <TableCell align="center">
                                        <span>
                                            {row.structure ? (
                                                <IconCloudDownload
                                                    onClick={() => handleDownload(row.lncrna_id)}
                                                    style={{ cursor: 'pointer' }}
                                                    target="_blank"
                                                />
                                            ) : (
                                                <IconDownloadOff style={{ cursor: 'not-allowed' }} />
                                            )}
                                        </span>
                                    </TableCell>
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
            {/* <TopOfTables /> */}
        </>
    );
}

export default PremiRna;
