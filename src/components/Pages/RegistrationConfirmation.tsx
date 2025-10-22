import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormTemplate from './FormTemplate';
import Button from '../Components/Button';
import styled from 'styled-components';
import { ContentContainer } from './Template';
import { RootState } from '../../core/store/store';

const RegistrationConfirmation = () => {
  const navigate = useNavigate();
  const { userEmail } = useSelector((state: RootState) => state.auth);

  return (
    <FormTemplate title="Registration Confirmation" showBackButton>
      <ContentContainer>
        <ConfirmationMessage>
          <h1>Registration Successful!</h1>
          <p>
            Thank you for registering. You have successfully created your
            account.
          </p>
          <p>
            Please confirm your email: <strong>{userEmail}</strong>
          </p>
        </ConfirmationMessage>

        <Button variant="Primary" width="100%" onClick={() => navigate('/')}>
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
