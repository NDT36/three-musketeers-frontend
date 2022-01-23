import { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import { ILoginParams, ILoginResult } from 'pages/LoginPage';
import { ISignUpParams, ISignUpResult } from 'pages/SignUpPage';
import AxiosInstance, { ACCESS_TOKEN, IResult, REFRESH_TOKEN } from './axios';

export const login = (data: ILoginParams) => () => {
  data.email = data.email.trim();
  data.password = data.password.trim();

  return AxiosInstance.post<
    IResult<ILoginResult>,
    AxiosResponse<IResult<ILoginResult>, ILoginParams>,
    ILoginParams
  >('/login', data);
};

export const signUp = (data: ISignUpParams) => () => {
  data.email = data.email.trim();
  data.password = data.password.trim();

  return AxiosInstance.post<
    IResult<ISignUpResult>,
    AxiosResponse<IResult<ISignUpResult>, ISignUpParams>,
    ISignUpParams
  >('/register', data);
};

interface ISetToken {
  accessToken: string;
  refreshToken: string;
}
export const setTokenToCookies = (params?: ISetToken) => {
  if (params && params?.[ACCESS_TOKEN]) {
    Cookies.set(ACCESS_TOKEN, params?.[ACCESS_TOKEN], { expires: 365 });
  }

  if (params && params?.[REFRESH_TOKEN]) {
    Cookies.set(REFRESH_TOKEN, params?.[REFRESH_TOKEN], { expires: 365 });
  }
};
