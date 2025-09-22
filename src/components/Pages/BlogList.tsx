import React, { useState } from 'react';
import styled from 'styled-components';

import FormTemplate from './FormTemplate';
import { Tabs } from '../Tabs';
import PostList from '../PostList';

const BlogList: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  const tabsData = [
    { label: 'All', value: 'all' },
    { label: 'My favorites', value: 'my-favorites' },
    { label: 'Popular', value: 'popular', disabled: true },
  ];

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPageNumbersToShow = 5;
    const startPage = Math.max(
      1,
      currentPage - Math.floor(maxPageNumbersToShow / 2)
    );
    const endPage = Math.min(totalPages, startPage + maxPageNumbersToShow - 1);

    if (startPage > 1) {
      pageNumbers.push(
        <PageButton key={1} $isActive={1 === currentPage}>
          1
        </PageButton>
      );
      if (startPage > 2) {
        pageNumbers.push(<Ellipsis key="ellipsis-start">...</Ellipsis>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <PageButton key={i} $isActive={i === currentPage}>
          {i}
        </PageButton>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(<Ellipsis key="ellipsis-end">...</Ellipsis>);
      }
      pageNumbers.push(
        <PageButton key={totalPages} $isActive={totalPages === currentPage}>
          {totalPages}
        </PageButton>
      );
    }

    return pageNumbers;
  };

  return (
    <FormTemplate title="Blog" showBackButton={false}>
      <Tabs tabs={tabsData} activeTab={activeTab} onTabChange={setActiveTab} />

      <PostList layout="two-vertical" />
      {/* <PostList layout="default" /> */}

      <PageNav>
        <PageButton>Back</PageButton>
        <PageNumbers>{renderPageNumbers()}</PageNumbers>
        <PageButton>Next</PageButton>
      </PageNav>
    </FormTemplate>
  );
};

export default BlogList;

// --- Styled Components ---

export const PageNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  margin-top: 40px;
  color: ${({ theme }) => theme.text};
  width: 100%;
  font-size: 14px;
`;

export const PageNumbers = styled.div`
  display: flex;
  gap: 10px;
`;

export const PageButton = styled.button<{ $isActive?: boolean }>`
  all: unset;
  cursor: pointer;
  padding: 8px 12px;
  font-weight: bold;
  transition: color 0.3s ease;

  color: ${({ theme, $isActive }) => ($isActive ? theme.primary : theme.text)};

  &:hover {
    color: ${({ theme }) => theme.text};
  }
`;

const Ellipsis = styled.span`
  padding: 8px 12px;
  color: ${({ theme }) => theme.text};
`;
