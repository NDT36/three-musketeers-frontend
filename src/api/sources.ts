import { AxiosResponse } from 'axios';
import { IAssetSources } from 'pages/SourcePage';
import AxiosInstance, { IResult } from './axios';

export const fetchSources = () => () => {
  return AxiosInstance.get<IResult<IAssetSources[]>, AxiosResponse<IResult<IAssetSources[]>>>(
    '/sources'
  );
};
