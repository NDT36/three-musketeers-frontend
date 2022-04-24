import { ACCESS_TOKEN, callApi } from 'api/axios';
import { fetchCategories } from 'api/categories';
import Cookies from 'js-cookie';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'state';
import { fetchCategoryData } from 'state/resources/actions';

const useFetchCategoriesCallback = () => {
  const dispatch = useDispatch<AppDispatch>();
  const accessToken = Cookies.get(ACCESS_TOKEN);

  return useCallback(async () => {
    if (!accessToken) return;

    const { error, result } = await callApi(fetchCategories());

    if (error) throw error;

    if (result?.data) {
      dispatch(fetchCategoryData([...result?.data]));
    }
  }, [dispatch, accessToken]);
};

export default useFetchCategoriesCallback;
