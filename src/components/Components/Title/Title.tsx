import styled from 'styled-components';
import React, { FC } from 'react';

interface TitleProps {
  text: string;
}

const Title: FC<TitleProps> = ({ text }) => {
  return <StyledTitle>{text}</StyledTitle>;
};

export default Title;

const StyledTitle = styled.h2`
  color: ${({ theme }) => theme.text};
  font-weight: 900;
  font-size: 36px;
  display: flex;
  flex-direction: column;
  margin: 10px;
  padding: 10px;
  align-self: flex-start;
`;
