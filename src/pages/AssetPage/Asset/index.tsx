import React, { FC, useCallback, useEffect, useState } from 'react';
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
import { IEditAssetParams } from './BtnEditItem';
import { formatCurrency } from 'utils';
import { callApi } from 'api/axios';
import { createSource, editSource, fetchSources } from 'api/source';
import ListLoading from 'components/ListLoading';
import { useAlert } from 'react-alert';

interface IProps {}

export interface IAssetSources {
  _id: string;
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
  const reactAlert = useAlert();
  const [modalVisible, setModalVisible] = useState(false);
  const [sourceLoading, setSourceLoading] = useState(false);
  const setLoading = useSetLoading();

  const [sources, setSource] = useState<Array<IAssetSources>>([]);

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleDeleteItem = (_id: string) => {
    setSource(sources.filter((item) => item._id !== _id));
  };

  const fetchListSources = useCallback(async () => {
    setSourceLoading(true);

    callApi(fetchSources())
      .then(({ error, result }) => {
        if (error) return;
        if (result) setSource(result?.data);
      })
      .finally(() => setSourceLoading(false));
  }, []);

  const balance = sources.reduce((a, b) => a + Number(b.balance), 0);

  const handleEditItem = async (id: string, values: IEditAssetParams, callback: () => void) => {
    setLoading(true);

    const { error } = await callApi(editSource(id, values));

    if (error) {
      reactAlert.error(t(`error.${error}`));
      setLoading(false);
      return;
    }

    callback();
    fetchListSources();
    setLoading(false);
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

    callApi(createSource(values))
      .then(({ error }) => {
        if (error) {
          reactAlert.error(t(`error.${error}`));
          return;
        }

        resetForm();
        handleCloseModal();
        fetchListSources();
      })
      .finally(() => setLoading(false));
  };

  const formik = useFormik<ICreateAssetSourcesParams>({
    initialValues: { name: '', balance: '', description: '' },
    validationSchema,
    onSubmit,
  });

  useEffect(() => {
    fetchListSources();
  }, [fetchListSources]);

  return (
    <div>
      <div className="h-[50px] flex items-center border-b border-b-gray-400">
        Tổng tiền: <b className="pl-1">{formatCurrency(balance)}</b>
      </div>
      <div className="flex justify-between py-2 text-xl">
        <div>Danh sách tài khoản:</div>
        <div className="flex justify-center items-center" onClick={() => handleOpenModal()}>
          <img className="w-[20px] h-[20px]" src={iconAdd} alt="icon add" />
          <div className="pl-1 cursor-pointer select-none">Thêm tài khoản</div>
        </div>
      </div>

      <div>
        {sourceLoading ? (
          <ListLoading loading={true} />
        ) : sources.length ? (
          sources.map((source) => (
            <AssetItem
              key={source._id}
              source={source}
              onDelete={handleDeleteItem}
              onEdit={handleEditItem}
            />
          ))
        ) : (
          <div className="text-center pt-10 text-2xl text-[silver]">
            Bạn chưa tạo nguồn tiền nào
          </div>
        )}
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
