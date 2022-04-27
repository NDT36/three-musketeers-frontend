import SubPageWrapper from 'components/SubPageWrapper/SubPageWrapper';
import React, { FC } from 'react';
import iconCreateNew from 'assets/icons-v2/icon-create-new.svg';
import SourceCard from 'components/SourceCard';
import { formatCurrency } from 'utils';
import { useLoading } from 'state/global/hooks';
import { callApi } from 'api/axios';
import { apiDeleteSource } from 'api/sources';
import ListLoading from 'components/ListLoading';
import SourceCardSkeleton from 'components/SourceCard/SourceCardSkeleton';
import { RoutePath } from 'types/enum';
import { useAlert } from 'react-alert';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { AppState } from 'state';
import useFetchSourcesCallback from 'hooks/useFetchSourcesCallback';
import { SourceUpdater } from 'state/resources/updater';

export interface IAssetSources {
  _id: string;
  userId?: string;
  name: string;
  balance: string | number;
}

interface IProps {}

const SourcePage: FC<IProps> = (props) => {
  const reactAlert = useAlert();
  const setLoading = useLoading();
  const { t } = useTranslation();
  const { sources } = useSelector((state: AppState) => state.resources);
  const fetchSource = useFetchSourcesCallback();

  const deleteSource = (id: string) => {
    setLoading(true);

    callApi(apiDeleteSource(id))
      .then(({ error }) => {
        if (error) reactAlert.error(t(`error.${error}`));
        if (!error) {
          reactAlert.success('Success');
        }
      })
      .finally(() => {
        fetchSource()
          .catch((error) => {
            reactAlert.error(error);
          })
          .finally(() => {
            setLoading(false);
          });
      });
  };

  const totalBalance = sources ? sources.reduce((a, b) => a + Number(b.balance), 0) : 0;

  return (
    <>
      <SourceUpdater />
      <div className="px-2">
        <SubPageWrapper routeGoBack={RoutePath.HOME} title="Sources">
          <div className="h-36 text-center flex items-center">
            <div className="w-full">
              <div className="text-lg text-[#F6F6F6]">Available balance</div>
              <div className="text-5xl h-20 font-bold font-[Arya] flex items-center justify-center">
                {sources ? formatCurrency(totalBalance) : <ListLoading loading={true} />}
              </div>
            </div>
          </div>
          {/* Create new */}
          <a
            href={`#${RoutePath.CREATE_SOURCE}`}
            className="h-[85px] flex justify-center items-center cursor-pointer"
          >
            <div className="border border-white rounded-[10px] flex px-6 py-2">
              <div className="flex justify-center items-center">
                <img src={iconCreateNew} alt="icon" />
              </div>
              <div className="pl-2">Create new</div>
            </div>
          </a>

          {!sources ? (
            <>
              <SourceCardSkeleton />
              <SourceCardSkeleton />
              <SourceCardSkeleton />
            </>
          ) : (
            sources.map((item) => (
              <SourceCard key={item._id} source={item} onDelete={() => deleteSource(item._id)} />
            ))
          )}
        </SubPageWrapper>
      </div>
    </>
  );
};

export default SourcePage;
