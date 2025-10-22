import React, { FC } from 'react';
import styled from 'styled-components';

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
  display: flex;
  align-items: center;
  gap: 8px;
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
  border-radius: 6px;
`;

const StyledUser = styled.div`
  color: white;
  font-size: 16px;
  font-weight: normal;
`;
