import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
    SEARCH_BY_EXPRESSION_QUERY_GROUP_SET,
    SEARCH_BY_EXPRESSION_QUERY_RANGE_START_SET,
    SEARCH_BY_EXPRESSION_QUERY_RANGE_END_SET
} from 'store/actions';

// material-ui
import { Box, Grid, FormGroup, FormControlLabel, MenuItem, Select, FormControl, Paper } from '@mui/material';
import { IconRotate, IconSearch } from '@tabler/icons';

// ui-components
import Input from 'ui-component/Input';
import Checkbox from 'ui-component/Checkbox';

// styles
import colors from 'assets/scss/_themes-vars.module.scss';
import Button from 'ui-component/Button';

const AdvancedSearch = ({ displayXs, handleSubmitSearch, handleResetSearchFields }) => {
    const { queries } = useSelector((state) => state.search.searchByExpression);

    const dispatch = useDispatch();

    const handleOnChange = (event) => {
        switch (event.target.id || event.target.name) {
            case 'input-advanced-group-for-query':
                dispatch({ type: SEARCH_BY_EXPRESSION_QUERY_GROUP_SET, groupForExpressionSearch: event.target.value });
                break;
            case 'input-advanced-range-start':
                dispatch({
                    type: SEARCH_BY_EXPRESSION_QUERY_RANGE_START_SET,
                    rangeStartForExpressionSearch: event.target.value.replace(/[^\d,]/g, '')
                });
                break;
            case 'input-advanced-range-end':
                dispatch({
                    type: SEARCH_BY_EXPRESSION_QUERY_RANGE_END_SET,
                    rangeEndForExpressionSearch: event.target.value.replace(/[^\d,]/g, '')
                });
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
                        <FormControlLabel control={<Checkbox />} label="Expression:" />
                    </Grid>
                    <Grid item xs={12} sm={10} sx={{ mb: '18px' }}>
                        <Box sx={{ minWidth: 266, pl: '16px' }}>
                            <FormControl fullWidth>
                                <Select
                                    name="input-advanced-group-for-query"
                                    value={queries.group}
                                    onChange={handleOnChange}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                >
                                    <MenuItem id="input-advanced-group-for-query" value="chemical">
                                        chemical
                                    </MenuItem>
                                    <MenuItem value="abiotic">abiotic</MenuItem>
                                    <MenuItem value="developmental">developmental</MenuItem>
                                    <MenuItem value="genetics">genetics</MenuItem>
                                    <MenuItem value="biotic">biotic</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={2} sx={{ mb: '18px' }}>
                        <FormControlLabel control={<Checkbox />} label="Range:" />
                    </Grid>
                    <Grid item xs={12} sm={10} sx={{ mb: '18px', display: { md: 'flex', justifyContent: 'flex-start' } }}>
                        <Input
                            id="input-advanced-range-start"
                            value={queries.range.start}
                            onChange={handleOnChange}
                            placeholder="Range Start"
                            aria-describedby="range-start-helper-text"
                            inputProps={{ 'aria-label': 'weight' }}
                        />
                        <p>to</p>
                        <Input
                            id="input-advanced-range-end"
                            value={queries.range.end}
                            onChange={handleOnChange}
                            placeholder="Range End"
                            aria-describedby="range-end-helper-text"
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
