import axios from 'axios';
import { toast } from 'react-toastify';
import api from 'routes/api.json';

const chartMaker = async (getTableDataFromServerAPI, transcriptID, cancelTokenSource) => {
    const chartTitleList = [];
    const dataCategoriesList = [];
    const dataSeriesList = [];
    const dataUnitsList = [];
    const dataForLinePlot = [];
    const nameForLinePlot = [];
    const descriptions = [];

    await axios
        .post(api.mainURL + getTableDataFromServerAPI, { id: transcriptID }, { cancelToken: cancelTokenSource.token })
        .then((res) => {
            const response = res.data;
            Object.keys(response[transcriptID]).map((title) => {
                chartTitleList.push(title);
                dataCategoriesList.push(title);
                dataSeriesList.push(
                    Object.keys(response[transcriptID][title]).map((dataOfOneChart) => {
                        const abcd = { name: dataOfOneChart, data: [response[transcriptID][title][dataOfOneChart]] };

                        return abcd;
                    })
                );
                dataForLinePlot.push(Object.values(response[transcriptID][title]));
                nameForLinePlot.push(Object.keys(response[transcriptID][title]));
                dataUnitsList.push('');
                descriptions.push(response.desc[title]);

                return 'successfully';
            });
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
    return { chartTitleList, dataCategoriesList, dataSeriesList, dataUnitsList, dataForLinePlot, nameForLinePlot, descriptions };
};

export default chartMaker;
