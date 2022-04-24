import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'state';
import { setRecentlySourceId } from 'state/resources/actions';

const useSetRecentlySourceCallback = () => {
  const dispatch = useDispatch<AppDispatch>();

  return useCallback(
    async (recentlySourceId: string) => {
      dispatch(setRecentlySourceId(recentlySourceId));
    },
    [dispatch]
  );
};

export default useSetRecentlySourceCallback;
