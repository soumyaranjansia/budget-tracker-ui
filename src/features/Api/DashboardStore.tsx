import { configureStore } from "@reduxjs/toolkit";
import { dashboardApi } from "./DashBoardApi";

export const DashboardStore=configureStore({
    reducer:{
        [dashboardApi.reducerPath]:dashboardApi.reducer},
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware().concat(dashboardApi.middleware),

});
