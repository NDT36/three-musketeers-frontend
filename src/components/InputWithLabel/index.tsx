import FormError from 'components/FormError';
import React, { FC, useEffect, useRef } from 'react';

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  touched?: boolean;
  error?: string;
  label: string;
}
const InputWithLabel: FC<IProps> = function ({ touched, error, ...props }) {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (touched && error) {
      ref.current?.classList.add('border-red-400');
    } else {
      ref.current?.classList.remove('border-red-400');
    }
  }, [ref, touched, error]);

  return (
    <div className="relative h-[80px] flex flex-col py-3">
      <div className="px-0.5 absolute top-0 left-2.5 bg-white text-sm text-[silver]">
        {props.label}
      </div>
      <input
        ref={ref}
        className="w-full h-full p-2 outline-none transition duration-300 rounded-md text-neutral-500 border border-[silver]"
        {...props}
      ></input>
      <div className="h-5 w-full">
        <FormError touched={touched} error={error} />
      </div>
    </div>
  );
};

export default InputWithLabel;
