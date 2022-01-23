/* eslint-disable */
import Bubles from 'assets/icons/bubbles.svg';
import React, { FC } from 'react';

interface IProps {
  loading: boolean;
  messages?: string;
}

const Loader: FC<IProps> = (props) => {
  return (
    <>
      {props.loading && (
        <div className="absolute z-0 h-screen w-screen top-0 left-0 select-none">
          <div className="flex items-center justify-center bg-slate-600/25 h-screen w-screen">
            <img className="w-36 sm:w-24" src={Bubles} />
            {/* <div className="-m-7 text-yellow-100 text-2xl font-bold">{props.messages}</div> */}
          </div>
        </div>
      )}
    </>
  );
};

export default Loader;
