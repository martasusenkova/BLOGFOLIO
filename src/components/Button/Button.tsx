import React, { FC } from 'react';
import styled, { css } from 'styled-components';

interface IButton {
  variant: 'Primary' | 'Secondary' | 'Secondary2';
  text: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  width?: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button: FC<IButton> = ({
  variant,
  text,
  onClick,
  width,
  type = 'button',
}) => {
  return (
    <ButtonComponent
      $variant={variant}
      $width={width}
      type={type}
      onClick={onClick}
    >
      {text}
    </ButtonComponent>
  );
};

export default Button;

const ButtonComponent = styled.button<{
  $variant: 'Primary' | 'Secondary' | 'Secondary2';
  $width?: string;
}>`
  font-size: 14px;
  font-weight: bold;
  margin: 10px auto 0;
  padding: 10px 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border-radius: 2px;
  cursor: pointer;
  width: ${({ $width }) => $width || 'auto'};
  border: none;
  transition: all 0.2s ease;

  ${({ $variant }) => {
    switch ($variant) {
      case 'Primary':
        return css`
          background-color: rgb(14, 49, 176);
          color: white;

          &:hover {
            background-color: rgb(20, 60, 200);
          }

          &:active {
            background-color: rgb(217, 217, 217);
            color: rgb(108, 108, 108);
            transform: scale(0.97);
          }
        `;
      case 'Secondary':
        return css`
          background-color: rgb(240, 241, 241);
          color: black;

          &:hover {
            background-color: rgb(225, 226, 226);
          }

          &:active {
            background-color: rgb(217, 217, 217);
            color: rgb(108, 108, 108);
            transform: scale(0.97);
          }
        `;
      case 'Secondary2':
        return css`
          background-color: transparent;
          color: red;

          &:hover {
            border: 1px solid rgb(209, 211, 211);
          }

          &:active {
            background-color: rgb(217, 217, 217);
            color: rgb(108, 108, 108);
            border: none;
            transform: scale(0.97);
            border: 0;
          }
        `;

      default:
        return css`
          background-color: black;
          color: white;
        `;
    }
  }}
`;
