import React, { FC, useState } from 'react';
import AssetItem from './AssetItem';
import iconAdd from 'assets/icons/icon-add.png';
import Modal from 'components/Modal';
import FormInput from 'components/FormInput';
import FormTextAreaInput from 'components/FormTextArea';
import CommonButton from 'components/CommonButton/Index';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { FormikHelpers, useFormik } from 'formik';
import { useSetLoading } from 'state/global/hooks';
import { IEditAssetParams } from './EditAsset';

interface IProps {}

export interface IAssetSources {
  id?: string;
  userId?: string;
  name: string;
  balance: string | number;
  description: string;
  color?: string | null;
}

export interface ICreateAssetSourcesParams {
  name: string;
  balance: string | number;
  description?: string;
}

const Asset: FC<IProps> = (props) => {
  const { t } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const setLoading = useSetLoading();

  const [sources, setSource] = useState<Array<IAssetSources>>([
    {
      id: 'asdfasdfasfq24124234',
      userId: 'asdjfhalwkjr324',
      name: 'Tài khoản ngân hàng ACB',
      balance: '100000000',
      description: 'Ngân hàng ACB chi nhánh Đền Lừ',
      color: 'green',
    },
    {
      id: '1234werqwer12334',
      userId: 'asdjfhalwkjr324',
      name: 'Tài khoản ví',
      balance: '2000000',
      description: 'Tài khoản tiền mặt đang sử dụng',
      color: 'purple',
    },
    {
      id: 'asdfasdfasfq2412313124234',
      userId: 'asdjfhalwkjr324',
      name: 'Tài khoản ngân hàng Techcombank',
      balance: '0',
      description: 'Tài khoản này mở năm 2020 tại chi nhánh Trần Duy Hưng',
      color: 'pink',
    },
  ]);

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleDeleteItem = (id: string) => {
    setSource(sources.filter((item) => item.id !== id));
  };

  const handleEditItem = (id: string, values: IEditAssetParams) => {
    const item = sources.find((item) => item.id === id);
    Object.assign(item, values);

    setSource([...sources]);
  };

  const validationSchema: Yup.SchemaOf<ICreateAssetSourcesParams> = Yup.object().shape({
    name: Yup.string().max(50, t('asset.invalidName')).required(t('asset.nameIsRequired')),
    balance: Yup.number()
      .min(0, t('asset.invalidBalance'))
      .max(1000000000000000, t('asset.invalidBalcane'))
      .required(t('asset.balcaneIsRequired')),
    description: Yup.string()
      .min(0, t('asset.invalidBalance'))
      .max(1000000000000000, t('asset.invalidBalcane')),
  });

  const onSubmit = async (
    values: ICreateAssetSourcesParams,
    { resetForm }: FormikHelpers<ICreateAssetSourcesParams>
  ) => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSource([
        ...sources,
        {
          id: Date.now().toString(),
          userId: 'asdjfhalwkjr324',
          name: values.name,
          balance: values.balance,
          description: values.description || '',
          color: null,
        },
      ]);

      handleCloseModal();
      resetForm();
    }, 1000);
  };

  const formik = useFormik<ICreateAssetSourcesParams>({
    initialValues: { name: '', balance: '', description: '' },
    validationSchema,
    onSubmit,
  });

  return (
    <div>
      <div className="h-[50px] flex items-center border-b border-b-gray-400">
        Tổng tiền: <b className="pl-1">102.000.000</b>
      </div>
      <div className="flex justify-between py-2 text-xl">
        <div>Danh sách tài khoản:</div>
        <div className="flex justify-center items-center" onClick={() => handleOpenModal()}>
          <img className="w-[20px] h-[20px]" src={iconAdd} alt="icon add" />
          <div className="pl-1 cursor-pointer select-none">Thêm tài khoản</div>
        </div>
      </div>

      <div>
        {sources.map((source) => (
          <AssetItem
            key={source.id}
            source={source}
            onDelete={handleDeleteItem}
            onEdit={handleEditItem}
          />
        ))}
      </div>

      <Modal isVisible={modalVisible} title={'Tạo nguồn tiền'} onClose={handleCloseModal}>
        <form onSubmit={formik.handleSubmit} className="px-[10px]">
          <FormInput
            type="number"
            name="balance"
            id="balance"
            placeholder="Số dư ban đầu"
            onChange={formik.handleChange}
            value={formik.values.balance}
            onBlur={formik.handleBlur}
            touched={formik.touched.balance}
            error={formik.errors.balance}
          />

          <FormInput
            type="text"
            name="name"
            id="name"
            placeholder="Tên tài khoản."
            onChange={formik.handleChange}
            value={formik.values.name}
            onBlur={formik.handleBlur}
            touched={formik.touched.name}
            error={formik.errors.name}
          />

          <FormTextAreaInput
            label={'Chú thích'}
            name="description"
            id="description"
            onChange={formik.handleChange}
            value={formik.values.description}
            onBlur={formik.handleBlur}
            touched={formik.touched.description}
            error={formik.errors.description}
          />

          <div className="h-[80px] flex items-center ">
            <CommonButton type="submit" className="font-bold text-xl">
              Tạo
            </CommonButton>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Asset;
