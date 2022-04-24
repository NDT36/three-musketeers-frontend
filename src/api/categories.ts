import { AxiosResponse } from 'axios';
import { ICategory } from 'state/resources/actions';
import AxiosInstance, { IResult } from './axios';

export const fetchCategories =
  (keyword = '') =>
  () => {
    return AxiosInstance.get<IResult<ICategory[]>, AxiosResponse<IResult<ICategory[]>>>(
      `/category/list?keyword=${keyword}`
    );
  };
