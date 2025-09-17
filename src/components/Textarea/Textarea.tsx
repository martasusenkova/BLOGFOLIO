import React, { FC, ChangeEvent } from 'react';
import styled from 'styled-components';

interface TextareaProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder?: string;
}

const Textarea: FC<TextareaProps> = ({
  value,
  onChange,
  label,
  placeholder = 'Add your text',
}) => {
  return (
    <StyledTextareaWrapper>
      <Label>{label}</Label>
      <StyledTextarea
        value={value}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
          onChange(e.target.value)
        }
        placeholder={placeholder}
      />
    </StyledTextareaWrapper>
  );
};

export default Textarea;

const StyledTextareaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-weight: bold;
  color: #333;
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 8px 12px;
  font-size: 16px;
  border-radius: 2px;
  border: 0 solid #8a8a8a;
  outline: none;
  resize: none;

  &:focus {
    border: 1px solid #626161;
  }
`;
