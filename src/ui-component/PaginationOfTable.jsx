import PropTypes from 'prop-types';

import TablePagination from '@mui/material/TablePagination';

export default function PaginationOfTable({ count, page, onPageChange, rowsPerPage, onRowsPerPageChange }) {
    return (
        <TablePagination
            component="div"
            count={count}
            page={page}
            onPageChange={onPageChange}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={onRowsPerPageChange}
        />
    );
}

PaginationOfTable.propTypes = {
    count: PropTypes.number,
    page: PropTypes.number,
    onPageChange: PropTypes.func,
    rowsPerPage: PropTypes.number,
    onRowsPerPageChange: PropTypes.func
};
