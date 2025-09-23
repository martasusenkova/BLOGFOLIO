import React from 'react';
import styled, { css } from 'styled-components';
import Title from '../Components/Title';
import BurgerMenu from '../Components/BurgerMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faSun,
  faMoon,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../../Context';
import Pagination from '../Components/Pagination/Pagination';

interface PageProps {
  children?: React.ReactNode;
  title: string;
  showBackButton?: boolean;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (pageNumber: number) => void;
}

const FormTemplate: React.FC<PageProps> = ({
  children,
  title,
  showBackButton,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const { currentTheme, toggleTheme } = useTheme();

  const showPagination = !!(
    currentPage &&
    totalPages &&
    onPageChange &&
    totalPages > 1
  );

  return (
    <StyledDiv>
      <Header>
        <BurgerMenu />
        <HeaderNav>
          <SearchIcon icon={faSearch} />
          <ThemeToggleButton onClick={toggleTheme}>
            <FontAwesomeIcon icon={currentTheme === 'light' ? faMoon : faSun} />
          </ThemeToggleButton>
          <UserIcon icon={faUser} />
        </HeaderNav>
      </Header>

      <StyledMain>
        <ContentContainer>
          {showBackButton && <BackHomeButton>Back</BackHomeButton>}
          <Title text={title} />
          {children}
        </ContentContainer>
      </StyledMain>

      <StyledFooter $hasPagination={showPagination}>
        {showPagination && (
          <Pagination
            currentPage={currentPage!}
            totalPages={totalPages!}
            onPageChange={onPageChange!}
          />
        )}
        <FooterContent>
          <span>©2025 Blogfolio</span>
          <span>All rights reserved</span>
        </FooterContent>
      </StyledFooter>
    </StyledDiv>
  );
};

export default FormTemplate;

// --- Styled Components ---

const StyledDiv = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: ${({ theme }) => theme.background};
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #0000ae;
  color: #fff;
  height: 50px;
  position: relative;

  @media (max-width: 768px) {
    height: 40px;
  }
`;

const HeaderNav = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  position: absolute;
  right: 20px;

  @media (max-width: 480px) {
    gap: 10px;
    right: 10px;
  }
`;

const StyledMain = styled.main`
  background: ${({ theme }) => theme.background};
  padding: 20px 150px;
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

const SearchIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
  font-size: 20px;

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const UserIcon = styled(FontAwesomeIcon)`
  font-size: 20px;
  cursor: pointer;

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const ThemeToggleButton = styled.div`
  cursor: pointer;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const StyledFooter = styled.footer<{ $hasPagination: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  padding: 20px 150px;
  color: ${({ theme }) => theme.text};
  border-top: 1px solid ${({ theme }) => theme.cardBorder};
  background: ${({ theme }) => theme.background};

  ${({ $hasPagination }) =>
    $hasPagination &&
    css`
      flex-direction: column;
      align-items: center;
      gap: 15px;
    `}

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
  margin: 0 20px 0;
  padding: 0 20px 0;
  display: flex;
  align-self: flex-start;

  @media (max-width: 480px) {
    margin: 0;
  }
`;
