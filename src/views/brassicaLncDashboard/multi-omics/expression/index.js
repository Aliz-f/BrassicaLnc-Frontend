// material-ui
import { Grid } from '@mui/material';

// project imports
import { gridSpacing } from 'store/constant';

// ==============================|| BrassicaLnc Multi-Omics/Expression ||============================== //

function Expression() {
    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                Expression
            </Grid>
        </Grid>
    );
}

export default Expression;
