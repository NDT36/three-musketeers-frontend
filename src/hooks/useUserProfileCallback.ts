import { ACCESS_TOKEN, callApi } from 'api/axios';
import { fetchUserProfile } from 'api/user';
import Cookies from 'js-cookie';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'state';
import { updateProfileData } from 'state/user/actions';

const useFetchProfileCallback = () => {
  const dispatch = useDispatch<AppDispatch>();
  const accessToken = Cookies.get(ACCESS_TOKEN);

  return useCallback(async () => {
    if (!accessToken) return;

    const { error, result } = await callApi(fetchUserProfile());

    if (error) throw error;

    if (result?.data) {
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
  }, [dispatch, accessToken]);
};

export default useFetchProfileCallback;
