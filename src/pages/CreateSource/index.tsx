import FormInput from 'components/FormInput';
import SubPageWrapper from 'components/SubPageWrapper/SubPageWrapper';
import React, { FC } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useAlert } from 'react-alert';
import { useLoading } from 'state/global/hooks';
import CommonButton from 'components/CommonButton/Index';
import BalanceInput from 'components/BalanceInput/BalanceInput';
import { callApi } from 'api/axios';
import { createSource } from 'api/sources';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'types/enum';

interface IProps {}
export interface ICreateSource {
  name: string;
  balance: number;
}

const CreateSourcePage: FC<IProps> = (props) => {
  const reactAlert = useAlert();
  const setLoading = useLoading();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const validationSchema: Yup.SchemaOf<ICreateSource> = Yup.object().shape({
    balance: Yup.number().min(0, 'Balance must be greater than 0').required('Balance is required'),
    name: Yup.string().min(0, 'Name is required').required('Name is required'),
  });

  const onSubmit = async (values: ICreateSource) => {
    setLoading(true);

    const { error } = await callApi(createSource(values));
    if (error) reactAlert.error(t(`error.${error}`));

    if (!error) {
      reactAlert.success('Create success');
      formik.resetForm();
      navigate(RoutePath.SOURCE);
    }

    setLoading(false);
  };

  const formik = useFormik<ICreateSource>({
    initialValues: {
      name: '',
      balance: 0,
    },
    validationSchema,
    onSubmit,
  });

  const handleUpdateBalance = (balance: number) => {
    formik.setFieldValue('balance', balance);
  };

  return (
    <div className="h-full flex flex-col">
      <SubPageWrapper routeGoBack={RoutePath.SOURCE} title="">
        <div className="font-bold text-4xl px-2">Create Source</div>
        {/* Body */}
        <form
          action=""
          className="h-full bg-primary w-full rounded-[14px] text-base p-3 text-[#DDDDDD]"
          onSubmit={formik.handleSubmit}
        >
          <label htmlFor="name">Initial balance</label>
          <BalanceInput balance={formik.values.balance} onBalanceUpdate={handleUpdateBalance} />

          <br />
          <label htmlFor="balance">Name</label>
          <FormInput
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            onChange={formik.handleChange}
            value={formik.values.name}
            onBlur={formik.handleBlur}
            touched={formik.touched.name}
            error={formik.errors.name}
          />
          <div className="h-[150px] items-center flex flex-row justify-center">
            <div className="w-full text-white ">
              <CommonButton
                type="submit"
                className="bg-secondary font-bold text-3xl h-[70px] rounded-lg border-white"
              >
                Create
              </CommonButton>
            </div>
          </div>
        </form>
      </SubPageWrapper>
    </div>
  );
};

export default CreateSourcePage;
