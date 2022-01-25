import useFetchProfileCallback from 'hooks/useUserProfileCallback';
import { FC, useEffect } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'state';

const UserUpdater: FC = () => {
  const reactAlert = useAlert();
  const dispatch = useDispatch<AppDispatch>();

  const fetchProfile = useFetchProfileCallback();

  useEffect(() => {
    fetchProfile().catch((error) => {
      reactAlert.error(error);
    });
  }, [dispatch, reactAlert, fetchProfile]);

  return null;
};

export default UserUpdater;
