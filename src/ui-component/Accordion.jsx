import PropTypes from 'prop-types';

// MUI imports
import { Accordion as MUIAccordion, AccordionSummary as MUIAccordionSummary, AccordionDetails as MUIAccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import { shouldForwardProp } from '@mui/system';
import colors from 'assets/scss/_themes-vars.module.scss';

const AccordionStyle = styled(MUIAccordion, { shouldForwardProp })(({ theme }) => ({
    // border: `1px solid ${colors.secondaryMain}`,
    marginBottom: '36px',
    borderRadius: '25px',
    '&:not(:last-child)': {
        borderBottom: 0
    },
    '&:before': {
        display: 'none'
    }
}));
const AccordionSummaryStyle = styled(MUIAccordionSummary, { shouldForwardProp })(({ theme }) => ({
    color: colors.secondaryMain,
    borderRadius: '6px',
    backgroundColor: colors.secondaryLight,
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)'
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1)
    }
}));
const AccordionDetailsStyle = styled(MUIAccordionDetails, { shouldForwardProp })(({ theme }) => ({
    color: colors.grey700,
    padding: theme.spacing(2),
    marginBottom: '36px',
    border: `1px solid ${colors.secondary200}`,
    borderRadius: '6px',
    marginTop: '6px'
}));

function SingleAccordion({ accordionData, children }) {
    return (
        <>
            <AccordionStyle defaultExpanded={Boolean(accordionData.defaultExpanded)}>
                <AccordionSummaryStyle
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`${accordionData.title}-content`}
                    id={`${accordionData.title}-header`}
                >
                    <h2>{accordionData.title}</h2>
                </AccordionSummaryStyle>
                <AccordionDetailsStyle>{children}</AccordionDetailsStyle>
            </AccordionStyle>
        </>
    );
}

SingleAccordion.propTypes = { accordionData: PropTypes.object, children: PropTypes.node };

export default SingleAccordion;
