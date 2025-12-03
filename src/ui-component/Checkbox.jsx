import { Checkbox as MUICheckbox } from '@mui/material';
import { styled } from '@mui/material/styles';
import { shouldForwardProp } from '@mui/system';

import colors from 'assets/scss/_themes-vars.module.scss';

const CheckboxStyle = styled(MUICheckbox, { shouldForwardProp })(({ theme }) => ({
    color: colors.secondary200,
    '&.Mui-checked': {
        color: colors.secondaryMain
    }
}));

function Checkbox({ ...props }) {
    return <CheckboxStyle {...props}>{props.children}</CheckboxStyle>;
}

export default Checkbox;
