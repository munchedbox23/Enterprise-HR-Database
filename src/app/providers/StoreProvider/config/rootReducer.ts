import { combineReducers } from "@reduxjs/toolkit";
import { userSlice } from "@/entities/user";
import { userApi } from "@/entities/user/api/userApi";
import { employeesApi } from "@/entities/employee/api/employeeApi";
import { staffingApi } from "@/entities/staffing/api/staffingApi";
import { timeSheetApi } from "@/entities/time-sheet/api/timeSheetApi";
import { vacationApi } from "@/entities/vacation/api/vacationApi";
import { eventApi } from "@/entities/events/api/eventApi";
import { salaryApi } from "@/entities/salary/api/salaryApi";

export const rootReducer = combineReducers({
  user: userSlice,
  [userApi.reducerPath]: userApi.reducer,
  [employeesApi.reducerPath]: employeesApi.reducer,
  [staffingApi.reducerPath]: staffingApi.reducer,
  [timeSheetApi.reducerPath]: timeSheetApi.reducer,
  [vacationApi.reducerPath]: vacationApi.reducer,
  [eventApi.reducerPath]: eventApi.reducer,
  [salaryApi.reducerPath]: salaryApi.reducer,
});
