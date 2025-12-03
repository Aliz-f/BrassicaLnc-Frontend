import { useState } from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Box } from '@mui/material';
import TargetUpgene from './tabs/TargetUpgene';
import TargetDowngene from './tabs/TargetDowngene';

function TargetPage() {
    const [value, setValue] = useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <>
            {' '}
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange}>
                        <Tab label="Downstream target genes" value="1" />
                        <Tab label=" Upstream target genes" value="2" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <TargetDowngene />
                </TabPanel>
                <TabPanel value="2">
                    <TargetUpgene />
                </TabPanel>
            </TabContext>
        </>
    );
}

export default TargetPage;
