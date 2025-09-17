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
      <MiniStyledUser>{initials}</MiniStyledUser>{' '}
      <StyledUser>{username}</StyledUser>
    </UserContainer>
  );
};

export default User;

const StyledUser = styled.div`
  color: white;
  font-size: 16px;
  font-weight: bold;
  width: fit-content;
  padding: 4px;
`;
const MiniStyledUser = styled.div`
  color: white;
  background-color: rgb(115, 136, 211);
  padding: 8px 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  border-radius: 4px;
  font-size: 16px;
`;

const UserContainer = styled.div`
  background-color: rgb(79, 72, 227);
  width: fit-content;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  gap: 8px;
  font-weight: bold;
`;
