import Header from 'components/Header';
import React, { FC } from 'react';

interface IProps {}

const MorePage: FC<IProps> = (props) => {
  return (
    <div>
      <Header title="Other" />
      <div>OtherPage</div>
    </div>
  );
};

export default MorePage;
