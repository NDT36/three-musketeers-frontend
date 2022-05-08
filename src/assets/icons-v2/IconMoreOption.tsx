import React, { FC } from 'react';

interface IProps {
  fill?: string;
}
const IconMoreOption: FC<IProps> = (props) => {
  return (
    <svg width="32" height="40" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_947_247)">
        <g clip-path="url(#clip1_947_247)">
          <circle
            cx="16"
            cy="30"
            r="3"
            transform="rotate(-90 16 30)"
            fill={props.fill || '#9D9C9C'}
          />
        </g>
        <g clip-path="url(#clip2_947_247)">
          <circle
            cx="16"
            cy="20"
            r="3"
            transform="rotate(-90 16 20)"
            fill={props.fill || '#9D9C9C'}
          />
        </g>
        <g clip-path="url(#clip3_947_247)">
          <circle
            cx="16"
            cy="10"
            r="3"
            transform="rotate(-90 16 10)"
            fill={props.fill || '#9D9C9C'}
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_947_247">
          <rect width="40" height="32" fill="white" transform="translate(0 40) rotate(-90)" />
        </clipPath>
        <clipPath id="clip1_947_247">
          <rect width="10" height="32" fill="white" transform="translate(0 35) rotate(-90)" />
        </clipPath>
        <clipPath id="clip2_947_247">
          <rect width="10" height="32" fill="white" transform="translate(0 25) rotate(-90)" />
        </clipPath>
        <clipPath id="clip3_947_247">
          <rect width="10" height="32" fill="white" transform="translate(0 15) rotate(-90)" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default IconMoreOption;
