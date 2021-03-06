import React from 'react';
import styled from 'styled-components';
import Label from './Label';

interface PropsType {
  caption?: string;
  initialValue: string;
  values: {
    id: string;
    text: string;
  }[];
  onChange: (event: React.FormEvent<HTMLSelectElement>) => void;
}

const StyledSelect = styled.select`
  background: #ffffff;
  border: 1px solid #979797;
  border-radius: 5px;
  font-family: sans-serif;
  font-size: 12px;
  color: #5e5e5e;
  height: 34px;
`;

const StyledSelectContainer = styled.div`
  margin: 5px 0px;
  display: inline-flex;
  flex-direction: column;
`;

const Select: React.SFC<PropsType> = ({
  initialValue,
  values,
  caption,
  onChange
}) => {
  const labelComponent = caption ? <Label caption={caption} /> : null;
  return (
    <StyledSelectContainer>
      {labelComponent}
      <StyledSelect value={initialValue} onChange={onChange}>
        {values.map(option => (
          <option value={option.id} key={option.id}>
            {option.text}
          </option>
        ))}
      </StyledSelect>
    </StyledSelectContainer>
  );
};

export default Select;
