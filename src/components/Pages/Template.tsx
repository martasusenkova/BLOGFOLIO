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
  justify-content: space-between;
  border: 2px solid ${({ theme }) => theme.cardBorder};
  padding: 30px 40px;
  max-width: 600px;
  margin: 40px auto 100px;
  color: ${({ theme }) => theme.text};
`;
