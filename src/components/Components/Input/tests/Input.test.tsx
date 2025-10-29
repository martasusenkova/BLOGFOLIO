import { render, screen, fireEvent } from '@testing-library/react';
import Input from '../Input';

describe('Input', () => {
  test('renders with label', () => {
    render(<Input label="Username" value="" onChange={() => {}} />);
    expect(screen.getByText(/Username/i)).toBeInTheDocument();
  });

  test('calls onChange with new value', () => {
    const handleChange = jest.fn();
    render(<Input label="Email" value="" onChange={handleChange} />);
    fireEvent.change(screen.getByPlaceholderText(''), {
      target: { value: 'test' },
    });
    expect(handleChange).toHaveBeenCalledWith('test');
  });

  test('shows error text when error=true', () => {
    render(
      <Input
        label="Name"
        value=""
        onChange={() => {}}
        error
        errorText="Required"
      />
    );
    expect(screen.getByText(/Required/i)).toBeInTheDocument();
  });
});
