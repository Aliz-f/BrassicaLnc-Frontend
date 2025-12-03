import PropTypes from 'prop-types';
import * as React from 'react';
import { Link } from 'react-router-dom';
import {
    Box,
    Table as MUITable,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    Paper
} from '@mui/material';

import { visuallyHidden } from '@mui/utils';
import Checkbox from 'ui-component/Checkbox';
import { styled } from '@mui/material/styles';
import { shouldForwardProp } from '@mui/system';

import { IconBook } from '@tabler/icons';
import colors from 'assets/scss/_themes-vars.module.scss';

const TableHeadCellStyle = styled(TableCell, { shouldForwardProp })(({ theme }) => ({
    color: colors.secondary800
}));

const TableRowCellStyle = styled(TableCell, { shouldForwardProp })(({ theme }) => ({
    color: colors.secondary200
}));

function SimpleTable({ tableHeadList, tableRowList }) {
    return (
        <TableContainer style={{ marginBottom: '36px' }} component={Paper}>
            <MUITable sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {tableHeadList.map((headColumn) => (
                            <TableHeadCellStyle key={headColumn}>{headColumn}</TableHeadCellStyle>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableRowList.map((row, index) => (
                        <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            {row.map((rowCell, cellIndex) => (
                                <TableRowCellStyle key={cellIndex} align="left">
                                    {rowCell}
                                </TableRowCellStyle>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </MUITable>
        </TableContainer>
    );
}

SimpleTable.propTypes = { tableHeadList: PropTypes.array, tableRowList: PropTypes.array };

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
    const { tableHeadList, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts'
                        }}
                    />
                </TableCell>
                {tableHeadList.map((headCell) => (
                    <TableCell key={headCell.id} align="left" padding="normall" sortDirection={orderBy === headCell.id ? order : false}>
                        {/* <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        > */}
                        {headCell.label}
                        {/* {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel> */}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    tableHeadList: PropTypes.array.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired
};

function TableWithCheckbox({ tableHeadList, tableRowList, handleSelectAllClick, handleSingleCheckboxClick, selectedItems }) {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    // const [page, setPage] = React.useState(0);
    // const [rowsPerPage, setRowsPerPage] = React.useState(24);

    const firstTableHeadId = tableHeadList[0].id;

    const tableHeadIdsListCreator = () => {
        const tableHeadIdsList = [];
        tableHeadList.map((obj) => tableHeadIdsList.push(obj.id));
        return tableHeadIdsList;
    };

    const tableHeadIdsList = tableHeadIdsListCreator();

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    // const handleChangePage = (event, newPage) => {
    //     setPage(newPage);
    // };

    // const handleChangeRowsPerPage = (event) => {
    //     setRowsPerPage(parseInt(event.target.value, 10));
    //     setPage(0);
    // };

    const isSelected = (rowKeysListZeroItem) => selectedItems.indexOf(rowKeysListZeroItem) !== -1;

    // Avoid a layout jump when reaching the last tablePaginatonParams.page with empty tableRowList.
    // const emptyRows =
    //     tablePaginatonParams.page > 0
    //         ? Math.max(0, (1 + tablePaginatonParams.page) * tablePaginatonParams.rowsPerPage - tableRowList.length)
    //         : 0;

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <TableContainer>
                    <MUITable aria-labelledby="tableTitle" size="medium">
                        <EnhancedTableHead
                            tableHeadList={tableHeadList}
                            numSelected={selectedItems.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={tableRowList.length}
                        />
                        <TableBody>
                            {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 tableRowList.slice().sort(getComparator(order, orderBy)) */}
                            {stableSort(tableRowList, getComparator(order, orderBy))
                                // .slice(
                                //     tablePaginatonParams.page * tablePaginatonParams.rowsPerPage,
                                //     tablePaginatonParams.page * tablePaginatonParams.rowsPerPage + tablePaginatonParams.rowsPerPage
                                // )
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row[firstTableHeadId]);
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    return (
                                        <TableRow
                                            hover
                                            // onClick={(event) => handleSingleCheckboxClick(event, row[firstTableHeadId])}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row[firstTableHeadId]}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-labelledby': labelId
                                                    }}
                                                    onClick={(event) => handleSingleCheckboxClick(event, row[firstTableHeadId], row.id)}
                                                />
                                            </TableCell>
                                            {tableHeadIdsList.map((aRowCell) => (
                                                <>
                                                    {aRowCell === 'transcriptId' ? (
                                                        <Link to={`/transcripts/content/${row[aRowCell]}`}>
                                                            <TableCell
                                                                key={Math.random()}
                                                                component="td"
                                                                align="left"
                                                                sx={{
                                                                    color: colors.secondaryMain,
                                                                    fontWeight: 'bold',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'flex-start'
                                                                }}
                                                            >
                                                                <IconBook style={{ margin: '0px 3px' }} />
                                                                <span style={{ wordBreak: 'break-all' }}>{row[aRowCell]}</span>
                                                            </TableCell>
                                                        </Link>
                                                    ) : (
                                                        <TableCell key={Math.random()} component="td" align="left">
                                                            {row[aRowCell]}
                                                        </TableCell>
                                                    )}
                                                </>
                                            ))}
                                        </TableRow>
                                    );
                                })}
                            {/* {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: 53 * emptyRows
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )} */}
                        </TableBody>
                    </MUITable>
                </TableContainer>
            </Paper>
        </Box>
    );
}

TableWithCheckbox.propTypes = {
    tableHeadList: PropTypes.array.isRequired,
    tableRowList: PropTypes.array.isRequired,
    selectedItems: PropTypes.array.isRequired,
    handleSingleCheckboxClick: PropTypes.func.isRequired,
    handleSelectAllClick: PropTypes.func.isRequired
};

export { SimpleTable, TableWithCheckbox };
