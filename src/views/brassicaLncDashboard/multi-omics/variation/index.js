// material-ui
import { Grid } from '@mui/material';

// project imports
import { gridSpacing } from 'store/constant';

// ==============================|| BrassicaLnc Multi-Omics/Variation ||============================== //

function Variation() {
    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                Variation
            </Grid>
        </Grid>
    );
}

export default Variation;
