import { AxiosResponse } from 'axios';
import { ILendDetails } from 'pages/LendDebtDetailsPage';
import { IListLend } from 'pages/LendPage';
import AxiosInstance, { IResult } from './axios';

interface IFetchListLend {
  takeAfter?: number;
  pageSize?: number;
}

export const fetchListLend = (params: IFetchListLend) => () => {
  params.pageSize = Number(params.pageSize) || 10;
  return AxiosInstance.get<
    IResult<IListLend[]>,
    AxiosResponse<IResult<IListLend[]>, IFetchListLend>,
    IFetchListLend
  >('/lend/list', { params });
};

export const fetchDetailLend = (lendId: string) => () => {
  return AxiosInstance.get<IResult<ILendDetails>, AxiosResponse<IResult<ILendDetails>>>(
    `/lend/${lendId}`
  );
};

interface ICreateLendOrDebt {
  target: string;
  money: number;
  description: string;
  type: number;
  actionAt: number;
  sourceId: string | null;
}

export const createLendOrDebt = (params: ICreateLendOrDebt) => () => {
  return AxiosInstance.post<
    IResult<unknown>,
    AxiosResponse<IResult<unknown>, ICreateLendOrDebt>,
    ICreateLendOrDebt
  >(`/lend`, params);
};

interface IUpdateLend {
  money: number;
  description: string;
  sourceId: string | null;
  actionAt: number;
}
export const updateLendDebt = (lendId: string, params: IUpdateLend) => () => {
  return AxiosInstance.put<
    IResult<unknown>,
    AxiosResponse<IResult<unknown>, IUpdateLend>,
    IUpdateLend
  >(`/lend/collect/${lendId}`, params);
};
