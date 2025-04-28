// store.ts
import { configureStore } from '@reduxjs/toolkit';
import  dashboardApi  from './DashBoardApi';
export const store = configureStore({
  reducer: {
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    // You can add more reducers here if needed
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(dashboardApi.middleware),
});


