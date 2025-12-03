import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import contactReducer from './brassicaLncDashboard/contact/contactReducer';
import downloadReducer from './brassicaLncDashboard/download/downloadReducer';
import helpReducer from './brassicaLncDashboard/help/helpReducer';
import homeReducer from './brassicaLncDashboard/home/homeReducer';
import multiOmicsExpressionReducer from './brassicaLncDashboard/multi-omics/expression/expressionReducer';
import multiOmicsTransposonReducer from './brassicaLncDashboard/multi-omics/transposon/transposonReducer';
import multiOmicsVariationReducer from './brassicaLncDashboard/multi-omics/variation/variationReducer';

import searchReducer from './brassicaLncDashboard/search/searchReducer';
import statisticsReducer from './brassicaLncDashboard/statistics/statisticsReducer';
import submitReducer from './brassicaLncDashboard/submit/submitReducer';
import transcriptsReducer from './brassicaLncDashboard/transcripts/transcriptsReducer';
import smallRnaTargetReducer from './brassicaLncDashboard/multi-omics/smallRnaTarget/smallRnaTargetReducer';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    customization: customizationReducer,
    contact: contactReducer,
    download: downloadReducer,
    help: helpReducer,
    home: homeReducer,
    multiomics: {
        expression: multiOmicsExpressionReducer,
        transcrsipts: multiOmicsTransposonReducer,
        variation: multiOmicsVariationReducer
    },
    // multiomics part
    smallRnaTarget: smallRnaTargetReducer,
    search: searchReducer,
    statistics: statisticsReducer,
    submit: submitReducer,
    transcrsipts: transcriptsReducer
});

export default reducer;
