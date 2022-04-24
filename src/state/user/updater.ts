import useFetchProfileCallback from 'hooks/useUserProfileCallback';
import { FC, useEffect } from 'react';
import { useAlert } from 'react-alert';

const UserUpdater: FC = () => {
  const reactAlert = useAlert();

  const fetchProfile = useFetchProfileCallback();

  useEffect(() => {
    fetchProfile().catch((error) => {
      reactAlert.error(error);
    });
  }, [reactAlert, fetchProfile]);

  return null;
};

export default UserUpdater;
