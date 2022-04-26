import FormInput from 'components/FormInput';
import SubPageWrapper from 'components/SubPageWrapper/SubPageWrapper';
import React, { FC, useCallback, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useAlert } from 'react-alert';
import { useLoading } from 'state/global/hooks';
import CommonButton from 'components/CommonButton/Index';
import { callApi } from 'api/axios';
import { apiUpdateSource, fetchDetailsSources } from 'api/sources';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { IAssetSources } from 'pages/SourcePage';
import useFetchSourcesCallback from 'hooks/useFetchSourcesCallback';

interface IProps {}
export interface IUpdateSource {
  name: string;
}

const EditSourcePage: FC<IProps> = (props) => {
  const reactAlert = useAlert();
  const setLoading = useLoading();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const fetchSource = useFetchSourcesCallback();

  const validationSchema: Yup.SchemaOf<IUpdateSource> = Yup.object().shape({
    name: Yup.string().min(0, 'Name is required').required('Name is required'),
  });

  const onSubmit = async (values: IUpdateSource) => {
    setLoading(true);

    const { error } = await callApi(apiUpdateSource(String(id), values.name));
    if (error) reactAlert.error(t(`error.${error}`));

    if (!error) {
      fetchSource().finally(() => {
        reactAlert.success('Update success');
        formik.resetForm();
        navigate(-1);
        setLoading(false);
      });
    }
  };

  const formik = useFormik<IUpdateSource>({
    initialValues: {
      name: '',
    },
    validationSchema,
    onSubmit,
  });

  const fetchDetailsSource = useCallback(
    async (id: string) => {
      setLoading(true);

      const { error, result } = await callApi(fetchDetailsSources(String(id)));
      if (error) reactAlert.error(t(`error.${error}`));

      if (result) {
        formik.setFieldValue('name', result.data?.name || '');
      }

      setLoading(false);
    },
    [setLoading, t, reactAlert]
  );

  useEffect(() => {
    fetchDetailsSource(String(id));
  }, [id, fetchDetailsSource]);

  return (
    <div className="h-full flex flex-col">
      <SubPageWrapper title="">
        <div className="font-bold text-4xl px-2">Update Source</div>
        {/* Body */}
        <form
          action=""
          className="h-full bg-primary w-full rounded-[14px] text-base p-3 text-[#DDDDDD]"
          onSubmit={formik.handleSubmit}
        >
          <label htmlFor="balance">Name</label>
          <FormInput
            type="text"
            name="name"
            id="name"
            placeholder="..."
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
                Update
              </CommonButton>
            </div>
          </div>
        </form>
      </SubPageWrapper>
    </div>
  );
};

export default EditSourcePage;
