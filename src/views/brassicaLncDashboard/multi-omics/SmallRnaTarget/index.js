import { useState } from 'react';
import Tabs from 'ui-component/Tabs';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Box } from '@mui/material';
import Etms from './Etms';
import SmallRnaTarget from './SmallRnaTarget';

function smallRnaTarge() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange}>
                            <Tab label="Small RNA Target" value="1" />
                            <Tab sx={{ textTransform: 'none' }} label=" eTMs" value="2" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <SmallRnaTarget />
                    </TabPanel>
                    <TabPanel value="2">
                        <Etms />
                    </TabPanel>
                </TabContext>
            </Box>
        </>
    );
}

export default smallRnaTarge;
