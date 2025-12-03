/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const headCells = [
    {
        id: 'gene_id',
        numeric: false,
        disablePadding: true,
        label: 'Gene ID'
    },
    {
        id: 'transcript_id',
        numeric: true,
        disablePadding: false,
        label: 'Transcript ID'
    },
    {
        id: 'exonNumber',
        numeric: true,
        disablePadding: false,
        label: 'Exon Number'
    },
    {
        id: 'chromosome',
        numeric: true,
        disablePadding: false,
        label: 'Chr'
    },

    // {
    //     id: 'stringTieId',
    //     numeric: true,
    //     disablePadding: false,
    //     label: 'stringTieId'
    // },
    // {
    //     id: 'exon',
    //     numeric: true,
    //     disablePadding: false,
    //     label: 'exon'
    // },
    {
        id: 'locStart',
        numeric: true,
        disablePadding: false,
        label: 'Start'
    },
    {
        id: 'locEnd',
        numeric: true,
        disablePadding: false,
        label: 'End'
    },
    // {
    //     id: 'number',
    //     numeric: true,
    //     disablePadding: false,
    //     label: 'number'
    // },
    {
        id: 'strand1',
        numeric: true,
        disablePadding: false,
        label: 'Strand1'
    },
    {
        id: 'strand2',
        numeric: true,
        disablePadding: false,
        label: 'Strand2'
    }
];
function Gft(props) {
    // console.log(props.GftData);
    return (
        <>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {headCells.map((column) => (
                                <TableCell align="center" key={column.id}>
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.GftData &&
                            props.GftData.map((row) => (
                                <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell align="center">{row.gene_id}</TableCell>
                                    <TableCell align="center">{row.transcript_id}</TableCell>
                                    <TableCell align="center">{row.exon_number}</TableCell>
                                    <TableCell align="center">{row.chromosome}</TableCell>
                                    {/* <TableCell align="center">{row.stringTie}</TableCell> */}
                                    {/* <TableCell align="center">{row.exon}</TableCell> */}
                                    <TableCell align="center">{row.locStart}</TableCell>
                                    <TableCell align="center">{row.locEnd}</TableCell>
                                    {/* <TableCell align="center">{row.number}</TableCell> */}
                                    <TableCell align="center">{row.strand1}</TableCell>
                                    <TableCell align="center">{row.strand2}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default Gft;
