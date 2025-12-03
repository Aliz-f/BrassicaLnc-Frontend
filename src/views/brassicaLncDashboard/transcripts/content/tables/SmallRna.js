/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const headCells = [
    { id: 'lncRNAID', numeric: false, disablePadding: true, label: 'lncRNA ID' },
    {
        id: 'MiRNAID',
        numeric: true,
        disablePadding: false,
        label: 'MiRNA ID'
    },
    {
        id: 'expectation',
        numeric: true,
        disablePadding: false,
        label: 'expectation'
    },
    {
        id: 'lncrna_start',
        numeric: true,
        disablePadding: false,
        label: 'lncrna_start'
    },
    {
        id: 'lncrna_end',
        numeric: true,
        disablePadding: false,
        label: 'lncrna_end'
    },
    {
        id: 'mirna_start',
        numeric: true,
        disablePadding: false,
        label: 'mirna_start'
    },
    {
        id: 'mirna_end',
        numeric: true,
        disablePadding: false,
        label: 'mirna_end'
    },
    {
        id: 'inhibition',
        numeric: true,
        disablePadding: false,
        label: 'inhibition'
    },
    {
        id: 'lncrna_aligned_fragment',
        numeric: true,
        disablePadding: false,
        label: 'lncrna_aligned_fragment'
    },
    {
        id: 'mirna_aligned_fragment',
        numeric: true,
        disablePadding: false,
        label: 'mirna_aligned_fragment'
    }
];
function SmallRna(props) {
    return (
        <>
            {' '}
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
                        {props.SmallRnaData &&
                            props.SmallRnaData.map((row) => (
                                <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell align="center">{row.lncrna_id}</TableCell>
                                    <TableCell align="center">{row.mirna_id}</TableCell>
                                    <TableCell align="center">{row.expectation}</TableCell>
                                    <TableCell align="center">{row.lncrna_start}</TableCell>
                                    <TableCell align="center">{row.lncrna_end}</TableCell>
                                    <TableCell align="center">{row.mirna_start}</TableCell>
                                    <TableCell align="center">{row.mirna_end}</TableCell>
                                    <TableCell align="center">{row.inhibition}</TableCell>
                                    <TableCell align="center">{row.lncrna_aligned_fragment}</TableCell>
                                    <TableCell align="center">{row.mirna_aligned_fragment}</TableCell>
                                    {/* <TableCell align="center">{row.bitscore}</TableCell> */}
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default SmallRna;
