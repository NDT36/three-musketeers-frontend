import Header from 'components/Header';
import React, { FC } from 'react';

interface IProps {}

const MorePage: FC<IProps> = (props) => {
  return (
    <div className="px-2">
      <Header title="Other" />
      <div>OtherPage</div>
    </div>
  );
};

export default MorePage;
