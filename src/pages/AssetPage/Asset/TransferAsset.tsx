import React, { FC, useState } from 'react';
import Modal from 'components/Modal';

interface IProps {
  title: string;
}

const TransferAsset: FC<IProps> = (props) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  return (
    <>
      <div
        className="h-[50px] flex items-center justify-center text-2xl cursor-pointer border-b border-b-[silver]"
        onClick={handleOpenModal}
      >
        {props.title}
      </div>
      <Modal isVisible={modalVisible} title={props.title} onClose={handleCloseModal}>
        Sub modal
      </Modal>
    </>
  );
};

export default TransferAsset;
