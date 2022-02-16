import React, { FC, useState } from 'react';
import Modal from 'components/Modal';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { IAssetSources } from '.';
import CommonButton from 'components/CommonButton/Index';
import FormTextArea from 'components/FormTextArea';
import { useAlert } from 'react-alert';
import InputWithLabel from 'components/InputWithLabel';

interface IProps {
  title: string;
  source: IAssetSources;
  onEdit: (source: IEditAssetParams, callback: () => void) => Promise<void>;
}

export interface IEditAssetParams {
  name: string;
  description?: string;
}

const EditAsset: FC<IProps> = (props) => {
  const { t } = useTranslation();
  const reactAlert = useAlert();
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const validationSchema: Yup.SchemaOf<IEditAssetParams> = Yup.object().shape({
    name: Yup.string().max(50, t('asset.invalidName')).required(t('asset.nameIsRequired')),
    description: Yup.string()
      .min(0, t('asset.invalidBalance'))
      .max(1000000000000000, t('asset.invalidBalcane')),
  });

  const onSubmit = async (values: IEditAssetParams) => {
    await props.onEdit(values, () => {
      handleCloseModal();
      reactAlert.success('Sửa thành công');
    });
  };

  const formik = useFormik<IEditAssetParams>({
    initialValues: { name: props.source.name, description: props.source.description },
    validationSchema,
    onSubmit,
  });

  return (
    <>
      <div
        className="h-[50px] flex items-center justify-center text-2xl cursor-pointer border-b border-b-[silver]"
        onClick={handleOpenModal}
      >
        {props.title}
      </div>
      <Modal isVisible={modalVisible} title={props.title} onClose={handleCloseModal}>
        <form onSubmit={formik.handleSubmit} className="px-[10px]">
          <InputWithLabel
            label="Tên tài khoản"
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

          <FormTextArea
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
              Sửa
            </CommonButton>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default EditAsset;
