/* eslint-disable */
import Bubles from 'assets/icons/bubbles.svg';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from 'state';

interface IProps {}

const Loader: FC<IProps> = (props) => {
  const loading = useSelector((state: AppState) => state.global.loading);
  return (
    <>
      {loading && (
        <div className="fixed z-50 h-screen w-screen top-0 left-0 select-none">
          <div className="flex items-center justify-center bg-slate-600/25 h-screen w-screen">
            <img className="w-36 sm:w-24" src={Bubles} />
          </div>
        </div>
      )}
    </>
  );
};

export default Loader;
