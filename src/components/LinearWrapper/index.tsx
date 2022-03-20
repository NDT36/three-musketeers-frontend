/* eslint-disable */
import React, { FC } from 'react';

interface IProps {
  className?: string;
}

const LinearWrapper: FC<IProps> = (props) => {
  return <div className={'bg-white-linear ' + props.className || ''}>{props.children}</div>;
};

export default LinearWrapper;
