import { login } from 'api/auth';
import { ACCESS_TOKEN, callApi, REFRESH_TOKEN } from 'api/axios';
import CommonAuthInput from 'components/CommonAuthInput';
import CommonButton from 'components/CommonButton/Index';
import { useFormik } from 'formik';
import Cookies from 'js-cookie';
import React from 'react';
import { useAlert } from 'react-alert';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

export interface ILoginResult {
  accessToken: string;
  refreshToken: string;
}

export interface ILoginParams {
  email: string;
  password: string;
}

function Login() {
  const alert = useAlert();
  const { t } = useTranslation();

  const validationSchema: Yup.SchemaOf<ILoginParams> = Yup.object().shape({
    email: Yup.string()
      .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, t('login.invalidEmail'))
      .email(t('login.invalidEmail'))
      .required(t('login.emailIsRequired')),
    password: Yup.string()
      .min(6, t('login.invalidPassword'))
      .max(32, t('login.invalidPassword'))
      .required(t('login.passwordIsRequired')),
  });

  const onSubmit = async (values: ILoginParams) => {
    values.email = values.email.trim();
    values.password = values.password.trim();
    const { error, data } = await callApi(() => login(values));
    if (error) {
      alert.error(t(`error.${error}`));
    }

    if (!error && data) {
      Cookies.set(ACCESS_TOKEN, data.data?.[ACCESS_TOKEN]);
      Cookies.set(REFRESH_TOKEN, data.data?.[REFRESH_TOKEN]);
      alert.info('Login success!');
    }

    // window.location.hash = '#/sign-up';
    // alert(JSON.stringify(values, null, 2));
  };

  const formik = useFormik<ILoginParams>({
    initialValues: { email: '', password: '' },
    validationSchema,
    onSubmit,
  });

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
                {t('login.txtLogin')}
              </CommonButton>
            </div>
          </form>

          <div className="h-[100px]">
            <p className="text-sm text-[#808080]">{t('login.orLoginWith')}</p>
            <div className="flex flex-row justify-between">
              <div className="w-1/2 p-3 text-[#4267B2] ">
                <CommonButton className="font-bold h-[40px]">Facebook</CommonButton>
              </div>
              <div className="w-1/2  p-3 text-[#DD4B39] ">
                <CommonButton className="font-bold h-[40px]">Google</CommonButton>
              </div>
            </div>
          </div>
          <div className="text-[#808080]">
            {t('login.notAMember')}
            <a href="#/sign-up" className="text-[#5fa8f3] underline decoration-1">
              {t('login.signupNow')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
