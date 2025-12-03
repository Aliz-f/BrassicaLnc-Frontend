import styled from '@emotion/styled';
import colors from 'assets/scss/_themes-vars.module.scss';

import logo from 'assets/images/home/LncRNAs_Pipeline-1.png';
import img1 from 'assets/images/help/SubmitForm.jpg';
import img2 from 'assets/images/help/TranscriptsSearchs.jpg';
import img3 from 'assets/images/help/Search.jpg';
import img4 from 'assets/images/help/Sequence.jpg';
import img5 from 'assets/images/help/plot.jpg';
// ==============================|| BrassicaLnc Help ||============================== //
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

function Help() {
    return (
        <>
            <H1>Help</H1>
            <H2>What are the criteria for lncRNA being added to BrassicaLnc?</H2>
            <TextContainer>
                To obtain high-confidence lncRNAs, the following steps were adopted after mapping reads to the lettuce reference genome by
                using STAR, assembling transcripts by StringTie, and merging with StringTie’s merge tools:
            </TextContainer>
            <ol>
                <li>
                    The unannotated transcripts were identified by using the comparison of transcriptome assemblies (gff files produced by
                    StringTie) with lettuce genome annotation file using the gffcompare program.
                </li>
                <li>
                    The unannotated transcripts were categorized in the class codes of “u” (intergenic lncRNAs), “x” (antisense lncRNAs),
                    “i” (intronic lncRNAs), “o” (generic exonic overlap lncRNAs with reference transcripts), and “e” (single exon TransFrag
                    overlying a reference exon).{' '}
                </li>
                <li>The unannotated transcripts less than 200bp and greater than 15 Kb were removed.</li>
                <li>
                    The result of the former step was entered into tRNAscan-SE and later Barrnap to filter out possible tRNAs and rRNAs.
                </li>
                <li>
                    Transcripts with one significant (E-value, 1e-5) hit against the UniProt release 2021–02, Pfam release 34.0, and Rfam
                    14.5 databases, which encoded a preserved protein/domain were excluded.
                </li>
                <li>The coding potential calculator (CPC2) software was applied to assess the coding potential of foreseen lncRNAs.</li>
                <li>
                    Finally, CREMA and PLncPRO were employed on the non-coding potential transcripts predicted by CPC2 to increase the
                    accuracy of lncRNA prediction.
                </li>
                <li>LncRNAs with FPKM scores smaller than 0.5 in all samples were discarded</li>
            </ol>
            {/* <CardMedia component="img" image={logo} alt="Paella dish" sx={{ maxHeight: '200px' }} /> */}
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <a href="/static/media/LncRNAs_Pipeline-1.f89ac24a.png" target="_blank">
                    <img src={logo} alt="" style={{ width: '60vh', height: '60vh' }} />
                </a>
            </div>
            <br />
            <br />
            <br />
            <H2>How to submit data to BrassicaLnc?</H2>
            <TextContainer>
                We are delighted to welcome researchers and scientists to submit new entries to BrassicaLcn database. The direct submissions
                from scientists would be one of the most important source of new data for the next version of BrassicaLnc to keep the
                database as comprehensive, current, and accurate as possible. BrassicaLnc provides timely and accurate processing and
                biological review of new entries and updates to existing entries, and is ready to assist authors who have new data to
                submit. Hence, we provided a web-based submission form for preparing and submitting data to BrassicaLnc.
            </TextContainer>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <a href="/static/media/SubmitForm.65f21f89.jpg" target="_blank">
                    <img src={img1} alt="" style={{ width: '60vh', height: '60vh' }} />
                </a>
            </div>
            <br />
            <br />
            <br />
            <H2>What kind of data can be downloaded from BrassicaLnc and what informations can be obtained for a specific lncRNA?</H2>
            <TextContainer>
                Overall, the sequences in Fasta format, gtf file, expression values, and relevant experiment information of all the
                identified lncRNAs can be downloaded in five biological models abiotic stress, biotic stress, developmental, chemical, and
                genetic on the download page. In the other section, more information can be retrieved for each lncRNAs.
            </TextContainer>
            <TextContainer>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <b>LncRNAs:</b> in the "Transcripts" section users can find all basic information about lncRNAs including Transcripts ID,
                lncRNAs location on the chromosome, lncRNA class, length, and exon number of lncRNA. At the top of page, the user can search
                lncRNAs according to several criteria. All search results can be downloaded in CSV, TXT, FASTA, and GFF format.
            </TextContainer>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <a href="/static/media/transcriptsSearch.b6098ec9.jpg" target="_blank">
                    <img src={img2} alt="" style={{ width: '60vh', height: '60vh' }} />
                </a>
            </div>
            <br />
            <br />
            <br />
            <TextContainer>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                Besides, in the "search" section, users could search by ID, expression values (A) for five biological models abiotic stress,
                biotic stress, developmental, chemical, and genetic, and sequence (Blast, B).
            </TextContainer>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <a href="/static/media/Search.588e6043.jpg" target="_blank">
                    <img src={img3} alt="" style={{ width: '60vh', height: '60vh' }} />
                </a>
            </div>
            <br />
            <br />
            <br />
            <TextContainer>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                In the "Transcripts" page, the user can select a transcript <b>(BnaA01LNG0000100.1)</b> and enter the detailed information
                page, and then could view or download related information including the sequence and the expression values for any
                experiment in each group.
            </TextContainer>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <a href="/static/media/Sequence.7bfca6ae.jpg" target="_blank">
                    <img src={img4} alt="" style={{ width: '60vh', height: '60vh' }} />
                </a>
            </div>
            <br />
            <br />
            <br />
            <TextContainer>
                <b>Expression:</b> The expression values (FPKM) for each lncRNAs in each experiment of biological groups can be plotted. For
                each lncRNA (in the Transcripts section), the user can select a biological group (abiotic stress, biotic stress,
                developmental, chemical, and genetic) and experiment of interest, and then plot the related values in a bar or line plot.
                The results can be downloaded in the different figure formats (PNG and SVG) and CSV for FPKM values of the chart and
                original data.
            </TextContainer>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <a href="/static/media/plot.2b419fdb.jpg" target="_blank">
                    <img src={img5} alt="" style={{ width: '100%' }} />
                </a>
            </div>
            <br />
            <br />
            <br />
        </>
    );
}

export default Help;
