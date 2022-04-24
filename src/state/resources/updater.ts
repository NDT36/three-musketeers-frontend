import useFetchCategoriesCallback from 'hooks/useFetchCategoriesCallback';
import useFetchSourcesCallback from 'hooks/useFetchSourcesCallback';
import { FC, useEffect } from 'react';
import { useAlert } from 'react-alert';

export const SourceUpdater: FC = () => {
  const reactAlert = useAlert();
  const fetchSource = useFetchSourcesCallback();

  useEffect(() => {
    fetchSource().catch((error) => {
      reactAlert.error(error);
    });
  }, [reactAlert, fetchSource]);

  return null;
};

export const CategoryUpdater: FC = () => {
  const reactAlert = useAlert();
  const fetchCategories = useFetchCategoriesCallback();

  useEffect(() => {
    fetchCategories().catch((error) => {
      reactAlert.error(error);
    });
  }, [reactAlert, fetchCategories]);

  return null;
};
