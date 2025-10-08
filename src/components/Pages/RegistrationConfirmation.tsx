import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import FormTemplate from './FormTemplate';
import Button from '../Components/Button';
import { ContentContainer } from './Template';

const RegistrationConfirmation: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/success');
  };

  return (
    <FormTemplate title="Registration Confirmation" showBackButton={true}>
      <ContentContainer>
        <ConfirmationMessage>
          <h1>Registration Successful!</h1>
          <p>
            Thank you for registering. You have successfully created your
            account.
          </p>
          <p>Go to your email@email.com and confirm it.</p>
        </ConfirmationMessage>

        <Button variant="Primary" width="100%" onClick={handleGoHome}>
          {' '}
          Go Home
        </Button>
      </ContentContainer>
    </FormTemplate>
  );
};

export default RegistrationConfirmation;

const ConfirmationMessage = styled.div`
  text-align: center;
  margin-bottom: 20px;

  h1 {
    font-size: 20px;
    color: #373737;
    margin-bottom: 10px;
  }

  p {
    font-size: 14px;
    color: ${({ theme }) => theme.text};
    line-height: 1.5;
  }
`;
