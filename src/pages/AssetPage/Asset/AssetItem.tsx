import React, { FC, useState } from 'react';
import iconMoreAction from 'assets/icons/icon-more-action.png';
import Modal from 'components/Modal';
import { IAssetSources } from '.';
import { formatCurrency } from 'utils';
import classnames from 'classnames';
import EditAsset, { IEditAssetParams } from './EditAsset';
import TransferAsset from './TransferAsset';
import DeleteItem from './DeleteItem';

interface IProps {
  source: IAssetSources;
  onDelete: (id: string) => void;
  onEdit: (id: string, source: IEditAssetParams) => void;
}

const ActiveBG = {
  true: 'bg-[silver]',
  false: '',
} as any;

const AssetItem: FC<IProps> = ({ source, onDelete, onEdit }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleDeleteItem = () => {
    handleCloseModal();
    onDelete(String(source.id));
  };

  const handleEditItem = (params: IEditAssetParams) => {
    handleCloseModal();
    onEdit(String(source.id), params);
  };

  return (
    <div
      className={classnames(
        'h-[60px] flex justify-center py-1 select-none',
        ActiveBG[String(modalVisible)]
      )}
    >
      <div
        className="h-full w-[50px] flex-shrink-0 flex-grow-0 border border-gray-300 rounded-md flex items-center justify-center"
        style={{
          backgroundColor: source.color || 'white',
        }}
      ></div>
      <div className="w-full h-full min-w-0 flex flex-col pl-2">
        <div className="font-bold whitespace-nowrap overflow-hidden text-ellipsis">
          {source.name}
        </div>
        <div className="min-w-0 text-neutral-500">{formatCurrency(Number(source.balance))}</div>
      </div>

      <div className="h-full w-[50px] flex-shrink-0 flex-grow-0 cursor-pointer flex items-center justify-center">
        <img className="rounded-lg" onClick={handleOpenModal} src={iconMoreAction} alt="more" />
      </div>

      {/* Modal menu select actions */}
      <Modal isVisible={modalVisible} title="" onClose={handleCloseModal}>
        <div className="px-4">
          <EditAsset title={'Sửa'} source={source} onEdit={handleEditItem} />
          <TransferAsset title={'Chuyển khoản'} />
          <TransferAsset title={'Điều chỉnh số dư'} />
          <DeleteItem source={source} onDelete={handleDeleteItem} />
        </div>
      </Modal>
    </div>
  );
};

export default AssetItem;
