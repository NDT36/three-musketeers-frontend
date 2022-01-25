import FormError from 'components/FormError';
import React, { FC, useEffect, useRef } from 'react';

interface IProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  touched?: boolean;
  error?: string;
  label: string;
}
const FormTextArea: FC<IProps> = function ({ touched, error, ...props }) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (touched && error) {
      ref.current?.classList.add('border-red-400');
    } else {
      ref.current?.classList.remove('border-red-400');
    }
  }, [ref, touched, error]);

  return (
    <div className="relative h-32 flex flex-col py-3">
      <div className="px-0.5 absolute top-0 left-2.5 bg-white text-[silver]">{props.label}</div>
      <textarea
        ref={ref}
        className="w-full p-2 outline-none transition duration-300 rounded-md text-neutral-500 border border-[silver]"
        cols={30}
        rows={10}
        {...props}
      ></textarea>
      <div className="h-5 w-full">
        <FormError touched={touched} error={error} />
      </div>
    </div>
  );
};

export default FormTextArea;
