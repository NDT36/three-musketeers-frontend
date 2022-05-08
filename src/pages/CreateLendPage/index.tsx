import SubPageWrapper from 'components/SubPageWrapper/SubPageWrapper';
import React, { FC, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useAlert } from 'react-alert';
import { useLoading } from 'state/global/hooks';
import CommonButton from 'components/CommonButton/Index';
import BalanceInput from 'components/BalanceInput/BalanceInput';
import { callApi } from 'api/axios';
import { useTranslation } from 'react-i18next';
import iconSource2 from 'assets/icons-v2/icon-source-2.svg';
import { IAssetSources } from 'pages/SourcePage';
import { capitalizeFirstLetter, formatCurrency } from 'utils';
import NoFormInput from 'components/NotFormInput';
import moment from 'moment';
import Modal from 'components/Modal';
import { useSelector } from 'react-redux';
import { AppState } from 'state';
import SourceCard from 'components/SourceCard';
import LinearWrapper from 'components/LinearWrapper';
import Loading from 'components/ListLoading';
import { RoutePath, TransactionType } from 'types/enum';
import useFetchSourcesCallback from 'hooks/useFetchSourcesCallback';
import useSetRecentlySourceCallback from 'hooks/useSetRecentlySourceCallback';
import NoFormDateInput from 'components/NoFormDateInput';
import InputWithLabel from 'components/InputWithLabel';
import { useNavigate, useParams } from 'react-router-dom';
import { createLendOrDebt } from 'api/lend';

interface IProps {}
export interface ICreateTransaction {
  name: string;
  balance: number;
  source?: IAssetSources | null;
}

const CreateLendPage: FC<IProps> = (props) => {
  const reactAlert = useAlert();
  const setLoading = useLoading();
  const { t } = useTranslation();
  const { type } = useParams();
  const navigate = useNavigate();
  const [actionAt, setActionAt] = useState<string>(moment().format('YYYY-MM-DD'));
  const [targets, setTargets] = useState<IAssetSources[]>([]);
  const { sources, recentlySourceId } = useSelector((state: AppState) => state.resources);
  const [isOpenModalChooseSource, setIsOpenModalChooseSource] = useState<boolean>(false);
  const [isFromOtherSource, setIsFromOtherSource] = useState<boolean>(false);

  const fetchListSources = useFetchSourcesCallback();
  const setRecentlySource = useSetRecentlySourceCallback();

  const validationSchema: Yup.SchemaOf<ICreateTransaction> = Yup.object().shape({
    balance: Yup.number().min(0, 'Balance must be greater than 0').required('Balance is required'),
    name: Yup.string().required('Name is required').max(255),
    source: Yup.mixed<IAssetSources>().required('Source target source is required!'),
    actionAt: Yup.number(),
  });

  const onSubmit = async (values: ICreateTransaction) => {
    setLoading(true);

    const tsType = type === 'lend' ? TransactionType.LEND : TransactionType.DEBT;

    const { error } = await callApi(
      createLendOrDebt({
        target: String(values.name),
        description: capitalizeFirstLetter(String(type)) + ' ' + String(values.name),
        actionAt: new Date(actionAt).getTime(),
        money: Math.abs(values.balance),
        sourceId: isFromOtherSource ? null : String(values.source?._id),
        type: tsType,
      })
    );
    if (error) reactAlert.error(t(`error.${error}`));

    if (!error) {
      fetchListSources().finally(() => {
        reactAlert.success('Create transaction success!');
        formik.resetForm();
        navigate(RoutePath.LEND);
      });
    }

    setLoading(false);
  };

  const formik = useFormik<ICreateTransaction>({
    initialValues: {
      name: '',
      balance: 0,
      source: null,
    },
    validationSchema,
    onSubmit,
  });

  const handleUpdateBalance = (balance: number) => {
    formik.setFieldValue('balance', balance);
  };

  useEffect(() => {
    if (sources && !formik.values.source?._id) {
      const targets = sources?.filter((item) => item);
      setTargets(targets);

      const recentlySource = sources?.find((item) => item._id === recentlySourceId);

      const firstItem = recentlySource ? recentlySource : targets.find((item) => item);

      if (firstItem) {
        formik.setFieldValue('source', firstItem);
      }
    }
  }, [sources, formik.values.source?._id, recentlySourceId]);

  const onChooseSource = (source: IAssetSources) => {
    if (source._id !== formik.values.source?._id) {
      formik.setFieldValue('source', source);
      setRecentlySource(source?._id || '');
      setTimeout(() => onCloseModalChooseSource(), 100);
    }
  };

  const onCloseModalChooseSource = () => {
    if (isOpenModalChooseSource) setIsOpenModalChooseSource(false);
  };
  const onOpenModalChooseSource = () => {
    if (!isOpenModalChooseSource) setIsOpenModalChooseSource(true);
  };

  const onChoseOtherSource = (value: boolean) => {
    setIsFromOtherSource(value);
  };
  return (
    <div className="h-full flex flex-col">
      {/* Select source */}
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
                    {item._id === formik.values.source?._id ? (
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
      <SubPageWrapper routeGoBack={-1} title="" isDisableBtnBack={false}>
        <div className="font-bold text-center text-4xl px-2">Create {type}</div>
        <br />

        {/* Body */}
        <form
          action=""
          className="h-full bg-primary w-full rounded-[14px] text-base p-3 text-[#DDDDDD]"
          onSubmit={formik.handleSubmit}
        >
          <BalanceInput balance={formik.values.balance} onBalanceUpdate={handleUpdateBalance} />
          <br />
          <InputWithLabel
            name="name"
            id="name"
            placeholder="Enter borrower's name"
            onChange={formik.handleChange}
            value={formik.values.name}
            onBlur={formik.handleBlur}
            touched={formik.touched.name}
            error={formik.errors.name}
            label="Borrower"
          />

          <NoFormInput
            onEdit={onOpenModalChooseSource}
            title="Source"
            disabled={isFromOtherSource}
            icon={iconSource2}
          >
            <div className="text-xl text-white font-bold">
              {formik.values.source ? (
                <>
                  <div>{formik.values.source.name}</div>
                  <div className="text-base">
                    {formatCurrency(Number(formik.values.source.balance))}
                  </div>
                </>
              ) : sources ? (
                <div className="text-center">Source not found</div>
              ) : (
                <Loading loading={true} />
              )}
            </div>
          </NoFormInput>
          <div>
            <input
              type="checkbox"
              name="other-source-checkbox"
              id="other-source-checkbox"
              onChange={(e) => onChoseOtherSource(e.target.checked)}
            />
            <label htmlFor="other-source-checkbox" className="select-none cursor-pointer pl-1">
              {isFromOtherSource ? (
                <span>From other source</span>
              ) : (
                <span className="opacity-50">From other source</span>
              )}
            </label>
          </div>

          <NoFormDateInput
            onEdit={(actionAt: string) => setActionAt(actionAt)}
            title="Borrowing date"
          >
            <div className="text-2xl text-white font-bold">
              <div>{actionAt}</div>
            </div>
          </NoFormDateInput>

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

export default CreateLendPage;
