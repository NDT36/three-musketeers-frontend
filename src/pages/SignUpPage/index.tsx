import { setTokenToCookies, signUp } from 'api/auth';
import { ACCESS_TOKEN, callApi } from 'api/axios';
import CommonAuthInput from 'components/CommonAuthInput';
import CommonButton from 'components/CommonButton/Index';
import { useFormik } from 'formik';
import Cookies from 'js-cookie';
import React, { FC, useEffect } from 'react';
import { useAlert } from 'react-alert';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useSetLoading } from 'state/global/hooks';
import * as Yup from 'yup';

export interface ISignUpResult {
  accessToken: string;
  refreshToken: string;
}

export interface ISignUpParams {
  name: string;
  email: string;
  password: string;
}

const SignUpPage: FC = () => {
  const reactAlert = useAlert();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const setLoading = useSetLoading();

  const validationSchema: Yup.SchemaOf<ISignUpParams> = Yup.object().shape({
    name: Yup.string()
      .min(1, t('signUp.invalidNickname'))
      .max(30, t('signUp.invalidNickname'))
      .required(t('signUp.nicknameIsRequired')),
    email: Yup.string()
      .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, t('signUp.invalidEmail'))
      .email(t('signUp.invalidEmail'))
      .required(t('signUp.emailIsRequired')),
    password: Yup.string()
      .min(6, t('signUp.invalidPassword'))
      .max(32, t('signUp.invalidPassword'))
      .required(t('signUp.passwordIsRequired')),
  });

  const onSubmit = async (values: ISignUpParams) => {
    setLoading(true);

    const { error, result } = await callApi<ISignUpResult, ISignUpParams>(signUp(values));
    if (error) {
      reactAlert.error(t(`error.${error}`));
    }

    if (result) {
      setTokenToCookies(result.data);
      navigate('/home');
    }

    setLoading(false);
  };

  const onLoginSocial = () => {
    reactAlert.info('Comming soon...!');
  };

  const formik = useFormik<ISignUpParams>({
    initialValues: { name: '', email: '', password: '' },
    validationSchema,
    onSubmit,
  });

  useEffect(() => {
    if (Cookies.get(ACCESS_TOKEN)) {
      navigate('/home');
    }
  }, [navigate]);

  return (
    <div className="w-full h-screen flex justify-center">
      <div className="w-[355px] h-full text-center bg-white">
        <div className="h-[200px] flex items-center">
          <div className="text-5xl text-[#A45A5A]">
            Three Musketeers
            <div className="text-base text-[#333]">Simple Ways To Manage Your Money Better</div>
          </div>
        </div>
        <div>
          <form onSubmit={formik.handleSubmit}>
            <CommonAuthInput
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

            <CommonAuthInput
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
              touched={formik.touched.email}
              error={formik.errors.email}
            />

            <CommonAuthInput
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
              touched={formik.touched.password}
              error={formik.errors.password}
            />

            <div className="h-[80px] flex items-center">
              <CommonButton type="submit" className="font-bold text-2xl">
                {t('signUp.txtSignUp')}
              </CommonButton>
            </div>
          </form>

          <div className="h-[100px]">
            <p className="text-sm text-[#808080]">{t('signUp.orSignUpWith')}</p>
            <div className="flex flex-row justify-between">
              <div className="w-1/2 p-3 text-[#4267B2] ">
                <CommonButton className="font-bold h-[40px]" onClick={onLoginSocial}>
                  Facebook
                </CommonButton>
              </div>
              <div className="w-1/2  p-3 text-[#DD4B39] ">
                <CommonButton className="font-bold h-[40px]" onClick={onLoginSocial}>
                  Google
                </CommonButton>
              </div>
            </div>
          </div>
          <div className="text-[#808080]">
            {t('signUp.alreadyRegistered')}
            <a href="#/login" className="text-[#5fa8f3] underline decoration-1">
              {t('signUp.loginNow')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
