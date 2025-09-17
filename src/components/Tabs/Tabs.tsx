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
          onClick={() =>
            !disabled && !(tab.disabled ?? false) && onTabChange(tab.value)
          }
          $isActive={tab.value === activeTab}
          $isDisabled={disabled || (tab.disabled ?? false)}
          disabled={tab.disabled}
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
  border-bottom: 1px solid #ccc;
  margin: 10px;
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
  color: ${({ $isDisabled, $isActive }) => {
    if ($isDisabled) return '#ccc';
    if ($isActive) return '#000';
    return '#050505';
  }};

  ${({ $isDisabled }) =>
    !$isDisabled &&
    css`
      &:hover {
        color: #1717e9;
      }
    `}

  ${({ $isActive }) =>
    $isActive &&
    css`
      &::after {
        content: '';
        position: absolute;
        bottom: -1px;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: #000;
      }
    `}
`;
