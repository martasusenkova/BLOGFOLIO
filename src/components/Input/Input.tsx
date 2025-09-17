import React, { FC, ChangeEvent } from 'react';
import styled, { css } from 'styled-components';

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password';
  disabled?: boolean;
  error?: boolean;
  errorText?: string;
}

export const Input: FC<InputProps> = ({
  value,
  onChange,
  label,
  placeholder = '',
  type = 'text',
  disabled = false,
  error = false,
  errorText = '',
}) => {
  return (
    <StyledInputWrapper>
      <Label>{label}</Label>
      <StyledInput
        type={type}
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value)
        }
        placeholder={placeholder}
        disabled={disabled}
        $hasError={error}
      />
      {error && errorText && <ErrorText>{errorText}</ErrorText>}
    </StyledInputWrapper>
  );
};

export default Input;

export const StyledInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  font-weight: bold;
  color: #333;
`;

export const ErrorText = styled.p`
  color: red;
  font-size: 12px;
  margin: -4px 0 0;
`;

export const StyledInput = styled.input<{ $hasError: boolean }>`
  padding: 8px 12px;
  font-size: 16px;
  border-radius: 2px;
  border: 0 solid #8a8a8a;
  outline: none;
  width: 250px;

  &:focus {
    border: 1px solid #8a8a8a;
  }
  &:active {
    border: 0;
  }

  ${({ disabled, $hasError }) =>
    !disabled &&
    !$hasError &&
    css`
      &:hover {
        border: 1px solid #555;
      }
      &:active {
        border: 0;
      }
    `}

  ${({ $hasError }) =>
    $hasError &&
    css`
      border-color: red;
      &:focus {
        border-color: red;
      }
    `}

  ${({ disabled }) =>
    disabled &&
    css`
      background-color: #f2f2f2;
      color: #999;
      cursor: not-allowed;
      border-color: #d3d3d3;
    `}
`;

export const InputGrid = styled.div`
  background-color: rgb(224, 224, 224);
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: fit-content;
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;
