// SignUp.tsx
import React, { useState } from 'react';
import FormTemplate from './FormTemplate';
import { Input, InputContainer, InputGrid } from '../Input';
import Button from '../Button';
import styled from 'styled-components';

const SignUp: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <FormTemplate title="Sign Up" showBackButton={true}>
      <InputGrid>
        <InputContainer>
          <Input
            label="Name"
            type="text"
            placeholder="Your name"
            value={name}
            onChange={setName}
          />
        </InputContainer>
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
        <InputContainer>
          <Input
            label="Confirm password"
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={setConfirmPassword}
          />
        </InputContainer>
        <Button variant="Primary" text="Sign Up" width="340px"></Button>
        <StyledLink>
          Already have an account? <p>Sign in</p>
        </StyledLink>
      </InputGrid>
    </FormTemplate>
  );
};

export default SignUp;

export const StyledLink = styled.div`
  margin: 20px 0;
  font-size: 14px;

  color: ${({ theme }) => theme.text};

  p {
    color: ${({ theme }) => theme.primary};
    text-decoration: none;
    cursor: pointer;
    font-weight: 700;
  }
`;
