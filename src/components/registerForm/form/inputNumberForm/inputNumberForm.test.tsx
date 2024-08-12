// InputNumberForm.test.tsx
import React from 'react';
import { render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import InputNumberForm from './index';


describe('InputNumberForm', () => {
  test('should render without crashing', () => {
    render(<InputNumberForm title="" information={0} />);
    
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText(0)).toBeInTheDocument();
  });
});
