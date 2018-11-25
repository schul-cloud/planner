import React from 'react';

type PropsType = {
  width?: number;
  height?: number;
  color?: string;
};

const IconSave: React.SFC<PropsType> = props => (
  <svg width={24} height={24} viewBox="0 0 24 24" {...props}>
    <path d="M0 0h24v24H0z" fill="none" />
    <path
      fill={props.color || 'currentColor'}
      d="M17 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"
    />
  </svg>
);

export default IconSave;
