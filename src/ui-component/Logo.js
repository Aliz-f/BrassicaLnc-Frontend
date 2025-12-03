// material-ui
import { useTheme } from '@mui/material/styles';
import { IconDatabase } from '@tabler/icons';

import colors from 'assets/scss/_themes-vars.module.scss';

// ==============================|| Brassica Lnc Logo ||============================== //

const Logo = () => {
    const theme = useTheme();

    return (
        <>
            <h2 style={{ color: colors.secondaryDark }}>BrassicaLnc</h2>
        </>
    );
};

export default Logo;
