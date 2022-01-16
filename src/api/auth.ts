import { AxiosResponse } from 'axios';
import { ILoginParams, ILoginResult } from 'pages/Login';
import AxiosInstance, { IResult } from './axios';

export const login = (data: ILoginParams) => {
  return AxiosInstance.post<
    IResult<ILoginResult>,
    AxiosResponse<IResult<ILoginResult>, ILoginParams>,
    ILoginParams
  >('/login', data);
};
