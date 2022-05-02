import { AxiosResponse } from 'axios';
import { IItemListTransaction } from 'pages/HomePage';
import { ITransactionStatisticsResults } from 'pages/TransactionPage';
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

interface IFetchTransaction {
  pageIndex?: number;
  pageSize?: number;
}
export const fetchListTransactions = (params: IFetchTransaction) => () => {
  if (!params.pageIndex) params.pageIndex = 1;
  if (!params.pageSize) params.pageSize = 10;
  return AxiosInstance.get<
    IResult<IItemListTransaction[]>,
    AxiosResponse<IResult<IItemListTransaction[]>>
  >(`/transaction/user`, {
    params,
  });
};

interface IFetchTransactionStatistics {
  startDate: string;
  endDate: string;
}
export const fetchTransactionStatistics = (params: IFetchTransactionStatistics) => () => {
  return AxiosInstance.get<
    IResult<ITransactionStatisticsResults>,
    AxiosResponse<IResult<ITransactionStatisticsResults>>
  >(`/transaction/statistics`, {
    params,
  });
};
