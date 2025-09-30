import React from 'react';
import { useNavigate } from 'react-router-dom';
import FormTemplate from './FormTemplate';
import Button from '../Components/Button';
import { ContentContainer } from './Template';
import styled from 'styled-components';

const Success: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/blog');
  };
  return (
    <FormTemplate title="Success" showBackButton={true}>
      <ContentContainer>
        <SuccessText>
          {' '}
          Email confirmed. Your registration is now completed{' '}
        </SuccessText>
        <Button variant="Primary" width="100%" onClick={handleGoHome}>
          Go Home
        </Button>
      </ContentContainer>
    </FormTemplate>
  );
};

export default Success;

const SuccessText = styled.p`
  font-size: 18px;
  margin: 0 0 24px 0;
`;
