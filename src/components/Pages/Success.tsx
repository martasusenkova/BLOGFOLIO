import React from 'react';
import FormTemplate from './FormTemplate';
import Button from '../Button';
import { ContentContainer } from './Template';

interface SuccessProp {
  onThemeToggle: () => void;
  currentTheme: 'light' | 'dark';
}

const Success: React.FC<SuccessProp> = ({ onThemeToggle, currentTheme }) => {
  return (
    <FormTemplate
      onThemeToggle={onThemeToggle}
      currentTheme={currentTheme}
      title="Success"
      showBackButton={true}
    >
      <ContentContainer>
        Your email confirmed
        <Button variant="Primary" text="Go Home" width="340px"></Button>
      </ContentContainer>
    </FormTemplate>
  );
};

export default Success;
