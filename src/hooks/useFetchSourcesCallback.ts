import { ACCESS_TOKEN, callApi } from 'api/axios';
import { fetchSources } from 'api/sources';
import Cookies from 'js-cookie';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'state';
import { fetchSourceData } from 'state/resources/actions';

const useFetchSourcesCallback = () => {
  const dispatch = useDispatch<AppDispatch>();
  const accessToken = Cookies.get(ACCESS_TOKEN);

  return useCallback(async () => {
    if (!accessToken) return;

    const { error, result } = await callApi(fetchSources());

    if (error) throw error;

    if (result?.data) {
      dispatch(fetchSourceData([...result?.data]));
    }
  }, [dispatch, accessToken]);
};

export default useFetchSourcesCallback;
