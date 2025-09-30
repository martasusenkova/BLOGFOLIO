import styled from 'styled-components';
import React, { FC } from 'react';

interface IUser {
  username: string;
}

const User: FC<IUser> = ({ username }) => {
  const initials = username
    .split(' ')
    .map((word) => word[0]?.toUpperCase())
    .join('');

  return (
    <UserContainer>
      <MiniStyledUser>{initials}</MiniStyledUser>
      <StyledUser>{username}</StyledUser>
    </UserContainer>
  );
};

export default User;

const UserContainer = styled.div`
  width: fit-content;
  height: 100%;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  gap: 8px;
  font-weight: bold;
`;

const MiniStyledUser = styled.div`
  color: white;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 14px;
  box-sizing: border-box;
  border-radius: 6px;
`;

const StyledUser = styled.div`
  color: white;
  font-size: 16px;
  font-weight: normal;
  padding: 0 15px;
`;
