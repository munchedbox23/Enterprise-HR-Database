export {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  
} from "./api/userApi";

export type {
  IUser,
  IUserAuth,
  IUserLogin,
  IUserLogout,
  IUserRegister,
  IUserResponse,
  IRefreshTokenResponse,
} from "./model/types/types";

import { userApi } from "./api/userApi";
export { userApi };

import userSlice from "./model/slice/userSlice";
export { checkUserAuth} from "./model/slice/userSlice";
export { userSlice };

export { getUserDataSelector } from "./model/selectors/getUserDataSelector";
