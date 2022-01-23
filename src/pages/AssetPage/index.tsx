import Header from 'components/Header';
import React, { FC } from 'react';

interface IProps {}

const WalletPage: FC<IProps> = (props) => {
  return (
    <div className="px-2">
      <Header title="Tài sản" />
      <div className="flex justify-center items-center h-[40px]">
        <div className="w-1/2 h-full font-bold border-b-2 border-b-gray-400 flex items-center justify-center">
          Tài sản
        </div>
        <div className="w-1/2 h-full flex items-center justify-center">Tích Lũy</div>
      </div>
    </div>
  );
};

export default WalletPage;
