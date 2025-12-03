/* eslint-disable no-unused-expressions */
/* eslint-disable react/destructuring-assignment */
import { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import api from 'routes/api.json';
import { toast } from 'react-toastify';

import { IconAdjustmentsHorizontal, IconRotate, IconSearch, IconX } from '@tabler/icons';

import { shouldForwardProp } from '@mui/system';
import { useTheme, styled } from '@mui/material/styles';
import { Avatar, ButtonBase, Box, TextField } from '@mui/material';
import colors from 'assets/scss/_themes-vars.module.scss';
import AdvanceSearch from './AdvanceSearch';

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
export default function SearchSmallRna({ searchQuerys, ...props }) {
    const theme = useTheme();

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [age, setAge] = useState('');
    // const [Data, setData] = useState([]);
    const [showBox, setShowBox] = useState(false);

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    const handleAdvanceSearchButton = () => {
        setShowBox(!showBox);
    };

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'start',
                    alignContent: 'center',
                    borderRadius: '15px'
                }}
            >
                <FormControl sx={{ m: 1, minWidth: 350 }}>
                    <TextField
                        onChange={(e) => {
                            setAge(e.target.value);
                        }}
                        value={age}
                        required
                        id="outlined-number"
                        label="LncRNA ID | Pre-miRNA"
                        type="Text"
                        // sx={{ width: '90%' }}
                    />
                </FormControl>
                <ButtonBase sx={{ borderRadius: '12px', mr: '3px' }} onClick={() => props.handleSelectSearch(age)}>
                    <HeaderAvatarStyle variant="rounded">
                        <IconSearch stroke={1.5} size="1.3rem" />
                    </HeaderAvatarStyle>
                </ButtonBase>
                <ButtonBase sx={{ borderRadius: '12px' }} onClick={handleAdvanceSearchButton}>
                    <HeaderAvatarStyle variant="rounded">
                        <IconAdjustmentsHorizontal stroke={1.5} size="1.3rem" />
                    </HeaderAvatarStyle>
                </ButtonBase>
                <ButtonBase
                    sx={{
                        ml: '3px'
                    }}
                    onClick={() => {
                        // eslint-disable-next-line react/prop-types, no-sequences
                        props.handleSelectSearch(''), setAge('');
                    }}
                >
                    <HeaderAvatarStyle
                        variant="rounded"
                        sx={{
                            background: colors.warningMain,
                            color: colors.warningDark,
                            '&:hover': {
                                background: colors.warningDark,
                                color: theme.palette.orange.light
                            }
                        }}
                    >
                        <IconRotate stroke={1.5} size="1.3rem" />
                    </HeaderAvatarStyle>
                </ButtonBase>
            </Box>
            {showBox && <AdvanceSearch searchQuerys={searchQuerys} />}
        </>
    );
}
