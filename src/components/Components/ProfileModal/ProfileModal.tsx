import React from 'react';
import styled from 'styled-components';

interface ProfileModalProps {
  username: string;
  email?: string;
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({
  username,
  email,
  onClose,
}) => {
  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>
        <Title>Your Profile</Title>
        <InfoRow>
          <Label>Username:</Label>
          <Value>{username}</Value>
        </InfoRow>
        {email && (
          <InfoRow>
            <Label>Email:</Label>
            <Value>{email}</Value>
          </InfoRow>
        )}
        <OkButton onClick={onClose}>OK</OkButton>
      </ModalContainer>
    </Overlay>
  );
};

export default ProfileModal;

// --- Стили ---
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const ModalContainer = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 60px 50px;
  width: 90%;
  max-width: 400px;
  position: relative;
`;

const CloseButton = styled.div`
  position: absolute;
  top: 12px;
  right: 18px;
  font-size: 24px;
  cursor: pointer;
`;

const Title = styled.h2`
  color: #0019a4;
  text-align: center;
  margin-bottom: 25px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const Label = styled.span`
  font-weight: 500;
  color: #555;
`;

const Value = styled.span`
  font-weight: 700;
  color: #0019a4;
  word-break: break-all;
`;

const OkButton = styled.button`
  display: block;
  margin: 45px auto 0;
  padding: 12px 55px;
  font-size: 16px;
  background: #0019a4;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
