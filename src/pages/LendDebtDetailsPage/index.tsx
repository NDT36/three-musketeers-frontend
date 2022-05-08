import { callApi } from 'api/axios';
import { fetchDetailLend } from 'api/lend';
import IconCreateNew from 'assets/icons-v2/iconCreateNew';
import IconLend from 'assets/icons-v2/iconLend';
import classNames from 'classnames';
import Loading from 'components/ListLoading';
import SubPageWrapper from 'components/SubPageWrapper/SubPageWrapper';
import moment from 'moment';
import { IItemListTransaction } from 'pages/HomePage';
import { IListLend } from 'pages/LendPage';
import React, { FC, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import Chart, { ChartWrapperOptions } from 'react-google-charts';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { RoutePath, TransactionType } from 'types/enum';
import { formatCurrency } from 'utils';

export const data = [
  ['Task', 'Hours per Day'],
  ['Work', 11],
  ['Eat', 2],
  ['Commute', 2],
  ['Watch TV', 2],
  ['Sleep', 7],
];

export const options: ChartWrapperOptions['options'] = {
  // title: 'My Daily Activities',
};

export interface ILendDetails {
  _id: string;
  userId: string;
  target: string;
  money: number;
  total: number;
  type: number;
  status: number;
  description: string;
  updateAt: number;
  createdAt: number;
  history: IItemListTransaction[];
}

interface IProps {}

const LendDebtDetailsPage: FC<IProps> = (props) => {
  const reactAlert = useAlert();
  const { t } = useTranslation();
  const { id } = useParams<string>();
  const [details, setDetails] = useState<ILendDetails>();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const { error, result } = await callApi(fetchDetailLend(String(id)));

      if (error) reactAlert.error(t(`error.${error}`));

      if (!error && result?.data) {
        setDetails(result?.data);
      }
      setIsLoading(false);
    })();
  }, []);

  const SkeletonItem = () => (
    <div className="py-1 px-2">
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

  const handleMoneyColor = (type: TransactionType, money: number) => {
    if (type === TransactionType.LEND) {
      return money >= 0 ? 'text-[#04B489]' : 'text-[#F97C08]';
    }
    return money < 0 ? 'text-[#04B489]' : 'text-[#F97C08]';
  };

  return (
    <div className="px-2">
      <SubPageWrapper routeGoBack={RoutePath.LEND} title="">
        <div className="text-2xl font-bold flex items-center justify-center pb-3 min-h-[44px]">
          {isLoading ? <Loading loading={true} /> : details?.target || 'Details'}
        </div>
        {/* Chart */}
        <div className="flex items-center justify-center">
          <div className="rounded-xl p-3 bg-white text-gray-500 min-h-[140px] w-80 font-bold">
            <div className="flex justify-center items-center">
              <div className="flex flex-col items-center">
                <div className="tex-base">Remaining</div>
                <div className="py-1 text-3xl text-[#2E58C5] min-h-[44px]">
                  {isLoading ? (
                    <Loading loading={true} />
                  ) : (
                    formatCurrency(Number(details?.money) || 0)
                  )}
                </div>
              </div>
            </div>
            <div className="h-0.5 bg-slate-500 hr-gradient"></div>
            <div className="flex justify-center items-center">
              <div className="w-1/2 flex items-center flex-col">
                <div className="py-1">Collected</div>
                <div className="text-[#04B489] min-h-[24px]">
                  {isLoading ? (
                    <Loading loading={true} />
                  ) : (
                    formatCurrency(Number(details?.total) - Number(details?.money))
                  )}
                </div>
              </div>
              <div className="w-1/2 flex items-center flex-col">
                <div className="py-1">Total</div>
                <div className="text-[#F97C08] min-h-[24px]">
                  {isLoading ? (
                    <Loading loading={true} />
                  ) : (
                    formatCurrency(Number(details?.total) || 0)
                  )}
                </div>
              </div>
            </div>
            {/* <Chart chartType="PieChart" width="100%" data={data} options={options} /> */}
          </div>
        </div>
        <div className="h-[85px] flex justify-center items-center cursor-pointer font-bold">
          <div
            onClick={() =>
              navigate(
                RoutePath.COLLECT_LEND_DEBT.replace(':id', String(id)).replace(':type', 'lend')
              )
            }
            className="w-full px-6 py-2 flex justify-center items-center border bg-white border-[#F97C08] text-[#F97C08] rounded-[10px]"
          >
            <div className="pl-2">(+)</div>
          </div>
          <div className="w-10"></div>
          <div
            onClick={() =>
              navigate(
                RoutePath.COLLECT_LEND_DEBT.replace(':id', String(id)).replace(':type', 'collect')
              )
            }
            className="w-full px-6 py-2 flex justify-center items-center border bg-white border-[#04B489] text-[#04B489] rounded-[10px] "
          >
            <div className="pl-2">(-)</div>
          </div>
        </div>

        <div className="bg-white min-h-[400px] rounded-2xl text-gray-500 font-bold">
          <div className="flex justify-between items-center">
            <div className="p-3">History</div>
          </div>
          {/* List items */}
          {isLoading ? (
            <div>
              <SkeletonItem />
              <SkeletonItem />
              <SkeletonItem />
              <SkeletonItem />
            </div>
          ) : (
            <div>
              {details?.history?.length ? (
                details?.history.map((item) => (
                  <div className="py-1 px-2">
                    <div className="h-[60px] shadow rounded-md p-2 flex justify-between items-center cursor-pointer">
                      <div className="w-[50px] h-[50px]">
                        <div className="rounded-3xl w-[50px] h-[50px] bg-white flex items-center justify-center">
                          <IconLend />
                        </div>
                      </div>
                      <div className="flex flex-col w-full pl-2.5 font-bold">
                        <div>{item.description}</div>
                        <div className="flex items-center justify-start font-thin">
                          <div>{moment(item.actionAt).format('YYYY-MM-DD')}</div>
                        </div>
                      </div>
                      <div>
                        <div className={classNames(handleMoneyColor(item.type, item.money))}>
                          {formatCurrency(Math.abs(item.money))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex justify-center items-center">Empty</div>
              )}
            </div>
          )}
        </div>
      </SubPageWrapper>
    </div>
  );
};

export default LendDebtDetailsPage;
