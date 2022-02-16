import React, { FC, useState } from 'react';
import iconAdd from 'assets/icons/icon-add.png';
import Modal from 'components/Modal';
import FormInput from 'components/FormInput';
import CommonButton from 'components/CommonButton/Index';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { FormikHelpers, useFormik } from 'formik';
import { useSetLoading } from 'state/global/hooks';
import AccumulateItem from './AccumulateItem';
import { formatCurrency } from 'utils';
import InputWithLabel from 'components/InputWithLabel';

interface IProps {}

export interface IAccumulateItem {
  id: string;
  userId?: string;
  name: string;
  total: string | number;
  balance: string | number;
  color?: string | null;
  startAt?: number;
  endAt?: number;
}

export interface ICreateAssetAccumulateParams {
  name: string;
  total: string | number;
  startDate?: string;
  endDate?: string;
}

const Accumalte: FC<IProps> = (props) => {
  const { t } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const setLoading = useSetLoading();

  const [sources, setSource] = useState<Array<IAccumulateItem>>([
    {
      id: 'asdfasdfasfq24124234',
      userId: 'asdjfhalwkjr324',
      name: '100 triệu đầu tiên',
      total: 100000000,
      balance: '10000000',
      color: 'pink',
    },
    {
      id: '1234werqwer12334',
      userId: 'asdjfhalwkjr324',
      name: 'Mua skin siêu phẩm Yasuo',
      total: 300000,
      balance: '60000',
      color: 'purple',
    },
  ]);

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const totalAccumulate = sources.reduce((a, b) => (a += Number(b.balance)), 0);

  const validationSchema: Yup.SchemaOf<ICreateAssetAccumulateParams> = Yup.object().shape({
    name: Yup.string().max(50, t('asset.invalidName')).required(t('asset.nameIsRequired')),
    total: Yup.number()
      .min(0, t('asset.invalidBalance'))
      .max(1000000000000000, t('asset.invalidBalcane'))
      .required(t('asset.balcaneIsRequired')),
    startDate: Yup.string(),
    endDate: Yup.string(),
  });

  const onSubmit = async (
    values: ICreateAssetAccumulateParams,
    { resetForm }: FormikHelpers<ICreateAssetAccumulateParams>
  ) => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSource([
        ...sources,
        {
          id: Date.now().toString(),
          userId: 'asdjfhalwkjr324',
          total: values.total,
          name: values.name,
          balance: 0,
          color: null,
        },
      ]);

      handleCloseModal();
      resetForm();
    }, 1000);
  };

  const formik = useFormik<ICreateAssetAccumulateParams>({
    initialValues: { name: '', total: '', startDate: '', endDate: '' },
    validationSchema,
    onSubmit,
  });

  return (
    <div>
      <div className="h-[50px] flex items-center border-b border-b-gray-400">
        Tổng tích lũy: <b className="pl-1">{formatCurrency(totalAccumulate)}</b>
      </div>
      <div className="flex justify-between py-2 text-xl">
        <div>Danh sách tích lũy:</div>
        <div className="flex justify-center items-center" onClick={() => handleOpenModal()}>
          <img className="w-[20px] h-[20px]" src={iconAdd} alt="icon add" />
          <div className="pl-1 cursor-pointer select-none">Tạo tích lũy</div>
        </div>
      </div>

      <div>
        {sources.map((source) => (
          <AccumulateItem key={source.id} source={source} />
        ))}
      </div>

      <Modal isVisible={modalVisible} title={'Tạo tích lũy'} onClose={handleCloseModal}>
        <form onSubmit={formik.handleSubmit} className="px-[10px]">
          <FormInput
            type="number"
            name="total"
            id="total"
            placeholder="Tích lũy bao nhiêu?"
            onChange={formik.handleChange}
            value={formik.values.total}
            onBlur={formik.handleBlur}
            touched={formik.touched.total}
            error={formik.errors.total}
          />

          <FormInput
            type="text"
            name="name"
            id="name"
            placeholder="Tích lũy cho việc gì?"
            onChange={formik.handleChange}
            value={formik.values.name}
            onBlur={formik.handleBlur}
            touched={formik.touched.name}
            error={formik.errors.name}
          />

          <InputWithLabel
            label="Ngày bắt đầu"
            type="datetime-local"
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
            type="datetime-local"
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
              Tạo
            </CommonButton>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Accumalte;
