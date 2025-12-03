import { useDispatch, useSelector } from 'react-redux';
import { RadioGroup, FormControlLabel, Box, Paper } from '@mui/material';

import { SET_FORMAT_TRANSCRIPTS_TABLE_TO_DOWNLOAD } from 'store/actions';

import api from 'routes/api.json';

// ui-component
import Button from 'ui-component/Button';
import Radio from 'ui-component/Radio';

function TopOfTables() {
    const formatOfDownload = useSelector((state) => state.transcrsipts.table.tableDataToDownload.format);
    const idsForDownload = useSelector((state) => state.transcrsipts.table.tableDataToDownload.idsOfData);
    const dispatch = useDispatch();

    const handleRadioChange = (event) => {
        event.preventDefault();
        dispatch({ type: SET_FORMAT_TRANSCRIPTS_TABLE_TO_DOWNLOAD, format: event.target.value });
    };

    const handleDownloadButtonsClick = (str, event) => {
        event.preventDefault();
        switch (str) {
            case 'selected':
                window.open(`${api.mainURL}/download/${formatOfDownload}/?ids=${idsForDownload}`, '_blank');
                break;

            case 'all':
                window.open(`${api.mainURL}/download/${formatOfDownload}`, '_blank');
                break;

            default:
                break;
        }
    };

    return (
        <Paper sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', pl: '18px', flexWrap: 'wrap' }}>
            <RadioGroup
                name="formats"
                sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}
                value={formatOfDownload}
                onChange={(event) => handleRadioChange(event)}
            >
                <FormControlLabel value="csv" control={<Radio />} label="CSV" />
                <FormControlLabel value="txt" control={<Radio />} label="TXT" />
                <FormControlLabel value="fasta" control={<Radio />} label="FASTA" />
                <FormControlLabel value="gtf" control={<Radio />} label="GTF" />
            </RadioGroup>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                <Button onClick={(event) => handleDownloadButtonsClick('selected', event)}>Download Selected</Button>
                <Button onClick={(event) => handleDownloadButtonsClick('all', event)}>Download All</Button>
            </Box>
        </Paper>
    );
}

export default TopOfTables;
