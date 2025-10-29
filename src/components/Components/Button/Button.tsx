import React, { FC } from 'react';
import styled, { css } from 'styled-components';

type ButtonVariant =
  | 'Primary'
  | 'Secondary'
  | 'Secondary2'
  | 'IconWithText'
  | 'Icon';

interface IButton {
  variant: ButtonVariant;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  width?: string;
  height?: string;
  margin?: string;
  padding?: string;
  borderRadius?: string;

  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
  disabled?: boolean;
  isLiked?: boolean;
  isDisliked?: boolean;
}

const Button: FC<IButton> = ({
  variant,
  onClick,
  width,
  height,
  margin,
  padding,
  borderRadius,
  type = 'button',
  children,
  isLiked,
  isDisliked,
  disabled,
}) => {
  return (
    <ButtonComponent
      $variant={variant}
      $width={width}
      $height={height}
      $customMargin={margin}
      $customPadding={padding}
      $customBorderRadius={borderRadius}
      $isLiked={isLiked}
      $isDisliked={isDisliked}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {' '}
      {children}
    </ButtonComponent>
  );
};

export default Button;

const ButtonComponent = styled.button<{
  $variant: ButtonVariant;
  $width?: string;
  $height?: string;
  $customMargin?: string;
  $customPadding?: string;
  $customBorderRadius?: string;
  $isLiked?: boolean;
  $isDisliked?: boolean;
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
  height: ${({ $height }) => $height || 'auto'};
  ${({ $customMargin }) =>
    $customMargin &&
    css`
      margin: ${$customMargin};
    `}
  ${({ $customPadding }) =>
    $customPadding &&
    css`
      padding: ${$customPadding};
    `}

     ${({ $customBorderRadius }) =>
    $customBorderRadius &&
    css`
      border-radius: ${$customBorderRadius};
    `}
  border: none;
  transition: all 0.2s ease;

  svg {
    width: 16px;
    height: 16px;
    color: inherit;
    margin: 0 6px;
  }

  ${({ $variant, $isLiked, $isDisliked }) => {
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
          background-color: rgb(220, 220, 220);
          color: black;

          &:hover {
            background-color: rgb(189, 189, 189);
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
            border: 0;
            transform: scale(0.97);
          }
        `;
      case 'IconWithText':
        return css`
          background-color: rgb(217, 217, 217);
          color: rgb(108, 108, 108);

          &:hover {
            background-color: rgb(189, 189, 189);
            color: black;
          }

          &:disabled {
            background-color: rgb(240, 240, 240);
            color: rgb(190, 190, 190);
          }
        `;
      case 'Icon':
        return css`
          background-color: rgb(217, 217, 217);
          color: rgb(108, 108, 108);
          padding: 8px;

          &:hover {
            ${$isLiked &&
            css`
              background-color: rgb(20, 60, 200);
              color: white;
            `}
            ${$isDisliked &&
            css`
              background-color: red;
              color: white;
            `}
      ${!$isLiked &&
            !$isDisliked &&
            css`
              background-color: rgb(189, 189, 189);
              color: black;
            `}
          }

          &:disabled {
            background-color: rgb(240, 240, 240);
            color: rgb(190, 190, 190);
            cursor: not-allowed;
          }

          &:active {
            transform: scale(0.97);
          }
        `;

      default:
        return css`
          background-color: #fffdfd;
          color: #000000;
        `;
    }
  }}
`;
