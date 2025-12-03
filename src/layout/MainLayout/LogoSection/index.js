import { Link } from 'react-router-dom';

// material-ui
import { ButtonBase } from '@mui/material';

// project imports
import config from 'config';
import Logo from 'ui-component/Logo';
// eslint-disable-next-line import/no-cycle
import MainRoutes from '../../../routes/MainRoutes';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => (
    <ButtonBase disableRipple component={Link} to={MainRoutes.path}>
        <Logo />
    </ButtonBase>
);

export default LogoSection;
