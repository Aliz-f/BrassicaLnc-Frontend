import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Avatar, Box, ButtonBase, Card, Grid, InputAdornment, OutlinedInput, Popper } from '@mui/material';

// third-party
import PopupState, { bindPopper, bindToggle } from 'material-ui-popup-state';

// project imports
import {
    SET_TRANSCRIPTS_ADVANCED_SEARCH_TO_SHOW,
    TRANSCRIPT_SEARCH_QUERY_SET_TRANSCRIPT_ID,
    TRANSCRIPT_SEARCH_QUERY_SET_GENE_ID
} from 'store/actions';
import Transitions from 'ui-component/extended/Transitions';

// assets
import { IconAdjustmentsHorizontal, IconRotate, IconSearch, IconX } from '@tabler/icons';
import { shouldForwardProp } from '@mui/system';

import AdvancedSearch from './advancedSearch';

// styles
import colors from 'assets/scss/_themes-vars.module.scss';

const PopperStyle = styled(Popper, { shouldForwardProp })(({ theme }) => ({
    zIndex: 1100,
    width: '99%',
    top: '-55px !important',
    padding: '0 12px',
    [theme.breakpoints.down('sm')]: {
        padding: '0 10px'
    }
}));

const OutlineInputStyle = styled(OutlinedInput, { shouldForwardProp })(({ theme }) => ({
    width: 399,
    marginLeft: 16,
    paddingLeft: 16,
    paddingRight: 16,
    '& input': {
        background: 'transparent !important',
        paddingLeft: '4px !important'
    },
    [theme.breakpoints.down('lg')]: {
        width: 399
    },
    [theme.breakpoints.down('md')]: {
        width: '100%',
        marginLeft: 4,
        background: '#fff'
    }
}));

const HeaderAvatarStyle = styled(Avatar, { shouldForwardProp })(({ theme }) => ({
    ...theme.typography.commonAvatar,
    ...theme.typography.mediumAvatar,
    background: theme.palette.secondary.light,
    color: theme.palette.secondary.dark,
    '&:hover': {
        background: theme.palette.secondary.dark,
        color: theme.palette.secondary.light
    }
}));

// ==============================|| SEARCH INPUT - MOBILE||============================== //

const MobileSearch = ({ value, handleOnChange, popupState, dispatch, handleOnKeyPress, handleSubmitSearch, handleResetSearchFields }) => {
    const theme = useTheme();
    const showAdvancedSearch = useSelector((state) => state.transcrsipts.search.showAdvancedSearch);

    const handleAdvanceSearchButton = () => {
        dispatch({ type: SET_TRANSCRIPTS_ADVANCED_SEARCH_TO_SHOW, showAdvancedSearch: !showAdvancedSearch });
    };

    return (
        <>
            <OutlineInputStyle
                id="input-search-header"
                value={value}
                onChange={handleOnChange}
                onKeyPress={handleOnKeyPress}
                placeholder="Transcript ID | Gene ID"
                aria-describedby="search-helper-text"
                inputProps={{ 'aria-label': 'weight' }}
            />
        </>
    );
};

MobileSearch.propTypes = {
    value: PropTypes.string,
    handleOnChange: PropTypes.func,
    dispatch: PropTypes.func,
    handleOnKeyPress: PropTypes.func,
    handleSubmitSearch: PropTypes.func,
    handleResetSearchFields: PropTypes.func,
    popupState: PopupState
};

// ==============================|| SEARCH INPUT ||============================== //

const SearchSection = ({ handleSubmitSearch, handleResetSearchFields }) => {
    const theme = useTheme();

    const [value, setValue] = useState('');
    const showAdvancedSearch = useSelector((state) => state.transcrsipts.search.showAdvancedSearch);
    const dispatch = useDispatch();

    const handleAdvanceSearchButton = () => {
        dispatch({ type: SET_TRANSCRIPTS_ADVANCED_SEARCH_TO_SHOW, showAdvancedSearch: !showAdvancedSearch });
    };

    const handleOnChange = (event) => {
        setValue(event.target.value);
        if (event.target.value.indexOf('.') !== -1) {
            dispatch({ type: TRANSCRIPT_SEARCH_QUERY_SET_TRANSCRIPT_ID, transcriptId: event.target.value });
            dispatch({ type: TRANSCRIPT_SEARCH_QUERY_SET_GENE_ID, geneId: '' });
        } else if (event.target.value.indexOf('.') === -1) {
            dispatch({ type: TRANSCRIPT_SEARCH_QUERY_SET_GENE_ID, geneId: event.target.value });
            dispatch({ type: TRANSCRIPT_SEARCH_QUERY_SET_TRANSCRIPT_ID, transcriptId: '' });
        }
    };

    const handleOnKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSubmitSearch();
        }
    };
    return (
        <>
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                <MobileSearch
                    value={value}
                    handleOnChange={handleOnChange}
                    dispatch={dispatch}
                    handleOnKeyPress={handleOnKeyPress}
                    handleSubmitSearch={handleSubmitSearch}
                    handleResetSearchFields={handleResetSearchFields}
                />

                <AdvancedSearch
                    displayXs="block"
                    handleSubmitSearch={handleSubmitSearch}
                    handleResetSearchFields={handleResetSearchFields}
                />
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'block' }, mb: '18px' }}>
                <OutlineInputStyle
                    id="input-search-header"
                    value={value}
                    onChange={handleOnChange}
                    onKeyPress={handleOnKeyPress}
                    placeholder="Transcript ID | Gene ID"
                    aria-describedby="search-helper-text"
                    inputProps={{ 'aria-label': 'weight' }}
                />
            </Box>

            <AdvancedSearch displayXs="none" handleSubmitSearch={handleSubmitSearch} handleResetSearchFields={handleResetSearchFields} />
        </>
    );
};

SearchSection.propTypes = {
    handleSubmitSearch: PropTypes.func,
    handleResetSearchFields: PropTypes.func
};
export default SearchSection;
