import React, { FC, memo } from 'react';

type Props = {
  touched?: boolean;
  error?: string;
};

const FormError: FC<Props> = ({ touched, error }) => {
  if (touched) {
    return <p className="text-xs cursor-help text-red-400 text-left">{error}</p>;
  }
  return null;
};

export default memo(FormError);
