/* eslint-disable prefer-template */
/* eslint-disable spaced-comment */

/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable camelcase */
import { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';

import { toast } from 'react-toastify';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { TablePagination } from '@mui/material';
import SearchBox from '../SearchBox';
import api from 'routes/api.json';


const headCells = [
    // { id: 'id', numeric: false, disablePadding: true, label: 'id' },
    {
        id: 'query',
        numeric: true,
        disablePadding: false,
        label: 'Query'
    },
    {
        id: 'length_query',
        numeric: true,
        disablePadding: false,
        label: 'Length Query'
    },
    {
        id: 'target',
        numeric: true,
        disablePadding: false,
        label: 'Target'
    },
    {
        id: 'length_target',
        numeric: true,
        disablePadding: false,
        label: 'Length Target'
    },
    {
        id: 'dg',
        numeric: true,
        disablePadding: false,
        label: 'dG'
    },
    {
        id: 'ndg',
        numeric: true,
        disablePadding: false,
        label: 'ndG'
    },
    {
        id: 'start_position_query',
        numeric: true,
        disablePadding: false,
        label: 'Start Position Query'
    },
    {
        id: 'end_position_query',
        numeric: true,
        disablePadding: false,
        label: 'End Position Query'
    },
    {
        id: 'start_position_target',
        numeric: true,
        disablePadding: false,
        label: 'Start Position Target'
    },
    {
        id: 'end_position_target',
        numeric: true,
        disablePadding: false,
        label: 'End Position Target'
    }
];
const subheadCells = [
    { id: 'id', numeric: false, disablePadding: true, label: 'id' },
    {
        id: 'gene_id',
        numeric: true,
        disablePadding: false,
        label: 'gene_id'
    },
    {
        id: 'chromosome',
        numeric: true,
        disablePadding: false,
        label: 'chromosome'
    },
    {
        id: 'start',
        numeric: true,
        disablePadding: false,
        label: 'start'
    },
    {
        id: 'stop',
        numeric: true,
        disablePadding: false,
        label: 'stop'
    },
    {
        id: 'strand',
        numeric: true,
        disablePadding: false,
        label: 'strand'
    },
    {
        id: 'description',
        numeric: true,
        disablePadding: false,
        label: 'description'
    }
];

function createData(
    id,
    query,
    length_query,
    target,
    length_target,
    dg,
    ndg,
    start_position_query,
    end_position_query,
    start_position_target,
    end_position_target
) {
    return {
        id,
        query,
        length_query,
        target,
        length_target,
        dg,
        ndg,
        start_position_query,
        end_position_query,
        start_position_target,
        end_position_target
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
                    a.query,
                    a.length_query,
                    a.target,
                    a.length_target,
                    a.dg,
                    a.ndg,
                    a.start_position_query,
                    a.end_position_query,
                    a.start_position_target,
                    a.end_position_target
                )
            )
        );
        // countOfPagesInBsckend.push(res.data.pages);
        tootalrows.push(res.data.count);
        // tootalpage.push(res.data.page);
    });
    return { rows, countOfPagesInBsckend, tootalrows, tootalpage };
};

function Row(props) {
    const { row } = props;

    const [open, setOpen] = useState(false);
    const [subInfo, setSubInfo] = useState([]);
    const getsubInfo = async (id) => {
        setOpen(!open);
        await axios
            .get(`${api.mainURL}/lncRNA/target/down/des/?gene_id=${id}`)
            .then((res) => {
                // console.log(res);
                setSubInfo(res.data.data);
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
    };
    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>{row.query}</TableCell>
                <TableCell align="center">{row.length_query}</TableCell>
                <TableCell
                    align="center"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start'
                    }}
                >
                    <IconButton aria-label="expand row" size="small" onClick={() => getsubInfo(row.target)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                    {row.target}
                </TableCell>
                <TableCell align="center">{row.length_target}</TableCell>
                <TableCell align="center">{row.dg}</TableCell>
                <TableCell align="center">{row.ndg}</TableCell>
                <TableCell align="center">{row.start_position_query}</TableCell>
                <TableCell align="center">{row.end_position_query}</TableCell>
                <TableCell align="center">{row.start_position_target}</TableCell>
                <TableCell align="center">{row.end_position_target}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 2 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Description
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">gene_id</TableCell>
                                        <TableCell align="center">chromosome</TableCell>
                                        <TableCell align="center">start</TableCell>
                                        <TableCell align="center">stop</TableCell>
                                        <TableCell align="center">strand</TableCell>
                                        <TableCell align="center">description</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {subInfo &&
                                        subInfo.map((Row) => (
                                            <TableRow key={Row.id}>
                                                <TableCell align="center">{Row.gene_id}</TableCell>
                                                <TableCell align="center">{Row.chromosome}</TableCell>
                                                <TableCell align="center">{Row.start}</TableCell>
                                                <TableCell align="center">{Row.stop}</TableCell>
                                                <TableCell align="center">{Row.strand}</TableCell>
                                                <TableCell align="center">{Row.description}</TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}

function TargetDowngene() {
    const [TableRows, setTableRows] = useState([]);
    const [count, setCount] = useState();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [queryId, setQueryId] = useState('');
    const [searchItem, setSearchItem] = useState({
        len_query: {
            partOne: '',
            partTwo: ''
        },
        dg: {
            partOne: '',
            partTwo: ''
        },
        ndg: {
            partOne: '',
            partTwo: ''
        },
        position_query: {
            partOne: '',
            partTwo: ''
        },
        position_target: {
            partOne: '',
            partTwo: ''
        },
        len_target: {
            partOne: '',
            partTwo: ''
        },
        target: ''
    });

    const searchQuerys = (others) => {
        setSearchItem(others);
    };

    // ? pagination functionv
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleSubmitSearch = (queryId) => {
        // console.log(queryId);
        setQueryId(queryId);
    };

    const handleResetSearchFields = () => {
        // console.log('handleResetSearchFields');
        setQueryId('');
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        makeRows(
            `${api.mainURL}/lncRNA/target/down/?per_page=${rowsPerPage}&page=${page + 1}&query=${queryId}&len_query=${
                searchItem.len_query.partOne && searchItem.len_query.partOne + ',' + searchItem.len_query.partTwo
            }&dg=${searchItem.dg.partOne && searchItem.dg.partOne + ',' + searchItem.dg.partTwo}&ndg=${
                searchItem.ndg.partOne && searchItem.ndg.partOne + ',' + searchItem.ndg.partTwo
            }&position_query=${
                searchItem.position_query.partOne && searchItem.position_query.partOne + ',' + searchItem.position_query.partTwo
            }&position_target=${
                searchItem.position_target.partOne && searchItem.position_target.partOne + ',' + searchItem.position_target.partTwo
            }&len_target=${searchItem.len_target.partOne && searchItem.len_target.partOne + ',' + searchItem.len_target.partTwo}&target=${
                searchItem.target
            }`
        )
            .then(async (res) => {
                // console.log('resss', res);
                await setTableRows(res.rows);
                await setCount(res.tootalrows);
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
    }, [page, queryId, searchItem, rowsPerPage]);
    return (
        <>
            <SearchBox
                handleSubmitSearch={handleSubmitSearch}
                handleResetSearchFields={handleResetSearchFields}
                searchQuerys={searchQuerys}
            />
            <TableContainer sx={{ maxHeight: 440 }} component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            {headCells.map((item) => (
                                <TableCell align="center" key={item.id}>
                                    {item.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>{TableRows && TableRows.map((row) => <Row key={row.id} row={row} />)}</TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 50, 75, 100]}
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

export default TargetDowngene;

//todo =>search box
