import { configureStore } from '@reduxjs/toolkit';
import smallRnaReducer from './smallRna';

export default configureStore({
    reducer: {
        smallRna: smallRnaReducer
    }
});
