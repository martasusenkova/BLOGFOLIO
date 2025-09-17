import React, { FC, useState } from 'react';
import styled from 'styled-components';

interface IButton {
  variant: 'Primary' | 'Secondary' | 'Secondary2';
  text: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  width?: string;
}

const Button: FC<IButton> = ({ variant, text, onClick, width }) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    setIsActive(true);

    if (onClick) {
      onClick(e);
    }
  };

  return (
    <ButtonComponent
      $variant={variant}
      $isActive={isActive}
      $width={width}
      onClick={handleClick}
    >
      {text}
    </ButtonComponent>
  );
};

export default Button;

const ButtonComponent = styled.button<{
  $variant: 'Primary' | 'Secondary' | 'Secondary2';
  $isActive: boolean;
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

  border: none;
  border-radius: 2px;
  cursor: pointer;
  width: ${({ $width }) => $width || 'auto'};

  ${({ $variant, $isActive }) => {
    switch ($variant) {
      case 'Primary':
        return `
          background-color: ${$isActive ? 'rgb(217, 217, 217)' : 'rgb(14, 49, 176)'};
          color: ${$isActive ? 'rgb(108, 108, 108)' : 'white'};
          ${$isActive ? 'transform: scale(0.97);' : ''}
        `;
      case 'Secondary':
        return `
          background-color: ${$isActive ? 'rgb(217, 217, 217)' : 'rgb(240, 241, 241)'};
          color: ${$isActive ? 'rgb(108, 108, 108)' : 'black'};
          ${$isActive ? 'transform: scale(0.97);' : ''}
        `;
      case 'Secondary2':
        return `
          background-color: transparent;
          color: ${$isActive ? 'rgb(108, 108, 108)' : 'red'};
          border: ${$isActive ? 'none' : '1px solid rgb(209, 211, 211)'};
          ${$isActive ? 'transform: scale(0.97);' : ''}
        `;
      default:
        return `
          background-color: black;
          color: white;
        `;
    }
  }}
`;
