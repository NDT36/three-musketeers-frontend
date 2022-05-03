import SubPageWrapper from 'components/SubPageWrapper/SubPageWrapper';
import React, { FC, useCallback, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useAlert } from 'react-alert';
import { useLoading } from 'state/global/hooks';
import CommonButton from 'components/CommonButton/Index';
import BalanceInput from 'components/BalanceInput/BalanceInput';
import { callApi } from 'api/axios';
import { fetchDetailsSources } from 'api/sources';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import FormTextArea from 'components/FormTextArea';
import { IAssetSources } from 'pages/SourcePage';
import { formatCurrency } from 'utils';
import { createTransaction } from 'api/transaction';
import { useSelector } from 'react-redux';
import { AppState } from 'state';
import { RoutePath } from 'types/enum';
import moment from 'moment';

interface IProps {}
export interface IUpdateSourceBalance {
  description?: string;
  balance: number;
}

const validationSchema: Yup.SchemaOf<IUpdateSourceBalance> = Yup.object().shape({
  balance: Yup.number().min(0, 'Balance must be greater than 0').required('Balance is required'),
  description: Yup.string().max(255),
});

const EditBalancePage: FC<IProps> = (props) => {
  const reactAlert = useAlert();
  const setLoading = useLoading();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [source, setSource] = useState<IAssetSources | null>(null);
  const [change, setChange] = useState<number>(0);
  const { sources } = useSelector((state: AppState) => state.resources);

  const onSubmit = async (values: IUpdateSourceBalance) => {
    setLoading(true);

    const { error } = await callApi(
      createTransaction({
        categoryId: null,
        description: values.description || '',
        actionAt: new Date(moment().format('YYYY-MM-DD')).getTime(),
        groupId: null,
        money: change,
        sourceId: String(source?._id),
        targetSourceId: null,
        type: 6,
        users: [],
      })
    );
    if (error) reactAlert.error(t(`error.${error}`));

    if (!error) {
      reactAlert.success('Edit balance success');
      formik.resetForm();
      navigate(RoutePath.SOURCE);
    }

    setLoading(false);
  };

  const formik = useFormik<IUpdateSourceBalance>({
    initialValues: {
      description: '',
      balance: 0,
    },
    validationSchema,
    onSubmit,
  });

  const handleUpdateBalance = (balance: number) => {
    formik.setFieldValue('balance', balance);
  };

  const getDetailsSource = useCallback(
    async (id: string) => {
      if (sources) {
        const item = sources.find((item) => item._id === String(id));
        if (item) {
          handleUpdateBalance(Number(item.balance));
          return setSource({ ...item });
        }
      }
      setLoading(true);

      const { error, result } = await callApi(fetchDetailsSources(String(id)));
      if (error) reactAlert.error(t(`error.${error}`));

      if (result) {
        handleUpdateBalance(Number(result.data.balance));
        setSource(result.data);
      }

      setLoading(false);
    },
    [sources, reactAlert, setLoading, t]
  );

  useEffect(() => {
    getDetailsSource(String(id));
  }, [id]);

  useEffect(() => {
    if (source) {
      setChange(formik.values.balance - Number(source?.balance));
    }
  }, [source, formik.values.balance, source?.balance]);

  return (
    <div className="h-full flex flex-col">
      <SubPageWrapper routeGoBack={RoutePath.SOURCE} title="">
        <div className="font-bold text-4xl px-2">Edit Balance</div>
        <br />
        <div className="font-bold text-4xl px-2 text-[#E9FFAC]">{source?.name}</div>
        <br />
        <div className="font-bold text-4xl px-2">
          {formatCurrency(Number(source?.balance || 0))}
        </div>
        {/* Body */}
        <form
          action=""
          className="h-full bg-primary w-full rounded-[14px] text-base p-3 text-[#DDDDDD]"
          onSubmit={formik.handleSubmit}
        >
          <label htmlFor="name">Balance</label>
          <BalanceInput
            balance={formik.values.balance}
            defaultVisible={false}
            onBalanceUpdate={handleUpdateBalance}
          />
          <br />
          <div>
            Change:
            {change < 0 ? (
              <span className="text-red-500">{change}</span>
            ) : (
              <span className="text-green-400">{change}</span>
            )}
          </div>
          <FormTextArea
            name="description"
            id="description"
            placeholder="Description"
            onChange={formik.handleChange}
            value={formik.values.description}
            onBlur={formik.handleBlur}
            touched={formik.touched.description}
            error={formik.errors.description}
            label="Description"
          />
          <div className="h-[150px] items-center flex flex-row justify-center">
            <div className="w-full text-white ">
              <CommonButton
                type="submit"
                className="bg-secondary font-bold text-3xl h-[70px] rounded-lg border-white"
              >
                Confirm
              </CommonButton>
            </div>
          </div>
        </form>
      </SubPageWrapper>
    </div>
  );
};

export default EditBalancePage;
