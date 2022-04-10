import SubPageWrapper from 'components/SubPageWrapper/SubPageWrapper';
import React, { FC, useCallback, useEffect, useState } from 'react';
import iconCreateNew from 'assets/icons-v2/icon-create-new.svg';
import SourceCard from 'components/SourceCard';
import { formatCurrency } from 'utils';
import { useLoading } from 'state/global/hooks';
import { callApi } from 'api/axios';
import { apiDeleteSource, fetchSources } from 'api/sources';
import ListLoading from 'components/ListLoading';
import SourceCardSkeleton from 'components/SourceCard/SourceCardSkeleton';
import Modal from 'components/Modal';
import { RoutePath } from 'types/enum';
import { useAlert } from 'react-alert';
import { useTranslation } from 'react-i18next';

export interface IAssetSources {
  _id: string;
  userId?: string;
  name: string;
  balance: string | number;
}

interface IProps {}

const SourcePage: FC<IProps> = (props) => {
  const [sourceLoading, setSourceLoading] = useState(false);
  const [sources, setSource] = useState<Array<IAssetSources>>([]);
  const reactAlert = useAlert();
  const setLoading = useLoading();
  const { t } = useTranslation();

  const fetchListSources = useCallback(async () => {
    setSourceLoading(true);

    callApi(fetchSources())
      .then(({ error, result }) => {
        if (error) return;
        if (result) setSource(result?.data);
      })
      .finally(() => setSourceLoading(false));
  }, []);

  const deleteSource = (id: string) => {
    setLoading(true);

    callApi(apiDeleteSource(id))
      .then(({ error }) => {
        if (error) reactAlert.error(t(`error.${error}`));
        if (!error) {
          reactAlert.success('Success');
          fetchListSources();
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const totalBalance = sources.reduce((a, b) => a + Number(b.balance), 0);

  useEffect(() => {
    fetchListSources();
  }, [fetchListSources]);

  return (
    <div className="px-2">
      <SubPageWrapper title="Sources">
        <div className="h-36 text-center flex items-center">
          <div className="w-full">
            <div className="text-lg text-[#F6F6F6]">Available balance</div>
            <div className="text-5xl h-20 font-bold font-[Arya] flex items-center justify-center">
              {sourceLoading ? <ListLoading loading={true} /> : formatCurrency(totalBalance)}
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

        {sourceLoading ? (
          <>
            <SourceCardSkeleton />
            <SourceCardSkeleton />
            <SourceCardSkeleton />
          </>
        ) : (
          sources.map((item) => (
            <SourceCard source={item} onDelete={() => deleteSource(item._id)} />
          ))
        )}
      </SubPageWrapper>
    </div>
  );
};

export default SourcePage;
