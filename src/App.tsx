import React from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { ThemeProvider, useTheme } from './components/Context';
import { lightTheme, darkTheme } from './components/ThemeToggle';
import BlogList from './components/Pages/BlogList';
import SignUp from './components/Pages/SignUp';
import Template from './components/Pages/Template';
import PostPage from './components/Pages/PostPage';
import SignIn from './components/Pages/SignIn';
import Success from './components/Pages/Success';
import RegistrationConfirmation from './components/Pages/RegistrationConfirmation';
import HW_39 from './components/Pages/HW39';

function App() {
  return (
    <ThemeProvider>
      <ThemeWrapper />
    </ThemeProvider>
  );
}

export default App;

const ThemeWrapper = () => {
  const { currentTheme } = useTheme();
  const theme = currentTheme === 'light' ? lightTheme : darkTheme;

  return (
    <StyledThemeProvider theme={theme}>
      <HW_39 />
      <Template />
      <BlogList />
      <SignUp />
      <RegistrationConfirmation />
      <Success />
      <SignIn />
      <PostPage />
    </StyledThemeProvider>
  );
};
