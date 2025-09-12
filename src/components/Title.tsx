import React, { FC } from 'react';
import styled from 'styled-components';

interface TitleProps {
  text: string;
}

const Title: FC<TitleProps> = ({ text }) => (
  <SignInComponent>{text}</SignInComponent>
);

export default Title;

const SignInComponent = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: black;
  display: flex;
  margin: 10px auto;
`;
