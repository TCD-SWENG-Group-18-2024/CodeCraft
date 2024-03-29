import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test.skip('renders App component', () => {
  render(<App />);
  
  const headerElement = screen.getByTestId('header');
  expect(headerElement).toBeInTheDocument();
  
});