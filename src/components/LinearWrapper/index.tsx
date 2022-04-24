/* eslint-disable */
import React, { FC } from 'react';

interface IProps {
  className?: string;
  customBg?: string;
}

const LinearWrapper: FC<IProps> = (props) => {
  return (
    <div
      className={
        (props.customBg ? props.customBg : 'bg-white-linear') + ' ' + props.className || ''
      }
    >
      {props.children}
    </div>
  );
};

export default LinearWrapper;
