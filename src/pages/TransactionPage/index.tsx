import { callApi } from 'api/axios';
import LinearWrapper from 'components/LinearWrapper';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from 'state';
import { formatCurrency, handleChartData } from 'utils';
import iconShow from 'assets/icons-v2/icon-show.svg';
import iconSources from 'assets/icons-v2/icon-source.svg';
import iconLend from 'assets/icons-v2/icon-lend.svg';
import iconTransaction from 'assets/icons-v2/icon-transaction.svg';
import iconSaving from 'assets/icons-v2/icon-saving.svg';
import { MONTH_NAME, RoutePath } from 'types/enum';
import ListLoading from 'components/ListLoading';
import { useAlert } from 'react-alert';
import { fetchListTransactions, fetchTransactionStatistics } from 'api/transaction';
import { useTranslation } from 'react-i18next';
import Loading from 'components/ListLoading';
import ListTransaction from 'components/ListTransaction';
import ProgressRing from 'pages/ProgressRing';
import Chart, { ChartWrapperOptions } from 'react-google-charts';
import SubPageWrapper from 'components/SubPageWrapper/SubPageWrapper';
import moment from 'moment';

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

export interface ITransactionStatisticsResults {
  earned: {
    _id: string;
    amount: number;
    count: number;
  }[];
  spent: {
    _id: string;
    amount: number;
    count: number;
  }[];
}

const data = {
  earned: [
    {
      _id: '2022-04-20',
      amount: 500000,
      count: 1,
    },
    {
      _id: '2022-04-25',
      amount: 100000,
      count: 1,
    },
    {
      _id: '2022-04-24',
      amount: 3562923,
      count: 5,
    },
  ],
  spent: [
    {
      _id: '2022-04-24',
      amount: -8711000,
      count: 4,
    },
    {
      _id: '2022-04-25',
      amount: -800000,
      count: 11,
    },
  ],
};

export const options: ChartWrapperOptions['options'] = {
  chart: {
    // title: 'Analytics',
    // subtitle: 'In, Out, and Saving: 2014-2017',
  },
  series: {
    0: { color: '#2E58C5' },
    1: { color: '#F97C08' },
    // 2: { color: '#04B489' },
  },
  legend: { position: 'none' },
};

function TransactionPage() {
  const reactAlert = useAlert();
  const { t } = useTranslation();
  const [params, setParams] = useState<{
    pageIndex: number;
    pageSize: number;
    totalItems?: number;
    isOffPaging?: boolean;
  }>({ pageIndex: 1, pageSize: 10, totalItems: undefined, isOffPaging: false });
  const [transactionLoading, setTransactionLoading] = useState(false);
  const [transactions, setTransactions] = useState<IItemListTransaction[]>([]);
  const [statisticsParams, setStatisticsParams] = useState({
    startDate: moment().startOf('month').format('YYYY-MM-DD'),
    endDate: moment().endOf('month').format('YYYY-MM-DD'),
    currentMonth: moment().format('YYYY-MM'),
  });
  const [ignoreDateFilter, setIgnoreDateFilter] = useState(false);

  const [statistics, setStatistics] = useState({ totalSpent: 0, totalEarned: 0 });

  const [chartData, setChartData] = useState<any[]>([]);
  const [chartLoading, setChartLoading] = useState<boolean>(false);

  const fetchTransactions = useCallback(
    async (params) => {
      setTransactionLoading(true);

      const { error, result } = await callApi(
        fetchListTransactions({
          ...params,
          startDate: ignoreDateFilter ? '' : statisticsParams.startDate,
          endDate: ignoreDateFilter ? '' : statisticsParams.endDate,
        })
      );
      if (error) reactAlert.error(t(`error.${error}`));

      if (!error && result?.data) {
        setTransactions([...transactions, ...result.data]);
      }

      setTimeout(() => setTransactionLoading(false), 250);
    },
    [
      reactAlert,
      t,
      transactions,
      statisticsParams.startDate,
      statisticsParams.endDate,
      ignoreDateFilter,
    ]
  );

  const fetchChartData = useCallback(async (prams) => {
    setChartLoading(true);
    const { error, result } = await callApi(fetchTransactionStatistics(prams));
    if (error) reactAlert.error(t(`error.${error}`));

    if (!error && result?.data) {
      const initChartData = [
        `${MONTH_NAME[moment(statisticsParams.currentMonth, 'YYYY-MM').get('month')]} ${moment(
          statisticsParams.currentMonth,
          'YYYY-MM'
        ).get('year')}`,
        'Earn',
        'Spent',
      ];

      const totalEarned = result.data?.earned?.reduce(
        (acc, cur) => acc + Math.abs(Number(cur.amount)),
        0
      );
      const totalSpent = result.data?.spent?.reduce(
        (acc, cur) => acc + Math.abs(Number(cur.amount)),
        0
      );

      setStatistics({ totalEarned: totalEarned || 0, totalSpent: totalSpent || 0 });

      setChartData([
        initChartData,
        ...handleChartData(result?.data, prams.startDate, prams.endDate),
      ]);

      if (result.pageIndex === params.pageIndex) {
      }
    }
    setChartLoading(false);
  }, []);

  const onViewMore = (pageSize?: number) => {
    pageSize = pageSize || params.pageSize;

    if (params.totalItems !== undefined) {
      const totalPage = Math.ceil(Number(params.totalItems) / params.pageSize);

      if (params.pageIndex + 1 <= totalPage) {
        setParams({
          pageIndex: params.pageIndex + 1,
          pageSize,
          isOffPaging: params.pageIndex + 1 === totalPage,
        });

        return;
      }
    } else {
      setParams({ pageIndex: params.pageIndex + 1, pageSize });
    }
  };

  const onChangeChartMonth = (change = 0) => {
    const currentMonth = moment(statisticsParams.currentMonth, 'YYYY-MM').add(change, 'month');
    const startDate = currentMonth.startOf('month').format('YYYY-MM-DD');
    const endDate = currentMonth.endOf('month').format('YYYY-MM-DD');

    setStatisticsParams({
      ...statisticsParams,
      startDate,
      endDate,
      currentMonth: currentMonth.format('YYYY-MM'),
    });
    setParams({ ...params, pageIndex: 1 });
    setTransactions([]);
  };

  const onIgnoreDateFilter = (value: boolean) => {
    setIgnoreDateFilter(value);
    setParams({ ...params, pageIndex: 1 });
    setTransactions([]);
  };

  useEffect(() => {
    fetchTransactions(params);
  }, [params, statisticsParams.startDate, statisticsParams.endDate, ignoreDateFilter]);

  useEffect(() => {
    fetchChartData(statisticsParams);
  }, [statisticsParams]);

  return (
    <div className="px-2.5">
      <SubPageWrapper routeGoBack={RoutePath.HOME} title="Transactions">
        {/* Overview */}
        <div className="rounded-3xl p-5 mt-5 bg-white">
          <div className="h-[350px] text-gray-600">
            {chartLoading ? (
              <Loading loading={true} />
            ) : chartData && chartData.length > 1 ? (
              <Chart
                chartType="Line"
                width="100%"
                height="350px"
                data={chartData}
                options={options}
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-xl">Empty</div>
            )}
          </div>
        </div>

        {/* Transaction history */}
        <div className="h-6 w-full"></div>
        <div className="py-3.5 text-gray-500 relative ">
          <div className="absolute top-[-10px] w-full left-0 flex justify-center items-center">
            <div className="rounded-3xl text-sm font-bold bg-white h-14 w-72 shadow flex justify-center items-center p-2">
              <div className="pl-5 w-full">
                <div>Earned</div>
                <div className="text-[#2E58C5]">
                  {chartLoading ? (
                    <Loading loading={true} />
                  ) : (
                    `+${formatCurrency(statistics.totalEarned)}`
                  )}
                </div>
              </div>
              <div className="w-[0px] h-full border-r-2 border-dashed border-gray-400"></div>
              <div className="pl-5 w-full">
                <div>Spent</div>
                <div className="text-orange-500">
                  {chartLoading ? (
                    <Loading loading={true} />
                  ) : (
                    `-${formatCurrency(statistics.totalSpent)}`
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="w-full rounded-3xl px-5 py-3 bg-[#f6f6f6]">
            <div className="h-6 w-full"></div>
            <div className="py-2 flex justify-between items-center">
              <div className="cursor-pointer" onClick={() => onChangeChartMonth(-1)}>
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.7349 1.1377C18.9673 0.405273 17.0288 0 15 0C10.8594 0 7.10693 1.67969 4.39453 4.39453C3.0127 5.77393 1.89697 7.42676 1.1377 9.26514C0.405273 11.0327 0 12.9712 0 15C0 19.1406 1.67969 22.8931 4.39453 25.6055C5.77637 26.9873 7.4292 28.1006 9.26514 28.8623C11.0327 29.5947 12.9712 30 15 30C17.0288 30 18.9673 29.5947 20.7349 28.8623C22.5732 28.1006 24.2236 26.9873 25.6055 25.6055C26.9873 24.2236 28.1006 22.5708 28.8623 20.7349C29.5947 18.9673 30 17.0288 30 15C30 12.9712 29.5947 11.0327 28.8623 9.26514C28.1006 7.42676 26.9873 5.77637 25.6055 4.39453C24.2236 3.0127 22.5732 1.89697 20.7349 1.1377ZM16.0767 11.5063C16.6821 10.8911 16.6748 9.8999 16.0571 9.29688C15.4395 8.69385 14.4507 8.69873 13.8477 9.31641L9.28955 13.9478C8.69141 14.5581 8.69141 15.5322 9.28955 16.1401L13.7622 20.686C14.3677 21.3013 15.3564 21.3086 15.9717 20.7056C16.5869 20.1001 16.5942 19.1113 15.9912 18.4961L14.104 16.5796L19.4751 16.5479C20.3394 16.5405 21.0327 15.835 21.0254 14.9707C21.0181 14.1064 20.3125 13.4131 19.4482 13.4204L14.1675 13.4521L16.0767 11.5063ZM19.5361 4.04053C20.9839 4.64111 22.29 5.52246 23.3838 6.61621C24.4775 7.70996 25.3589 9.01611 25.9595 10.4639C26.5381 11.8579 26.8555 13.3911 26.8555 15C26.8555 16.6089 26.5356 18.1396 25.9595 19.5361C25.3589 20.9839 24.4775 22.29 23.3838 23.3838C22.29 24.4775 20.9839 25.3589 19.5361 25.9595C18.1396 26.5356 16.6089 26.8555 15 26.8555C13.3911 26.8555 11.8604 26.5356 10.4639 25.9595C9.01611 25.3589 7.70996 24.4775 6.61621 23.3838C5.52246 22.29 4.64111 20.9863 4.04053 19.5361C3.46191 18.1421 3.14453 16.6089 3.14453 15C3.14453 13.3911 3.46436 11.8604 4.04053 10.4639C4.64111 9.01611 5.52246 7.70996 6.61621 6.61621C7.70996 5.52246 9.01611 4.64111 10.4639 4.04053C11.8579 3.46191 13.3911 3.14453 15 3.14453C16.6089 3.14453 18.1396 3.46436 19.5361 4.04053Z"
                    fill="#105F49"
                  />
                </svg>
              </div>
              <div>
                {chartLoading ? (
                  <Loading loading={true} />
                ) : (
                  <div>
                    {statisticsParams.startDate} ~ {statisticsParams.endDate}
                  </div>
                )}
              </div>
              <div
                onClick={() => onChangeChartMonth(1)}
                className="cursor-pointer transform rotate-180"
              >
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.7349 1.1377C18.9673 0.405273 17.0288 0 15 0C10.8594 0 7.10693 1.67969 4.39453 4.39453C3.0127 5.77393 1.89697 7.42676 1.1377 9.26514C0.405273 11.0327 0 12.9712 0 15C0 19.1406 1.67969 22.8931 4.39453 25.6055C5.77637 26.9873 7.4292 28.1006 9.26514 28.8623C11.0327 29.5947 12.9712 30 15 30C17.0288 30 18.9673 29.5947 20.7349 28.8623C22.5732 28.1006 24.2236 26.9873 25.6055 25.6055C26.9873 24.2236 28.1006 22.5708 28.8623 20.7349C29.5947 18.9673 30 17.0288 30 15C30 12.9712 29.5947 11.0327 28.8623 9.26514C28.1006 7.42676 26.9873 5.77637 25.6055 4.39453C24.2236 3.0127 22.5732 1.89697 20.7349 1.1377ZM16.0767 11.5063C16.6821 10.8911 16.6748 9.8999 16.0571 9.29688C15.4395 8.69385 14.4507 8.69873 13.8477 9.31641L9.28955 13.9478C8.69141 14.5581 8.69141 15.5322 9.28955 16.1401L13.7622 20.686C14.3677 21.3013 15.3564 21.3086 15.9717 20.7056C16.5869 20.1001 16.5942 19.1113 15.9912 18.4961L14.104 16.5796L19.4751 16.5479C20.3394 16.5405 21.0327 15.835 21.0254 14.9707C21.0181 14.1064 20.3125 13.4131 19.4482 13.4204L14.1675 13.4521L16.0767 11.5063ZM19.5361 4.04053C20.9839 4.64111 22.29 5.52246 23.3838 6.61621C24.4775 7.70996 25.3589 9.01611 25.9595 10.4639C26.5381 11.8579 26.8555 13.3911 26.8555 15C26.8555 16.6089 26.5356 18.1396 25.9595 19.5361C25.3589 20.9839 24.4775 22.29 23.3838 23.3838C22.29 24.4775 20.9839 25.3589 19.5361 25.9595C18.1396 26.5356 16.6089 26.8555 15 26.8555C13.3911 26.8555 11.8604 26.5356 10.4639 25.9595C9.01611 25.3589 7.70996 24.4775 6.61621 23.3838C5.52246 22.29 4.64111 20.9863 4.04053 19.5361C3.46191 18.1421 3.14453 16.6089 3.14453 15C3.14453 13.3911 3.46436 11.8604 4.04053 10.4639C4.64111 9.01611 5.52246 7.70996 6.61621 6.61621C7.70996 5.52246 9.01611 4.64111 10.4639 4.04053C11.8579 3.46191 13.3911 3.14453 15 3.14453C16.6089 3.14453 18.1396 3.46436 19.5361 4.04053Z"
                    fill="#105F49"
                  />
                </svg>
              </div>
            </div>

            <div className="flex justify-start overflow-auto py-2 ">
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
            {/* Header */}
            <div className="flex justify-between">
              <div className="">History transactions</div>
              <div className="">
                <input
                  type="checkbox"
                  name="checkbox"
                  id="checkbox"
                  onChange={(e) => onIgnoreDateFilter(e.target.checked)}
                  checked={ignoreDateFilter}
                />
                <span className="pl-1">All recently transactions</span>
              </div>
            </div>
            <ListTransaction
              onViewMore={() => onViewMore(10)}
              loading={transactionLoading && params.pageIndex === 1}
              transactions={transactions}
              isLoadMore={transactionLoading && params.pageIndex !== 1}
              isOffPaging={transactions.length < params.pageSize || params.isOffPaging}
            />
          </div>
        </div>
      </SubPageWrapper>
    </div>
  );
}

export default TransactionPage;
