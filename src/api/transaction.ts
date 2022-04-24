import { AxiosResponse } from 'axios';
import AxiosInstance, { IResult } from './axios';

export interface ITransaction {
  categoryId: string | null;
  description?: string;
  actionAt: number;
  groupId: string | null;
  type: number;
  money: number;
  users: string[];
  sourceId: string | null;
  targetSourceId: string | null;
}

export const createTransaction = (data: ITransaction) => () => {
  return AxiosInstance.post<IResult<unknown>, AxiosResponse<IResult<unknown>>>(
    `/transaction`,
    data
  );
};
