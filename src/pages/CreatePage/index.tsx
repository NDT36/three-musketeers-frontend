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
import { ICategory } from 'state/resources/actions';
import { RoutePath, TransactionType } from 'types/enum';
import useFetchSourcesCallback from 'hooks/useFetchSourcesCallback';
import useSetRecentlyCategoryCallback from 'hooks/useSetRecentlyCategoryCallback';
import useSetRecentlySourceCallback from 'hooks/useSetRecentlySourceCallback';
import NoFormDateInput from 'components/NoFormDateInput';

interface IProps {}
export interface ICreateTransaction {
  description?: string;
  balance: number;
  source?: IAssetSources | null;
  category?: ICategory | null;
  actionAt?: number;
}

const CreateTransactionPage: FC<IProps> = (props) => {
  const reactAlert = useAlert();
  const setLoading = useLoading();
  const { t } = useTranslation();
  const [actionAt, setActionAt] = useState<string>(moment().format('YYYY-MM-DD'));
  const [targets, setTargets] = useState<IAssetSources[]>([]);
  const [chooseCategories, setChooseCategories] = useState<ICategory[]>([]);
  const { sources, recentlyCategoryId, recentlySourceId, categories } = useSelector(
    (state: AppState) => state.resources
  );
  const [isOpenModalChooseSource, setIsOpenModalChooseSource] = useState<boolean>(false);
  const [isOpenModalChooseCategory, setIsOpenModalChooseCategory] = useState<boolean>(false);
  const [isFromOtherSource, setIsFromOtherSource] = useState<boolean>(false);

  const fetchListSources = useFetchSourcesCallback();
  const setRecentlyCategory = useSetRecentlyCategoryCallback();
  const setRecentlySource = useSetRecentlySourceCallback();

  const validationSchema: Yup.SchemaOf<ICreateTransaction> = Yup.object().shape({
    balance: Yup.number().min(0, 'Balance must be greater than 0').required('Balance is required'),
    description: Yup.string().max(255),
    source: Yup.mixed<IAssetSources>().required('Source target source is required!'),
    category: Yup.mixed<ICategory>().required('Category target source is required!'),
    actionAt: Yup.number(),
  });

  const onSubmit = async (values: ICreateTransaction) => {
    setLoading(true);

    const { error } = await callApi(
      createTransaction({
        categoryId: String(values.category?._id),
        description: values.description || 'Transaction ' + String(values.category?.name),
        actionAt: Date.now(),
        groupId: null,
        money: -values.balance,
        sourceId: isFromOtherSource ? String(values.source?._id) : null,
        targetSourceId: null,
        type: TransactionType.EXPENSE,
        users: [],
      })
    );
    if (error) reactAlert.error(t(`error.${error}`));

    if (!error) {
      fetchListSources().finally(() => {
        reactAlert.success('Create transaction success!');
        formik.resetForm();
        // navigate(-1);
      });
    }

    setLoading(false);
  };

  const formik = useFormik<ICreateTransaction>({
    initialValues: {
      description: '',
      balance: 0,
      source: null,
      category: null,
      actionAt: Date.now(),
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

  useEffect(() => {
    if (categories && !formik.values.category) {
      const targets = categories?.filter((item) => item);
      setChooseCategories(targets);

      const recentlyCategory = categories?.find((item) => item._id === recentlyCategoryId);

      const firstItem = recentlyCategory ? recentlyCategory : targets.find((item) => item);

      if (firstItem) {
        formik.setFieldValue('category', firstItem);
      }
    }
  }, [categories, formik.values.category, recentlyCategoryId]);

  // useEffect(() => {
  //   if (source) {
  //     setChange(formik.values.balance);
  //   }
  // }, [change, source?.balance, formik.values.balance]);

  const onChooseSource = (source: IAssetSources) => {
    if (source._id !== formik.values.source?._id) {
      formik.setFieldValue('source', source);
      setRecentlySource(source?._id || '');
      setTimeout(() => onCloseModalChooseSource(), 100);
    }
  };

  const onChooseCategory = (category: ICategory) => {
    if (category._id !== formik.values.category?._id) {
      formik.setFieldValue('category', category);
      setRecentlyCategory(category?._id || '');
      setTimeout(() => onCloseModalChooseCategory(), 100);
    }
  };

  const onCloseModalChooseSource = () => {
    if (isOpenModalChooseSource) setIsOpenModalChooseSource(false);
  };
  const onOpenModalChooseSource = () => {
    if (!isOpenModalChooseSource) setIsOpenModalChooseSource(true);
  };
  const onCloseModalChooseCategory = () => {
    if (isOpenModalChooseCategory) setIsOpenModalChooseCategory(false);
  };
  const onOpenModalChooseCategory = () => {
    if (!isOpenModalChooseCategory) setIsOpenModalChooseCategory(true);
  };
  const onChoseOtherSource = (value: boolean) => {
    setIsFromOtherSource(value);
  };
  return (
    <div className="h-full flex flex-col">
      {/* Select source */}
      <Modal
        isFullHeight={true}
        isVisible={isOpenModalChooseCategory}
        onClose={onCloseModalChooseCategory}
      >
        <div className="w-full h-full bg-primary px-2">
          <SubPageWrapper onGoBack={onCloseModalChooseCategory} routeGoBack={-1} title="">
            <div className="font-bold text-4xl px-2">Choose Category</div>
            <br />
            {chooseCategories && chooseCategories.length
              ? chooseCategories.map((item) => (
                  <div key={item._id} onClick={() => onChooseCategory(item)}>
                    {item._id === formik.values.category?._id ? (
                      <LinearWrapper customBg="bg-white" className="rounded-3xl p-1">
                        <div className="m-1 h-16 flex justify-center items-center text-3xl font-bold bg-secondary rounded-3xl  border border-white">
                          {/* Icon */}
                          <div className="h-[65px] w-[65px] p-[7.5px]">
                            <div
                              className={
                                'w-[50px] h-[50px] border border-white bg-white flex justify-center items-center rounded-full'
                              }
                            >
                              {item.avatar && <img src={item.avatar} alt="Icon" />}
                            </div>
                          </div>
                          <div className="w-full p-[7.5px]">
                            <div className="text-xl text-white font-bold">{item.name}</div>
                          </div>
                        </div>
                      </LinearWrapper>
                    ) : (
                      <div className="p-1">
                        <div className="m-1 h-16 flex justify-center items-center text-3xl font-bold bg-secondary rounded-3xl  border border-white">
                          {/* Icon */}
                          <div className="h-[65px] w-[65px] p-[7.5px]">
                            <div
                              className={
                                'w-[50px] h-[50px] border border-white bg-white flex justify-center items-center rounded-full'
                              }
                            >
                              {item.avatar && <img src={item.avatar} alt="Icon" />}
                            </div>
                          </div>
                          <div className="w-full p-[7.5px]">
                            <div className="text-xl text-white font-bold">{item.name}</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              : ''}
          </SubPageWrapper>
        </div>
      </Modal>
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
      <SubPageWrapper routeGoBack={-1} title="" isDisableBtnBack={true}>
        <div className="font-bold text-center text-4xl px-2">Create Transaction</div>
        <br />

        {/* Body */}
        <form
          action=""
          className="h-full bg-primary w-full rounded-[14px] text-base p-3 text-[#DDDDDD]"
          onSubmit={formik.handleSubmit}
        >
          <BalanceInput balance={formik.values.balance} onBalanceUpdate={handleUpdateBalance} />
          <br />
          <NoFormInput
            onEdit={onOpenModalChooseCategory}
            title="Category"
            icon={formik.values.category?.avatar}
            iconRounded={true}
          >
            <div className="text-xl text-white font-bold">
              {formik.values.category ? (
                <>
                  <div>{formik.values.category.name}</div>
                </>
              ) : categories ? (
                <div className="text-center">Category empty</div>
              ) : (
                <Loading loading={true} />
              )}
            </div>
          </NoFormInput>

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
              From other source
            </label>
          </div>

          <NoFormDateInput onEdit={(actionAt: string) => setActionAt(actionAt)} title="Date">
            <div className="text-2xl text-white font-bold">
              <div>{actionAt}</div>
            </div>
          </NoFormDateInput>

          <br />

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

export default CreateTransactionPage;
