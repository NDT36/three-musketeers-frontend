import Header from 'components/Header';
import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { RoutePath } from 'types/enum';
import Accumalte from './Accumulate';
import Asset from './Asset';
import TabItem from './TabItem';

export const AssetRoutePath = {
  ASSET: '/',
  ACCUMULATE: '/accumulate',
};
interface IProps {}

const AssetPage: FC<IProps> = (props) => {
  return (
    <div className="px-2">
      <Header title="Tài sản" />
      <div className="flex justify-center items-center h-[40px]">
        <TabItem to={RoutePath.ASSET} title="Nguồn tiền" />
        <TabItem to={RoutePath.ASSET + AssetRoutePath.ACCUMULATE} title="Tích Lũy" />
      </div>

      <Routes>
        <Route path={AssetRoutePath.ACCUMULATE} element={<Accumalte />} />
        <Route path={AssetRoutePath.ASSET} element={<Asset />} />
      </Routes>
    </div>
  );
};

export default AssetPage;
