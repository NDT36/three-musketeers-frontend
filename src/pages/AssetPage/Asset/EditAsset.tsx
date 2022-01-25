import React, { FC, useState } from 'react';
import Modal from 'components/Modal';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { IAssetSources } from '.';
import FormInput from 'components/FormInput';
import CommonButton from 'components/CommonButton/Index';
import FormTextArea from 'components/FormTextArea';
import { useSetLoading } from 'state/global/hooks';
import { useAlert } from 'react-alert';

interface IProps {
  title: string;
  className?: string;
  isLastItem?: boolean;
  source: IAssetSources;
}

interface IEditAssetParams {
  name: string;
  description?: string;
}

const EditAsset: FC<IProps> = (props) => {
  const { t } = useTranslation();
  const reactAlert = useAlert();
  const setLoading = useSetLoading();
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
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      reactAlert.success('Sửa thành công');
      handleCloseModal();
    }, 1000);
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
