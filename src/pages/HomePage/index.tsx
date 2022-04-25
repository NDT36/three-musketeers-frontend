import { callApi, logout } from 'api/axios';
import LinearWrapper from 'components/LinearWrapper';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from 'state';
import { formatCurrency, formatLongString } from 'utils';
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
import { RoutePath } from 'types/enum';
import ListLoading from 'components/ListLoading';
import { useAlert } from 'react-alert';
import { useLoading } from 'state/global/hooks';
import { fetchListTransactions } from 'api/transaction';
import { useTranslation } from 'react-i18next';

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
  const { sources } = useSelector((state: AppState) => state.resources);
  const [params, setParams] = useState({ pageIndex: 1, pageSize: 10 });

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
    setLoading(true);

    const { error, result } = await callApi(fetchListTransactions(params));
    if (error) reactAlert.error(t(`error.${error}`));

    if (!error && result?.data) {
      setTransactions(result.data);
    }

    setLoading(false);
  }, [reactAlert, setLoading, t, params]);

  useEffect(() => {
    fetchTransactions();
  }, [params]);
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
                  {handleCurrency()}
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
            <div className="h-[60px] flex justify-between items-center">
              <div className="w-[50px] h-[50px]">
                <div className="rounded-3xl w-[50px] h-[50px] bg-white flex items-center justify-center">
                  <img src={iconEat} alt="icon-eat" />
                </div>
              </div>
              <div className="flex flex-col w-full pl-2.5">
                <div className="text-gray-700 font-bold">Cơm rang dưa bò</div>
                <div className="text-xs">Food</div>
              </div>
              <div className="text-right">
                <div className="text-orange-500 font-bold">-50,000</div>
                <div className="text-xs">Mar 11</div>
              </div>
            </div>
            {/* Item */}
            <div className="h-[60px] flex justify-between items-center">
              <div className="w-[50px] h-[50px]">
                <div className="rounded-3xl w-[50px] h-[50px] bg-white flex items-center justify-center">
                  <img src={iconPayment} alt="icon-eat" />
                </div>
              </div>
              <div className="flex flex-col w-full pl-2.5">
                <div className="text-gray-700 font-bold">Nạp tiền vào tài khoản</div>
                <div className="text-xs">Payment</div>
              </div>
              <div className="text-right">
                <div className="text-[#2E58C5] font-bold">+20,000,000</div>
                <div className="text-xs">Mar 11</div>
              </div>
            </div>
            {/* Item */}
            <div className="h-[60px] flex justify-between items-center">
              <div className="w-[50px] h-[50px]">
                <div className="rounded-3xl w-[50px] h-[50px] bg-white flex items-center justify-center">
                  <img src={iconLendGray} alt="icon-eat" />
                </div>
              </div>
              <div className="flex flex-col w-full pl-2.5">
                <div className="text-gray-700 font-bold">Cho Mr.A vay tiền</div>
                <div className="text-xs">Lend</div>
              </div>
              <div className="text-right">
                <div className="text-orange-500 font-bold">-1,500,000</div>
                <div className="text-xs">Mar 11</div>
              </div>
            </div>
            {/* Item */}
            <div className="h-[60px] flex justify-between items-center">
              <div className="w-[50px] h-[50px]">
                <div className="rounded-3xl w-[50px] h-[50px] bg-white flex items-center justify-center">
                  <img src={iconSavingGray} alt="icon-eat" />
                </div>
              </div>
              <div className="flex flex-col w-full pl-2.5">
                <div className="text-gray-700 font-bold">Gửi vào tích lũy</div>
                <div className="text-xs">Saving</div>
              </div>
              <div className="text-right">
                <div className="text-[#04B489] font-bold">-1,100,000</div>
                <div className="text-xs">Mar 11</div>
              </div>
            </div>
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
