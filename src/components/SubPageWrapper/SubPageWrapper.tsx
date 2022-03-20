import React, { FC } from 'react';
import iconBack from 'assets/icons-v2/icon-back.svg';
import { useNavigate } from 'react-router-dom';

interface IProps {
  title: string;
}

const SubPageWrapper: FC<IProps> = (props) => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <div>
      <div className="h-[35px] relative">
        <div className="text-2xl text-center font-bold">{props.title}</div>
        <div
          onClick={goBack}
          className="h-full w-[35px] flex justify-center items-center absolute top-0 right-0"
        >
          <img src={iconBack} alt="Back" />
        </div>
      </div>
      {props.children}
    </div>
  );
};

export default SubPageWrapper;
