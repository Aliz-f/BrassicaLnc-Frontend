import { OutlinedInput } from '@mui/material';
import { styled } from '@mui/material/styles';
import { shouldForwardProp } from '@mui/system';

const InputStyle = styled(OutlinedInput, { shouldForwardProp })(({ theme }) => ({
    width: 266,
    marginLeft: 16,
    marginRight: 16,
    paddingLeft: 16,
    paddingRight: 16,
    '& input': {
        background: 'transparent !important',
        paddingLeft: '4px !important'
    },
    [theme.breakpoints.down('lg')]: {
        width: 250
    },
    [theme.breakpoints.down('md')]: {
        width: '100%',
        marginLeft: 4,
        background: '#fff'
    }
}));

function Input({ ...props }) {
    return <InputStyle {...props}>{props.children}</InputStyle>;
}

export default Input;
