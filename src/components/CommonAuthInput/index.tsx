import FormError from 'components/FormError';
import React, { FC, useEffect, useRef } from 'react';

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  touched?: boolean;
  error?: string;
}
const CommonAuthInput: FC<IProps> = function ({ touched, error, ...props }) {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (touched && error) {
      ref.current?.classList.add('border-red-400');
    } else {
      ref.current?.classList.remove('border-red-400');
    }
    return () => {
      ref.current?.classList.remove('border-red-400');
    };
  }, [touched, error]);
  return (
    <div className="h-[70px] flex flex-col">
      <input
        ref={ref}
        className="w-full p-2 outline-none transition duration-300 rounded-md text-[#808080] border border-solid border-[silver]  focus:bg-[#f5f5f5]"
        {...props}
      />
      <div className="h-5 w-full">
        <FormError touched={touched} error={error} />
      </div>
    </div>
  );
};

export default CommonAuthInput;
