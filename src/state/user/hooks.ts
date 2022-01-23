import { callApi } from 'api/axios';
import { fetchUserProfile } from 'api/user';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from 'state';
import { IUserProfile } from 'types/interface';
import { updateProfileData } from './actions';

/**
 * Get top pools addresses that token is included in
 * If not loaded, fetch and store
 * @param address
 */
export function useUserProfile(): IUserProfile | undefined {
  const dispatch = useDispatch<AppDispatch>();
  const profile = useSelector((state: AppState) => state.user?.profile);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetch() {
      const { error, result } = await callApi(fetchUserProfile());

      if (error) {
        setError(true);
      } else if (result?.data) {
        dispatch(
          updateProfileData({
            _id: result.data._id,
            avatar: result.data.avatar,
            name: result.data.name,
            email: result.data.email,
            status: result.data.status,
            updateAt: result.data.updateAt,
            createdAt: result.data.createdAt,
          })
        );
      }
    }

    if (!error) fetch();
  }, [dispatch, error]);

  // return data
  return profile;
}
