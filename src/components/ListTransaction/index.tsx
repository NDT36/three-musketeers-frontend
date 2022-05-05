import React, { FC, useState } from 'react';
import classNames from 'classnames';
import { IItemListTransaction } from 'pages/HomePage';
import { formatCurrency, formatLongString, getCategoryById } from 'utils';
import { useSelector } from 'react-redux';
import { AppState } from 'state';
import { RoutePath, TransactionType } from 'types/enum';
import Loading from 'components/ListLoading';
import Popup from 'components/Popup';
import moment from 'moment';

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  loading?: boolean;
  isLoadMore?: boolean;
  transactions: IItemListTransaction[];
  onViewMore?: () => void;
  isOffPaging?: boolean;
}
const ListTransaction: FC<IProps> = function (props) {
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [details, setDetails] = useState<IItemListTransaction>();

  const {
    resources: { sources, categories },
    setting: { isShowMoney },
  } = useSelector((state: AppState) => state);

  const onOpenModalDetails = (item: IItemListTransaction) => {
    setDetails(item);
    setIsShowDetail(true);
  };

  const onCloseModalDetails = () => {
    setIsShowDetail(false);
  };

  const getSourceById = (id: string) => sources?.find((item) => item._id === id);

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

  const handleDisplayMoney = (details: IItemListTransaction) => {
    if (!isShowMoney) return '******';
    return details.money > 0 ? '+' + formatCurrency(details.money) : formatCurrency(details.money);
  };
  return (
    <div className={classNames('w-full min-h-[296px] relative', props.children ? 'pb-5' : '')}>
      <Popup onClose={onCloseModalDetails} isVisible={isShowDetail}>
        <div className="w-full h-full px-5 py-3">
          <div className="min-h-10 relative flex items-center justify-center text-lg py-2">
            <div className="font-bold">{details?.description}</div>
            <a
              href={'#' + RoutePath.UPDATE_TRANSACTION.replace(':id', String(details?._id))}
              className="absolute right-[-10px] top-[-10px] cursor-pointer"
            >
              <svg
                width="26"
                height="26"
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_652_437)">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M20.7263 0.469727L25.5248 5.21354C26.1583 5.83985 26.1583 6.86393 25.5248 7.49024L22.8709 10.1139L15.7694 3.09343L18.4234 0.469727C19.0569 -0.156576 20.0928 -0.156576 20.7263 0.469727ZM15.0203 11.0428V11.0449C15.2173 11.2396 15.3157 11.4977 15.3157 11.7516C15.3157 12.0055 15.2173 12.2616 15.0203 12.4583V12.4605L15.0182 12.4626L8.58027 18.8293H8.57813C8.52249 18.8843 8.46042 18.9308 8.39835 18.971H8.39621C8.332 19.0112 8.26565 19.043 8.19717 19.0662C7.84188 19.189 7.42881 19.1086 7.14629 18.8293H7.14415V18.8272C7.08851 18.7721 7.04142 18.7108 7.00075 18.6494V18.6473C6.96009 18.5838 6.92799 18.5182 6.90444 18.4505C6.78031 18.0993 6.86164 17.6909 7.14201 17.4116V17.4095L13.5821 11.0428H13.5842C13.7811 10.8481 14.0422 10.7508 14.2991 10.7508C14.5559 10.7508 14.8149 10.8481 15.0139 11.0428H15.0203ZM9.73388 23.0864C7.81192 23.6747 5.89209 24.2607 3.97013 24.849C-0.545838 26.2306 -0.526575 27.1511 0.70622 22.8516L2.64744 16.0807L2.64102 16.0744L14.4254 4.4222L21.5268 11.4427L9.7403 23.0949L9.73388 23.0864ZM3.85884 17.2783L8.52249 21.8888C7.25973 22.2739 5.99697 22.659 4.73635 23.042C1.76993 23.9455 1.78278 24.5506 2.58966 21.7259L3.85884 17.2783Z"
                    fill="#5c5c5c"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_652_437">
                    <rect width="26" height="26" fill="#5c5c5c" />
                  </clipPath>
                </defs>
              </svg>
            </a>
          </div>
          <div className="h-10 relative flex items-center justify-center text-2xl">
            {details && (
              <div
                className={classNames('font-bold', handleMoneyColor(details.type, details.money))}
              >
                {handleDisplayMoney(details)}
              </div>
            )}
          </div>

          {details?.categoryId ? (
            <div className="h-8 relative grid grid-cols-5 gap-4 text-sm">
              <div className="font-bold col-span-2 flex items-center justify-start">Type</div>
              <div className="col-span-3 flex items-center justify-start">
                {getCategoryById(details.categoryId, categories)?.name}
              </div>
            </div>
          ) : (
            <div className="h-8 relative grid grid-cols-5 gap-4 text-sm">
              <div className="font-bold col-span-2 flex items-center justify-start">Type</div>
              <div className="col-span-3 flex items-center justify-start">
                {TransactionType[Number(details?.type)] || 'Unknown'}
              </div>
            </div>
          )}

          {details?.sourceId && (
            <div className="h-8 relative grid grid-cols-5 gap-4 text-sm">
              <div className="font-bold col-span-2 flex items-center justify-start">Source</div>
              <div className="col-span-3 flex items-center justify-start">
                {details?.sourceId && <div>{getSourceById(details.sourceId)?.name}</div>}
              </div>
            </div>
          )}

          <div className="h-8 relative grid grid-cols-5 gap-4 text-sm">
            <div className="font-bold col-span-2 flex items-center justify-start">Action date</div>
            <div className="col-span-3 flex items-center justify-start">
              {details?.actionAt && new Date(details.actionAt).toLocaleDateString()}
            </div>
          </div>
          <div className="h-8 relative grid grid-cols-5 gap-4 text-sm">
            <div className="font-bold col-span-2 flex items-center justify-start">Created date</div>
            <div className="col-span-3 flex items-center justify-start">
              {details?.createdAt &&
                new Date(details.createdAt).toLocaleDateString() +
                  ' ' +
                  moment(details.createdAt).format('hh:mm:ss')}
            </div>
          </div>
        </div>
      </Popup>
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
            <div
              onClick={() => onOpenModalDetails(item)}
              className="h-[60px] shadow rounded-md p-2 flex justify-between items-center cursor-pointer"
            >
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
                  {handleDisplayMoney(item)}
                </div>
                <div className="text-xs">{new Date(item.actionAt).toLocaleDateString()}</div>
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
