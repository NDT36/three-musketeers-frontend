import { loginBySocial, setTokenToCookies } from 'api/auth';
import { ACCESS_TOKEN, callApi, catchError } from 'api/axios';
import CommonButton from 'components/CommonButton/Index';
import Cookies from 'js-cookie';
import React, { useEffect } from 'react';
import { useAlert } from 'react-alert';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useSetLoading } from 'state/global/hooks';
import { LoginSocialType } from 'types/enum';
import { loginByFirebase } from 'utils/auth_google_provider_create';
import Loader from 'components/Loader';

export interface ILoginResult {
  accessToken: string;
  refreshToken: string;
}

export interface ILoginParams {
  email: string;
  password: string;
}

export interface ISocialLoginParams {
  token: string;
  type: LoginSocialType;
}

function Login() {
  const reactAlert = useAlert();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const setLoading = useSetLoading();

  const onLoginGoogle = async () => {
    setLoading(true);

    const { result: idToken } = await catchError(loginByFirebase);

    if (!idToken) return setLoading(false);

    const params = {
      type: LoginSocialType.GOOGLE,
      token: idToken,
    };

    const { error, result } = await callApi(loginBySocial(params));

    if (error) reactAlert.error(t(`error.${error}`));

    if (result) {
      // const fake = {
      //   accessToken:
      //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjJlMzM2ZDJiYjg1ODZiNmJkYzRlMWQiLCJ0eXBlIjoiQUNDRVNTX1RPS0VOIiwiaWF0IjoxNjQ3NDQxNDgwLCJleHAiOjE2NDc0NDI2ODB9.8XrpafUmtXMvIV1l5OyGqTQrCyTMsOWMSnL4dXt4X5E',
      //   refreshToken:
      //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjJlMzM2ZDJiYjg1ODZiNmJkYzRlMWQiLCJ0eXBlIjoiUkVGUkVTSF9UT0tFTiIsImlhdCI6MTY0NzE5NDk4OSwiZXhwIjoxNjQ5Nzg2OTg5fQ.rfdcAjNU_ZlUZL5gQTnBXkBQWbh3n92WCJcFPk5ATfk',
      // };
      setTokenToCookies(result.data);
      navigate('/home');
    }

    setLoading(false);
  };

  useEffect(() => {
    if (Cookies.get(ACCESS_TOKEN)) {
      navigate('/home');
    }
  }, [navigate]);

  return (
    <>
      <Loader />
      <div className="w-full h-screen flex justify-center">
        <div className="flex items-center w-full px-5 text-center bg-white rounded">
          <div>
            <div className="header px-2.5 font-bold text-left">
              <div className="text-[44px] text-[#a7a7a7] leading-[51px]">
                Find ways to manage your
              </div>
              <div className="text-[72px] leading-[83px] text-[#5c5c5c]">finances.</div>
            </div>
            <div className="h-14"></div>
            <div className="h-[100px] items-center flex flex-row justify-center">
              <div className="w-full text-[#DD4B39] ">
                <CommonButton
                  className="font-bold text-3xl h-[70px] rounded-lg border-[#DD4B39]"
                  onClick={onLoginGoogle}
                >
                  Continue with Google
                </CommonButton>
              </div>
            </div>
            <div className="h-20"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
