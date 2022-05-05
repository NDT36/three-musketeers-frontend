import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'state';
import { updateShowMoney } from './actions';

export function useUpdateSetting() {
  const dispatch = useDispatch<AppDispatch>();

  return useCallback((isShowMoney: boolean) => dispatch(updateShowMoney(isShowMoney)), [dispatch]);
}
