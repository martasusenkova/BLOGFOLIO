import React, { useState } from 'react';
import FormTemplate from './FormTemplate';
import { Input, InputContainer, InputGrid } from '../Input';
import Button from '../Button';
import { StyledLink } from './SignUp';
import styled from 'styled-components';
interface SignInProps {
  onThemeToggle: () => void;
  currentTheme: 'light' | 'dark';
}

const SignIn: React.FC<SignInProps> = ({ onThemeToggle, currentTheme }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <FormTemplate
      onThemeToggle={onThemeToggle}
      currentTheme={currentTheme}
      title="Sign In"
      showBackButton={true}
    >
      <StyledIntputGrid>
        <InputContainer>
          <Input
            label="Email"
            type="email"
            placeholder="Your email"
            value={email}
            onChange={setEmail}
          />
        </InputContainer>
        <InputContainer>
          <Input
            label="Password"
            type="password"
            placeholder="Your password"
            value={password}
            onChange={setPassword}
          />
        </InputContainer>
        <ForgotLink>Forgot password?</ForgotLink>
        <Button variant="Primary" text="Sign In" width="340px"></Button>
        <ForgotLinkTwo>
          Don't have an account? <p>Sign Up</p>
        </ForgotLinkTwo>
      </StyledIntputGrid>
    </FormTemplate>
  );
};

export default SignIn;

const StyledIntputGrid = styled(InputGrid)`
  gap: 10px;
`;

const ForgotLink = styled(StyledLink)`
  margin: 0 0 10px;
  padding: 0;
  display: flex;
  flex-direction: row;
`;

const ForgotLinkTwo = styled(StyledLink)`
  margin: 6px;
  padding: 0;

  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  justify-content: center;
`;
