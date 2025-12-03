// action - state management
import * as actionTypes from '../../actions';

export const searchInitialState = {
    searchByExpression: {
        API: '/search/exp?group=chemical&startRange=6&endRange=10000000000000000',
        queries: { range: { start: 0, end: 1000000 }, group: 'chemical', page: { current: 0, total: 1 } }
    },
    searchBySequence: {
        API: '/blast/blastn?page=1',
        queries: {
            sequence:
                'AAATACCAATATTTTTAAGAACATATTTCTAACTCGATCTGTTATATGCATATATATACATATATGTAAAGAATTATATATATATACATTATATATATTATACTTTATATCAGTTTTACAATATTTTTTATGAATTAAATTTATTATATTAGGTACTAGAATTTAAAAAGTTAAATAATGTTTTATTTTTGTAATAAAATGTTATTATTAAAATTTTCAATTATTTTTAAAATTTTATTTTATTTACGGATCAACTCGGATATTCTTTAAAATTTTAAAACATTTTGGATATCTGAGTCACCGAATATCTAGGTGGCTAAAGATCGAATCGACATGAATGCTTCCAAATACCCAGATATTCGATCTGTGTCCACCCCTACTTAAATATACAATTTTATTTTATTTATATGAAAAAGTTGACTAATGTCAAGG',
            evalue: 1,
            word_size: 10,
            search_sensitivity: 0
        },
        pages: { current: 1, total: 1 },
        canSend: 0
    },
    dataFromServer: {
        searchById: {},
        searchBySequence: {},
        searchByGenomeLocationAndOtherMolecularFeatures: {}
    },
    dataForSendToServer: {
        searchById: { id: '' },
        searchBySequence: {},
        searchByExpression: {},
        searchByGenomeLocationAndOtherMolecularFeatures: {
            chromosome: '',
            location: { start: '', end: '' },
            classification: '',
            length: { start: '', end: '' },
            exonNumber: { start: '', end: '' }
        }
    }
};

// ==============================|| SEARCH REDUCER ||============================== //

const searchReducer = (state = searchInitialState, searchAction) => {
    switch (searchAction.type) {
        // set data from server
        case actionTypes.GET_SEARCH_BY_ID_FROM_SERVER:
            return {
                ...state,
                dataFromServer: { ...state.dataFromServer, searchById: searchAction.searchById_dataFromServer }
            };
        case actionTypes.GET_SEARCH_BY_SEQUENCE_FROM_SERVER:
            return {
                ...state,
                dataFromServer: { ...state.dataFromServer, searchBySequence: searchAction.searchBySequence_dataFromServer }
            };
        case actionTypes.SEARCH_BY_EXPRESSION_API_SET:
            return {
                ...state,
                searchByExpression: {
                    ...state.searchByExpression,
                    API: searchAction.searchByExpressionAPI
                }
            };
        case actionTypes.SEARCH_BY_EXPRESSION_QUERY_GROUP_SET:
            return {
                ...state,
                searchByExpression: {
                    ...state.searchByExpression,
                    queries: { ...state.searchByExpression.queries, group: searchAction.groupForExpressionSearch }
                }
            };
        case actionTypes.SEARCH_BY_EXPRESSION_QUERY_RANGE_START_SET:
            return {
                ...state,
                searchByExpression: {
                    ...state.searchByExpression,
                    queries: {
                        ...state.searchByExpression.queries,
                        range: { ...state.searchByExpression.queries.range, start: searchAction.rangeStartForExpressionSearch }
                    }
                }
            };
        case actionTypes.SEARCH_BY_EXPRESSION_QUERY_RANGE_END_SET:
            return {
                ...state,
                searchByExpression: {
                    ...state.searchByExpression,
                    queries: {
                        ...state.searchByExpression.queries,
                        range: { ...state.searchByExpression.queries.range, end: searchAction.rangeEndForExpressionSearch }
                    }
                }
            };
        case actionTypes.SEARCH_BY_EXPRESSION_QUERY_PAGE_CURRENT_SET:
            return {
                ...state,
                searchByExpression: {
                    ...state.searchByExpression,
                    queries: {
                        ...state.searchByExpression.queries,
                        page: { ...state.searchByExpression.queries.page, current: searchAction.currentPageForExpressionSearch }
                    }
                }
            };
        case actionTypes.SEARCH_BY_EXPRESSION_QUERY_PAGE_TOTAL_SET:
            return {
                ...state,
                searchByExpression: {
                    ...state.searchByExpression,
                    queries: {
                        ...state.searchByExpression.queries,
                        page: { ...state.searchByExpression.queries.page, total: searchAction.totalPageForExpressionSearch }
                    }
                }
            };
        case actionTypes.RESET_SEARCH_BY_EXPRESSION:
            return {
                ...state,
                searchByExpression: {
                    API: '/search/exp?group=chemical&startRange=6&endRange=10000000000000000',
                    queries: { range: { start: 0, end: 1000000 }, group: 'chemical', page: { current: 0, total: 1 } }
                }
            };

        case actionTypes.SEARCH_BY_SEQUENCE_API_SET:
            return {
                ...state,
                searchBySequence: {
                    ...state.searchBySequence,
                    API: searchAction.searchBySequenceAPI
                }
            };
        case actionTypes.SEARCH_BY_SEQUENCE_QUERY_SEQUENCE:
            return {
                ...state,
                searchBySequence: {
                    ...state.searchBySequence,
                    queries: { ...state.searchBySequence.queries, sequence: searchAction.sequenceForSearch }
                }
            };
        case actionTypes.SEARCH_BY_SEQUENCE_QUERY_EVALUE:
            return {
                ...state,
                searchBySequence: {
                    ...state.searchBySequence,
                    queries: { ...state.searchBySequence.queries, evalue: searchAction.evalueForSearch }
                }
            };
        case actionTypes.SEARCH_BY_SEQUENCE_QUERY_WORD_SIZE:
            return {
                ...state,
                searchBySequence: {
                    ...state.searchBySequence,
                    queries: { ...state.searchBySequence.queries, word_size: searchAction.wordSizeForSearch }
                }
            };
        case actionTypes.SEARCH_BY_SEQUENCE_QUERY_SEARCH_SENSIVITY:
            return {
                ...state,
                searchBySequence: {
                    ...state.searchBySequence,
                    queries: { ...state.searchBySequence.queries, search_sensitivity: searchAction.searchSensitivityForSearch }
                }
            };
        case actionTypes.SEARCH_BY_SEQUENCE_QUERY_PAGE_CURRENT:
            return {
                ...state,
                searchBySequence: {
                    ...state.searchBySequence,

                    pages: { ...state.searchBySequence.pages, current: searchAction.currentPage }
                }
            };
        case actionTypes.SEARCH_BY_SEQUENCE_QUERY_PAGE_TOTAL:
            return {
                ...state,
                searchBySequence: {
                    ...state.searchBySequence,

                    pages: { ...state.searchBySequence.pages, total: searchAction.totalPage }
                }
            };
        case actionTypes.SEARCH_BY_SEQUENCE_CAN_SENDED:
            return {
                ...state,
                searchBySequence: {
                    ...state.searchBySequence,
                    canSend: searchAction.canSend
                }
            };
        case actionTypes.RESET_SEARCH_BY_SEQUENCE:
            return {
                ...state,
                searchBySequence: {
                    API: '/blast/blastn?page=1',
                    queries: {
                        sequence:
                            'AAATACCAATATTTTTAAGAACATATTTCTAACTCGATCTGTTATATGCATATATATACATATATGTAAAGAATTATATATATATACATTATATATATTATACTTTATATCAGTTTTACAATATTTTTTATGAATTAAATTTATTATATTAGGTACTAGAATTTAAAAAGTTAAATAATGTTTTATTTTTGTAATAAAATGTTATTATTAAAATTTTCAATTATTTTTAAAATTTTATTTTATTTACGGATCAACTCGGATATTCTTTAAAATTTTAAAACATTTTGGATATCTGAGTCACCGAATATCTAGGTGGCTAAAGATCGAATCGACATGAATGCTTCCAAATACCCAGATATTCGATCTGTGTCCACCCCTACTTAAATATACAATTTTATTTTATTTATATGAAAAAGTTGACTAATGTCAAGG',
                        evalue: 1,
                        word_size: 10,
                        search_sensitivity: 0
                    },
                    pages: { current: 1, total: 1 },
                    canSend: 0
                }
            };
        // set data for send to server
        case actionTypes.SET_SEARCH_BY_ID:
            return {
                ...state,
                dataForSendToServer: { ...state.dataForSendToServer, searchById: searchAction.searchById_dataForSendToServer }
            };

        case actionTypes.SET_SEARCH_BY_EXPRESSION:
            return {
                ...state,
                dataForSendToServer: {
                    ...state.dataForSendToServer,
                    searchByExpression: searchAction.searchByExpression_dataForSendToServer
                }
            };
        case actionTypes.SET_SEARCH_BY_GENOME_LOCATION_AND_OTHER_MOLECULAR_FEATURES:
            return {
                ...state,
                dataForSendToServer: {
                    ...state.dataForSendToServer,
                    searchByGenomeLocationAndOtherMolecularFeatures:
                        searchAction.searchByGenomeLocationAndOtherMolecularFeatures_dataForSendToServer
                }
            };
        default:
            return state;
    }
};

export default searchReducer;
