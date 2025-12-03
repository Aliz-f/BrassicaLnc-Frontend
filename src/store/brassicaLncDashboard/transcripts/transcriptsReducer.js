// action - state management
import * as actionTypes from '../../actions';

export const initialState = {
    canRender: false,
    search: {
        showAdvancedSearch: false,
        path: '/lncRNA/transcripts/?show=6',
        query: {
            numberOfRowsPerPageToShow: 6,
            search: '',
            geneId: '',
            transcriptId: '',
            classification: '',
            location: { start: '', end: '' },
            length: { start: '', end: '' },
            exon: { start: '', end: '' },
            page: 1
        }
    },
    table: {
        isTableInProgress: true,
        canTableRender: false,
        tableData: { tableHeadCells: [], tableRows: [] },
        pageOfPagination: 0,
        tableDataToDownload: { format: 'csv', data: [], idsOfData: [] }
    },
    content: {
        path: '/content/',
        transcriptID: 123,
        csvTable: { canRender: false, tableData: { csvHeadCells: [], csvRow: [] } },
        gtfTable: { canRender: false, tableData: { gtfHeadCells: [], gtfRow: [] } },
        sequence: '',
        charts: { chemical: { chartTitles: [], chartUnits: '', dataSeries: [], chartCategories: [] } }
    }
};

// ==============================|| CUSTOMIZATION REDUCER ||============================== //

const transcriptsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CAN_TRANSCRIPTS_RENDER:
            return {
                ...state,
                canRender: action.canRender
            };
        case actionTypes.TRANSCRIPT_SEARCH_SET_PATH:
            return {
                ...state,
                search: { ...state.search, path: action.path }
            };
        case actionTypes.RESET_TRANSCRIPT_SEARCH_QUERY:
            return {
                ...state,
                search: {
                    ...state.search,
                    query: {
                        ...state.search.query,
                        geneId: '',
                        transcriptId: '',
                        classification: '',
                        location: { start: '', end: '' },
                        length: { start: '', end: '' },
                        exon: { start: '', end: '' }
                    }
                }
            };
        case actionTypes.TRANSCRIPT_SEARCH_QUERY_SET_NUMBER_OF_ROWS_PER_PAGE_TO_SHOW:
            return {
                ...state,
                search: { ...state.search, query: { ...state.search.query, numberOfRowsPerPageToShow: action.numberOfRowsPerPageToShow } }
            };
        case actionTypes.TRANSCRIPT_SEARCH_QUERY_SET_GENE_ID:
            return { ...state, search: { ...state.search, query: { ...state.search.query, geneId: action.geneId } } };
        case actionTypes.TRANSCRIPT_SEARCH_QUERY_SET_TRANSCRIPT_ID:
            return { ...state, search: { ...state.search, query: { ...state.search.query, search: action.search } } };
        case actionTypes.TRANSCRIPT_SEARCH_QUERY_SET_CLASSIFICATION:
            return { ...state, search: { ...state.search, query: { ...state.search.query, classification: action.classification } } };
        case actionTypes.TRANSCRIPT_SEARCH_QUERY_SET_LOCATION:
            return { ...state, search: { ...state.search, query: { ...state.search.query, location: action.location } } };
        case actionTypes.TRANSCRIPT_SEARCH_QUERY_SET_LENGTH:
            return { ...state, search: { ...state.search, query: { ...state.search.query, length: action.length } } };
        case actionTypes.TRANSCRIPT_SEARCH_QUERY_SET_EXON:
            return { ...state, search: { ...state.search, query: { ...state.search.query, exon: action.exon } } };
        case actionTypes.TRANSCRIPT_SEARCH_QUERY_SET_PAGE:
            return { ...state, search: { ...state.search, query: { ...state.search.query, page: action.page } } };
        case actionTypes.CAN_TRANSCRIPTS_TABLE_RENDER:
            return {
                ...state,
                table: { ...state.table, isTableInProgress: action.isTableInProgress, canTableRender: !action.isTableInProgress }
            };
        case actionTypes.SET_TRANSCRIPTS_TABLES_DATA:
            return {
                ...state,
                table: { ...state.table, tableData: action.tableData }
            };
        case actionTypes.CHANGE_TABLE_PAGINATION_PAGE:
            return {
                ...state,
                table: { ...state.table, pageOfPagination: action.pageOfPagination }
            };
        case actionTypes.SET_TRANSCRIPTS_SEARCH:
            return {
                ...state,
                search: { ...state.search, searchQuery: action.searchQuery }
            };
        case actionTypes.SET_TRANSCRIPTS_ADVANCED_SEARCH_TO_SHOW:
            return {
                ...state,
                search: { ...state.search, showAdvancedSearch: action.showAdvancedSearch }
            };
        case actionTypes.SET_TRANSCRIPTS_TABLE_TO_SHOW:
            return {
                ...state,
                table: { ...state.table, tableToShow: action.tableToShow }
            };
        case actionTypes.SET_FORMAT_TRANSCRIPTS_TABLE_TO_DOWNLOAD:
            return {
                ...state,
                table: { ...state.table, tableDataToDownload: { ...state.table.tableDataToDownload, format: action.format } }
            };
        case actionTypes.SET_DATA_TRANSCRIPTS_TABLE_TO_DOWNLOAD:
            return {
                ...state,
                table: {
                    ...state.table,
                    tableDataToDownload: { ...state.table.tableDataToDownload, data: action.data, idsOfData: action.idsOfData }
                }
            };
        case actionTypes.SET_TRANSCRIPT_ID:
            return {
                ...state,
                content: { ...state.content, transcriptID: action.transcriptID }
            };
        case actionTypes.CONTENT_SET_CSV_TABLE_DATA:
            return {
                ...state,
                content: { ...state.content, csvTable: { ...state.content.csvTable, tableData: action.csvTableData } }
            };
        case actionTypes.CAN_CONTENT_CSV_TABLE_RENDER:
            return {
                ...state,
                content: { ...state.content, csvTable: { ...state.content.csvTable, canRender: action.canCSVTableRender } }
            };
        case actionTypes.CONTENT_SET_GTF_TABLE_DATA:
            return {
                ...state,
                content: { ...state.content, gtfTable: { ...state.content.gtfTable, tableData: action.gtfTableData } }
            };
        case actionTypes.CAN_CONTENT_GTF_TABLE_RENDER:
            return {
                ...state,
                content: { ...state.content, gtfTable: { ...state.content.gtfTable, canRender: action.canGTFTableRender } }
            };
        case actionTypes.CONTENT_SET_SEQUENCE:
            return {
                ...state,
                content: { ...state.content, sequence: action.sequence }
            };
        case actionTypes.CONTENT_SET_CHEMICAL_CHART_DATA:
            return {
                ...state,
                content: { ...state.content, charts: { ...state.content.charts, chemical: action.chemicalCahartData } }
            };
        case actionTypes.RESET_TRANSCRIPT_CONTENT_CHARTS_STATES:
            return {
                ...state,
                content: {
                    ...state.content,
                    charts: { chemical: { chartTitles: [], chartUnits: '', dataSeries: [], chartCategories: [] } }
                }
            };
        case actionTypes.RESET_TRANSCRIPT_STATES:
            return {
                canRender: false,
                search: {
                    showAdvancedSearch: false,
                    path: '/lncRNA/transcripts/?show=6',
                    query: {
                        numberOfRowsPerPageToShow: 6,
                        geneId: '',
                        transcriptId: '',
                        classification: '',
                        location: { start: '', end: '' },
                        length: { start: '', end: '' },
                        exon: { start: '', end: '' },
                        page: 1
                    }
                },
                table: {
                    isTableInProgress: true,
                    canTableRender: false,
                    tableData: { tableHeadCells: [], tableRows: [] },
                    pageOfPagination: 0,
                    tableDataToDownload: { format: 'csv', data: [], idsOfData: [] }
                },
                content: {
                    path: '/content/',
                    transcriptID: 123,
                    csvTable: { canRender: false, tableData: { csvHeadCells: [], csvRow: [] } },
                    gtfTable: { canRender: false, tableData: { gtfHeadCells: [], gtfRow: [] } },
                    sequence: '',
                    charts: { chemical: { chartTitles: [], chartUnits: '', dataSeries: [], chartCategories: [] } }
                }
            };
        default:
            return state;
    }
};

export default transcriptsReducer;
