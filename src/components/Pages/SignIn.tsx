import React, { useState } from 'react';
import FormTemplate from './FormTemplate';
import { Input, InputContainer, InputGrid } from '../Components/Input';
import Button from '../Components/Button';
import { useAuth } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { StyledLink, StyledRouterLink } from './SignUp';
import styled from 'styled-components';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const MOCK_USERNAME = 'Marta Susenkova';

    console.log({ email, password });

    signIn(MOCK_USERNAME, () => navigate('/blog'));
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
            <p>Forgot password?</p>
          </ForgotLink>

          <Button variant="Primary" width="340px" type="submit">
            Sign In
          </Button>

          <ForgotLinkTwo>
            Don't have an account?{' '}
            <StyledRouterLink to="/signup">Sign Up</StyledRouterLink>
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
