import React, { useState } from 'react';
import FormTemplate from './FormTemplate';
import { Input, InputContainer, InputGrid } from '../Components/Input';
import Button from '../Components/Button';
import { StyledLink } from './SignUp';
import styled from 'styled-components';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <FormTemplate title="Sign In" showBackButton={true}>
      <form onSubmit={handleSubmit}>
        <StyledInputGrid>
          <InputContainer>
            <Input
              label="Email"
              type="email"
              placeholder="Your email"
              value={email}
              onChange={setEmail}
              autoComplete="email"
            />
          </InputContainer>
          <InputContainer>
            <Input
              label="Password"
              type="password"
              placeholder="Your password"
              value={password}
              onChange={setPassword}
              autoComplete="current-password"
            />
          </InputContainer>

          <ForgotLink>
            {' '}
            <a href="/">Forgot password?</a>
          </ForgotLink>

          <Button variant="Primary" width="340px" type="submit">
            Sign In
          </Button>

          <ForgotLinkTwo>
            Don't have an account? <a href="/signup">Sign Up</a>
          </ForgotLinkTwo>
        </StyledInputGrid>
      </form>
    </FormTemplate>
  );
};

export default SignIn;

const StyledInputGrid = styled(InputGrid)`
  gap: 10px;
`;

const ForgotLink = styled(StyledLink)`
  margin: 0 0 5px;
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
