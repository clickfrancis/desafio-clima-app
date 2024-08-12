// InputForm.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import InputForm from './index';

describe('InputForm', () => {
  test('Deve rederizar o input', () => {
    render(<InputForm onTextChange={() => {}} />);
    expect(screen.getByText(/cidade\*/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/busque por uma cidade/i)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /search/i })).toBeInTheDocument();
  });

  test('Deve renderizar com seu valor', () => {
    render(<InputForm onTextChange={() => {}} value="Rio de Janeiro" />);
    
    const input = screen.getByPlaceholderText(/busque por uma cidade/i);
    expect(input).toHaveValue('Rio de Janeiro');
  });
});
