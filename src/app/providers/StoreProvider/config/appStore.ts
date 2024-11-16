import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import { userApi } from "@/entities/user/api/userApi";
import { employeesApi } from "@/entities/employee/api/employeeApi";
import { staffingApi } from "@/entities/staffing/api/staffingApi";
import { timeSheetApi } from "@/entities/time-sheet/api/timeSheetApi";
import { vacationApi } from "@/entities/vacation/api/vacationApi";
import { eventApi } from "@/entities/events/api/eventApi";
import { salaryApi } from "@/entities/salary/api/salaryApi";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      employeesApi.middleware,
      staffingApi.middleware,
      timeSheetApi.middleware,
      vacationApi.middleware,
      eventApi.middleware,
      salaryApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
