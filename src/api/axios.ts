import Axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import configs from 'config';
import { customNavigate, toBearer } from 'utils';
import { ErrorCode } from 'types/enum';

const baseURL = configs.API_DOMAIN;

export const ACCESS_TOKEN = 'accessToken';
export const REFRESH_TOKEN = 'refreshToken';
const API_REFRESH_TOKEN = `${baseURL}/refresh-token`;

const AxiosInstance = Axios.create({
  timeout: 3 * 60 * 1000,
  baseURL,
});

AxiosInstance.interceptors.request.use(
  (config: any) => {
    const accessToken = Cookies.get(ACCESS_TOKEN);
    if (accessToken) {
      config.headers.Authorization = toBearer(accessToken);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

const handleRefreshTokenError = (error: any) => {
  logout();
  return Promise.reject(error);
};

export const logout = () => {
  Cookies.remove(ACCESS_TOKEN);
  Cookies.remove(REFRESH_TOKEN);
  customNavigate('/login');
};

AxiosInstance.interceptors.response.use(
  (response) => response,
  (error: any) => {
    const originalConfig = error.config;

    // Backend alway send error code 401 when access token expried.
    if (error?.response?.status !== 401) return Promise.reject(error);

    const refreshToken = Cookies.get(REFRESH_TOKEN);
    if (!refreshToken) return handleRefreshTokenError(error);

    // Call API refresh token and set it to header.
    return Axios.post(API_REFRESH_TOKEN, { refreshToken })
      .then((res) => {
        const accessToken = res.data?.data?.[ACCESS_TOKEN];
        if (!accessToken) return handleRefreshTokenError(error);

        Cookies.set(ACCESS_TOKEN, accessToken);
        originalConfig.headers.Authorization = toBearer(accessToken);

        return Axios(originalConfig);
      })
      .catch(() => handleRefreshTokenError(error));
  }
);

// type TCallApiWrapper = <T>(callback: () => Promise<T>) => Promise<{ error?: string; data?: T }>;

export interface IResult<T> {
  success: boolean;
  data: T;
  status: number;
  pageIndex: number;
  pageSize: number;
  [key: string]: any;
}
export async function callApi<T = any, D = any>(
  callback: () => Promise<AxiosResponse<IResult<T>, D>>
): Promise<{ error?: string; result?: IResult<T> }> {
  try {
    const result = await callback();

    return { result: result?.data };
  } catch (error: any) {
    /**Message from server */
    if (error.response) return { error: error.response?.data?.message };
    if (error.message === 'Network Error') return { error: ErrorCode.Network_Error };

    return { error: ErrorCode.Unexpected_Error };
  }
}

export default AxiosInstance;
