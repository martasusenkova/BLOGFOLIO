import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from '../Button';
describe('Button component', () => {
  test('renders active button and handles click', () => {
    const handleClick = jest.fn();

    render(
      <Button variant="Primary" onClick={handleClick}>
        Click me
      </Button>
    );

    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();

    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('renders disabled button and ignores click', () => {
    const handleClick = jest.fn();

    render(
      <Button variant="Primary" disabled onClick={handleClick}>
        Disabled
      </Button>
    );

    const button = screen.getByRole('button', { name: /disabled/i });
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();

    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });
});
