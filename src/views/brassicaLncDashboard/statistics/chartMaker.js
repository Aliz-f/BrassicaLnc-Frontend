import axios from 'axios';
import api from 'routes/api.json';

const chartMaker = async (getTableDataFromServerAPI, cancelTokenSource) => {
    const chartTitleList = [];
    const dataCategoriesList = [];
    const dataSeriesList = [];
    const dataUnitsList = [];
    const dataForLinePlot = [];
    const nameForLinePlot = [];
    const descriptions = [];

    const aRes = await axios.get(getTableDataFromServerAPI).then((res) => res.data);
    return aRes;
};

export default chartMaker;
