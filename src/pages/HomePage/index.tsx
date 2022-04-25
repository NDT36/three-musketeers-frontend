import { callApi, logout } from 'api/axios';
import LinearWrapper from 'components/LinearWrapper';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from 'state';
import { formatCurrency, formatLongString, getCategoryById } from 'utils';
import Chart, { ChartWrapperOptions } from 'react-google-charts';
import iconShow from 'assets/icons-v2/icon-show.svg';
import iconSources from 'assets/icons-v2/icon-source.svg';
import iconLend from 'assets/icons-v2/icon-lend.svg';
import iconTransaction from 'assets/icons-v2/icon-transaction.svg';
import iconEat from 'assets/icons-v2/icon-eat.svg';
import iconSaving from 'assets/icons-v2/icon-saving.svg';
import iconSavingGray from 'assets/icons-v2/icon-saving-2.svg';
import iconLendGray from 'assets/icons-v2/icon-lend-2.svg';
import iconPayment from 'assets/icons-v2/icon-payment.svg';
import { RoutePath, TransactionType } from 'types/enum';
import ListLoading from 'components/ListLoading';
import { useAlert } from 'react-alert';
import { useLoading } from 'state/global/hooks';
import { fetchListTransactions } from 'api/transaction';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import Loading from 'components/ListLoading';

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

export const data = [
  ['Recently data', 'In', 'Out', 'Saving'],
  ['10/2021', 1000000, 400000, 200000],
  ['11/2021', 1170000, 460000, 250000],
  ['12/2021', 600000, 1120000, 300000],
  ['01/2022', 1044030, 500040, 350000],
  ['02/2022', 100030, 900040, 350000],
  ['03/2022', 20000, 10000, 10000],
];

export const options: ChartWrapperOptions['options'] = {
  chart: {
    title: 'Analytics',
    // subtitle: 'In, Out, and Saving: 2014-2017',
  },
  series: {
    0: { color: '#2E58C5' },
    1: { color: '#F97C08' },
    2: { color: '#04B489' },
  },
  legend: { position: 'none' },
};

function HomePage() {
  const reactAlert = useAlert();
  const setLoading = useLoading();
  const { t } = useTranslation();
  const profile = useSelector((state: AppState) => state.user.profile);
  const { sources, categories } = useSelector((state: AppState) => state.resources);
  const [params, setParams] = useState({ pageIndex: 1, pageSize: 4 });
  const [transactionLoading, setTransactionLoading] = useState(false);

  const [transactions, setTransactions] = useState<IItemListTransaction[]>([]);

  const totalBalance = sources ? sources.reduce((a, b) => a + Number(b.balance), 0) : 0;

  const formatName = (name: string) => {
    const result = formatLongString(name, 20);
    return result;
  };

  const handleCurrency = () => {
    return sources ? formatCurrency(totalBalance) || 0 : <ListLoading loading={true} />;
  };

  const fetchTransactions = useCallback(async () => {
    setTransactionLoading(true);

    const { error, result } = await callApi(fetchListTransactions(params));
    if (error) reactAlert.error(t(`error.${error}`));

    if (!error && result?.data) {
      setTransactions(result.data);
    }

    setTransactionLoading(false);
  }, [reactAlert, setLoading, t, params]);

  const handleMoneyColor = (type: TransactionType, money: number) => {
    switch (type) {
      case TransactionType.EXPENSE:
        return 'text-orange-500';

      case TransactionType.INCOME:
        return 'text-[#2E58C5]';

      case TransactionType.SAVING:
        return 'text-[#04B489]';

      case TransactionType.UPDATE_BALANCE:
        return money < 0 ? 'text-orange-500' : 'text-[#2E58C5]';

      default:
        return 'text-[#04B489]';
    }
  };

  const handleIconTransaction = (type: TransactionType, categoryAvatar?: string) => {
    switch (type) {
      case TransactionType.EXPENSE:
        return categoryAvatar;

      case TransactionType.INCOME:
        return '/assets/icon-payment-card.svg';

      case TransactionType.UPDATE_BALANCE:
        return '/assets/icon-payment-card.svg';

      case TransactionType.SAVING:
        return '/assets/icon-saving.svg';

      default:
        return '/assets/icon-payment-card.svg';
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [params]);

  const SkeletonTransaction = () => (
    <div className="py-1">
      <div className="h-[60px] shadow rounded-md p-3">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-slate-200 h-10 w-10"></div>
          <div className="flex-1 space-y-6 py-1">
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                <div className="h-2 bg-slate-200 rounded col-span-2"></div>
              </div>
              <div className="h-2 bg-slate-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <div className="px-2.5">
      {/* Header */}
      <div className="relative px-5 mb-2.5 h-[50px] flex justify-between">
        <div>
          <div className="text-sm text-[#F6F6F6]">Welcome</div>
          <div className="text-xl font-bold">{formatName(profile?.name || 'There!')}</div>
        </div>
        <div className="w-[50px] h-[50px]">
          <img
            src={profile?.avatar}
            referrerPolicy="no-referrer"
            className="rounded-[50px]"
            alt="Avt"
            srcSet=""
          />
        </div>
      </div>
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
                  <div className="h-full w-20">
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
                  </div>
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
      {/* Transaction history */}
      <div className="py-3.5 text-gray-500">
        <div className="w-full rounded-3xl px-5 py-3 bg-[#f6f6f6]">
          {/* Header */}
          <div>Transactions</div>
          <div className="w-full">
            {/* Item */}
            {transactionLoading ? (
              <>
                <SkeletonTransaction />
                <SkeletonTransaction />
                <SkeletonTransaction />
                <SkeletonTransaction />
              </>
            ) : (
              transactions.map((item) => (
                <div className="py-1" key={item._id}>
                  <div className="h-[60px] shadow rounded-md p-4 flex justify-between items-center">
                    <div className="w-[50px] h-[50px]">
                      <div className="rounded-3xl w-[50px] h-[50px] bg-white flex items-center justify-center">
                        <img
                          src={handleIconTransaction(
                            item.type,
                            getCategoryById(item.categoryId, categories)?.avatar
                          )}
                          alt="icon-eat"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col w-full pl-2.5">
                      {item.description ? (
                        <>
                          <div className="text-gray-700 font-bold">{item.description}</div>
                          <div className="text-xs">
                            {getCategoryById(item.categoryId, categories)?.name}
                          </div>
                        </>
                      ) : (
                        <div className="text-gray-700 font-bold">
                          {getCategoryById(item.categoryId, categories)?.name}
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <div
                        className={classNames('font-bold', handleMoneyColor(item.type, item.money))}
                      >
                        {formatCurrency(item.money)}
                      </div>
                      <div className="text-xs">{new Date(item.createdAt).toLocaleDateString()}</div>
                    </div>
                  </div>
                </div>
              ))
            )}
            <div className="text-center">
              <a href="/" className="underline">
                View more...
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Chart */}
      <div className="py-3.5">
        <div className="rounded-3xl p-5 bg-white">
          <Chart chartType="Bar" width="100%" height="350px" data={data} options={options} />
          <div className="text-red-400 flex justify-start">
            <div className="flex items-center  text-[#2E58C5]">
              <div className="h-4 w-10 bg-[#2E58C5] border border-gray-300 mx-3"></div>
              <div>In</div>
            </div>
            <div className="flex items-center  text-[#F97C08]">
              <div className="h-4 w-10 bg-[#F97C08] border border-gray-300 mx-3"></div>
              <div>Out</div>
            </div>
            <div className="flex items-center  text-[#04B489]">
              <div className="h-4 w-10 bg-[#04B489] border border-gray-300 mx-3"></div>
              <div>Saving</div>
            </div>
          </div>
          <div className="text-center text-gray-500">
            <a href="/" className="underline">
              View more...
            </a>
          </div>
        </div>
      </div>

      <div></div>
      <div onClick={() => logout()}>Logout</div>
    </div>
  );
}

export default HomePage;
