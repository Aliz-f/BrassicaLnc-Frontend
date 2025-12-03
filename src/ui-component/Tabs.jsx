import PropTypes from 'prop-types';

import { Tabs as MUITabs, Tab, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { borderColor, shouldForwardProp } from '@mui/system';

import colors from 'assets/scss/_themes-vars.module.scss';
import { useState } from 'react';

const TabsStyle = styled(MUITabs, { shouldForwardProp })(({ theme }) => ({}));

const TabStyle = styled(Tab, { shouldForwardProp })(({ theme }) => ({
    color: colors.grey600,
    '&.Mui-selected': {
        color: colors.secondaryMain,
        fontWeight: theme.typography.fontWeightMedium
    }
}));

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography component="span">{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

export default function Tabs({ firstGroup, secondGroup, thirdGroup, fourthGroup, fifthGroup }) {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: colors.secondaryLight }}>
                <TabsStyle value={value} onChange={handleChange} aria-label="basic tabs example" variant="scrollable" scrollButtons="auto">
                    <TabStyle label="Abiotic" {...a11yProps(0)} />
                    <TabStyle label="Biotic" {...a11yProps(1)} />
                    <TabStyle label="Chemical" {...a11yProps(2)} />
                    <TabStyle label="Developmental" {...a11yProps(3)} />
                    <TabStyle label="Genetics" {...a11yProps(4)} />
                </TabsStyle>
            </Box>
            <TabPanel value={value} index={0}>
                {firstGroup}
            </TabPanel>
            <TabPanel value={value} index={1}>
                {secondGroup}
            </TabPanel>
            <TabPanel value={value} index={2}>
                {thirdGroup}
            </TabPanel>
            <TabPanel value={value} index={3}>
                {fourthGroup}
            </TabPanel>
            <TabPanel value={value} index={4}>
                {fifthGroup}
            </TabPanel>
        </Box>
    );
}

Tabs.propTypes = {
    firstGroup: PropTypes.node,
    secondGroup: PropTypes.node,
    thirdGroup: PropTypes.node,
    fourthGroup: PropTypes.node,
    fifthGroup: PropTypes.node
};
