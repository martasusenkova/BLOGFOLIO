import React from 'react';
import styled from 'styled-components';
import Title from '../Components/Title';
import Header from '../Components/Header/Header';
import Pagination from '../Components/Pagination/Pagination';

interface PageProps {
  children?: React.ReactNode;
  title: string;
  showBackButton?: boolean;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (pageNumber: number) => void;
}

const FormTemplate: React.FC<PageProps> = ({
  children,
  title,
  showBackButton,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const showPagination = !!(
    currentPage &&
    totalPages &&
    onPageChange &&
    totalPages > 1
  );

  return (
    <StyledDiv>
      <Header />

      <StyledMain>
        <ContentContainer>
          {showBackButton && <BackHomeButton>Back</BackHomeButton>}
          <Title text={title} />
          {children}
        </ContentContainer>
      </StyledMain>

      {showPagination && (
        <PaginationFooter>
          <Pagination
            currentPage={currentPage!}
            totalPages={totalPages!}
            onPageChange={onPageChange!}
          />
        </PaginationFooter>
      )}

      <BottomFooter>
        <FooterContent>
          <span>©2025 Blogfolio</span>
          <span>All rights reserved</span>
        </FooterContent>
      </BottomFooter>
    </StyledDiv>
  );
};

export default FormTemplate;

const StyledDiv = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: ${({ theme }) => theme.background};
`;

const StyledMain = styled.main`
  background: ${({ theme }) => theme.background};
  padding: 20px 150px;
  box-sizing: border-box;
  font-size: 20px;
  display: flex;
  flex-direction: column;

  @media (max-width: 1024px) {
    padding: 20px 80px;
  }
  @media (max-width: 768px) {
    padding: 20px 40px;
  }
  @media (max-width: 480px) {
    padding: 10px;
    font-size: 16px;
  }
`;

const PaginationFooter = styled.footer`
  border-top: 1px solid ${({ theme }) => theme.cardBorder};
  background: ${({ theme }) => theme.background};
  padding: 16px 150px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 1124px) {
    padding: 16px 100px;
  }
  @media (max-width: 768px) {
    padding: 12px 40px;
  }
  @media (max-width: 480px) {
    padding: 10px;
  }
`;

/* --- Нижний футер с копирайтом --- */
const BottomFooter = styled.footer`
  border-top: 1px solid ${({ theme }) => theme.cardBorder};
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  padding: 20px 150px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;

  @media (max-width: 1124px) {
    padding: 20px 100px;
  }
  @media (max-width: 768px) {
    padding: 20px 40px;
  }
  @media (max-width: 480px) {
    padding: 15px;
    font-size: 12px;
  }
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  color: ${({ theme }) => theme.text};
  @media (max-width: 480px) {
    align-items: flex-start;
  }
`;

const BackHomeButton = styled.button`
  color: ${({ theme }) => theme.text};
  background: ${({ theme }) => theme.background};
  all: unset;
  cursor: pointer;
  margin: 0 20px 0;
  padding: 0 20px 0;
  display: flex;
  align-self: flex-start;

  @media (max-width: 480px) {
    margin: 0;
  }
`;
