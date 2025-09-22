import React from 'react';
import FormTemplate from './FormTemplate';
import styled from 'styled-components';

const Template: React.FC = () => {
  return (
    <FormTemplate title="Title" showBackButton={true}>
      <ContentContainer>Template Body</ContentContainer>
    </FormTemplate>
  );
};

export default Template;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  border: 2px solid ${({ theme }) => theme.cardBorder};
  height: 100px;
  width: 600px;
  height: 300px;
  margin: 20px auto 100px;
  color: ${({ theme }) => theme.text};
`;
