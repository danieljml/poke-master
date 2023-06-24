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
    background-color: #22c240
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

  const renderPageButtons = () => {
    const pageButtons = [];

    // Renderizar botón para la primera página
    if (currentPage > 1) {
      pageButtons.push(
        <PageButton
          key={1}
          isActive={1 === currentPage}
          onClick={() => handlePageChange(1)}
        >
          1
        </PageButton>
      );

      // Renderizar puntos suspensivos si hay una brecha significativa entre la primera página y la página actual - 1
      if (currentPage > 4) {
        pageButtons.push(
          <PageButton key="dots-left" isActive={false} onClick={() => {}}>
            ...
          </PageButton>
        );
      }
    }

    // Renderizar los botones para las páginas intermedias
    for (let i = currentPage - 2; i <= currentPage + 2; i++) {
      if (i > 1 && i < totalPages) {
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

    // Renderizar puntos suspensivos si hay una brecha significativa entre la página actual + 1 y la última página
    if (currentPage < totalPages - 3) {
      pageButtons.push(
        <PageButton key="dots-right" isActive={false} onClick={() => {}}>
          ...
        </PageButton>
      );
    }

    // Renderizar botón para la última página
    if (currentPage < totalPages) {
      pageButtons.push(
        <PageButton
          key={totalPages}
          isActive={totalPages === currentPage}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </PageButton>
      );
    }

    return pageButtons;
  };

  return <PaginationContainer>{renderPageButtons()}</PaginationContainer>;
};

export default Pagination;
