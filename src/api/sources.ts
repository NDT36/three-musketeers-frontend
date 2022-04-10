import { AxiosResponse } from 'axios';
import { ICreateSource } from 'pages/CreateSource';
import { IAssetSources } from 'pages/SourcePage';
import { CommonStatus } from 'types/enum';
import AxiosInstance, { IResult } from './axios';

export const fetchSources = () => () => {
  return AxiosInstance.get<IResult<IAssetSources[]>, AxiosResponse<IResult<IAssetSources[]>>>(
    '/sources'
  );
};

export const fetchDetailsSources = (id: string) => () => {
  return AxiosInstance.get<IResult<IAssetSources>, AxiosResponse<IResult<IAssetSources>>>(
    `/source/${id}`
  );
};

export const createSource = (data: ICreateSource) => () => {
  data.name = data.name.trim();
  data.balance = Number(data.balance);

  return AxiosInstance.post<
    IResult<unknown>,
    AxiosResponse<IResult<unknown>, ICreateSource>,
    ICreateSource
  >('/source', data);
};

export const apiDeleteSource = (id: string) => () => {
  return AxiosInstance.put<IResult<unknown>, AxiosResponse<IResult<unknown>>>(`/source/${id}`, {
    status: CommonStatus.INACTIVE,
  });
};

export const apiUpdateSource = (id: string, name: string) => () => {
  return AxiosInstance.put<IResult<unknown>, AxiosResponse<IResult<unknown>>>(`/source/${id}`, {
    name,
  });
};
