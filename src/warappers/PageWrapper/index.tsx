import { ACCESS_TOKEN } from 'api/axios';
import Menu from 'components/Menu';
import Cookies from 'js-cookie';
import CreatePage from 'pages/CreatePage';
import GroupPage from 'pages/GroupPage';
import HomePage from 'pages/HomePage';
import MorePage from 'pages/MorePage';
import NotiPage from 'pages/NotiPage';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { RoutePath } from 'types/enum';
import UserUpdater from 'state/user/updater';
import Loader from 'components/Loader';
import SourcePage from 'pages/SourcePage';
import CreateSourcePage from 'pages/CreateSource';
import EditSourcePage from 'pages/EditSourcePage';
import EditBalancePage from 'pages/EditBalancePage';
import TransferMoneyPage from 'pages/TransferBalancePage';
import { CategoryUpdater, SourceUpdater } from 'state/resources/updater';
import TransactionPage from 'pages/TransactionPage';
import LendPage from 'pages/LendPage';
import SavingPage from 'pages/SavingPage';
import UpdateTransactionPage from 'pages/EditTransactionPage';
import LendDebtDetailsPage from 'pages/LendDebtDetailsPage';
import CreateLendPage from 'pages/CreateLendPage';
import CreateCollectLendDebtPage from 'pages/CollectLendDebtPage';

const assignMenu = (component: React.ReactNode) => (
  <>
    {component}
    <div className="h-20"></div>
    <Menu />
  </>
);

const PageWrapper = () => {
  if (!Cookies.get(ACCESS_TOKEN)) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="h-full app-wrapper relative mx-auto rounded-tl-lg rounded-tr-lg bg-primary pt-5">
      <>
        <UserUpdater />
        <SourceUpdater />
        <CategoryUpdater />
        <Loader />
      </>
      <Routes>
        <Route path="/" element={<Navigate to={RoutePath.HOME} />} />
        <Route path={RoutePath.HOME} element={assignMenu(<HomePage />)} />
        <Route path={RoutePath.GROUP} element={assignMenu(<GroupPage />)} />
        <Route path={RoutePath.CREATE} element={assignMenu(<CreatePage />)} />
        <Route path={RoutePath.MORE} element={assignMenu(<MorePage />)} />
        <Route path={RoutePath.NOTIFICATION} element={assignMenu(<NotiPage />)} />
        <Route path={RoutePath.SOURCE} element={assignMenu(<SourcePage />)} />
        <Route path={RoutePath.CREATE_SOURCE} element={assignMenu(<CreateSourcePage />)} />
        <Route path={RoutePath.EDIT_SOURCE} element={assignMenu(<EditSourcePage />)} />
        <Route path={RoutePath.EDIT_SOURCE_BALANCE} element={assignMenu(<EditBalancePage />)} />
        <Route path={RoutePath.TRANSFER_MONEY} element={assignMenu(<TransferMoneyPage />)} />
        <Route path={RoutePath.TRANSACTION} element={assignMenu(<TransactionPage />)} />
        <Route path={RoutePath.LEND} element={assignMenu(<LendPage />)} />
        <Route path={RoutePath.SAVING} element={assignMenu(<SavingPage />)} />
        <Route
          path={RoutePath.UPDATE_TRANSACTION}
          element={assignMenu(<UpdateTransactionPage />)}
        />
        <Route path={RoutePath.LEND_DEBT_DETAILS} element={assignMenu(<LendDebtDetailsPage />)} />
        <Route path={RoutePath.CREATE_LEND_DEBT} element={assignMenu(<CreateLendPage />)} />
        <Route
          path={RoutePath.COLLECT_LEND_DEBT}
          element={assignMenu(<CreateCollectLendDebtPage />)}
        />
      </Routes>
    </div>
  );
};

export default PageWrapper;
