/* eslint-disable camelcase */
/* eslint-disable no-undef */
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { IconAdjustmentsHorizontal, IconRotate, IconSearch, IconX } from '@tabler/icons';
import Paper from '@mui/material/Paper';
import { Button, Grid } from '@mui/material';
import colors from 'assets/scss/_themes-vars.module.scss';
import { useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import axios from 'axios';
import api from 'routes/api.json';

function AdvanceSearch({ searchQuerys }) {
    const [reload, setReload] = useState(false);
    const [searchItem, setSearchItem] = useState({
        expectation: {
            partOne: '',
            partTwo: ''
        },
        binding_locus: {
            partOne: '',
            partTwo: ''
        },
        inhibition: '',
        search: ''
    });
    const [Data, setData] = useState([]);

    const getLncRnaId = async () => {
        // eslint-disable-next-line prettier/prettier
        await axios
            .get(`${api.mainURL}/lncRNA/small_rna_target/ids/`)
            .then(async (res) => {
                // console.log(res);
                await setData(res.data);
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
    };

    useEffect(() => {
        getLncRnaId();
    }, []);
    const submithandler = () => {
        searchQuerys(searchItem);
    };
    const handleResetSearchFields = () => {
        setSearchItem({
            expectation: {
                partOne: '',
                partTwo: ''
            },
            binding_locus: {
                partOne: '',
                partTwo: ''
            },
            inhibition: '',
            search: ''
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
                        <p style={{ textAlign: 'center' }}>inhibition</p>
                        <TextField
                            onChange={(e) => {
                                setSearchItem({
                                    ...searchItem,
                                    inhibition: e.target.value
                                });
                            }}
                            value={searchItem.inhibition}
                            required
                            id="outlined-number"
                            label="inhibition"
                            type="Text"
                        />
                    </Paper>
                    <Paper elevation={3}>
                        <p style={{ textAlign: 'center' }}>expectation</p>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <TextField
                                onChange={(e) => {
                                    setSearchItem({
                                        ...searchItem,
                                        expectation: { ...searchItem.expectation, partOne: e.target.value }
                                    });
                                }}
                                required
                                id="outlined-number"
                                label="Number"
                                type="number"
                                value={searchItem.expectation.partOne}
                            />
                            <span>to</span>
                            <TextField
                                onChange={(e) => {
                                    setSearchItem({
                                        ...searchItem,
                                        expectation: { ...searchItem.expectation, partTwo: e.target.value }
                                    });
                                }}
                                required
                                id="outlined-number"
                                label="Number"
                                type="number"
                                value={searchItem.expectation.partTwo}
                            />
                        </Box>
                    </Paper>
                    <Paper elevation={3}>
                        <p style={{ textAlign: 'center' }}>binding_locus</p>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <TextField
                                onChange={(e) => {
                                    setSearchItem({
                                        ...searchItem,
                                        binding_locus: { ...searchItem.binding_locus, partOne: e.target.value }
                                    });
                                }}
                                required
                                id="outlined-number"
                                label="Number"
                                type="number"
                                value={searchItem.binding_locus.partOne}
                            />
                            <span>to</span>
                            <TextField
                                onChange={(e) => {
                                    setSearchItem({
                                        ...searchItem,
                                        binding_locus: { ...searchItem.binding_locus, partTwo: e.target.value }
                                    });
                                }}
                                required
                                id="outlined-number"
                                label="Number"
                                type="number"
                                value={searchItem.binding_locus.partTwo}
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
                    <Paper sx={{ p: 2, width: '40%' }} elevation={3}>
                        <p style={{ textAlign: 'center' }}>miRNA ID </p>
                        <Select
                            sx={{ width: '100%' }}
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={searchItem.search}
                            onChange={(e) => {
                                setSearchItem({
                                    ...searchItem,
                                    search: e.target.value
                                });
                            }}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {Data && Data.map((item) => <MenuItem value={item}>{item}</MenuItem>)}
                        </Select>
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
