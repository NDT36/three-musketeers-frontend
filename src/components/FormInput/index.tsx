import FormError from 'components/FormError';
import React, { FC, useEffect, useRef } from 'react';

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  touched?: boolean;
  error?: string;
}
const FormInput: FC<IProps> = function ({ touched, error, ...props }) {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (touched && error) {
      ref.current?.classList.add('border-red-400');
    } else {
      ref.current?.classList.remove('border-red-400');
    }
  }, [ref, touched, error]);

  return (
    <div className="h-[60px] flex flex-col">
      <input
        ref={ref}
        className="w-full h-full p-2 m-0 appearance-none outline-none transition duration-300 border rounded-md text-gray-600 border-[silver]"
        {...props}
      />
      <div className="h-5 w-full">
        <FormError touched={touched} error={error} />
      </div>
    </div>
  );
};

export default FormInput;
