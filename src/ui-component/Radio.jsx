import { Radio as MUIRadio } from '@mui/material';
import { styled } from '@mui/material/styles';
import { shouldForwardProp } from '@mui/system';

import colors from 'assets/scss/_themes-vars.module.scss';

const RadioStyle = styled(MUIRadio, { shouldForwardProp })(({ theme }) => ({
    color: colors.secondary200,
    '&.Mui-checked': {
        color: colors.secondaryMain
    }
}));

function Radio({ ...props }) {
    return <RadioStyle {...props}>{props.children}</RadioStyle>;
}

export default Radio;
