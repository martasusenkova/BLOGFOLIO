import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, {
  ThemeProvider as StyledThemeProvider,
} from 'styled-components';
import Title from '../Components/Title';
import { Header } from '../Components/Header';
import Pagination from '../Components/Pagination';
import SideMenu from '../Components/SideMenu';
import { useTheme } from '../../Context';
import { useAuth } from '../../Context/AuthContext';
import { lightTheme, darkTheme } from '../Components/ThemeToggle';
// import Button from '../Components/Button';

interface PageProps {
  children?: React.ReactNode;
  title: string;
  showBackButton?: boolean;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (pageNumber: number) => void;
  onAddPost?: () => void;
}

const FormTemplate: React.FC<PageProps> = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const { currentTheme } = useTheme();
  const { isLoggedIn, userName, signOut, signIn } = useAuth();

  const theme = currentTheme === 'light' ? lightTheme : darkTheme;
  const navigate = useNavigate();

  const showPagination = !!(
    props.currentPage &&
    props.totalPages &&
    props.onPageChange &&
    props.totalPages > 1
  );

  return (
    <StyledThemeProvider theme={theme}>
      <SideMenu
        isOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        onAddPost={props.onAddPost}
      />

      <StyledDiv>
        <Header isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />

        <StyledMain>
          <ContentContainer>
            {props.showBackButton && (
              <BackHomeButton as="button" onClick={() => navigate(-1)}>
                Back
              </BackHomeButton>
            )}

            <Title text={props.title} />
            {props.children}
          </ContentContainer>
        </StyledMain>

        {showPagination && (
          <PaginationFooter>
            <Pagination
              currentPage={props.currentPage!}
              totalPages={props.totalPages!}
              onPageChange={props.onPageChange!}
            />
          </PaginationFooter>
        )}

        <BottomFooter>
          <FooterContent>
            <span>©2025 Blogfolio</span>
            <span>All rights reserved</span>
          </FooterContent>
        </BottomFooter>
      </StyledDiv>
    </StyledThemeProvider>
  );
};

export default FormTemplate;

const StyledDiv = styled.div`
  margin-top: 60px;
  padding: 40px 100px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: ${({ theme }) => theme.background};
  transition: background 0.3s ease;
  box-sizing: border-box;
`;

const StyledMain = styled.main`
  background: ${({ theme }) => theme.background};
  box-sizing: border-box;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  @media (max-width: 1024px) {
    padding: 20px 80px;
  }
  @media (max-width: 768px) {
    padding: 20px 40px;
  }
  @media (max-width: 480px) {
    padding: 10px;
    font-size: 16px;
  }
`;

const PaginationFooter = styled.footer`
  border-top: 1px solid ${({ theme }) => theme.cardBorder};
  background: ${({ theme }) => theme.background};
  padding: 16px 150px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 1124px) {
    padding: 16px 100px;
  }
  @media (max-width: 768px) {
    padding: 12px 40px;
  }
  @media (max-width: 480px) {
    padding: 10px;
  }
`;

const BottomFooter = styled.footer`
  border-top: 1px solid ${({ theme }) => theme.cardBorder};
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  padding: 20px 150px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;

  @media (max-width: 1124px) {
    padding: 20px 100px;
  }
  @media (max-width: 768px) {
    padding: 20px 40px;
  }
  @media (max-width: 480px) {
    padding: 15px;
    font-size: 12px;
  }
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: auto;
  height: fit-content;
  color: ${({ theme }) => theme.text};
  @media (max-width: 480px) {
    align-items: flex-start;
  }
`;

const BackHomeButton = styled.button`
  color: ${({ theme }) => theme.text};
  background: ${({ theme }) => theme.background};
  all: unset;
  cursor: pointer;
  margin: 40px 20px 0;
  padding: 0 20px 0;
  display: flex;
  align-self: flex-start;

  @media (max-width: 480px) {
    margin: 0;
  }
`;
