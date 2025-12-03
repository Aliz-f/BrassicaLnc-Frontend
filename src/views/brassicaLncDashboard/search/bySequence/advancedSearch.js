import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
    SEARCH_BY_SEQUENCE_QUERY_SEQUENCE,
    SEARCH_BY_SEQUENCE_QUERY_EVALUE,
    SEARCH_BY_SEQUENCE_QUERY_WORD_SIZE,
    SEARCH_BY_SEQUENCE_QUERY_SEARCH_SENSIVITY
} from 'store/actions';

// material-ui
import { Box, Grid, FormGroup, FormControlLabel, MenuItem, Select, FormControl, Paper } from '@mui/material';
import { IconRotate, IconSearch } from '@tabler/icons';

// ui-components
import Checkbox from 'ui-component/Checkbox';

// styles
import colors from 'assets/scss/_themes-vars.module.scss';
import Button from 'ui-component/Button';
import TextArea from 'ui-component/TeaxtArea';

const AdvancedSearch = ({ displayXs, handleSubmitSearch, handleResetSearchFields }) => {
    // values of advanced search fields
    const searchSensitivityVaue = useSelector((state) => state.search.searchBySequence.queries.search_sensitivity);
    const eValue = useSelector((state) => state.search.searchBySequence.queries.evalue);
    const wordSize = useSelector((state) => state.search.searchBySequence.queries.word_size);
    const sequenceValue = useSelector((state) => state.search.searchBySequence.queries.sequence);

    const dispatch = useDispatch();

    const handleOnChange = (event) => {
        switch (event.target.id || event.target.name) {
            case 'search_sensitivity':
                dispatch({
                    type: SEARCH_BY_SEQUENCE_QUERY_SEARCH_SENSIVITY,
                    searchSensitivityForSearch: parseInt(`${event.target.value}`, 10)
                });
                break;
            case 'evalue_list':
                dispatch({ type: SEARCH_BY_SEQUENCE_QUERY_EVALUE, evalueForSearch: event.target.value });
                break;
            case 'word_size':
                dispatch({ type: SEARCH_BY_SEQUENCE_QUERY_WORD_SIZE, wordSizeForSearch: parseInt(`${event.target.value}`, 10) });
                break;
            case 'sequence':
                dispatch({ type: SEARCH_BY_SEQUENCE_QUERY_SEQUENCE, sequenceForSearch: event.target.value });
                break;

            default:
                break;
        }
    };
    return (
        <Paper variant="outlined" sx={{ display: { xs: displayXs, md: 'block' }, m: '18px 18px 36px 18px', p: 1, border: '0' }}>
            <FormGroup>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item xs={12} sm={2} sx={{ mb: '18px' }}>
                        <FormControlLabel control={<Checkbox />} label="Sequence:" />
                    </Grid>

                    <Grid item xs={12} sm={10} sx={{ mb: '18px' }}>
                        <Box sx={{ minWidth: 266, pl: '16px' }}>
                            <TextArea
                                id="sequence"
                                minRows={6}
                                value={sequenceValue}
                                onChange={handleOnChange}
                                placeholder="Example: \n dsf"
                                sx={{ width: 1 }}
                            >
                                sequence
                            </TextArea>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={2} sx={{ mb: '18px' }}>
                        <FormControlLabel control={<Checkbox />} label="Search Sensitivity:" />
                    </Grid>

                    <Grid item xs={12} sm={10} sx={{ mb: '18px' }}>
                        <Box sx={{ minWidth: 266, pl: '16px' }}>
                            <FormControl fullWidth>
                                <Select
                                    name="search_sensitivity"
                                    value={searchSensitivityVaue}
                                    onChange={handleOnChange}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                >
                                    <MenuItem value="0">Normal</MenuItem>
                                    <MenuItem value="1">Near Match</MenuItem>
                                    <MenuItem value="2">Distant</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={2} sx={{ mb: '18px' }}>
                        <FormControlLabel control={<Checkbox />} label="Evalue List:" />
                    </Grid>
                    <Grid item xs={12} sm={10} sx={{ mb: '18px' }}>
                        <Box sx={{ minWidth: 266, pl: '16px' }}>
                            <FormControl fullWidth>
                                <Select
                                    name="evalue_list"
                                    value={eValue}
                                    onChange={handleOnChange}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                >
                                    {[1, 0.001, 1e-5, 1e-6, 1e-10, 1e-30, 1e-50, 1e-100].map((a, index) => (
                                        <MenuItem value={a} key={index}>
                                            {a}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={2} sx={{ mb: '18px' }}>
                        <FormControlLabel control={<Checkbox />} label="Word Size:" />
                    </Grid>
                    <Grid item xs={12} sm={10} sx={{ mb: '18px' }}>
                        <Box sx={{ minWidth: 266, pl: '16px' }}>
                            <FormControl fullWidth>
                                <Select
                                    name="word_size"
                                    value={wordSize}
                                    onChange={handleOnChange}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                >
                                    {[10, 11, 12].map((a, index) => (
                                        <MenuItem value={a} key={index + a}>
                                            {a}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={12} sx={{ mb: '18px', display: { md: 'flex', justifyContent: 'flex-end' } }}>
                        <Button sx={{ color: colors.secondary200, border: 1, m: '0px 3px' }} onClick={handleSubmitSearch}>
                            <IconSearch stroke={1.5} size="1.3rem" /> Search
                        </Button>
                        <Button sx={{ color: colors.warningSecondary, border: 1, m: '0px 3px' }} onClick={handleResetSearchFields}>
                            <IconRotate stroke={1.5} size="1.3rem" /> Reset
                        </Button>
                    </Grid>
                </Grid>
            </FormGroup>
        </Paper>
    );
};
AdvancedSearch.propTypes = {
    handleSubmitSearch: PropTypes.func,
    handleResetSearchFields: PropTypes.func,
    displayXs: PropTypes.string
};
export default AdvancedSearch;
