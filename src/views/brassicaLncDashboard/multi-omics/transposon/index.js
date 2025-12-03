// material-ui
import { Grid } from '@mui/material';

// project imports
import { gridSpacing } from 'store/constant';

// ==============================|| BrassicaLnc Multi-Omics/Transposon ||============================== //

function Transposon() {
    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12} display="flex" justifyContent="center">
                <h2>Comming Soon in BrassicaLnc V 2.0.0</h2>
            </Grid>
        </Grid>
    );
}

export default Transposon;
