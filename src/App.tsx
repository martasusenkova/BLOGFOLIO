import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './core/store/store';
import { initializeAuth } from './core/store/auth/authThunks';

import { ThemeProvider, useTheme } from './Context';
import { AuthProvider } from './Context/AuthContext';

import { lightTheme, darkTheme } from './components/Components/ThemeToggle';
import ActivateUser from './components/Pages/ActivateUser';
import BlogList from './components/Pages/BlogList';
import SignUp from './components/Pages/SignUp';
import PostPage from './components/Pages/PostPage';
import SignIn from './components/Pages/SignIn';
import Success from './components/Pages/Success';
import RegistrationConfirmation from './components/Pages/RegistrationConfirmation';
import HW_39 from './components/Pages/HW39';
import SearchResultsPage from './components/Pages/SearchResult';
import Template from './components/Pages/Template';
import PostPreviewPopup from './core/PostPreviewPopup';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

const AppContent = () => {
  const { currentTheme } = useTheme();
  const theme = currentTheme === 'light' ? lightTheme : darkTheme;

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  return (
    <StyledThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/searchresult" element={<SearchResultsPage />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/post/:postId" element={<PostPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/activate/:uid" element={<ActivateUser />} />
        <Route path="/success" element={<Success />} />
        <Route
          path="/registration-confirmation"
          element={<RegistrationConfirmation />}
        />
        <Route path="/hw39" element={<HW_39 />} />
        <Route path="/template" element={<Template />} />
      </Routes>
      <PostPreviewPopup />
    </StyledThemeProvider>
  );
};
