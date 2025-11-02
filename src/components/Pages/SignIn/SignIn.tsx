import React, { useState } from 'react';
import FormTemplate from '../FormTemplate';
import { Input, InputContainer, InputGrid } from '../../Components/Input';
import Button from '../../Components/Button';
import { useNavigate } from 'react-router-dom';
import { StyledLink, StyledRouterLink } from '../SignUp';
import styled from 'styled-components';
import { useAuth } from '../../../Context/AuthContext';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { signIn, isAuthLoaded } = useAuth();

  if (!isAuthLoaded) return <div>Loading...</div>;
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      await signIn({ email, password });
      navigate('/blog');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
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

          {error && <ErrorText>{error}</ErrorText>}

          <Button
            variant="Primary"
            width="340px"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Sign In'}
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

// --- Стили ---
const StyledInputGrid = styled(InputGrid)`
  gap: 10px;
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

const ErrorText = styled.div`
  color: red;
  font-size: 13px;
  margin: 6px 0 0;
`;
