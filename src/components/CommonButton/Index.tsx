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
        'w-full h-[50px] p-2 outline-none transition duration-300 border-solid border rounded-sm hover:bg-gray-500 hover:text-white',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default CommonButton;
