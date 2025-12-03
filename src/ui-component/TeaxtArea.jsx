import { TextareaAutosize } from '@mui/material';
import { styled } from '@mui/material/styles';
import { shouldForwardProp } from '@mui/system';
import colors from 'assets/scss/_themes-vars.module.scss';

const TextAreaStyle = styled(TextareaAutosize, { shouldForwardProp })(({ theme }) => ({
    marginLeft: 16,
    marginRight: 16,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 12
}));

function TextArea({ ...props }) {
    return <TextAreaStyle {...props}>{props.children}</TextAreaStyle>;
}

export default TextArea;
