import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import api from 'routes/api.json';
import {
    CAN_TRANSCRIPTS_RENDER,
    SET_TRANSCRIPTS_TABLES_DATA,
    TRANSCRIPT_SEARCH_SET_PATH,
    TRANSCRIPT_SEARCH_QUERY_SET_NUMBER_OF_ROWS_PER_PAGE_TO_SHOW,
    TRANSCRIPT_SEARCH_QUERY_SET_PAGE,
    CHANGE_TABLE_PAGINATION_PAGE,
    SET_DATA_TRANSCRIPTS_TABLE_TO_DOWNLOAD,
    RESET_TRANSCRIPT_SEARCH_QUERY,
    RESET_TRANSCRIPT_STATES,
    SEARCH_BY_EXPRESSION_API_SET,
    SEARCH_BY_EXPRESSION_QUERY_PAGE_TOTAL_SET,
    SEARCH_BY_EXPRESSION_QUERY_PAGE_CURRENT_SET,
    RESET_SEARCH_BY_EXPRESSION
} from 'store/actions';

import TranscriptsSearcher from './TranscriptsSearcher';
// import TopOfTables from './topOfTables';
import { Grid, TablePagination } from '@mui/material';
import { gridSpacing } from 'store/constant';
import { TableWithCheckbox } from 'ui-component/Table';
import { toast } from 'react-toastify';

const headCells = [
    {
        id: 'transcriptId',
        numeric: false,
        disablePadding: true,
        label: 'Transcript ID'
    },
    {
        id: 'chromosome',
        numeric: true,
        disablePadding: false,
        label: 'Chromosome'
    },
    {
        id: 'location',
        numeric: true,
        disablePadding: false,
        label: 'Location'
    },
    {
        id: 'geneId',
        numeric: true,
        disablePadding: false,
        label: 'Gene ID'
    },
    {
        id: 'classification',
        numeric: true,
        disablePadding: false,
        label: 'Classification'
    },
    {
        id: 'length',
        numeric: true,
        disablePadding: false,
        label: 'Length'
    },
    {
        id: 'exonNumber',
        numeric: true,
        disablePadding: false,
        label: 'Exon Number'
    }
];

function createData(id, transcriptId, chromosome, location, geneId, classification, length, exonNumber) {
    return {
        id,
        transcriptId,
        chromosome,
        location,
        geneId,
        classification,
        length,
        exonNumber
    };
}

const makeRows = async (API) => {
    const rows = [];
    const countOfPagesInBsckend = [];
    const tootalDat = [];
    try {
        await axios.get(api.mainURL + API).then((res) => {
            // console.log(res);
            res.data.data.map((a) =>
                rows.push(createData(a.id, a.transcriptId, a.chr, a.location, a.geneId, a.classification, a.length, a.exonNumber))
            );
            countOfPagesInBsckend.push(res.data.pages);
            tootalDat.push(res.data.count);
        });
        return { rows, countOfPagesInBsckend, tootalDat };
    } catch (error) {
        return null;
    }
};

function ExpressionSearcher() {
    const { API, queries } = useSelector((state) => state.search.searchByExpression);

    // const API = useSelector((state) => state.transcrsipts.search.path);
    const rows = useSelector((state) => state.transcrsipts.table.tableData.tableRows);
    // const countOfPagesInBackend = useSelector((state) => state.transcrsipts.table.tableData.countOfPagesInBackend);
    const tableHeader = useSelector((state) => state.transcrsipts.table.tableData.tableHeadCells);
    // const numberOfRowsPerPage = useSelector((state) => state.transcrsipts.search.query.numberOfRowsPerPageToShow);
    // const searchQuery = useSelector((state) => state.transcrsipts.search.query);
    // const pageOfPagination = useSelector((state) => state.transcrsipts.table.pageOfPagination);
    const canReturnRender = useSelector((state) => state.transcrsipts.canRender);
    const selected = useSelector((state) => state.transcrsipts.table.tableDataToDownload.data);
    const selectedIDs = useSelector((state) => state.transcrsipts.table.tableDataToDownload.idsOfData);
    const tootalDats = useSelector((state) => state.transcrsipts.table.tableData.tootalDat);
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
        // console.log(newPage);
        // const locationForSearch =
        //     searchQuery.location.start && searchQuery.location.end ? searchQuery.location.start.concat(',', searchQuery.location.end) : '';
        // const lengthForSearch =
        //     searchQuery.length.start && searchQuery.length.end ? searchQuery.length.start.concat(',', searchQuery.length.end) : '';
        // const exonForSearch =
        //     searchQuery.exon.start && searchQuery.exon.end ? searchQuery.exon.start.concat(',', searchQuery.exon.end) : '';
        dispatch({ type: SEARCH_BY_EXPRESSION_QUERY_PAGE_CURRENT_SET, currentPageForExpressionSearch: newPage });
        // dispatch({ type: CHANGE_TABLE_PAGINATION_PAGE, pageOfPagination: newPage });
        dispatch({
            type: SEARCH_BY_EXPRESSION_API_SET,
            searchByExpressionAPI: `/search/exp?group=${queries.group}&startRange=${queries.range.start}&endRange=${
                queries.range.end
            }&page=${newPage + 1}`
        });
    };

    const handleChangeRowsPerPage = (event) => {
        // const locationForSearch =
        //     searchQuery.location.start && searchQuery.location.end ? searchQuery.location.start.concat(',', searchQuery.location.end) : '';
        // const lengthForSearch =
        //     searchQuery.length.start && searchQuery.length.end ? searchQuery.length.start.concat(',', searchQuery.length.end) : '';
        // const exonForSearch =
        //     searchQuery.exon.start && searchQuery.exon.end ? searchQuery.exon.start.concat(',', searchQuery.exon.end) : '';
        // dispatch({
        //     type: TRANSCRIPT_SEARCH_QUERY_SET_NUMBER_OF_ROWS_PER_PAGE_TO_SHOW,
        //     numberOfRowsPerPageToShow: parseInt(event.target.value, 10)
        // });
        // dispatch({
        //     type: SEARCH_BY_EXPRESSION_API_SET,
        //     searchByExpressionAPI: `/search/exp?group=${queries.group}&startRange=${queries.range.start}&endRange=${queries.range.end}&page=${1}`
        // });
        // dispatch({ type: TRANSCRIPT_SEARCH_QUERY_SET_PAGE, page: 1 });
        // dispatch({ type: CHANGE_TABLE_PAGINATION_PAGE, pageOfPagination: 0 });
    };

    const handleSubmitSearch = () => {
        // dispatch({ type: CHANGE_TABLE_PAGINATION_PAGE, pageOfPagination: 0 });
        dispatch({ type: SEARCH_BY_EXPRESSION_QUERY_PAGE_CURRENT_SET, currentPageForExpressionSearch: 0 });
        dispatch({
            type: SEARCH_BY_EXPRESSION_API_SET,
            searchByExpressionAPI: `/search/exp?group=${queries.group}&startRange=${queries.range.start}&endRange=${queries.range.end}`
        });
    };

    const handleResetSearchFields = () => {
        dispatch({
            type: SEARCH_BY_EXPRESSION_API_SET,
            searchByExpressionAPI: `/search/exp?group=${queries.group}&startRange=${queries.range.start}&endRange=${queries.range.end}`
        });
        dispatch({
            type: RESET_SEARCH_BY_EXPRESSION
        });
        dispatch({
            type: RESET_TRANSCRIPT_STATES
        });
    };

    useEffect(() => {
        makeRows(API)
            .then((res) => {
                dispatch({
                    type: SET_TRANSCRIPTS_TABLES_DATA,
                    tableData: {
                        tableHeadCells: headCells,
                        tableRows: res.rows,
                        countOfPagesInBackend: res.countOfPagesInBsckend,
                        tootalDat: res.tootalDat
                    }
                });
                dispatch({
                    type: SEARCH_BY_EXPRESSION_QUERY_PAGE_TOTAL_SET,
                    totalPageForExpressionSearch: res.countOfPagesInBsckend[0]
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
    }, [API]);

    useEffect(
        () => () => {
            dispatch({
                type: RESET_TRANSCRIPT_STATES
            });
            dispatch({
                type: RESET_SEARCH_BY_EXPRESSION
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
                        rowsPerPageOptions={[10]}
                        component="div"
                        count={tootalDats}
                        rowsPerPage={10}
                        page={queries.page.current}
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

export default ExpressionSearcher;
