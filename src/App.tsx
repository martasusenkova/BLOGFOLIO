import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './components/ThemeToggle';
import BlogList from './components/Pages/BlogList';
import SignUp from './components/Pages/SignUp';
import Template from './components/Pages/Template';
import PostPage from './components/Pages/PostPage';
import SignIn from './components/Pages/SignIn';
import Success from './components/Pages/Success';
import RegistrationConfirmation from './components/Pages/RegistrationConfirmation';
import Hw_39 from './components/Pages/Hw_39';

function App() {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const currentTheme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={currentTheme}>
      <Wrapper>
        <Hw_39
          onThemeToggle={toggleTheme}
          currentTheme={isDark ? 'dark' : 'light'}
        ></Hw_39>
        <Template
          onThemeToggle={toggleTheme}
          currentTheme={isDark ? 'dark' : 'light'}
        ></Template>
        <BlogList
          onThemeToggle={toggleTheme}
          currentTheme={isDark ? 'dark' : 'light'}
        />
        <SignUp
          onThemeToggle={toggleTheme}
          currentTheme={isDark ? 'dark' : 'light'}
        />{' '}
        <RegistrationConfirmation
          onThemeToggle={toggleTheme}
          currentTheme={isDark ? 'dark' : 'light'}
        ></RegistrationConfirmation>
        <Success
          onThemeToggle={toggleTheme}
          currentTheme={isDark ? 'dark' : 'light'}
        ></Success>
        <SignIn
          onThemeToggle={toggleTheme}
          currentTheme={isDark ? 'dark' : 'light'}
        ></SignIn>
        <PostPage
          onThemeToggle={toggleTheme}
          currentTheme={isDark ? 'dark' : 'light'}
        ></PostPage>
      </Wrapper>
    </ThemeProvider>
  );
}

export default App;

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  min-height: 100vh;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
`;
