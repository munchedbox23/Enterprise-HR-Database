import type { RootState } from "@/app/providers/StoreProvider";

export const getUserDataSelector = (state: RootState) => state.user.user;
