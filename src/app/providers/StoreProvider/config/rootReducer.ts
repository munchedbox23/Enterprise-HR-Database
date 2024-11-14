import { combineReducers } from "@reduxjs/toolkit";
import { userSlice } from "@/entities/user";
import { userApi } from "@/entities/user/api/userApi";

export const rootReducer = combineReducers({
  user: userSlice,
  [userApi.reducerPath]: userApi.reducer,
});
