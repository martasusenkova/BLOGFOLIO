import React, { FC, ChangeEvent } from 'react';
import styled, { css } from 'styled-components';

interface InputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: boolean;
  errorText?: string;
  disabled?: boolean;
  autoComplete?: string;
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
  autoComplete,
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
        autoComplete={autoComplete}
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
  align-items: flex-start;
`;

export const Label = styled.label`
  font-weight: bold;
  color: ${({ theme }) => theme.text};
`;

export const ErrorText = styled.p`
  color: ${({ theme }) => theme.error};
  font-size: 12px;
  margin: -4px 0 0;
`;

export const StyledInput = styled.input<{ $hasError: boolean }>`
  padding: 8px 12px;
  font-size: 16px;
  border-radius: 2px;
  border: ${({ theme }) => (theme.text === '#ffffff' ? '1px' : '0')} solid
    ${({ theme }) => theme.inputBorder};
  outline: none;
  width: 340px;
  background-color: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.text};
  box-sizing: border-box;
  &:focus {
    border: 1px solid ${({ theme }) => theme.text};
  }

  &:active {
    border: 0;
  }

  ${({ disabled, $hasError }) =>
    !disabled &&
    !$hasError &&
    css`
      &:hover {
        border: 1px solid ${({ theme }) => theme.text};
      }
      &:active {
        border: 0;
      }
    `}

  ${({ $hasError, theme }) =>
    $hasError &&
    css`
      border-color: ${theme.error};
      &:focus {
        border-color: ${theme.error};
      }
    `}
  
  ${({ disabled, theme }) =>
    disabled &&
    css`
      background-color: ${theme.disabledBackground};
      color: ${theme.disabledText};
      cursor: not-allowed;
      border-color: ${theme.disabledBorder};
    `}
`;

export const InputGrid = styled.div`
  background-color: ${({ theme }) => theme.background};
  border-color: ${({ theme }) => theme.cardBorder};
  padding: 32px;
  border: 1px solid;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: fit-content;
  justify-content: center;
  align-items: flex-start;
  margin: 0 auto;
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  color: ${({ theme }) => theme.text};
`;
