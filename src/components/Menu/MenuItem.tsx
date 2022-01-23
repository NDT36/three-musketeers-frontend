/* eslint-disable */
import React, { FC } from 'react';
import { MenuKey } from 'types/enum';

interface IProps {
  active?: boolean;
  icon?: string;
  label: MenuKey;
  onChangeTab: (key: MenuKey) => void;
}

const MenuItem: FC<IProps> = (props) => {
  return (
    <div onClick={() => props.onChangeTab(props.label)} className="w-1/5 relative p">
      {props.active ? (
        <div className="border border-gray-300 relative h-full flex items-center justify-center rounded-md bg-white">
          {props.label}
          <div className="absolute top-3/4 left-[45%] w-[6px] h-[6px] rounded-xl bg-green-500"></div>
        </div>
      ) : (
        <div className="relative h-full flex items-center justify-center rounded-lg">
          <img src={props.icon} alt={props.label} />
        </div>
      )}
    </div>
  );
};

export default MenuItem;
