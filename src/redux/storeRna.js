import { configureStore } from '@reduxjs/toolkit';
import smallRnaReducer from './smallRna';

// eslint-disable-next-line import/prefer-default-export
export default configureStore({
    reducer: {
        smallRna: smallRnaReducer
    }
});
