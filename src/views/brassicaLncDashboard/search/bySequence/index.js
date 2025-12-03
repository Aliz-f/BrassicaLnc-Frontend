import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import api from 'routes/api.json';
import {
    CAN_TRANSCRIPTS_RENDER,
    SET_TRANSCRIPTS_TABLES_DATA,
    TRANSCRIPT_SEARCH_QUERY_SET_NUMBER_OF_ROWS_PER_PAGE_TO_SHOW,
    TRANSCRIPT_SEARCH_QUERY_SET_PAGE,
    CHANGE_TABLE_PAGINATION_PAGE,
    SET_DATA_TRANSCRIPTS_TABLE_TO_DOWNLOAD,
    RESET_TRANSCRIPT_SEARCH_QUERY,
    RESET_TRANSCRIPT_STATES,
    SEARCH_BY_SEQUENCE_API_SET,
    SEARCH_BY_SEQUENCE_QUERY_PAGE_CURRENT,
    SEARCH_BY_SEQUENCE_CAN_SENDED,
    SEARCH_BY_SEQUENCE_QUERY_EVALUE,
    SEARCH_BY_SEQUENCE_QUERY_WORD_SIZE,
    SEARCH_BY_SEQUENCE_QUERY_SEARCH_SENSIVITY,
    RESET_SEARCH_BY_SEQUENCE
} from 'store/actions';

import TranscriptsSearcher from './TranscriptsSearcher';

// import TopOfTables from './topOfTables';
import { Grid, TablePagination } from '@mui/material';
import { gridSpacing } from 'store/constant';
import { TableWithCheckbox } from 'ui-component/Table';
import { toast } from 'react-toastify';

const headCells = [
    {
        id: 'sequence',
        numeric: false,
        disablePadding: true,
        label: 'Sequence'
    },
    {
        id: 'length',
        numeric: true,
        disablePadding: false,
        label: 'Length'
    },
    {
        id: 'alignLength',
        numeric: true,
        disablePadding: false,
        label: 'Align Length'
    },
    {
        id: 'identity',
        numeric: true,
        disablePadding: false,
        label: 'Identity'
    },
    {
        id: 'gaps',
        numeric: true,
        disablePadding: false,
        label: 'Gaps'
    },
    {
        id: 'sbjctStart',
        numeric: true,
        disablePadding: false,
        label: 'Sbjct Start'
    },
    {
        id: 'sbjctEnd',
        numeric: true,
        disablePadding: false,
        label: 'Sbjct End'
    },
    {
        id: 'queryStart',
        numeric: true,
        disablePadding: false,
        label: 'Query Start'
    },
    {
        id: 'queryEnd',
        numeric: true,
        disablePadding: false,
        label: 'Query End'
    },
    {
        id: 'eValue',
        numeric: true,
        disablePadding: false,
        label: 'E-Value'
    },
    {
        id: 'score',
        numeric: true,
        disablePadding: false,
        label: 'Score'
    }
];

function createData(sequence, identity, score, eValue, length, gaps, alignLength, queryStart, queryEnd, sbjctStart, sbjctEnd) {
    return {
        sequence,
        identity,
        score,
        eValue,
        length,
        gaps,
        alignLength,
        queryStart,
        queryEnd,
        sbjctStart,
        sbjctEnd
    };
}

const makeRows = async (getTableDataFromServerAPI, queryObjToServer) => {
    const rows = [];
    const countOfPagesInBsckend = [];
    await axios.post(api.mainURL + getTableDataFromServerAPI, queryObjToServer).then((res) => {
        res.data.map((a) =>
            rows.push(
                createData(
                    a.sequence,
                    a.identity,
                    a.score,
                    a['e-value'],
                    a.length,
                    a.gaps,
                    a.align_length,
                    a.query_start,
                    a.query_end,
                    a.sbjct_start,
                    a.sbjct_end
                )
            )
        );
        countOfPagesInBsckend.push(res.data.pages);
    });
    return { rows, countOfPagesInBsckend };
};

function SequenceSearcher() {
    const getTableDataFromServerAPI = useSelector((state) => state.search.searchBySequence.API);
    const rows = useSelector((state) => state.transcrsipts.table.tableData.tableRows);
    const countOfPagesInBackend = useSelector((state) => state.search.searchBySequence.pages.total);
    const currentPage = useSelector((state) => state.search.searchBySequence.pages.current);
    const tableHeader = useSelector((state) => state.transcrsipts.table.tableData.tableHeadCells);
    const numberOfRowsPerPage = useSelector((state) => state.search.searchBySequence);
    const searchQuery = useSelector((state) => state.transcrsipts.search.query);
    const pageOfPagination = useSelector((state) => state.transcrsipts.table.pageOfPagination);
    const canReturnRender = useSelector((state) => state.transcrsipts.canRender);
    const selected = useSelector((state) => state.transcrsipts.table.tableDataToDownload.data);
    const selectedIDs = useSelector((state) => state.transcrsipts.table.tableDataToDownload.idsOfData);
    const queryObjToServer = useSelector((state) => state.search.searchBySequence.queries);
    const canSend = useSelector((state) => state.search.searchBySequence.canSend);

    const dispatch = useDispatch();

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n[tableHeader[0].id]);
            const newSelectedsIDs = rows.map((n) => n.id);
            dispatch({ type: SET_DATA_TRANSCRIPTS_TABLE_TO_DOWNLOAD, data: newSelecteds, idsOfData: newSelectedsIDs });
            return;
        }
        dispatch({ type: SET_DATA_TRANSCRIPTS_TABLE_TO_DOWNLOAD, data: [], idsOfData: [] });
    };

    const handleSingleCheckboxClick = (event, tableHeadIdsListOnClick, idsListOnClick) => {
        const selectedIndex = selected.indexOf(tableHeadIdsListOnClick);
        let newSelected = [];
        let newSelectedsIDs = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, tableHeadIdsListOnClick);
            newSelectedsIDs = newSelectedsIDs.concat(selectedIDs, idsListOnClick);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
            newSelectedsIDs = newSelectedsIDs.concat(selectedIDs.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
            newSelectedsIDs = newSelectedsIDs.concat(selectedIDs.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
            newSelectedsIDs = newSelectedsIDs.concat(selectedIDs.slice(0, selectedIndex), selectedIDs.slice(selectedIndex + 1));
        }

        dispatch({ type: SET_DATA_TRANSCRIPTS_TABLE_TO_DOWNLOAD, data: newSelected, idsOfData: newSelectedsIDs });
    };

    const handleChangePage = (event, newPage) => {
        dispatch({ type: SEARCH_BY_SEQUENCE_QUERY_PAGE_CURRENT, currentPage: newPage + 1 });
        dispatch({ type: CHANGE_TABLE_PAGINATION_PAGE, pageOfPagination: newPage });
        dispatch({
            type: SEARCH_BY_SEQUENCE_API_SET,
            searchBySequenceAPI: `/blast/blastn/?page=${newPage + 1}`
        });
    };

    const handleChangeRowsPerPage = (event) => {
        dispatch({
            type: TRANSCRIPT_SEARCH_QUERY_SET_NUMBER_OF_ROWS_PER_PAGE_TO_SHOW,
            numberOfRowsPerPageToShow: parseInt(event.target.value, 10)
        });
        dispatch({
            type: SEARCH_BY_SEQUENCE_API_SET,
            searchBySequenceAPI: `/blast/blastn/?page=${1}`
        });
        dispatch({ type: SEARCH_BY_SEQUENCE_QUERY_PAGE_CURRENT, page: 1 });
        dispatch({ type: CHANGE_TABLE_PAGINATION_PAGE, pageOfPagination: 0 });
    };

    const handleSubmitSearch = () => {
        // console.log(numberOfRowsPerPage);
        dispatch({ type: SEARCH_BY_SEQUENCE_CAN_SENDED, canSend: canSend + 1 });
        dispatch({ type: CHANGE_TABLE_PAGINATION_PAGE, pageOfPagination: 0 });
        dispatch({
            type: SEARCH_BY_SEQUENCE_API_SET,
            searchBySequenceAPI: `/blast/blastn/?page=${currentPage}`
        });
    };

    const handleResetSearchFields = () => {
        dispatch({
            type: SEARCH_BY_SEQUENCE_API_SET,
            searchBySequenceAPI: `/blast/blastn/?page=${currentPage}`
        });
        dispatch({
            type: RESET_TRANSCRIPT_SEARCH_QUERY
        });
        dispatch({
            type: RESET_SEARCH_BY_SEQUENCE
        });
    };

    useEffect(() => {
        makeRows(getTableDataFromServerAPI, queryObjToServer)
            .then((res) => {
                dispatch({
                    type: SET_TRANSCRIPTS_TABLES_DATA,
                    tableData: { tableHeadCells: headCells, tableRows: res.rows, countOfPagesInBackend: res.countOfPagesInBsckend }
                });
            })
            .then(() => dispatch({ type: CAN_TRANSCRIPTS_RENDER, canRender: true }))
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
    }, [getTableDataFromServerAPI, canSend]);

    useEffect(
        () => () => {
            dispatch({
                type: RESET_TRANSCRIPT_STATES
            });
            dispatch({
                type: RESET_SEARCH_BY_SEQUENCE
            });
        },
        []
    );

    return (
        <>
            {canReturnRender && (
                <>
                    <Grid container direction="row" spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <TranscriptsSearcher
                                handleSubmitSearch={handleSubmitSearch}
                                handleResetSearchFields={handleResetSearchFields}
                            />
                        </Grid>
                    </Grid>
                    {/* <TopOfTables /> */}
                    <TableWithCheckbox
                        tableHeadList={tableHeader}
                        tableRowList={rows}
                        handleSelectAllClick={handleSelectAllClick}
                        handleSingleCheckboxClick={handleSingleCheckboxClick}
                        selectedItems={selected}
                    />
                    <TablePagination
                        rowsPerPageOptions={[6]}
                        component="div"
                        count={countOfPagesInBackend * 6}
                        rowsPerPage={6}
                        page={pageOfPagination}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                    {/* <button type="button" onClick={() => console.log(countOfPagesInBackend[0] * numberOfRowsPerPage)}>
                        slkdjf
                    </button> */}
                </>
            )}
        </>
    );
}

export default SequenceSearcher;
