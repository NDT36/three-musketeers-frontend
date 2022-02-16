import React, { FC, useState } from 'react';
import Popup from 'components/Popup';
import CommonButton from 'components/CommonButton/Index';
import { IAccumulateItem } from '.';

interface IProps {
  source: IAccumulateItem;
}

const BtnEndAccumulate: FC<IProps> = (props) => {
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
        className="h-[50px] flex items-center justify-center text-2xl cursor-pointer border-b border-b-[silver]"
        onClick={handleOpenPopup}
      >
        Kết thúc sớm
      </div>
      <Popup title={'Kết thúc sớm tích lũy'} isVisible={popupVisible} onClose={handleClosePopup}>
        <div className="px-3">
          <div>{`Tích lũy "${props.source.name}" sẽ được chuyển tới danh sách tích lũy đã hoàn thành. Bạn có chắc chắn muốn kết thúc sớm tích lũy này không?`}</div>
          <div className="flex justify-center items-center py-5">
            <div className="w-1/2 px-5">
              <CommonButton onClick={handleClosePopup}>No</CommonButton>
            </div>
            <div className="w-1/2 px-5">
              <CommonButton>Yes</CommonButton>
            </div>
          </div>
        </div>
      </Popup>
    </>
  );
};

export default BtnEndAccumulate;
