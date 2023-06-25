import React from 'react';
import styled from 'styled-components';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PageButton = styled.button<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background-color: ${({ isActive }) => (isActive ? '#34D350' : '#333333')};
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin: 0 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #22c240;
  }
`;

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const handleDotsLeftClick = () => {
    const newPage = currentPage - 5;
    handlePageChange(newPage > 0 ? newPage : 1);
  };

  const handleDotsRightClick = () => {
    const newPage = currentPage + 5;
    handlePageChange(newPage < totalPages ? newPage : totalPages);
  };

  const renderPageButtons = () => {
    const pageButtons = [];

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        Math.abs(currentPage - i) <= 2 ||
        (i === currentPage - 3 && currentPage > 5) ||
        (i === currentPage + 3 && currentPage < totalPages - 4)
      ) {
        pageButtons.push(
          <PageButton
            key={i}
            isActive={i === currentPage}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </PageButton>
        );
      }
    }

    if (currentPage > 5) {
      pageButtons.splice(1, 0, (
        <PageButton key="dots-left" isActive={false} onClick={handleDotsLeftClick}>
          ...
        </PageButton>
      ));
    }

    if (currentPage < totalPages - 4) {
      pageButtons.splice(pageButtons.length - 1, 0, (
        <PageButton key="dots-right" isActive={false} onClick={handleDotsRightClick}>
          ...
        </PageButton>
      ));
    }

    return pageButtons;
  };

  return <PaginationContainer>{renderPageButtons()}</PaginationContainer>;
};

export default Pagination;
