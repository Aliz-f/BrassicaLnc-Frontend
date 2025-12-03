/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { IconCloudDownload, IconDownloadOff } from '@tabler/icons';
import api from 'routes/api.json';

const headCells = [
    {
        id: 'Download',
        numeric: true,
        disablePadding: false,
        label: 'Download'
    },
    {
        id: 'lncrna_id',
        numeric: false,
        disablePadding: true,
        label: 'lncrna_id'
    },
    {
        id: 'premi_rna',
        numeric: true,
        disablePadding: false,
        label: 'premi_rna'
    },
    {
        id: 'identity',
        numeric: true,
        disablePadding: false,
        label: 'identity'
    },
    {
        id: 'alignment_length',
        numeric: true,
        disablePadding: false,
        label: 'alignment_length'
    },
    {
        id: 'mismatches',
        numeric: true,
        disablePadding: false,
        label: 'mismatches'
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
        id: 'premi_rna_start',
        numeric: true,
        disablePadding: false,
        label: 'premi_rna_start'
    },
    {
        id: 'premi_rna_end',
        numeric: true,
        disablePadding: false,
        label: 'premi_rna_end'
    },
    {
        id: 'e_value',
        numeric: true,
        disablePadding: false,
        label: 'e_value'
    },
    {
        id: 'bitscore',
        numeric: true,
        disablePadding: false,
        label: 'bitscore'
    }
];
function PremiRNA(props) {
    // ? download function for download the structure
    // eslint-disable-next-line camelcase
    const handleDownload = async (lncrna_id) => {
        window.open(` ${api.mainURL}/download/premi_rna/structure/?transcript=${lncrna_id}`, '_blank');
    };
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
                        {props.premiRNAData &&
                            props.premiRNAData.map((row) => (
                                <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell align="center">
                                        <span>
                                            {row.structure ? (
                                                <IconCloudDownload
                                                    onClick={() => handleDownload(row.lncrna_id)}
                                                    style={{ cursor: 'pointer' }}
                                                    target="_blank"
                                                />
                                            ) : (
                                                <IconDownloadOff style={{ cursor: 'not-allowed' }} />
                                            )}
                                        </span>
                                    </TableCell>

                                    <TableCell align="center">{row.lncrna_id}</TableCell>
                                    <TableCell align="center">{row.premi_rna}</TableCell>
                                    <TableCell align="center">{row.identity}</TableCell>
                                    <TableCell align="center">{row.alignment_length}</TableCell>
                                    <TableCell align="center">{row.mismatches}</TableCell>
                                    <TableCell align="center">{row.lncrna_start}</TableCell>
                                    <TableCell align="center">{row.lncrna_end}</TableCell>
                                    <TableCell align="center">{row.premi_rna_start}</TableCell>
                                    <TableCell align="center">{row.premi_rna_end}</TableCell>
                                    <TableCell align="center">{row.e_value}</TableCell>
                                    <TableCell align="center">{row.bitscore}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default PremiRNA;
