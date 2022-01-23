import { ACCESS_TOKEN } from 'api/axios';
import Menu from 'components/Menu';
import Cookies from 'js-cookie';
import CreatePage from 'pages/CreatePage';
import GroupPage from 'pages/GroupPage';
import HomePage from 'pages/HomePage';
import MorePage from 'pages/MorePage';
import NotiPage from 'pages/NotiPage';
import AssetPage from 'pages/AssetPage';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { RoutePath } from 'types/enum';

export default function PageWrapper() {
  if (!Cookies.get(ACCESS_TOKEN)) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="app-wrapper relative w-[375px] mx-auto border rounded-lg border-gray-200 h-full pb-20">
      <Routes>
        <Route path={RoutePath.HOME} element={<HomePage />} />
        <Route path={RoutePath.GROUP} element={<GroupPage />} />
        <Route path={RoutePath.CREATE} element={<CreatePage />} />
        <Route path={RoutePath.ASSET} element={<AssetPage />} />
        <Route path={RoutePath.MORE} element={<MorePage />} />
        <Route path={RoutePath.Notification} element={<NotiPage />} />
      </Routes>
      <Menu />
    </div>
  );
}
