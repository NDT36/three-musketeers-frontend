import Header from 'components/Header';
import React, { FC } from 'react';

interface IProps {}

const GroupPage: FC<IProps> = (props) => {
  return (
    <div>
      <Header title="Group" />
      <div>GroupPage</div>
    </div>
  );
};

export default GroupPage;
