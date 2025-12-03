// material-ui
import { Grid } from '@mui/material';

// project imports
import { gridSpacing } from 'store/constant';

// ==============================|| BrassicaLnc Search ||============================== //

function Search() {
    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                Search
            </Grid>
        </Grid>
    );
}

export default Search;
