import React, { FC } from 'react';
import cls from 'classnames';

const CommonButton: FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = function ({
  children,
  className,
  ...props
}) {
  return (
    <button
      className={cls(
        'w-full p-2 outline-none transition duration-300 border-solid border border-[silver] rounded-md hover:bg-primary hover:text-white',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default CommonButton;
