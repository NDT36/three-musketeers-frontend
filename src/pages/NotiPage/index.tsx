import Header from 'components/Header';
import React, { FC } from 'react';

interface IProps {}

const NotiPage: FC<IProps> = (props) => {
  return (
    <div className="px-2">
      <Header title="Notification" />
      <div>NotificationPage</div>
    </div>
  );
};

export default NotiPage;
