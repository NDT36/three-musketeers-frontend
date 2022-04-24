import React, { FC, useEffect, useRef } from 'react';
import iconPencil from 'assets/icons-v2/icon-pencil.svg';

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title?: string;
  icon?: string;
  onEdit?: () => void;
}
const NoFormInput: FC<IProps> = function (props) {
  return (
    <div className="h-[90px] w-full flex flex-col">
      <div className="h-[25px]">{props.title}</div>
      <div className="h-full w-full bg-secondary flex flex-row items-center rounded-[12px]">
        {/* Icon */}
        <div className="h-[65px] w-[65px] p-[7.5px]">
          <div className="w-[50px] h-[50px] border border-white bg-white rounded-[17px] flex justify-center items-center">
            {props.icon && <img src={props.icon} alt="Edit" />}
          </div>
        </div>
        <div className="w-full p-[7.5px]">{props.children}</div>
        <div onClick={props.onEdit} className="h-[65px] w-[65px] p-[7.5px] cursor-pointer">
          <div className="w-[50px] h-[50px] rounded-[17px] flex justify-center items-center">
            <img src={iconPencil} alt="Edit" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoFormInput;
