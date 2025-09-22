import React from 'react';
import styled from 'styled-components';
import Title from '../Title';
import BurgerMenu from '../BurgerMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faSun,
  faMoon,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../Context';

interface PageProps {
  children?: React.ReactNode;
  title: string;
  showBackButton?: boolean;
}

const FormTemplate: React.FC<PageProps> = ({
  children,
  title,
  showBackButton,
}) => {
  const { currentTheme, toggleTheme } = useTheme();

  return (
    <>
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

        <Footer>
          <span>©2025 Blogfolio</span>
          <span>All rights reserved</span>
        </Footer>
      </StyledMain>
    </>
  );
};

export default FormTemplate;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #0000ae;
  color: #fff;
  height: 60px;
  position: relative;
`;

const HeaderNav = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  position: absolute;
  right: 20px;
`;

const StyledMain = styled.main`
  background: ${({ theme }) => theme.background};
  padding: 40px 150px 10px;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;
const SearchIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
  font-size: 20px;
`;
const UserIcon = styled(FontAwesomeIcon)`
  font-size: 20px;
  cursor: pointer;
`;
const ThemeToggleButton = styled.div`
  cursor: pointer;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
`;

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 150px;
  font-size: 14px;
  color: ${({ theme }) => theme.text};
  border-top: 1px solid ${({ theme }) => theme.cardBorder};
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  color: ${({ theme }) => theme.text};
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
`;
