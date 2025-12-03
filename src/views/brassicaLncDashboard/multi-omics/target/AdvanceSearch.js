/* eslint-disable camelcase */
/* eslint-disable no-undef */
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { IconAdjustmentsHorizontal, IconRotate, IconSearch, IconX } from '@tabler/icons';
import Paper from '@mui/material/Paper';
import { Button, Grid } from '@mui/material';
import colors from 'assets/scss/_themes-vars.module.scss';
import { useState, useEffect } from 'react';

function AdvanceSearch({ searchQuerys }) {
    const [reload, setReload] = useState(false);
    const [searchItem, setSearchItem] = useState({
        len_query: {
            partOne: '',
            partTwo: ''
        },
        dg: {
            partOne: '',
            partTwo: ''
        },
        ndg: {
            partOne: '',
            partTwo: ''
        },
        position_query: {
            partOne: '',
            partTwo: ''
        },
        position_target: {
            partOne: '',
            partTwo: ''
        },
        len_target: {
            partOne: '',
            partTwo: ''
        },
        target: ''
    });
    const submithandler = () => {
        searchQuerys(searchItem);
    };
    const handleResetSearchFields = () => {
        setSearchItem({
            len_query: {
                partOne: '',
                partTwo: ''
            },
            dg: {
                partOne: '',
                partTwo: ''
            },
            ndg: {
                partOne: '',
                partTwo: ''
            },
            position_query: {
                partOne: '',
                partTwo: ''
            },
            position_target: {
                partOne: '',
                partTwo: ''
            },
            len_target: {
                partOne: '',
                partTwo: ''
            },
            target: ''
        });
        setReload(true);
    };
    useEffect(() => {
        if (reload) searchQuerys(searchItem);
    }, [searchItem]);
    return (
        <>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1 },
                    border: '1px solid black',
                    p: 2,
                    borderRadius: '15px',
                    gap: '5px'
                }}
                noValidate
                autoComplete="off"
            >
                <Box
                    sx={{
                        '& .MuiTextField-root': { m: 1 },
                        display: 'flex',
                        gap: '15px',
                        p: 1
                    }}
                >
                    <Paper elevation={3}>
                        <p style={{ textAlign: 'center' }}>Target</p>
                        <TextField
                            onChange={(e) => {
                                setSearchItem({
                                    ...searchItem,
                                    target: e.target.value
                                });
                            }}
                            value={searchItem.target}
                            required
                            id="outlined-number"
                            label="Target ID"
                            type="Text"
                        />
                    </Paper>
                    <Paper elevation={3}>
                        <p style={{ textAlign: 'center' }}>Length Query</p>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <TextField
                                onChange={(e) => {
                                    setSearchItem({
                                        ...searchItem,
                                        len_query: { ...searchItem.len_query, partOne: e.target.value }
                                    });
                                }}
                                required
                                id="outlined-number"
                                label="Number"
                                type="number"
                                value={searchItem.len_query.partOne}
                            />
                            <span>to</span>
                            <TextField
                                onChange={(e) => {
                                    setSearchItem({
                                        ...searchItem,
                                        len_query: { ...searchItem.len_query, partTwo: e.target.value }
                                    });
                                }}
                                required
                                id="outlined-number"
                                label="Number"
                                type="number"
                                value={searchItem.len_query.partTwo}
                            />
                        </Box>
                    </Paper>
                    <Paper elevation={3}>
                        <p style={{ textAlign: 'center' }}>dG</p>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <TextField
                                onChange={(e) => {
                                    setSearchItem({
                                        ...searchItem,
                                        dg: { ...searchItem.dg, partOne: e.target.value }
                                    });
                                }}
                                required
                                id="outlined-number"
                                label="Number"
                                type="number"
                                value={searchItem.dg.partOne}
                            />
                            <span>to</span>
                            <TextField
                                onChange={(e) => {
                                    setSearchItem({
                                        ...searchItem,
                                        dg: { ...searchItem.dg, partTwo: e.target.value }
                                    });
                                }}
                                required
                                id="outlined-number"
                                label="Number"
                                type="number"
                                value={searchItem.dg.partTwo}
                            />
                        </Box>
                    </Paper>
                </Box>
                <Box
                    sx={{
                        '& .MuiTextField-root': { m: 1 },
                        display: 'flex',
                        gap: '15px',
                        p: 1
                    }}
                >
                    <Paper elevation={3}>
                        <p style={{ textAlign: 'center' }}>ndG</p>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <TextField
                                onChange={(e) => {
                                    setSearchItem({
                                        ...searchItem,
                                        ndg: { ...searchItem.ndg, partOne: e.target.value }
                                    });
                                }}
                                required
                                id="outlined-number"
                                label="Number"
                                type="number"
                                value={searchItem.ndg.partOne}
                            />
                            <span>to</span>
                            <TextField
                                onChange={(e) => {
                                    setSearchItem({
                                        ...searchItem,
                                        ndg: { ...searchItem.ndg, partTwo: e.target.value }
                                    });
                                }}
                                required
                                id="outlined-number"
                                label="Number"
                                type="number"
                                value={searchItem.ndg.partTwo}
                            />
                        </Box>
                    </Paper>
                    <Paper elevation={3}>
                        <p style={{ textAlign: 'center' }}>Position Query</p>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <TextField
                                onChange={(e) => {
                                    setSearchItem({
                                        ...searchItem,
                                        position_query: { ...searchItem.position_query, partOne: e.target.value }
                                    });
                                }}
                                required
                                id="outlined-number"
                                label="Number"
                                type="number"
                                value={searchItem.position_query.partOne}
                            />
                            <span>to</span>
                            <TextField
                                onChange={(e) => {
                                    setSearchItem({
                                        ...searchItem,
                                        position_query: { ...searchItem.position_query, partTwo: e.target.value }
                                    });
                                }}
                                required
                                id="outlined-number"
                                label="Number"
                                type="number"
                                value={searchItem.position_query.partTwo}
                            />
                        </Box>
                    </Paper>
                </Box>
                <Box
                    sx={{
                        '& .MuiTextField-root': { m: 1 },
                        display: 'flex',
                        gap: '15px',
                        p: 1
                    }}
                >
                    <Paper elevation={3}>
                        <p style={{ textAlign: 'center' }}>Position Target</p>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <TextField
                                onChange={(e) => {
                                    setSearchItem({
                                        ...searchItem,
                                        position_target: { ...searchItem.position_target, partOne: e.target.value }
                                    });
                                }}
                                required
                                id="outlined-number"
                                label="Number"
                                type="number"
                                value={searchItem.position_target.partOne}
                            />
                            <span>to</span>
                            <TextField
                                onChange={(e) => {
                                    setSearchItem({
                                        ...searchItem,
                                        position_target: { ...searchItem.position_target, partTwo: e.target.value }
                                    });
                                }}
                                required
                                id="outlined-number"
                                label="Number"
                                type="number"
                                value={searchItem.position_target.partTwo}
                            />
                        </Box>
                    </Paper>
                    <Paper elevation={3}>
                        <p style={{ textAlign: 'center' }}>Length Target</p>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <TextField
                                onChange={(e) => {
                                    setSearchItem({
                                        ...searchItem,
                                        len_target: { ...searchItem.len_target, partOne: e.target.value }
                                    });
                                }}
                                required
                                id="outlined-number"
                                label="Number"
                                type="number"
                                value={searchItem.len_target.partOne}
                            />
                            <span>to</span>
                            <TextField
                                onChange={(e) => {
                                    setSearchItem({
                                        ...searchItem,
                                        len_target: { ...searchItem.len_target, partTwo: e.target.value }
                                    });
                                }}
                                required
                                id="outlined-number"
                                label="Number"
                                type="number"
                                value={searchItem.len_target.partTwo}
                            />
                        </Box>
                    </Paper>
                </Box>
                <Grid item xs={12} sm={12} sx={{ mb: '18px', display: { md: 'flex', justifyContent: 'flex-end' } }}>
                    <Button sx={{ color: colors.secondary200, border: 1, m: '0px 3px' }} onClick={submithandler}>
                        <IconSearch stroke={1.5} size="1.3rem" /> Search
                    </Button>
                    <Button sx={{ color: colors.warningSecondary, border: 1, m: '0px 3px' }} onClick={handleResetSearchFields}>
                        <IconRotate stroke={1.5} size="1.3rem" /> Reset
                    </Button>
                </Grid>
            </Box>
        </>
    );
}

export default AdvanceSearch;
