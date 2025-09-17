import React from 'react';
import styled from 'styled-components';
import FormTemplate from './FormTemplate';
import Button from '../Button';
import { ContentContainer } from './Template';

interface RegistrationProp {
  onThemeToggle: () => void;
  currentTheme: 'light' | 'dark';
}

const RegistrationConfirmation: React.FC<RegistrationProp> = ({
  onThemeToggle,
  currentTheme,
}) => {
  return (
    <FormTemplate
      onThemeToggle={onThemeToggle}
      currentTheme={currentTheme}
      title="Registration Confirmation"
      showBackButton={true}
    >
      <ContentContainer>
        <ConfirmationMessage>
          <h1>Registration Successful!</h1>
          <p>
            Thank you for registering. You have successfully created your
            account.
          </p>
          <p>Go to your email@email.com and confirm it.</p>
        </ConfirmationMessage>
        <Button variant="Primary" text="Go Home" width="340px" />
      </ContentContainer>
    </FormTemplate>
  );
};

export default RegistrationConfirmation;

const ConfirmationMessage = styled.div`
  text-align: center;
  margin-bottom: 20px;

  p {
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
