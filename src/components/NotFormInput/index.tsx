import React, { FC } from 'react';
import iconPencil from 'assets/icons-v2/icon-pencil.svg';
import classNames from 'classnames';

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title?: string;
  icon?: string;
  onEdit?: () => void;
  iconRounded?: boolean;
  isDisableEdit?: boolean;
  disabled?: boolean;
}
const NoFormInput: FC<IProps> = function (props) {
  return (
    <div className="h-[90px] w-full flex flex-col " onClick={props.onEdit}>
      <div className="h-[25px]">{props.title}</div>
      <div className="relative h-full w-full bg-secondary flex flex-row items-center shadow rounded-[12px]">
        {props.disabled && (
          <div className="w-full h-full absolute top-0 left-0 bg-secondary opacity-70 rounded-[12px]"></div>
        )}
        {/* Icon */}
        <div className="h-[65px] w-[65px] p-[7.5px]">
          <div
            className={classNames(
              'w-[50px] h-[50px] border border-white bg-white flex justify-center items-center',
              props.iconRounded ? 'rounded-full' : 'rounded-[17px]'
            )}
          >
            {props.icon && <img src={props.icon} alt="Edit" />}
          </div>
        </div>
        <div className="w-full p-[7.5px]">{props.children}</div>
        {!props.isDisableEdit && (
          <div className="h-[65px] w-[65px] p-[7.5px] cursor-pointer">
            <div className="w-[50px] h-[50px] rounded-[17px] flex justify-center items-center">
              <img src={iconPencil} alt="Edit" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoFormInput;
