import { AxiosResponse } from 'axios';
import { IAssetSources, ICreateAssetSourcesParams } from 'pages/AssetPage/Asset';
import { IEditAssetParams } from 'pages/AssetPage/Asset/BtnEditItem';
import AxiosInstance, { IResult } from './axios';

export const fetchSources = () => () => {
  return AxiosInstance.get<IResult<IAssetSources[]>, AxiosResponse<IResult<IAssetSources[]>>>(
    '/sources'
  );
};

export const createSource = (data: ICreateAssetSourcesParams) => () => {
  return AxiosInstance.post<
    IResult<unknown>,
    AxiosResponse<IResult<unknown>, ICreateAssetSourcesParams>,
    ICreateAssetSourcesParams
  >('/source', data);
};

export const editSource = (id: string, data: IEditAssetParams) => () => {
  return AxiosInstance.put<
    IResult<unknown>,
    AxiosResponse<IResult<unknown>, IEditAssetParams>,
    IEditAssetParams
  >(`/source/${id}`, data);
};
