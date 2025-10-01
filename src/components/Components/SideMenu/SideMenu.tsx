import React, { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon } from '@fortawesome/free-solid-svg-icons';
import { faSun as faSunRegular } from '@fortawesome/free-regular-svg-icons';

import { useTheme } from '../../../Context';
import { useAuth } from '../../../Context/AuthContext';
import Button from '../Button';
import User from '../User';
import { UserContainerButton } from '../Header';

interface IMenuItem {
  title: string;
  onClick: () => void;
  isLink?: boolean;
  path?: string;
}

interface ISideMenuProps {
  isOpen: boolean;
  toggleMenu: () => void;
  onAddPost?: () => void;
}

interface IMenuContainerProps {
  $isOpen: boolean;
}

export const SideMenu: FC<ISideMenuProps> = ({
  isOpen,
  toggleMenu,
  onAddPost,
}) => {
  const { isLoggedIn, userName, signOut } = useAuth();
  const navigate = useNavigate();
  const { currentTheme, toggleTheme } = useTheme();

  const goToHome = () => {
    navigate('/blog');
  };

  const handleLogout = () => {
    signOut();
    navigate('/blog');
  };

  const handleSignIn = () => {
    navigate('/signin');
  };

  const menuItems: IMenuItem[] = isLoggedIn
    ? [
        { title: 'Home', onClick: goToHome, isLink: true, path: '/blog' },
        {
          title: 'Add post',
          onClick: () => navigate('/template'),
          isLink: true,
          path: '/template',
        },
        {
          title: 'Search Results',
          onClick: () => navigate('/searchresult'),
          isLink: true,
          path: '/searchresult',
        },
      ]
    : [{ title: 'Home', onClick: goToHome, isLink: true, path: '/blog' }];

  const mainAction = isLoggedIn
    ? { title: 'Log Out', action: handleLogout, path: '' }
    : { title: 'Sign In', action: handleSignIn, path: '/signin' };

  const handleMainAction = () => {
    mainAction.action();
    toggleMenu();
  };

  return (
    <>
      <MenuContainer $isOpen={isOpen}>
        {isLoggedIn && (
          <Header>
            <UserContainerButton onClick={() => {}}>
              <User username={userName || 'User'} />
            </UserContainerButton>{' '}
          </Header>
        )}

        <MenuList>
          {menuItems.map((item) => {
            const handleClick = () => {
              item.onClick();
              toggleMenu();
            };

            if (item.isLink && item.path) {
              return (
                <StyledLink
                  key={item.title}
                  to={item.path}
                  onClick={handleClick}
                  $isLink={item.isLink ?? false}
                >
                  {item.title}
                </StyledLink>
              );
            }

            return (
              <MenuItem
                key={item.title}
                onClick={handleClick}
                $isLink={item.isLink ?? false}
              >
                {item.title}
              </MenuItem>
            );
          })}
        </MenuList>

        <ThemeAndActionRow>
          <ThemeToggleRow>
            <ThemeButton
              $isActive={currentTheme === 'light'}
              onClick={() => currentTheme !== 'light' && toggleTheme()}
            >
              <FontAwesomeIcon icon={faSunRegular} />
            </ThemeButton>
            <ThemeButton
              $isActive={currentTheme === 'dark'}
              onClick={() => currentTheme !== 'dark' && toggleTheme()}
            >
              <FontAwesomeIcon icon={faMoon} />
            </ThemeButton>
          </ThemeToggleRow>
          {isLoggedIn ? (
            <StyledActionButton
              variant="Primary"
              margin="0"
              padding="15px"
              borderRadius="0"
              onClick={handleMainAction}
            >
              {' '}
              {mainAction.title}
            </StyledActionButton>
          ) : (
            <StyledLinkButton to={mainAction.path!} onClick={handleMainAction}>
              {' '}
              {mainAction.title}
            </StyledLinkButton>
          )}
        </ThemeAndActionRow>
      </MenuContainer>

      {isOpen && <Overlay onClick={toggleMenu} />}
    </>
  );
};

const HEADER_HEIGHT = '60px';

const Overlay = styled.div`
  position: fixed;
  top: ${HEADER_HEIGHT};
  left: 0;
  width: 100%;
  height: calc(100% - ${HEADER_HEIGHT});
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
`;

const MenuContainer = styled.div<IMenuContainerProps>`
  position: fixed;
  top: ${HEADER_HEIGHT};
  left: 0;
  height: calc(100% - ${HEADER_HEIGHT});
  width: 300px;
  max-width: 80%;
  z-index: 100;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.5);
  transform: ${({ $isOpen }) =>
    $isOpen ? 'translateX(0)' : 'translateX(-100%)'};
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`;

const Header = styled.div`
  background-color: ${({ theme }) => theme.primary};
  color: white;
  padding: 10px 15px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 40px;
`;

const MenuList = styled.div`
  flex-grow: 1;
  padding-top: 5px;
`;

const MenuItem = styled.div<{ $isLink: boolean }>`
  padding: 15px 20px;
  cursor: pointer;
  font-size: 16px;
  font-weight: ${({ $isLink }) => ($isLink ? 'bold' : 'normal')};

  color: ${({ $isLink, theme }) => ($isLink ? theme.text : theme.text)};

  &:hover {
    background-color: ${({ theme }) => theme.inputGridBackground};
  }
`;

const StyledLink = styled(Link)<{ $isLink: boolean }>`
  padding: 15px 20px;
  cursor: pointer;
  font-size: 16px;
  font-weight: ${({ $isLink }) => ($isLink ? 'bold' : 'normal')};
  text-decoration: none;
  display: block;

  color: ${({ $isLink, theme }) => ($isLink ? theme.text : theme.text)};

  &:hover {
    background-color: ${({ theme }) => theme.inputGridBackground};
  }
`;

const ThemeAndActionRow = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid ${({ theme }) => theme.cardBorder};
`;

const ThemeToggleRow = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 10px 0;

  background-color: ${({ theme }) => theme.inputBackground};
`;

const ThemeButton = styled.div<{
  $isActive: boolean;
}>`
  width: 50%;
  padding: 10px;
  text-align: center;
  cursor: pointer;

  background-color: ${({ $isActive, theme }) =>
    $isActive ? theme.inputBackground : 'transparent'};

  color: ${({ $isActive, theme }) =>
    $isActive ? theme.text : theme.disabledText};

  font-size: 20px;
`;

const StyledActionButton = styled(Button)`
  width: 100%;
  height: auto;
  background-color: ${({ theme }) => theme.primary} !important;
  color: white !important;
  padding: 15px;
  margin: 0;
  border-radius: 0;

  &:hover {
    background-color: ${({ theme }) => theme.primary} !important;
    opacity: 0.9;
  }

  &:active {
    transform: none !important;
  }
`;

const StyledLinkButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 15px;
  text-decoration: none;
  font-size: 16px;
  font-weight: bold;
  box-sizing: border-box;

  background-color: ${({ theme }) => theme.primary};
  color: white;

  &:hover {
    opacity: 0.9;
    background-color: ${({ theme }) => theme.primary};
  }
`;
