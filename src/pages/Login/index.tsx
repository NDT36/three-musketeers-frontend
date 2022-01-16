import CommonAuthInput from 'components/CommonAuthInput';
import CommonButton from 'components/CommonButton/Index';
import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

type TLoginForm = {
  email: string;
  password: string;
};

const validationSchema: Yup.SchemaOf<TLoginForm> = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Too Short!').max(32, 'Too Long!').required('Required'),
});

function Login() {
  const initialValues = {
    email: '',
    password: '',
  };

  const onSubmit = (values: TLoginForm) => {
    alert(JSON.stringify(values, null, 2));
  };

  const formik = useFormik<TLoginForm>({
    initialValues,
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
                Login
              </CommonButton>
            </div>
          </form>

          <div className="h-[100px]">
            <p className="text-sm text-[#808080]">Or login with</p>
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
            Not a member?
            <a href="#/sign-up" className="text-[#5fa8f3] underline decoration-1">
              Sign up now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
