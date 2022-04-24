import { callApi } from 'api/axios';
import { fetchCategories } from 'api/categories';
import { fetchSources } from 'api/sources';
import { IAssetSources } from 'pages/SourcePage';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from 'state';
import { fetchCategoryData, fetchSourceData, ICategory } from './actions';

/**
 * Just for demo
 * Get top pools addresses that token is included in
 * If not loaded, fetch and store
 */
export function useListSources(): IAssetSources[] | undefined {
  const dispatch = useDispatch<AppDispatch>();
  const sources = useSelector((state: AppState) => state.resources?.sources);
  const [error, setError] = useState(false);

  const fetch = async () => {
    const { error, result } = await callApi(fetchSources());

    if (error) {
      setError(true);
    } else if (result?.data) {
      // check performance
      dispatch(fetchSourceData([...result?.data]));
    }
  };

  useEffect(() => {
    if (!error) fetch();
  }, [dispatch, error]);

  return sources;
}

export function useListCategories(): ICategory[] | undefined {
  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector((state: AppState) => state.resources?.categories);
  const [error, setError] = useState(false);

  const fetch = async () => {
    const { error, result } = await callApi(fetchCategories());

    if (error) {
      setError(true);
    } else if (result?.data) {
      // check performance
      dispatch(fetchCategoryData([...result?.data]));
    }
  };

  useEffect(() => {
    if (!error) fetch();
  }, [dispatch, error]);

  return categories;
}
