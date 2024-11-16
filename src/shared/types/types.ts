export type TTokenError = {
  code: string;
  message: string | null;
};

export interface IRefreshTokenResponse {
  success: boolean;
  accessToken: string;
  refreshToken: string;
}
