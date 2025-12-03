// material-ui
import { Grid, Card, CardMedia } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/system';

// project imports
import { gridSpacing } from 'store/constant';

import colors from 'assets/scss/_themes-vars.module.scss';
import logo from 'assets/images/home/LncRNAs_Pipeline-1.png';
import MainCard from 'ui-component/cards/MainCard';
import { IconChartBar, IconDna2 } from '@tabler/icons';
// ==============================|| BrassicHome ||============================== //

const H1 = styled('h1')(({ theme }) => ({
    color: colors.secondary800,
    textAlign: 'center',
    marginBottom: '66px',
    lineHeight: '160%'
}));

const H2 = styled('h2')(({ theme }) => ({
    color: colors.secondary800,
    lineHeight: '160%'
}));

const TextContainer = styled('p')(({ theme }) => ({
    lineHeight: '160%',
    fontSize: 'max(min(18px, 1.2em), 14px)',
    fontWeight: 'normal',
    color: '#3D3D3D'
}));

const Highligther = styled('mark')(({ theme }) => ({
    color: theme.palette.primary.contrastText,
    backgroundColor: colors.secondary800,
    borderRadius: theme.shape.borderRadius,
    margin: '0px 3px',
    padding: '3px 3px'
}));

const ItemHeader = styled('h3')(({ theme }) => ({
    color: colors.darkPaper,
    lineHeight: '160%',
    margin: '6px'
    // paddingLeft: '66px'
}));

const ALink = styled('a')(({ theme }) => ({
    color: theme.palette.primary.contrastText,
    backgroundColor: colors.primary800,
    borderRadius: theme.shape.borderRadius,
    padding: '6px 6px'
}));

function Home() {
    const theme = useTheme();

    return (
        <>
            <H1>BrassicaLnc: a comprehensive database of Rapeseed long non-coding RNAs</H1>
            <H2>Welcome to BrassicaLnc</H2>
            <div>
                <TextContainer>
                    BrassicaLnc is a curated database of Brassica napus lncRNAs that were identified from <Highligther>2361</Highligther>{' '}
                    publically available RNA-Seq libraries. The current version of Brassicincludes the sequences of{' '}
                    <Highligther>1852</Highligther>
                    reliably lncRNAs and their profile across <Highligther>2361</Highligther> RNA-Seq libraries (belonging to{' '}
                    <Highligther>110</Highligther> BioProjects) classified into five biological models: abiotic stress, biotic stress,
                    developmental, chemical, and genetic. Additionally, lncRNAs that act as miRNA endogenous target mimics (lncRNA-miRNA
                    interaction), the precursors of miRNAs, and transposable elements (TE) related lncRNAs were integrated. This database
                    also provided users to search and download all the lncRNAs details.
                </TextContainer>
            </div>
            <H2>Pipeline</H2>
            {/* <CardMedia component="img" image={logo} alt="Paella dish" sx={{ maxHeight: '200px' }} /> */}
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <a href="/static/media/LncRNAs_Pipeline-1.f89ac24a.png" target="_blank">
                    <img src={logo} alt="" style={{ width: '60vh', height: '60vh' }} />
                </a>
            </div>
            <H2>Resources</H2>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <MainCard>
                        <IconDna2 size="60px" stroke="1" />
                        <ItemHeader>LncRNAs</ItemHeader>
                        <ItemHeader sx={{ color: colors.primary800, paddingLeft: '0px' }}>1852 LncRNAs</ItemHeader>
                    </MainCard>
                </Grid>
                <Grid item xs={6}>
                    <MainCard>
                        <IconChartBar size="60px" stroke="1" />
                        <ItemHeader>Expression</ItemHeader>
                        <ItemHeader sx={{ color: colors.primary800, paddingLeft: '0px' }}>
                            LncRNA expression across multi tissues, developmental stages and various stress
                        </ItemHeader>
                    </MainCard>
                </Grid>
                {/* <Grid item xs></Grid> */}
            </Grid>

            {/* <Grid container spacing={2}>
                <Grid item xs="auto">
                    <ItemHeader>pre-miRNA</ItemHeader>
                    <ItemHeader>Transposon</ItemHeader>
                </Grid>
            </Grid> */}
            <H2>Related Links</H2>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <ItemHeader>Databases</ItemHeader>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        <ItemHeader>
                            <ALink href="http://cantata.amu.edu.pl/">CANTATAdb 2.0</ALink>
                        </ItemHeader>

                        <ItemHeader>
                            <ALink href="http://greenc.sequentiabiotech.com/wiki/Main_Page">GreeNC</ALink>
                        </ItemHeader>
                        <ItemHeader>
                            <ALink href="https://www.tobaccodb.org/plncdb/">PlncDB</ALink>
                        </ItemHeader>
                        <ItemHeader>
                            <ALink href="http://structuralbiology.cau.edu.cn/PNRD/">PNRD</ALink>
                        </ItemHeader>
                        <ItemHeader>
                            <ALink href="http://14.139.61.8/AlnC/">AlnC</ALink>
                        </ItemHeader>
                        <ItemHeader>
                            <ALink href="https://scbb.ihbt.res.in/DeepPlnc/">DeepPlnc</ALink>
                        </ItemHeader>
                        <ItemHeader>
                            <ALink href="http://bis.zju.edu.cn/PlncRNADB/">PlncRNADB</ALink>
                        </ItemHeader>
                        <ItemHeader>
                            <ALink href="http://cbi.hzau.edu.cn/bnapus/">BnPIR</ALink>
                        </ItemHeader>
                        <ItemHeader>
                            <ALink href="http://brassicadb.cn/#/">BRAD</ALink>
                        </ItemHeader>
                        <ItemHeader>
                            <ALink href="https://www.genoscope.cns.fr/brassicanapus/">GenoScope</ALink>
                        </ItemHeader>
                        <ItemHeader>
                            <ALink href="https://brassica.biodb.org/index">BrassicaEDB</ALink>
                        </ItemHeader>
                        <ItemHeader>
                            <ALink href="http://cruciferseq.ca/">Crucifer</ALink>
                        </ItemHeader>
                        <ItemHeader>
                            <ALink href="https://biodb.swu.edu.cn/qprimerdb/best-primers-ss">qPrimerDB</ALink>
                        </ItemHeader>
                        <ItemHeader>
                            <ALink href="http://www.noncode.org/">NONCODE</ALink>
                        </ItemHeader>
                        <ItemHeader>
                            <ALink href="http://3dgenome.hzau.edu.cn/RiceLncPedia#/">RiceLncPedia</ALink>
                        </ItemHeader>
                        <ItemHeader>
                            <ALink href="http://ic4r.org/browse/lncRNA">IC4R</ALink>
                        </ItemHeader>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <ItemHeader>Tools</ItemHeader>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        <ItemHeader>
                            <ALink href="http://ccbb.jnu.ac.in/plncpro/">PlncPRO</ALink>
                        </ItemHeader>
                        <ItemHeader>
                            <ALink href="https://github.com/gbgolding/crema">CREMA</ALink>
                        </ItemHeader>
                        <ItemHeader>
                            <ALink href="https://github.com/tderrien/FEELnc">FEELnc</ALink>
                        </ItemHeader>
                        <ItemHeader>
                            <ALink href="https://github.com/gao-lab/CPC2_standalone">CPC2</ALink>
                        </ItemHeader>
                        <ItemHeader>
                            <ALink href="https://arxiv.org/abs/1902.05064">PLIT</ALink>
                        </ItemHeader>
                        <ItemHeader>
                            <ALink href="https://arxiv.org/abs/1902.05064">DeepPlnc</ALink>
                        </ItemHeader>
                        <ItemHeader>
                            <ALink href="http://omicslab.genetics.ac.cn/psMimic/">psMimic</ALink>
                        </ItemHeader>
                        <ItemHeader>
                            <ALink href="https://www.mirbase.org/">miRBase</ALink>
                        </ItemHeader>
                        <ItemHeader>
                            <ALink href="https://www.zhaolab.org/psRNATarget/">psRNATarget</ALink>
                        </ItemHeader>
                    </div>
                </Grid>
            </Grid>
            {/* <H2>Citation</H2> */}
        </>
    );
}

export default Home;
