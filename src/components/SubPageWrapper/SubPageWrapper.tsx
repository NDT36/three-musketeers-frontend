import React, { FC } from 'react';
import iconBack from 'assets/icons-v2/icon-back.svg';
import { useNavigate } from 'react-router-dom';

interface IProps {
  title: string;
  onGoBack?: () => void;
  isDisableBtnBack?: boolean;
}

const SubPageWrapper: FC<IProps> = (props) => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <>
      {(!props.isDisableBtnBack || props.title) && (
        <div className="h-[35px] relative px-2 bg-primary">
          {<div className="text-2xl text-center font-bold">{props.title}</div>}
          {!props.isDisableBtnBack && (
            <div
              onClick={props.onGoBack || goBack}
              className="h-full w-[35px] flex justify-center items-center absolute top-0 right-0 cursor-pointer"
            >
              <img src={iconBack} alt="Back" />
            </div>
          )}
        </div>
      )}
      {props.children}
    </>
  );
};

export default SubPageWrapper;
