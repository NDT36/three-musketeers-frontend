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
import { IAssetSources } from '.';
import { formatCurrency } from 'utils';

interface IProps {
  title: string;
  source: IAssetSources;
}

interface IEditBalance {
  balance: number | string;
  sourceId: string;
  actionAt: string;
  description?: string;
}

const BtnEditBalance: FC<IProps> = (props) => {
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

  const validationSchema: Yup.SchemaOf<IEditBalance> = Yup.object().shape({
    balance: Yup.number()
      .min(0, t('asset.transferMoneyInvalid'))
      .required(t('asset.transferMoneyIsRequired')),
    sourceId: Yup.string().required(),
    actionAt: Yup.string().required(),
    description: Yup.string()
      .min(0, t('asset.invalidBalance'))
      .max(1000000000000000, t('asset.invalidBalcane')),
  });

  const onSubmit = async (values: IEditBalance) => {
    setLoading(true);

    setTimeout(() => {
      handleCloseModal();
      setLoading(false);
      reactAlert.success('Chuyển khoản thành công.');
    }, 1000);
  };

  const defaulDescription = 'Điều chỉnh số dư "{A}"';

  const formik = useFormik<IEditBalance>({
    initialValues: {
      balance: Number(props.source.balance),
      sourceId: props.source.id,
      actionAt: '',
      description: defaulDescription.replace('{A}', props.source.name),
    },
    validationSchema,
    onSubmit,
  });

  const calcSalt = () => {
    const balance = Number(props.source.balance) || 0;
    const newBalance = Number(formik.values.balance) || 0;

    return balance - newBalance;
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
        <form onSubmit={formik.handleSubmit} className="px-[10px]">
          <FormInput
            type="date"
            name="actionAt"
            id="actionAt"
            placeholder="Ngày thực hiện"
            onChange={formik.handleChange}
            value={formik.values.actionAt}
            onBlur={formik.handleBlur}
            touched={formik.touched.actionAt}
            error={formik.errors.actionAt}
          />

          <div className="h-[30px]">
            Số dư hiện tại: {formatCurrency(Number(props.source.balance)) || 0}
          </div>

          <FormInput
            type="number"
            name="balance"
            id="balance"
            placeholder="Số tiền"
            onChange={formik.handleChange}
            value={formik.values.balance}
            onBlur={formik.handleBlur}
            touched={formik.touched.balance}
            error={formik.errors.balance}
          />

          <div className="h-[30px]">
            {calcSalt() > 0 ? (
              <>Giảm bớt: {formatCurrency(Math.abs(calcSalt())) || 0}</>
            ) : (
              <>Tăng thêm: {formatCurrency(Math.abs(calcSalt())) || 0}</>
            )}
          </div>

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
              Chuyển
            </CommonButton>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default BtnEditBalance;
