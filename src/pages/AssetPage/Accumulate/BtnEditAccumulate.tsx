import React, { FC, useState } from 'react';
import Modal from 'components/Modal';
import { useTranslation } from 'react-i18next';
import { useAlert } from 'react-alert';
import { useSetLoading } from 'state/global/hooks';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import FormInput from 'components/FormInput';
import FormTextArea from 'components/FormTextArea';
import CommonButton from 'components/CommonButton/Index';
import InputWithLabel from 'components/InputWithLabel';
import { IAccumulateItem } from '.';
import moment from 'moment';

interface IProps {
  title: string;
  source: IAccumulateItem;
}

interface IEditAccumulte {
  name: string;
  total: number | string;
  startDate?: string;
  endDate?: string;
}

const BtnEditAccumulate: FC<IProps> = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { t } = useTranslation();
  const reactAlert = useAlert();
  const setLoading = useSetLoading();

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const validationSchema: Yup.SchemaOf<IEditAccumulte> = Yup.object().shape({
    name: Yup.string().max(50, t('asset.invalidName')).required(t('asset.nameIsRequired')),
    total: Yup.number()
      .min(0, t('asset.transferMoneyInvalid'))
      .required(t('asset.transferMoneyIsRequired')),
    startDate: Yup.string(),
    endDate: Yup.string(),
  });

  const onSubmit = async (values: IEditAccumulte) => {
    setLoading(true);

    setTimeout(() => {
      handleCloseModal();
      setLoading(false);
      reactAlert.success('Sửa thành công.');
    }, 1000);
  };

  const formik = useFormik<IEditAccumulte>({
    initialValues: {
      name: props.source.name,
      total: props.source.total,
      startDate: moment(props.source.startAt).format('MM/DD/YYYY'),
      endDate: moment(props.source.endAt).format('MM/DD/YYYY'),
    },
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
      <Modal
        isVisible={modalVisible}
        subTitle={props.source.name}
        title={'Sửa tích lũy'}
        onClose={handleCloseModal}
      >
        <form onSubmit={formik.handleSubmit} className="px-[10px]">
          <InputWithLabel
            type="text"
            name="name"
            id="name"
            label="Tên?"
            onChange={formik.handleChange}
            value={formik.values.name}
            onBlur={formik.handleBlur}
            touched={formik.touched.name}
            error={formik.errors.name}
          />

          <InputWithLabel
            label="Tổng tiền*"
            type="number"
            name="total"
            id="total"
            onChange={formik.handleChange}
            value={formik.values.total}
            onBlur={formik.handleBlur}
            touched={formik.touched.total}
            error={formik.errors.total}
          />

          <InputWithLabel
            label="Ngày bắt đầu"
            type="date"
            name="startDate"
            id="startDate"
            placeholder="Ngày bắt đầu"
            onChange={formik.handleChange}
            value={formik.values.startDate}
            onBlur={formik.handleBlur}
            touched={formik.touched.startDate}
            error={formik.errors.startDate}
          />

          <InputWithLabel
            label="Ngày kết thúc"
            type="date"
            name="endDate"
            id="endDate"
            placeholder="Ngày kết thúc"
            onChange={formik.handleChange}
            value={formik.values.endDate}
            onBlur={formik.handleBlur}
            touched={formik.touched.endDate}
            error={formik.errors.endDate}
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

export default BtnEditAccumulate;
