import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import { userApi } from "@/entities/user/api/userApi";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
