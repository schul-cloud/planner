import React from 'react';

type PropsType = {
  color: string;
};

const IconAdd: React.SFC<PropsType> = props => (
  <svg width={24} height={24} {...props}>
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill={props.color} />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
);

export default IconAdd;
