import { callApi } from 'api/axios';
import { fetchListLend } from 'api/lend';
import IconCreateNew from 'assets/icons-v2/iconCreateNew';
import IconLend from 'assets/icons-v2/iconLend';
import Loading from 'components/ListLoading';
import React, { FC, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { RoutePath, TransactionType } from 'types/enum';
import { formatCurrency } from 'utils';

export interface IListLend {
  _id: string;
  userId: string;
  target: string;
  money: number;
  total: number;
  type: number;
  status: number;
  description: number;
  updateAt: number;
  createdAt: number;
}

interface IProps {}

const LendPage: FC<IProps> = (props) => {
  const reactAlert = useAlert();
  const { t } = useTranslation();
  const [lends, setLends] = useState<IListLend[]>();
  const [debts, setDebts] = useState<IListLend[]>();
  const [lendLoading, setLendLoading] = useState(false);
  const navigate = useNavigate();
  const TAB = {
    LEND: 1,
    DEBT: 2,
    1: 'lend',
    2: 'debt',
  };
  const [tab, setTab] = useState<number>(TAB.LEND);

  useEffect(() => {
    (async () => {
      setLendLoading(true);
      const { error, result } = await callApi(fetchListLend({}));

      if (error) reactAlert.error(t(`error.${error}`));

      if (!error && result?.data) {
        const lendData = result.data.filter((item) => item.type === TransactionType.LEND);
        const debtData = result.data.filter((item) => item.type === TransactionType.DEBT);
        setLends(lendData);
        setDebts(debtData);
      }
      setLendLoading(false);
    })();
  }, []);

  const ActiveTab: FC<{ isActive: boolean; onChangeTab: () => void }> = (props) => {
    return props.isActive ? (
      <div
        onClick={props.onChangeTab}
        className="cursor-pointer w-1/2  h-[55px] flex justify-center items-center"
      >
        {props.children}
      </div>
    ) : (
      <div
        onClick={props.onChangeTab}
        className="cursor-pointer opacity-40 rounded-t-xl shadow w-1/2 h-[55px] flex justify-center items-center bg-[#f6f6f6] border-b border-l border-gray-300 border-dashed"
      >
        {props.children}
      </div>
    );
  };

  const SkeletonItem = () => (
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
    <div className="px-2">
      <div className="text-2xl font-bold flex items-center justify-center h-16">
        {'Lend & debt'}
      </div>
      {/* Chart */}
      {/* <div className="px-5">
        <div className="rounded-xl p-3 bg-white min-h-[224px] flex items-center justify-center">
       
        </div>
      </div> */}
      <div className="h-[65px] flex justify-center items-center cursor-pointer">
        <div
          onClick={() =>
            navigate(
              RoutePath.CREATE_LEND_DEBT.replace(':type', String((TAB as any)[tab]).toLowerCase())
            )
          }
          className="border border-white bg-white font-bold text-gray-500 rounded-[10px] flex px-6 py-2"
        >
          <div className="flex justify-center items-center">
            <IconCreateNew />
          </div>
          <div className="pl-2">
            Create new {tab === TAB.LEND ? 'lend' : tab === TAB.DEBT ? 'debt' : ''}
          </div>
        </div>
      </div>
      <div className="bg-white min-h-[400px] rounded-2xl text-gray-500 font-bold">
        <div className="h-[55px] flex justify-center items-center text-2xl font-bold">
          <ActiveTab onChangeTab={() => setTab(TAB.LEND)} isActive={tab === TAB.LEND}>
            <div className=" text-[#F97C08]">Lend</div>
          </ActiveTab>

          <ActiveTab onChangeTab={() => setTab(TAB.DEBT)} isActive={tab === TAB.DEBT}>
            <div className="text-[#2E58C5]">Debt</div>
          </ActiveTab>
        </div>

        <div className="flex justify-between items-center">
          <div className="p-3">
            List {tab === TAB.LEND ? 'lend' : tab === TAB.DEBT ? 'debt' : ''}
          </div>
          <label htmlFor="checkbox-show-completed-lend" className="p-3 select-none">
            <input
              type="checkbox"
              name="checkbox-show-completed-lend"
              id="checkbox-show-completed-lend"
              className="mr-1"
            />
            Show completed
          </label>
        </div>

        {/* List items */}
        <div>
          {tab === TAB.LEND &&
            (lendLoading ? (
              <>
                <SkeletonItem />
                <SkeletonItem />
                <SkeletonItem />
                <SkeletonItem />
              </>
            ) : lends?.length ? (
              lends.map((item) => (
                <div
                  key={item._id}
                  className="py-1 px-2"
                  onClick={() => navigate(RoutePath.LEND_DEBT_DETAILS.replace(':id', item._id))}
                >
                  <div className="h-[60px] shadow rounded-md p-2 flex justify-between items-center cursor-pointer">
                    <div className="w-[50px] h-[50px]">
                      <div className="rounded-3xl w-[50px] h-[50px] bg-white flex items-center justify-center">
                        <IconLend />
                      </div>
                    </div>
                    <div className="flex flex-col w-full pl-2.5 font-bold">
                      <div>{item.target}</div>
                      <div className="flex items-center justify-start">
                        <div>{formatCurrency(item.total - item.money)}</div>/
                        <div>{formatCurrency(item.total)}</div>
                      </div>
                    </div>
                    <div className="px-3">{((item.total - item.money) * 100) / item.total}%</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex justify-center items-center">Empty</div>
            ))}
          {tab === TAB.DEBT &&
            (lendLoading ? (
              <>
                <SkeletonItem />
                <SkeletonItem />
                <SkeletonItem />
                <SkeletonItem />
              </>
            ) : debts?.length ? (
              debts.map((item) => (
                <div
                  className="py-1 px-2"
                  onClick={() => navigate(RoutePath.LEND_DEBT_DETAILS.replace(':id', item._id))}
                >
                  <div className="h-[60px] shadow rounded-md p-2 flex justify-between items-center cursor-pointer">
                    <div className="w-[50px] h-[50px]">
                      <div className="rounded-3xl w-[50px] h-[50px] bg-white flex items-center justify-center">
                        <IconLend />
                      </div>
                    </div>
                    <div className="flex flex-col w-full pl-2.5 font-bold">
                      <div>{item.target}</div>
                      <div className="flex items-center justify-start">
                        <div>{formatCurrency(item.total - item.money)}</div>/
                        <div>{formatCurrency(item.total)}</div>
                      </div>
                    </div>
                    <div className="px-3">{((item.total - item.money) * 100) / item.total}%</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex justify-center items-center">Empty</div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default LendPage;
