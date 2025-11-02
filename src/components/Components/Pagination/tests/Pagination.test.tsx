import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../Pagination';

describe('Pagination', () => {
  test('renders current page and total pages', () => {
    render(
      <Pagination currentPage={2} totalPages={5} onPageChange={() => {}} />
    );
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  test('calls onPageChange when clicking next', () => {
    const onPageChange = jest.fn();
    render(
      <Pagination currentPage={1} totalPages={3} onPageChange={onPageChange} />
    );
    fireEvent.click(screen.getByText(/Next/i));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  test('disables prev button on first page', () => {
    render(
      <Pagination currentPage={1} totalPages={3} onPageChange={() => {}} />
    );
    expect(screen.getByText(/prev/i).closest('button')).toBeDisabled();
  });
});
