import React, { FC, useState } from 'react';
import YesNoPopup from 'components/YesNoPopup';
import { IAssetSources } from '.';

interface IProps {
  source: IAssetSources;
}

const DeleteItem: FC<IProps> = (props) => {
  const [popupVisible, setPopupVisible] = useState(true);

  const handleClosePopup = () => {
    setPopupVisible(false);
  };

  const handleOpenPopup = () => {
    setPopupVisible(true);
  };

  return (
    <>
      <div
        className="h-[50px] flex items-center justify-center text-2xl cursor-pointer text-red-500"
        onClick={handleOpenPopup}
      >
        Xóa
      </div>
      <YesNoPopup title={'Xóa nguồn tiền'} isVisible={popupVisible} onClose={handleClosePopup}>
        <div>Bạn có chắc chắn muốn xóa nguồn tiền này không?</div>
      </YesNoPopup>
    </>
  );
};

export default DeleteItem;
