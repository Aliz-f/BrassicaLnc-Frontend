import { Button as MUIButon } from '@mui/material';
import { styled } from '@mui/material/styles';
import { shouldForwardProp } from '@mui/system';

import colors from 'assets/scss/_themes-vars.module.scss';

const ButtonStyle = styled(MUIButon, { shouldForwardProp })(({ theme }) => ({
    color: colors.secondaryMain,
    marginRight: '6px',
    marginBottom: '6px'
}));

function Button({ ...props }) {
    return (
        <ButtonStyle sx={{ border: 1 }} {...props}>
            {props.children}
        </ButtonStyle>
    );
}

export default Button;
