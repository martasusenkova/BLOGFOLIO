import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes, faUser } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../../Context/AuthContext';
import BurgerMenu from '../BurgerMenu';
import User from '../User';
import ProfileModal from '../ProfileModal';
import { useSearch } from '../../../Hooks/useSearch';

interface HeaderProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

const Header: React.FC<HeaderProps> = ({ isMenuOpen, toggleMenu }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, isAuthLoaded } = useAuth();
  const navigateToSearch = useSearch();

  if (!isAuthLoaded) return null;

  const handleSearchToggle = () => {
    setIsSearchOpen((prev) => !prev);
    if (!isSearchOpen && isMenuOpen) toggleMenu();
    if (isSearchOpen) setSearchValue('');
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      navigateToSearch(searchValue);
      setIsSearchOpen(false);
      setSearchValue('');
    }
  };

  const username = user ? user.split('@')[0] : '';

  return (
    <>
      <StyledHeader>
        <BurgerMenuWrapper onClick={toggleMenu}>
          <BurgerMenu isOpen={isMenuOpen} />
        </BurgerMenuWrapper>

        {isSearchOpen && (
          <SearchInputContainer>
            <SearchInput
              placeholder="Search..."
              value={searchValue}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
            />
          </SearchInputContainer>
        )}

        <HeaderRightSection isSearchOpen={isSearchOpen}>
          <IconBase
            icon={isSearchOpen ? faTimes : faSearch}
            onClick={handleSearchToggle}
          />

          {user ? (
            <UserContainer onClick={() => setIsProfileOpen(true)}>
              <User username={username} />
            </UserContainer>
          ) : (
            <UserIcon icon={faUser} onClick={() => setIsProfileOpen(true)} />
          )}
        </HeaderRightSection>
      </StyledHeader>

      {isProfileOpen && user && (
        <ProfileModal
          username={username}
          email={user}
          onClose={() => setIsProfileOpen(false)}
        />
      )}
    </>
  );
};

export default Header;

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  align-items: center;
  padding: 10px 20px;
  background-color: #0019a4;
  color: #fff;
  height: 60px;
  width: 100%;
`;

const BurgerMenuWrapper = styled.div`
  cursor: pointer;
  z-index: 12;
`;

interface HeaderRightSectionProps {
  isSearchOpen: boolean;
}

const HeaderRightSection = styled.div<HeaderRightSectionProps>`
  display: flex;
  align-items: center;
  gap: ${(props) => (props.isSearchOpen ? '5px' : '15px')};
  flex-shrink: 0;
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0 10px;
  flex-shrink: 0;
`;

const IconBase = styled(FontAwesomeIcon)`
  cursor: pointer;
  font-size: 20px;
  padding: 10px 5px;
`;

const UserIcon = styled(IconBase)``;

const SearchInputContainer = styled.div`
  flex-grow: 1;
  margin: 0 10px;
  height: 40px;
  background-color: #5c6bc0;
  border-radius: 4px;
  display: flex;
  align-items: center;
  padding: 0 10px;
`;

const SearchInput = styled.input`
  flex-grow: 1;
  border: none;
  background-color: transparent;
  color: #fff;
  font-size: 16px;
  height: 100%;
  padding: 0;

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }

  &:focus {
    outline: none;
  }
`;
