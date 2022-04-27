import { callApi } from 'api/axios';
import LinearWrapper from 'components/LinearWrapper';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from 'state';
import { formatCurrency } from 'utils';
import iconShow from 'assets/icons-v2/icon-show.svg';
import iconSources from 'assets/icons-v2/icon-source.svg';
import iconLend from 'assets/icons-v2/icon-lend.svg';
import iconTransaction from 'assets/icons-v2/icon-transaction.svg';
import iconSaving from 'assets/icons-v2/icon-saving.svg';
import { RoutePath } from 'types/enum';
import ListLoading from 'components/ListLoading';
import { useAlert } from 'react-alert';
import { fetchListTransactions } from 'api/transaction';
import { useTranslation } from 'react-i18next';
import Loading from 'components/ListLoading';
import ListTransaction from 'components/ListTransaction';
import ProgressRing from 'pages/ProgressRing';

export interface IItemListTransaction {
  _id: string;
  users: string[];
  money: number;
  type: number;
  categoryId: string;
  sourceId: string;
  targetSourceId: string | null;
  description: string;
  status: number;
  groupId: string | null;
  actionAt: number;
  createdBy: string;
  updateBy: string;
  updateAt: number;
  createdAt: number;
}

function TransactionPage() {
  const reactAlert = useAlert();
  const { t } = useTranslation();
  const { sources } = useSelector((state: AppState) => state.resources);
  const [params, setParams] = useState({ pageIndex: 1, pageSize: 10 });
  const [transactionLoading, setTransactionLoading] = useState(false);

  const [transactions, setTransactions] = useState<IItemListTransaction[]>([]);

  const totalBalance = sources ? sources.reduce((a, b) => a + Number(b.balance), 0) : 0;

  const handleCurrency = () => {
    return sources ? formatCurrency(totalBalance) || 0 : <ListLoading loading={true} />;
  };

  const fetchTransactions = useCallback(
    async (params) => {
      setTransactionLoading(true);

      const { error, result } = await callApi(fetchListTransactions(params));
      if (error) reactAlert.error(t(`error.${error}`));

      if (!error && result?.data) {
        setTransactions([...transactions, ...result.data]);
        if (result.pageIndex === params.pageIndex) {
        }
      }

      setTransactionLoading(false);
    },
    [reactAlert, t, transactions]
  );

  const onViewMore = (pageSize = 10) => {
    setParams({ pageIndex: params.pageIndex + 1, pageSize });
  };

  useEffect(() => {
    fetchTransactions(params);
  }, [params]);

  return (
    <div className="px-2.5">
      {/* Header */}
      {/* Overview */}
      <div className="flex justify-center items-center w-full h-[250px]">
        <LinearWrapper className="h-[230px] w-full p-[0.75px] pt-0.5 rounded-3xl">
          <div className="w-full h-full bg-secondary rounded-3xl flex justify-center items-center">
            {/* Container */}
            <div className="w-full h-[190px] mx-3">
              <div className="h-[113px]">
                <div className="h-[25px] relative">
                  <div className="text-center text-lg text-[#f6f6f6]">Available balance</div>
                  <div className="absolute right-0 top-0 h-[25px] w-[25px] flex items-center justify-center">
                    <img src={iconShow} alt="eye" />
                  </div>
                </div>
                <div className="text-5xl text-center h-[5.5rem] flex justify-center items-center font-[Arya]">
                  {sources ? handleCurrency() : <Loading loading={true} />}
                </div>
              </div>
              <div className="h-0.5 bg-slate-500 hr-gradient"></div>
              <div className="h-[85px] flex items-center justify-center">
                {/* Menu item */}
                <div className="h-[4.375rem] flex justify-between items-center">
                  <a href={`#${RoutePath.SOURCE}`} className="h-full w-20">
                    <div className="w-full h-full">
                      <div className="w-full flex justify-center">
                        <div className="w-[50px] h-[50px] border border-white bg-[#E9FFAC] rounded-[17px] flex justify-center items-center">
                          <img src={iconSources} alt="icon-source" />
                        </div>
                      </div>
                      <div className="text-center h-[30px] flex items-center justify-center">
                        Source
                      </div>
                    </div>
                  </a>
                  <div className="h-full w-20">
                    <div className="w-full h-full">
                      <div className="w-full flex justify-center">
                        <div className="w-[50px] h-[50px] border border-white bg-[#E9FFAC] rounded-[17px] flex justify-center items-center">
                          <img src={iconLend} alt="icon-source" />
                        </div>
                      </div>
                      <div className="text-center h-[30px] flex items-center justify-center">
                        Lend
                      </div>
                    </div>
                  </div>
                  <a href={`#${RoutePath.TRANSACTION}`} className="h-full w-20">
                    <div className="w-full h-full">
                      <div className="w-full flex justify-center">
                        <div className="w-[50px] h-[50px] border border-white bg-[#E9FFAC] rounded-[17px] flex justify-center items-center">
                          <img src={iconTransaction} alt="icon-source" />
                        </div>
                      </div>
                      <div className="text-center h-[30px] flex items-center justify-center">
                        Transactions
                      </div>
                    </div>
                  </a>
                  <div className="h-full w-20">
                    <div className="w-full h-full">
                      <div className="w-full flex justify-center">
                        <div className="w-[50px] h-[50px] border border-white bg-[#E9FFAC] rounded-[17px] flex justify-center items-center">
                          <img src={iconSaving} alt="icon-source" />
                        </div>
                      </div>
                      <div className="text-center h-[30px] flex items-center justify-center">
                        Saving
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </LinearWrapper>
      </div>
      <div className="flex justify-start">
        <ProgressRing
          color="pink"
          icon="/assets/icon-payment-card.svg"
          progress={50}
          radius={40}
          stroke={6}
        />

        <ProgressRing
          color="yellow"
          icon="/assets/icon-meal-food.svg"
          progress={60}
          radius={40}
          stroke={6}
        />

        <ProgressRing
          color="brown"
          icon="/assets/icon-clothes.svg"
          progress={70}
          radius={40}
          stroke={6}
        />

        <ProgressRing progress={30} radius={40} stroke={6} />
      </div>
      {/* Transaction history */}
      <div className="py-3.5 text-gray-500">
        <div className="w-full rounded-3xl px-5 py-3 bg-[#f6f6f6]">
          {/* Header */}
          <div className="">Recently transactions</div>
          <ListTransaction
            onViewMore={() => onViewMore()}
            loading={transactionLoading}
            transactions={transactions}
          />
        </div>
      </div>
    </div>
  );
}

export default TransactionPage;
