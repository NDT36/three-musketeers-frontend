import { AxiosResponse } from 'axios';
import { IUserProfile } from 'types/interface';
import AxiosInstance, { IResult } from './axios';

export const fetchUserProfile = () => () => {
  return AxiosInstance.get<IResult<IUserProfile>, AxiosResponse<IResult<IUserProfile>, any>, any>(
    '/profile'
  );
};
