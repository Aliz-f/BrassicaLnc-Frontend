import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
    TRANSCRIPT_SEARCH_QUERY_SET_CLASSIFICATION,
    TRANSCRIPT_SEARCH_QUERY_SET_LOCATION,
    TRANSCRIPT_SEARCH_QUERY_SET_LENGTH,
    TRANSCRIPT_SEARCH_QUERY_SET_EXON
} from 'store/actions';

// material-ui
import { Box, Grid, FormGroup, FormControlLabel, MenuItem, Select, FormControl, Paper } from '@mui/material';
import { IconAdjustmentsHorizontal, IconRotate, IconSearch, IconX } from '@tabler/icons';

// ui-components
import Input from 'ui-component/Input';
import Checkbox from 'ui-component/Checkbox';

// styles
import colors from 'assets/scss/_themes-vars.module.scss';
import Button from 'ui-component/Button';

const AdvancedSearch = ({ displayXs, handleSubmitSearch, handleResetSearchFields }) => {
    // values of advanced search fields
    const locationStartValue = useSelector((state) => state.transcrsipts.search.query.location.start);
    const locationEndtValue = useSelector((state) => state.transcrsipts.search.query.location.end);
    const classificationValue = useSelector((state) => state.transcrsipts.search.query.classification);
    const lengthStartValue = useSelector((state) => state.transcrsipts.search.query.length.start);
    const lengthEndValue = useSelector((state) => state.transcrsipts.search.query.length.end);
    const exonNumberStartValue = useSelector((state) => state.transcrsipts.search.query.exon.start);
    const exonNumberEndValue = useSelector((state) => state.transcrsipts.search.query.exon.end);

    const dispatch = useDispatch();

    const handleOnChange = (event) => {
        switch (event.target.id || event.target.name) {
            case 'input-advanced-location-start':
                dispatch({ type: TRANSCRIPT_SEARCH_QUERY_SET_LOCATION, location: { start: event.target.value, end: locationEndtValue } });
                break;
            case 'input-advanced-location-end':
                dispatch({ type: TRANSCRIPT_SEARCH_QUERY_SET_LOCATION, location: { start: locationStartValue, end: event.target.value } });
                break;
            case 'input-advanced-classification':
                dispatch({ type: TRANSCRIPT_SEARCH_QUERY_SET_CLASSIFICATION, classification: event.target.value });
                break;
            case 'input-advanced-length-start':
                dispatch({ type: TRANSCRIPT_SEARCH_QUERY_SET_LENGTH, length: { start: event.target.value, end: lengthEndValue } });
                break;
            case 'input-advanced-length-end':
                dispatch({ type: TRANSCRIPT_SEARCH_QUERY_SET_LENGTH, length: { start: lengthStartValue, end: event.target.value } });
                break;
            case 'input-advanced-exon-number-start':
                dispatch({ type: TRANSCRIPT_SEARCH_QUERY_SET_EXON, exon: { start: event.target.value, end: exonNumberEndValue } });
                break;
            case 'input-advanced-exon-number-end':
                dispatch({ type: TRANSCRIPT_SEARCH_QUERY_SET_EXON, exon: { start: exonNumberStartValue, end: event.target.value } });
                break;

            default:
                break;
        }
    };
    return (
        <Paper variant="outlined" sx={{ display: { xs: displayXs, md: 'block' }, m: '18px 18px 36px 18px', p: 1, border: '0' }}>
            <FormGroup>
                <Grid container alignItems="center" justifyContent="space-between">
                    {/* <Grid item xs={12} sm={2} sx={{ mb: '18px' }}>
                        <FormControlLabel control={<Checkbox />} label="Chromosome:" />
                    </Grid>
                    <Grid item xs={12} sm={10} sx={{ mb: '18px' }}>
                        <Input
                            id="input-advanced-chromosome"
                            value={value}
                            onChange={handleOnChange}
                            placeholder="Enter Chromosome"
                            aria-describedby="chromosome-helper-text"
                            inputProps={{ 'aria-label': 'weight' }}
                        />
                    </Grid> */}
                    <Grid item xs={12} sm={2} sx={{ mb: '18px' }}>
                        <FormControlLabel control={<Checkbox />} label="Location:" />
                    </Grid>
                    <Grid item xs={12} sm={10} sx={{ mb: '18px', display: { md: 'flex', justifyContent: 'flex-start' } }}>
                        <Input
                            id="input-advanced-location-start"
                            value={locationStartValue}
                            onChange={handleOnChange}
                            placeholder="Location Start"
                            aria-describedby="location-start-helper-text"
                            inputProps={{ 'aria-label': 'weight' }}
                        />
                        <p>to</p>
                        <Input
                            id="input-advanced-location-end"
                            value={locationEndtValue}
                            onChange={handleOnChange}
                            placeholder="Location End"
                            aria-describedby="location-end-helper-text"
                            inputProps={{ 'aria-label': 'weight' }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={2} sx={{ mb: '18px' }}>
                        <FormControlLabel control={<Checkbox />} label="Classification:" />
                    </Grid>
                    <Grid item xs={12} sm={10} sx={{ mb: '18px' }}>
                        <Box sx={{ minWidth: 266, pl: '16px' }}>
                            <FormControl fullWidth>
                                <Select
                                    name="input-advanced-classification"
                                    value={classificationValue}
                                    onChange={handleOnChange}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                >
                                    <MenuItem value="">
                                        <em>default = all</em>
                                    </MenuItem>
                                    <MenuItem id="input-advanced-classification" value="i">
                                        i
                                    </MenuItem>
                                    <MenuItem value="o">o</MenuItem>
                                    <MenuItem value="u">u</MenuItem>
                                    <MenuItem value="x">x</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={2} sx={{ mb: '18px' }}>
                        <FormControlLabel control={<Checkbox />} label="Length:" />
                    </Grid>
                    <Grid item xs={12} sm={10} sx={{ mb: '18px', display: { md: 'flex', justifyContent: 'flex-start' } }}>
                        <Input
                            id="input-advanced-length-start"
                            value={lengthStartValue}
                            onChange={handleOnChange}
                            placeholder="Length Start"
                            aria-describedby="length-start-helper-text"
                            inputProps={{ 'aria-label': 'weight' }}
                        />
                        <p>to</p>
                        <Input
                            id="input-advanced-length-end"
                            value={lengthEndValue}
                            onChange={handleOnChange}
                            placeholder="Length End"
                            aria-describedby="length-end-helper-text"
                            inputProps={{ 'aria-label': 'weight' }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={2} sx={{ mb: '18px' }}>
                        <FormControlLabel control={<Checkbox />} label="Exon Number:" />
                    </Grid>
                    <Grid item xs={12} sm={10} sx={{ mb: '18px', display: { md: 'flex', justifyContent: 'flex-start' } }}>
                        <Input
                            id="input-advanced-exon-number-start"
                            value={exonNumberStartValue}
                            onChange={handleOnChange}
                            placeholder="Exon Number Start"
                            aria-describedby="exon-number-start-helper-text"
                            inputProps={{ 'aria-label': 'weight' }}
                        />
                        <p>to</p>
                        <Input
                            id="input-advanced-exon-number-end"
                            value={exonNumberEndValue}
                            onChange={handleOnChange}
                            placeholder="Exon Number End"
                            aria-describedby="exon-number-end-helper-text"
                            inputProps={{ 'aria-label': 'weight' }}
                        />
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
