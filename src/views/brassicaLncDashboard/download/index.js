import colors from 'assets/scss/_themes-vars.module.scss';
import Stack from '@mui/material/Stack';
import Button from 'ui-component/Button';

import api from 'routes/api.json';
import { Grid } from '@mui/material';

function Downloads() {
    return (
        <>
            <h1 style={{ color: colors.secondary800 }}>Downloads</h1>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={12}>
                    <h3 style={{ color: colors.secondary800 }}>General</h3>
                </Grid>
                <Grid item xs={6}>
                    <h4>1. BrassicaLnc lncRNA expression (FPKM) file</h4>
                </Grid>
                <Grid item xs={6}>
                    <Button onClick={() => window.open(`${api.mainURL}/download/?file=fpkm-lnc`, '_blank')}>Download</Button>
                </Grid>
                <Grid item xs={6}>
                    <h4>2. BrassicaLnc lncRNA information file</h4>
                </Grid>
                <Grid item xs={6}>
                    <Button onClick={() => window.open(`${api.mainURL}/download/?file=database-lnc`, '_blank')}>Download</Button>
                </Grid>
                <Grid item xs={6}>
                    <h4>3. BrassicaLnc lncRNA sequence file</h4>
                </Grid>
                <Grid item xs={6}>
                    <Button onClick={() => window.open(`${api.mainURL}/download/?file=fasta-lnc`, '_blank')}>Download</Button>
                </Grid>
                <Grid item xs={6}>
                    <h4>4. BrassicaLnc lncRNA gft file</h4>
                </Grid>
                <Grid item xs={6}>
                    <Button onClick={() => window.open(`${api.mainURL}/download/?file=gtf-lnc`, '_blank')}>Download</Button>
                </Grid>
                <Grid item xs={12}>
                    <h3 style={{ color: colors.secondary800 }}>Abiotic</h3>
                </Grid>
                <Grid item xs={6}>
                    <h4>5. BrassicaLnc lncRNA abiotic group expression (FPKM) file</h4>
                </Grid>
                <Grid item xs={6}>
                    <Button onClick={() => window.open(`${api.mainURL}/download/?file=abiotic-lnc-fpkm`, '_blank')}>Download</Button>
                </Grid>
                <Grid item xs={6}>
                    <h4>6. BrassicaLnc lncRNA abiotic group information file</h4>
                </Grid>
                <Grid item xs={6}>
                    <Button onClick={() => window.open(`${api.mainURL}/download/?file=abiotic-lnc-db`, '_blank')}>Download</Button>
                </Grid>
                <Grid item xs={12}>
                    <h3 style={{ color: colors.secondary800 }}>Biotic</h3>
                </Grid>
                <Grid item xs={6}>
                    <h4>7. BrassicaLnc lncRNA biotic group expression (FPKM) file</h4>
                </Grid>
                <Grid item xs={6}>
                    <Button onClick={() => window.open(`${api.mainURL}/download/?file=biotic-lnc-fpkm`, '_blank')}>Download</Button>
                </Grid>
                <Grid item xs={6}>
                    <h4>8. BrassicaLnc lncRNA biotic group information file</h4>
                </Grid>
                <Grid item xs={6}>
                    <Button onClick={() => window.open(`${api.mainURL}/download/?file=biotic-lnc-db`, '_blank')}>Download</Button>
                </Grid>
                <Grid item xs={12}>
                    <h3 style={{ color: colors.secondary800 }}>Chemical</h3>
                </Grid>
                <Grid item xs={6}>
                    <h4>9. BrassicaLnc lncRNA chemical group expression (FPKM) file</h4>
                </Grid>
                <Grid item xs={6}>
                    <Button onClick={() => window.open(`${api.mainURL}/download/?file=chemical-lnc-fpkm`, '_blank')}>Download</Button>
                </Grid>
                <Grid item xs={6}>
                    <h4>10. BrassicaLnc lncRNA chemical group information file</h4>
                </Grid>
                <Grid item xs={6}>
                    <Button onClick={() => window.open(`${api.mainURL}/download/?file=chemical-lnc-db`, '_blank')}>Download</Button>
                </Grid>
                <Grid item xs={12}>
                    <h3 style={{ color: colors.secondary800 }}>Developmental</h3>
                </Grid>
                <Grid item xs={6}>
                    <h4>11. BrassicaLnc lncRNA developmental group expression (FPKM) file</h4>
                </Grid>
                <Grid item xs={6}>
                    <Button onClick={() => window.open(`${api.mainURL}/download/?file=developmental-lnc-fpkm`, '_blank')}>Download</Button>
                </Grid>
                <Grid item xs={6}>
                    <h4>12. BrassicaLnc lncRNA developmental group information file</h4>
                </Grid>
                <Grid item xs={6}>
                    <Button onClick={() => window.open(`${api.mainURL}/download/?file=developmental-lnc-db`, '_blank')}>Download</Button>
                </Grid>
                <Grid item xs={12}>
                    <h3 style={{ color: colors.secondary800 }}>Genetic</h3>
                </Grid>
                <Grid item xs={6}>
                    <h4>13. BrassicaLnc lncRNA genetic group expression (FPKM) file</h4>
                </Grid>
                <Grid item xs={6}>
                    <Button onClick={() => window.open(`${api.mainURL}/download/?file=genetics-lnc-fpkm`, '_blank')}>Download</Button>
                </Grid>
                <Grid item xs={6}>
                    <h4>14. BrassicaLnc lncRNA genetic group information file</h4>
                </Grid>
                <Grid item xs={6}>
                    <Button onClick={() => window.open(`${api.mainURL}/download/?file=genetics-lnc-db`, '_blank')}>Download</Button>
                </Grid>
                <Grid item xs={12}>
                    <h3 style={{ color: colors.secondary800 }}>Multi-Omics</h3>
                </Grid>
                <Grid item xs={6}>
                    <h4>15. Downstream genes description file </h4>
                </Grid>
                <Grid item xs={6}>
                    <Button onClick={() => window.open(`${api.mainURL}/download/?file=down-desc`, '_blank')}>Download</Button>
                </Grid>
                <Grid item xs={6}>
                    <h4>16. BrassicaLnc LncTar Downstream genes file </h4>
                </Grid>
                <Grid item xs={6}>
                    <Button onClick={() => window.open(`${api.mainURL}/download/?file=down-tar`, '_blank')}>Download</Button>
                </Grid>
                <Grid item xs={6}>
                    <h4>17. Upstream genes description file </h4>
                </Grid>
                <Grid item xs={6}>
                    <Button onClick={() => window.open(`${api.mainURL}/download/?file=up-desc`, '_blank')}>Download</Button>
                </Grid>
                <Grid item xs={6}>
                    <h4>18. BrassicaLnc LncTar Upstream genes file </h4>
                </Grid>
                <Grid item xs={6}>
                    <Button onClick={() => window.open(`${api.mainURL}/download/?file=up-tar`, '_blank')}>Download</Button>
                </Grid>
            </Grid>
        </>
    );
}

export default Downloads;
