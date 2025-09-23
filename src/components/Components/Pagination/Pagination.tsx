import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPageNumbersToShow = 3;
    let startPage = Math.max(
      1,
      currentPage - Math.floor(maxPageNumbersToShow / 2)
    );
    let endPage = Math.min(totalPages, startPage + maxPageNumbersToShow - 1);

    if (endPage - startPage < maxPageNumbersToShow - 1) {
      startPage = Math.max(1, endPage - maxPageNumbersToShow + 1);
    }

    if (startPage > 1) {
      pageNumbers.push(
        <PageNumber
          key={1}
          $isActive={1 === currentPage}
          onClick={() => onPageChange(1)}
        >
          1
        </PageNumber>
      );
      if (startPage > 2) {
        pageNumbers.push(<Ellipsis key="ellipsis-start">...</Ellipsis>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <PageNumber
          key={i}
          $isActive={i === currentPage}
          onClick={() => onPageChange(i)}
        >
          {i}
        </PageNumber>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(<Ellipsis key="ellipsis-end">...</Ellipsis>);
      }
      pageNumbers.push(
        <PageNumber
          key={totalPages}
          $isActive={totalPages === currentPage}
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </PageNumber>
      );
    }

    return pageNumbers;
  };

  return (
    <PaginationContainer>
      <PageButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
        <span>prev</span>
      </PageButton>
      <PageNumbers>{renderPageNumbers()}</PageNumbers>
      <PageButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <span>Next</span>
        <FontAwesomeIcon icon={faArrowRight} />
      </PageButton>
    </PaginationContainer>
  );
};

export default Pagination;

// --- Styled Components ---

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  width: 100%;
`;

const PageNumbers = styled.div`
  display: flex;
  gap: 10px;
`;

const PageNumber = styled.span<{ $isActive: boolean }>`
  font-size: 14px;
  cursor: pointer;
  color: ${(props) => (props.$isActive ? 'black' : 'gray')};
  font-weight: ${(props) => (props.$isActive ? 'bold' : 'normal')};
  text-decoration: ${(props) => (props.$isActive ? 'underline' : 'none')};
`;

const PageButton = styled.button`
  background: none;
  border: none;
  font-size: 14px;
  cursor: pointer;
  color: #000;
  opacity: 0.6;
  display: flex;
  align-items: center;
  gap: 5px;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.3;
  }
`;

const Ellipsis = styled.span`
  color: ${({ theme }) => theme.text};
`;
