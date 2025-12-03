import { Grid, Card, CardMedia, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import colors from 'assets/scss/_themes-vars.module.scss';
import { gridSpacing } from 'store/constant';

import logo from 'assets/images/logo-en.png';
import { IconCode, IconCoffee, IconHeartHandshake } from '@tabler/icons';
import { useEffect } from 'react';

function Footer() {
    const theme = useTheme();
    // useEffect(() => {
    //     const script = document.createElement('script');
    //
    //     script.src = '//rf.revolvermaps.com/0/0/6.js?i=5yst7mokp2c&amp;m=0&amp;c=ff0000&amp;cr1=ffffff&amp;f=arial&amp;l=1&amp;s=150';
    //     script.async = true;
    //
    //     const footerMap = document.getElementById('footerMap');
    //
    //     footerMap.appendChild(script);
    //
    //     return () => {
    //         footerMap.removeChild(script);
    //     };
    // }, []);

    return (
        <>
            <Box
                sx={{
                    marginTop: '6px',
                    display: 'flex',
                    padding: '14px',
                    background: theme.palette.background.default,
                    textAlign: 'center',
                    color: colors.secondaryMain,
                    borderRadius: '10px',
                    flexDirection: 'column'
                }}
            >
                <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                        <Box>
                            <CardMedia sx={{ width: '70%' }} component="img" image={logo} alt="logo-en" />
                        </Box>
                        <Box>Department of Biotechnology, College of Agriculture, Isfahan University of Technology, Isfahan, Iran</Box>
                    </Box>
                    <Box id="footerMap" style={{ width: '190px' }}>
                        {/* map section */}
                    </Box>
                </Box>

                <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <IconCode stroke="1" />
                        with
                        <IconHeartHandshake stroke="1" color="red" />
                        by
                        {/*<b style={{ margin: '0px 6px' }}>Alireza Fadaei</b>*/}
                        <a
                            href="https://arfadaei.ir"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ margin: '0px 6px', fontWeight: 'bold' }}
                        >
                            Alireza Fadaei
                        </a>
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default Footer;
