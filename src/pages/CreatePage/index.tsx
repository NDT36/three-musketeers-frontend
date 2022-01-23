import Header from 'components/Header';
import React, { FC } from 'react';

interface IProps {}

const CreatePage: FC<IProps> = (props) => {
  return (
    <div>
      <Header title="Transaction" />
      <div>TransactionPage</div>
    </div>
  );
};

export default CreatePage;
