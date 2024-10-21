import { configureStore } from '@reduxjs/toolkit';
import layoutReducer from './slices/Cards-layout-slice'; // path to your slice file
import filterReducer from './slices/filterSlice'; // path to your slice file
import dashboardReducer from './slices/dash-board-slice'; // path to your slice file

const store = configureStore({
    reducer: {
        layout: layoutReducer,
        filters: filterReducer,
        dashboard: dashboardReducer,
    },
});

export default store;
