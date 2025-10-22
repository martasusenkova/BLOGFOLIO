import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../core/store/auth/authThunks';
import { useNavigate } from 'react-router-dom';
import FormTemplate from './FormTemplate';
import { Input, InputContainer, InputGrid } from '../Components/Input';
import Button from '../Components/Button';
import { RootState } from '../../core/store/store';
import { AppDispatch } from '../../core/store/store';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const {
    isRegistered,
    loading,
    error: serverError,
  } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isRegistered) navigate('/registration-confirmation');
  }, [isRegistered, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const resultAction = await dispatch(
        registerUser({
          username: name,
          email,
          password,
          course_group: 18,
        })
      );

      if (registerUser.rejected.match(resultAction)) {
        const serverMessage =
          typeof resultAction.payload === 'string'
            ? resultAction.payload
            : JSON.stringify(resultAction.payload);
        setError(serverMessage || 'Registration failed');
      }
    } catch (err) {
      setError('Unexpected error. Please try again.');
    }
  };

  return (
    <FormTemplate title="Sign Up" showBackButton>
      <form onSubmit={handleSubmit}>
        <InputGrid>
          <InputContainer>
            <Input label="Name" type="text" value={name} onChange={setName} />
          </InputContainer>
          <InputContainer>
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={setEmail}
            />
          </InputContainer>
          <InputContainer>
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={setPassword}
            />
          </InputContainer>
          <InputContainer>
            <Input
              label="Confirm password"
              type="password"
              value={confirmPassword}
              onChange={setConfirmPassword}
            />
          </InputContainer>

          {/* Показываем ошибки */}
          {(error || serverError) && (
            <ErrorText>{error || serverError}</ErrorText>
          )}

          <Button
            variant="Primary"
            width="340px"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Sign Up'}
          </Button>

          <StyledLink>
            Already have an account?{' '}
            <StyledRouterLink to="/signin">Sign In</StyledRouterLink>
          </StyledLink>
        </InputGrid>
      </form>
    </FormTemplate>
  );
};

export default SignUp;

export const StyledRouterLink = styled(Link)`
  color: ${({ theme }) => theme.primary2} !important;
`;
export const StyledLink = styled.p`
  all: unset;
  margin: 0;
  font-size: 14px;
  color: ${({ theme }) => theme.text};
  a {
    color: ${({ theme }) => theme.primary};
    text-decoration: none;
    cursor: pointer;
    font-weight: 700;
  }
`;

export const ErrorText = styled.div`
  color: red;
  font-size: 13px;
  margin: 6px 0 0;
`;
