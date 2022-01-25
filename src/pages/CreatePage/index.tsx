import Header from 'components/Header';
import React, { FC } from 'react';

interface IProps {}

const CreatePage: FC<IProps> = (props) => {
  return (
    <div className="px-2">
      <Header title="Transaction" />
      <div>TransactionPage</div>
    </div>
  );
};

export default CreatePage;
