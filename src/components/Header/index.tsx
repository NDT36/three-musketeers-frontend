import React, { FC } from 'react';
import iconNotification from 'assets/icons/icon-notification.png';

type Props = {
  title: string;
};

const Header: FC<Props> = (props) => {
  return (
    <div className="flex flex-row h-[60px] border-b-2 border-b-gray-100">
      <div className="flex items-center h-full w-full text-2xl capitalize whitespace-nowrap overflow-hidden text-ellipsis">
        {props.title}
      </div>
      <div className="h-full w-[60px] flex items-center justify-center p-3">
        <img src={iconNotification} alt="Profile" />
      </div>
    </div>
  );
};

export default Header;
