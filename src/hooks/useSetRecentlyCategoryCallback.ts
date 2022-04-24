import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'state';
import { setRecentlyCategoryId } from 'state/resources/actions';

const useSetRecentlyCategoryCallback = () => {
  const dispatch = useDispatch<AppDispatch>();

  return useCallback(
    async (recentlyCategoryId: string) => {
      dispatch(setRecentlyCategoryId(recentlyCategoryId));
    },
    [dispatch]
  );
};

export default useSetRecentlyCategoryCallback;
