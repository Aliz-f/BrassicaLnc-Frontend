import { createSlice } from '@reduxjs/toolkit';

// eslint-disable-next-line import/prefer-default-export
export const smallRnaSlice = createSlice({
    name: 'smallRna',
    initialState: {
        count: 0,
        table: {
            isTableInProgress: true,
            canTableRender: false,
            tableData: { tableHeadCells: [], tableRows: [] },
            pageOfPagination: 0
            // tableDataToDownload: { format: 'csv', data: [], idsOfData: [] }
        }
    },
    reducers: {
        setSmallRnaData: (state, action) => {
            state.table.tableData.tableRows = action.payload;
        }
    }
});

export const { setSmallRnaData } = smallRnaSlice.actions;

export default smallRnaSlice.reducer;
