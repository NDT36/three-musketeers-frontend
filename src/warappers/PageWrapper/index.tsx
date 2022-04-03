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

const assignMenu = (component: React.ReactNode) => (
  <>
    {component}
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
        <Loader />
      </>
      <Routes>
        <Route path="/" element={<Navigate to={RoutePath.HOME} />} />
        <Route path={RoutePath.HOME} element={assignMenu(<HomePage />)} />
        <Route path={RoutePath.ASSET} element={assignMenu(<GroupPage />)} />
        <Route path={RoutePath.GROUP} element={assignMenu(<GroupPage />)} />
        <Route path={RoutePath.CREATE} element={assignMenu(<CreatePage />)} />
        <Route path={RoutePath.MORE} element={assignMenu(<MorePage />)} />
        <Route path={RoutePath.NOTIFICATION} element={assignMenu(<NotiPage />)} />
        <Route path={RoutePath.SOURCE} element={<SourcePage />} />
        <Route path={RoutePath.CREATE_SOURCE} element={<CreateSourcePage />} />
      </Routes>
    </div>
  );
};

export default PageWrapper;
