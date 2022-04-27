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
import iconSource2 from 'assets/icons-v2/icon-source-2.svg';
import iconScheduleCalendar from 'assets/icons-v2/icon-schedule-calendar.svg';
import { IAssetSources } from 'pages/SourcePage';
import { formatCurrency } from 'utils';
import { createTransaction } from 'api/transaction';
import NoFormInput from 'components/NotFormInput';
import FormTextArea from 'components/FormTextArea';
import moment from 'moment';
import Modal from 'components/Modal';
import { useSelector } from 'react-redux';
import { AppState } from 'state';
import SourceCard from 'components/SourceCard';
import LinearWrapper from 'components/LinearWrapper';
import Loading from 'components/ListLoading';
import { RoutePath } from 'types/enum';

interface IProps {}
export interface ITransferMoney {
  description?: string;
  balance: number;
  targetSource?: IAssetSources | null;
  actionAt?: number;
}

const TransferMoneyPage: FC<IProps> = (props) => {
  const reactAlert = useAlert();
  const setLoading = useLoading();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [source, setSource] = useState<IAssetSources | null>(null);
  // const [change, setChange] = useState<number>(0);
  const [actionAt] = useState<string>(moment().format('YYYY-MM-DD'));
  const [targets, setTargets] = useState<IAssetSources[]>([]);
  const { sources } = useSelector((state: AppState) => state.resources);
  const [isOpenModalChooseSource, setIsOpenModalChooseSource] = useState<boolean>(false);

  const validationSchema: Yup.SchemaOf<ITransferMoney> = Yup.object().shape({
    balance: Yup.number().min(0, 'Balance must be greater than 0').required('Balance is required'),
    description: Yup.string().max(255),
    targetSource: Yup.mixed<IAssetSources>().required('Mission target source is required!'),
    actionAt: Yup.number(),
  });

  const fetchDetailsSource = useCallback(
    async (id: string) => {
      if (sources) {
        const s = sources.find((item) => item._id === id);
        if (s) {
          return setSource({ ...s });
        }
      }
      const { error, result } = await callApi(fetchDetailsSources(String(id)));
      if (error) reactAlert.error(t(`error.${error}`));

      if (result) {
        setSource(result.data);
      }
    },
    [reactAlert, t, setSource, sources]
  );

  const onSubmit = async (values: ITransferMoney) => {
    setLoading(true);

    const { error } = await callApi(
      createTransaction({
        categoryId: null,
        description: values.description || '',
        actionAt: Date.now(),
        groupId: null,
        money: values.balance,
        sourceId: String(source?._id),
        targetSourceId: String(values.targetSource?._id),
        type: 5,
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

  const formik = useFormik<ITransferMoney>({
    initialValues: {
      description: '',
      balance: 0,
      targetSource: null,
      actionAt: Date.now(),
    },
    validationSchema,
    onSubmit,
  });

  const handleUpdateBalance = (balance: number) => {
    formik.setFieldValue('balance', balance);
  };

  useEffect(() => {
    fetchDetailsSource(String(id));
  }, [id, fetchDetailsSource]);

  useEffect(() => {
    if (source && sources && !formik.values.targetSource?._id) {
      const targets = sources?.filter((item) => item._id !== source._id);
      setTargets(targets);

      const firstItem = targets.find((item) => item);

      if (firstItem) {
        formik.setFieldValue('targetSource', firstItem);
      }
    }
  }, [source, sources, formik.values.targetSource?._id]);

  // useEffect(() => {
  //   if (source) {
  //     setChange(formik.values.balance);
  //   }
  // }, [change, source?.balance, formik.values.balance]);

  const onChooseSource = (source: IAssetSources) => {
    if (source._id !== formik.values.targetSource?._id) {
      formik.setFieldValue('targetSource', source);
      setTimeout(() => onCloseModalChooseSource(), 100);
    }
  };

  const onCloseModalChooseSource = () => {
    setIsOpenModalChooseSource(false);
  };
  const onOpenModalChooseSource = () => {
    setIsOpenModalChooseSource(true);
  };
  return (
    <div className="h-full flex flex-col">
      <Modal
        isFullHeight={true}
        isVisible={isOpenModalChooseSource}
        onClose={onCloseModalChooseSource}
      >
        <div className="w-full h-full bg-primary px-2">
          <SubPageWrapper routeGoBack={-1} onGoBack={onCloseModalChooseSource} title="">
            <div className="font-bold text-4xl px-2">Choose Source</div>
            <br />
            {targets && targets.length
              ? targets.map((item) => (
                  <div key={item._id} onClick={() => onChooseSource(item)}>
                    {item._id === formik.values.targetSource?._id ? (
                      <LinearWrapper customBg="bg-white" className="rounded-3xl px-2">
                        <SourceCard isHideMenu={true} source={item} onDelete={() => {}} />
                      </LinearWrapper>
                    ) : (
                      <div className="px-2">
                        <SourceCard isHideMenu={true} source={item} onDelete={() => {}} />
                      </div>
                    )}
                  </div>
                ))
              : ''}
          </SubPageWrapper>
        </div>
      </Modal>
      <SubPageWrapper routeGoBack={RoutePath.SOURCE} title="">
        <div className="font-bold text-4xl px-2">Transfer Money</div>
        <br />
        <div className="font-bold h-10 text-4xl px-2 text-[#E9FFAC]">
          {source ? source.name : <Loading loading={true} />}
        </div>
        <br />
        <div className="h-10 font-bold text-4xl px-2">
          {source ? formatCurrency(Number(source?.balance || 0)) : <Loading loading={true} />}
        </div>
        {/* Body */}
        <form
          action=""
          className="h-full bg-primary w-full rounded-[14px] text-base p-3 text-[#DDDDDD]"
          onSubmit={formik.handleSubmit}
        >
          <label htmlFor="name">Balance</label>
          <BalanceInput balance={formik.values.balance} onBalanceUpdate={handleUpdateBalance} />
          <br />
          <NoFormInput onEdit={onOpenModalChooseSource} title="Target source" icon={iconSource2}>
            <div className="text-xl text-white font-bold">
              {formik.values.targetSource ? (
                <>
                  <div>{formik.values.targetSource.name}</div>
                  <div className="text-base">
                    {formatCurrency(Number(formik.values.targetSource.balance))}
                  </div>
                </>
              ) : source ? (
                <div className="text-center">Source not found</div>
              ) : (
                <Loading loading={true} />
              )}
            </div>
          </NoFormInput>

          <NoFormInput isDisableEdit={true} title="Date" icon={iconScheduleCalendar}>
            <div className="text-2xl text-white font-bold">
              <div>{actionAt}</div>
            </div>
          </NoFormInput>

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

export default TransferMoneyPage;
