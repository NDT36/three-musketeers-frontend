import { useDispatch } from 'react-redux';
import { AppDispatch } from 'state';
import { updateLoading } from './actions';

export function useLoading(): (isLoading: boolean) => void {
  const dispatch = useDispatch<AppDispatch>();

  return (isLoading: boolean) => {
    dispatch(updateLoading(isLoading));
  };
}
