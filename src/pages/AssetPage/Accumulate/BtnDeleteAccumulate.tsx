import React, { FC, useState } from 'react';
import Popup from 'components/Popup';
import CommonButton from 'components/CommonButton/Index';
import { IAccumulateItem } from '.';

interface IProps {
  source: IAccumulateItem;
  onDelete: () => void;
}

const BtnDeleteAccumulate: FC<IProps> = (props) => {
  const [popupVisible, setPopupVisible] = useState(false);

  const handleOpenPopup = () => {
    setPopupVisible(true);
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
  };

  return (
    <>
      <div
        className="h-[50px] flex items-center justify-center text-2xl cursor-pointer text-red-500"
        onClick={handleOpenPopup}
      >
        Xóa
      </div>
      <Popup title={'Xóa tích lũy'} isVisible={popupVisible} onClose={handleClosePopup}>
        <div className="px-3">
          <div>{`Bạn có chắc chắn muốn xóa tích lũy "${props.source.name}" không?`}</div>
          <div className="flex justify-center items-center py-5">
            <div className="w-1/2 px-5">
              <CommonButton onClick={handleClosePopup}>No</CommonButton>
            </div>
            <div className="w-1/2 px-5">
              <CommonButton className="text-red-500" onClick={props.onDelete}>
                Yes
              </CommonButton>
            </div>
          </div>
        </div>
      </Popup>
    </>
  );
};

export default BtnDeleteAccumulate;
