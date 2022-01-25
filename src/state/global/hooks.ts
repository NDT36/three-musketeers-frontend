import { useDispatch } from 'react-redux';
import { AppDispatch } from 'state';
import { updateLoading } from './actions';

export function useSetLoading(): (isLoading: boolean) => void {
  const dispatch = useDispatch<AppDispatch>();

  return (isLoading: boolean) => {
    dispatch(updateLoading(isLoading));
  };
}
