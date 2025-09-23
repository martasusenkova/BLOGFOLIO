import React, { FC } from 'react';
import styled, { css } from 'styled-components';

interface TabItem {
  label: string;
  value: string;
  disabled?: boolean;
}

interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (value: string) => void;
  disabled?: boolean;
}

export const Tabs: FC<TabsProps> = ({
  tabs,
  activeTab,
  onTabChange,
  disabled = false,
}) => {
  return (
    <TabsContainer>
      {tabs.map((tab) => (
        <TabButton
          key={tab.value}
          $isActive={tab.value === activeTab}
          $isDisabled={tab.disabled || false}
          onClick={() => !tab.disabled && onTabChange(tab.value)}
        >
          {tab.label}
        </TabButton>
      ))}
    </TabsContainer>
  );
};

const TabsContainer = styled.div`
  display: flex;
  position: relative;
  border-bottom: 1px solid ${({ theme }) => theme.cardBorder};
  margin: 10px;
  width: 100%;
`;

const TabButton = styled.button<{ $isActive: boolean; $isDisabled: boolean }>`
  background-color: transparent;
  border: none;
  padding: 12px 16px;
  cursor: ${({ $isDisabled }) => ($isDisabled ? 'not-allowed' : 'pointer')};
  font-size: 16px;
  outline: none;
  position: relative;
  transition: color 0.3s ease;
  font-weight: bold;

  color: ${({ $isDisabled, $isActive, theme }) => {
    if ($isDisabled) return theme.cardBorder;
    if ($isActive) return theme.text;
    return theme.text;
  }};

  ${({ $isDisabled, theme }) =>
    !$isDisabled &&
    css`
      &:hover {
        color: rgb(0, 0, 255);
      }
    `}

  ${({ $isActive, theme }) =>
    $isActive &&
    css`
      &::after {
        content: '';
        position: absolute;
        bottom: -1px;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: ${theme.text};
      }
    `}
`;
