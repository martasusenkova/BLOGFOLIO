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
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setError(null);

    console.log('Form submitted:', { name, email, password });
  };

  return (
    <FormTemplate title="Sign Up" showBackButton={true}>
      <form onSubmit={handleSubmit}>
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

          {error && <ErrorText>{error}</ErrorText>}

          <Button
            variant="Primary"
            text="Sign Up"
            width="340px"
            type="submit"
          />
          <StyledLink>
            Already have an account? <p>Sign in</p>
          </StyledLink>
        </InputGrid>
      </form>
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

export const ErrorText = styled.div`
  color: red;
  font-size: 13px;
  margin: 10px 0;
`;
