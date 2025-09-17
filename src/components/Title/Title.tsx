import React, { FC } from 'react';
import styled from 'styled-components';

interface TitleProps {
  text: string;
}

const Title: FC<TitleProps> = ({ text }) => (
  <TitleComponent>{text}</TitleComponent>
);

export default Title;

const TitleComponent = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: black;
  display: flex;
  margin: 10px auto;
`;
