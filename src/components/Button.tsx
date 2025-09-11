import React, { FC } from 'react';
import styled from 'styled-components';

interface IButton {
  variant: 'Primary' | 'Secondary' | 'Secondary2';
  text: string;
}

const Button: FC<IButton> = ({ variant, text }) => {
  return <ButtonComponent $variant={variant}>{text}</ButtonComponent>;
};

export default Button;

const ButtonComponent = styled.button<{
  $variant: 'Primary' | 'Secondary' | 'Secondary2';
}>`
  font-size: 14px;
  font-weight: bold;
  display: flex;
  margin: 10px auto;
  padding: 10px 20px;
  border: none;
  border-radius: 2px;
  cursor: pointer;

  ${({ $variant }) => {
    switch ($variant) {
      case 'Primary':
        return `
          background-color:rgb(14, 49, 176);
            color: white;

     &:hover {
            background-color: rgb(113, 134, 208);
          }
          &:active {
      background-color:rgb(217, 217, 217);
                color:rgb(108, 108, 108) ;


            transform: scale(0.97);
          }
        `;
      case 'Secondary':
        return `
          background-color:rgb(240, 241, 241);
            color: black;

            &:hover {
                      background-color:rgb(209, 211, 211);
            }

       &:active {
      background-color:rgb(217, 217, 217);
                color:rgb(108, 108, 108) ;


            transform: scale(0.97);
          }
        `;
      case 'Secondary2':
        return `
          background-color: transparent;
            color: red;
                  &:hover {
                       border: 1px solid rgb(209, 211, 211);

            }

       &:active {
                color:rgb(108, 108, 108) ;
  border: none;


            transform: scale(0.97);
          }

        `;
      default:
        return `
          background-color: black;
            color: white;
      &:hover {
                      background-color:rgb(209, 211, 211);
            }

       &:active {
      background-color:rgb(217, 217, 217);
                color:rgb(108, 108, 108) ;


            transform: scale(0.97);
          }
        `;
    }
  }}
`;
