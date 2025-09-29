import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes, faUser } from '@fortawesome/free-solid-svg-icons';
import BurgerMenu from '../BurgerMenu';
import User from '../User';

const MOCK_IS_AUTHORIZED = true;
const MOCK_USERNAME = 'Marta Susenkova';

const Header: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleSearchToggle = () => {
    setIsSearchOpen((prev) => !prev);
    if (isSearchOpen) {
      setSearchValue('');
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <StyledHeader>
      <BurgerMenuWrapper>
        <BurgerMenu />
      </BurgerMenuWrapper>

      {isSearchOpen && (
        <SearchInputContainer>
          <SearchInput
            placeholder="Search..."
            value={searchValue}
            onChange={handleSearchChange}
          />
        </SearchInputContainer>
      )}

      <HeaderRightSection isSearchOpen={isSearchOpen}>
        {isSearchOpen ? (
          <IconBase icon={faTimes} onClick={handleSearchToggle} />
        ) : (
          <IconBase icon={faSearch} onClick={handleSearchToggle} />
        )}

        {MOCK_IS_AUTHORIZED ? (
          <UserContainerButton onClick={() => {}}>
            <User username={MOCK_USERNAME} />
          </UserContainerButton>
        ) : (
          <UserIcon icon={faUser} onClick={() => {}} />
        )}
      </HeaderRightSection>
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  background-color: #0019a4;
  color: #fff;
  height: 60px;
  width: 100%;
  box-sizing: border-box;
`;

const BurgerMenuWrapper = styled.div``;

interface HeaderRightSectionProps {
  isSearchOpen: boolean;
}

const HeaderRightSection = styled.div<HeaderRightSectionProps>`
  display: flex;
  align-items: center;
  gap: ${(props) => (props.isSearchOpen ? '5px' : '15px')};
`;

const IconBase = styled(FontAwesomeIcon)`
  cursor: pointer;
  font-size: 20px;
  padding: 10px 5px;
`;

const UserIcon = styled(IconBase)``;

const UserContainerButton = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 100%;
`;

const SearchInputContainer = styled.div`
  flex-grow: 1;
  margin: 0 20px;
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
