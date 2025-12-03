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
        id: 'query',
        numeric: false,
        disablePadding: true,
        label: 'Query'
    },
    {
        id: 'length_query',
        numeric: true,
        disablePadding: false,
        label: 'Length Query'
    },
    {
        id: 'target',
        numeric: true,
        disablePadding: false,
        label: 'Target'
    },
    {
        id: 'length_target',
        numeric: true,
        disablePadding: false,
        label: 'Length Target'
    },
    {
        id: 'dg',
        numeric: true,
        disablePadding: false,
        label: 'dg'
    },
    {
        id: 'ndg',
        numeric: true,
        disablePadding: false,
        label: 'ndg'
    },
    {
        id: 'start_position_query',
        numeric: true,
        disablePadding: false,
        label: 'Start Position Query'
    },
    {
        id: 'end_position_query',
        numeric: true,
        disablePadding: false,
        label: 'End Position Query'
    },
    {
        id: 'start_position_target',
        numeric: true,
        disablePadding: false,
        label: 'Start Position Target'
    },
    {
        id: 'end_position_target',
        numeric: true,
        disablePadding: false,
        label: 'End Position Target'
    }
];
function Target(props) {
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
                        {props.TargetData &&
                            props.TargetData.map((row) => (
                                <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell sx={{ width: '5%' }} align="center">
                                        {row.query}
                                    </TableCell>
                                    <TableCell sx={{ width: '15%' }} align="center">
                                        {row.length_query}
                                    </TableCell>
                                    <TableCell sx={{ width: '5%' }} align="center">
                                        {row.target}
                                    </TableCell>
                                    <TableCell sx={{ width: '10%' }} align="center">
                                        {row.length_target}
                                    </TableCell>
                                    <TableCell sx={{ width: '5%' }} align="center">
                                        {row.dg}
                                    </TableCell>
                                    <TableCell sx={{ width: '5%' }} align="center">
                                        {row.ndg}
                                    </TableCell>
                                    <TableCell sx={{ width: '15%' }} align="center">
                                        {row.start_position_query}
                                    </TableCell>
                                    <TableCell sx={{ width: '15%' }} align="center">
                                        {row.end_position_query}
                                    </TableCell>
                                    <TableCell sx={{ width: '15%' }} align="center">
                                        {row.start_position_target}
                                    </TableCell>
                                    <TableCell sx={{ width: '15%' }} align="center">
                                        {row.end_position_target}
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default Target;
