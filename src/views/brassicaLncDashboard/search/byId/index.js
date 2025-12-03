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
    RESET_TRANSCRIPT_STATES
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

const makeRows = async (getTableDataFromServerAPI) => {
    const rows = [];
    const countOfPagesInBsckend = [];
    const tootaldata = [];
    await axios.get(api.mainURL + getTableDataFromServerAPI).then((res) => {
        // console.log(res);
        res.data.data.map((a) =>
            rows.push(createData(a.id, a.transcriptId, a.chr, a.location, a.geneId, a.classification, a.length, a.exonNumber))
        );
        countOfPagesInBsckend.push(res.data.pages);
        tootaldata.push(res.data.count);
    });
    return { rows, countOfPagesInBsckend, tootaldata };
};

function Transcriptions() {
    const getTableDataFromServerAPI = useSelector((state) => state.transcrsipts.search.path);
    const rows = useSelector((state) => state.transcrsipts.table.tableData.tableRows);
    const countOfPagesInBackend = useSelector((state) => state.transcrsipts.table.tableData.countOfPagesInBackend);
    const tableHeader = useSelector((state) => state.transcrsipts.table.tableData.tableHeadCells);
    const numberOfRowsPerPage = useSelector((state) => state.transcrsipts.search.query.numberOfRowsPerPageToShow);
    const searchQuery = useSelector((state) => state.transcrsipts.search.query);
    const pageOfPagination = useSelector((state) => state.transcrsipts.table.pageOfPagination);
    const canReturnRender = useSelector((state) => state.transcrsipts.canRender);
    const selected = useSelector((state) => state.transcrsipts.table.tableDataToDownload.data);
    const selectedIDs = useSelector((state) => state.transcrsipts.table.tableDataToDownload.idsOfData);
    const tootaldata = useSelector((state) => state.transcrsipts.table.tableData.tootaldata);
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
        const locationForSearch =
            searchQuery.location.start && searchQuery.location.end ? searchQuery.location.start.concat(',', searchQuery.location.end) : '';
        const lengthForSearch =
            searchQuery.length.start && searchQuery.length.end ? searchQuery.length.start.concat(',', searchQuery.length.end) : '';
        const exonForSearch =
            searchQuery.exon.start && searchQuery.exon.end ? searchQuery.exon.start.concat(',', searchQuery.exon.end) : '';
        dispatch({ type: TRANSCRIPT_SEARCH_QUERY_SET_PAGE, page: newPage + 1 });
        dispatch({ type: CHANGE_TABLE_PAGINATION_PAGE, pageOfPagination: newPage });
        dispatch({
            type: TRANSCRIPT_SEARCH_SET_PATH,
            path: `/lncRNA/transcripts/?show=${numberOfRowsPerPage}&page=${newPage + 1}&gid=${searchQuery.geneId}&tid=${
                searchQuery.transcriptId
            }&class=${searchQuery.classification}&loc=${locationForSearch}&len=${lengthForSearch}&exon=${exonForSearch}`
        });
    };

    const handleChangeRowsPerPage = (event) => {
        const locationForSearch =
            searchQuery.location.start && searchQuery.location.end ? searchQuery.location.start.concat(',', searchQuery.location.end) : '';
        const lengthForSearch =
            searchQuery.length.start && searchQuery.length.end ? searchQuery.length.start.concat(',', searchQuery.length.end) : '';
        const exonForSearch =
            searchQuery.exon.start && searchQuery.exon.end ? searchQuery.exon.start.concat(',', searchQuery.exon.end) : '';
        dispatch({
            type: TRANSCRIPT_SEARCH_QUERY_SET_NUMBER_OF_ROWS_PER_PAGE_TO_SHOW,
            numberOfRowsPerPageToShow: parseInt(event.target.value, 10)
        });
        dispatch({
            type: TRANSCRIPT_SEARCH_SET_PATH,
            path: `/lncRNA/transcripts/?show=${parseInt(event.target.value, 10)}&page=${1}&gid=${searchQuery.geneId}&tid=${
                searchQuery.transcriptId
            }&class=${searchQuery.classification}&loc=${locationForSearch}&len=${lengthForSearch}&exon=${exonForSearch}`
        });
        dispatch({ type: TRANSCRIPT_SEARCH_QUERY_SET_PAGE, page: 1 });
        dispatch({ type: CHANGE_TABLE_PAGINATION_PAGE, pageOfPagination: 0 });
    };

    const handleSubmitSearch = () => {
        const locationForSearch =
            searchQuery.location.start && searchQuery.location.end ? searchQuery.location.start.concat(',', searchQuery.location.end) : '';
        const lengthForSearch =
            searchQuery.length.start && searchQuery.length.end ? searchQuery.length.start.concat(',', searchQuery.length.end) : '';
        const exonForSearch =
            searchQuery.exon.start && searchQuery.exon.end ? searchQuery.exon.start.concat(',', searchQuery.exon.end) : '';
        dispatch({ type: CHANGE_TABLE_PAGINATION_PAGE, pageOfPagination: 0 });
        dispatch({
            type: TRANSCRIPT_SEARCH_SET_PATH,
            path: `/lncRNA/transcripts/?show=${numberOfRowsPerPage}&gid=${searchQuery.geneId}&tid=${searchQuery.transcriptId}&class=${searchQuery.classification}&loc=${locationForSearch}&len=${lengthForSearch}&exon=${exonForSearch}`
        });
    };

    const handleResetSearchFields = () => {
        dispatch({
            type: TRANSCRIPT_SEARCH_SET_PATH,
            path: `/lncRNA/transcripts/?show=${numberOfRowsPerPage}&gid=&tid=&class=&loc=&len=&exon=`
        });
        dispatch({
            type: RESET_TRANSCRIPT_SEARCH_QUERY
        });
    };

    useEffect(() => {
        makeRows(getTableDataFromServerAPI)
            .then((res) => {
                dispatch({
                    type: SET_TRANSCRIPTS_TABLES_DATA,
                    tableData: {
                        tableHeadCells: headCells,
                        tableRows: res.rows,
                        countOfPagesInBackend: res.countOfPagesInBsckend,
                        tootaldata: res.tootaldata
                    }
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
    }, [getTableDataFromServerAPI]);

    useEffect(
        () => () => {
            dispatch({
                type: RESET_TRANSCRIPT_STATES
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
                        rowsPerPageOptions={[6, 24, 54, 72, 133]}
                        component="div"
                        count={tootaldata[0]}
                        rowsPerPage={numberOfRowsPerPage}
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

export default Transcriptions;
