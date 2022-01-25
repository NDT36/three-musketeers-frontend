import React, { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface IProps {
  active?: boolean;
  title: string;
  to: string;
}

const TabItem: FC<IProps> = (props) => {
  const location = useLocation();

  return location.pathname === props.to ? (
    <Link
      className="w-1/2 h-full font-bold border-b-2 border-b-gray-700 flex items-center justify-center"
      to={props.to}
    >
      {props.title}
    </Link>
  ) : (
    <Link to={props.to} className="w-1/2 h-full font-bold flex items-center justify-center">
      {props.title}
    </Link>
  );
};

export default TabItem;
