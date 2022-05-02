import React, { FC } from 'react';
import classNames from 'classnames';
import { IItemListTransaction } from 'pages/HomePage';
import { formatCurrency, formatLongString, getCategoryById } from 'utils';
import { useSelector } from 'react-redux';
import { AppState } from 'state';
import { TransactionType } from 'types/enum';
import Loading from 'components/ListLoading';

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  loading?: boolean;
  isLoadMore?: boolean;
  transactions: IItemListTransaction[];
  onViewMore?: () => void;
  isOffPaging?: boolean;
}
const ListTransaction: FC<IProps> = function (props) {
  const { categories } = useSelector((state: AppState) => state.resources);

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
    <div className={classNames('w-full min-h-[296px] relative', props.children ? 'pb-5' : '')}>
      {/* Item */}
      {props.loading ? (
        <>
          <SkeletonTransaction />
          <SkeletonTransaction />
          <SkeletonTransaction />
          <SkeletonTransaction />
        </>
      ) : props.transactions?.length ? (
        props.transactions.map((item) => (
          <div className="py-1" key={item._id}>
            <div className="h-[60px] shadow rounded-md p-2 flex justify-between items-center">
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
              <div className="flex flex-col w-full pl-2.5 font-bold">
                {item.description ? (
                  <>
                    <div className="text-gray-700">{formatLongString(item.description, 28)}</div>
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
                <div className={classNames('font-bold', handleMoneyColor(item.type, item.money))}>
                  {item.money > 0 ? '+' + formatCurrency(item.money) : formatCurrency(item.money)}
                </div>
                <div className="text-xs">{new Date(item.createdAt).toLocaleDateString()}</div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center text-xl">Empty</div>
      )}
      {/* <div className="py-1">
        <div className="h-[60px] shadow rounded-md p-2 flex flex-col items-center">
          <div className="h-5">Showing 1 to 10 of 97 results</div>
          <div className="h-10">Showing 1 to 10 of 97 results</div>
        </div>
      </div> */}
      <Loading loading={!!props.isLoadMore} />
      {!!props?.transactions?.length && !props.isOffPaging && (
        <div className="text-center pt-2">
          <div onClick={props.onViewMore} className="underline cursor-pointer">
            View more...
          </div>
        </div>
      )}
      <div className="w-full absolute bottom-0 left-0">
        {!!props?.transactions.length && props.children}
      </div>
    </div>
  );
};

export default ListTransaction;
