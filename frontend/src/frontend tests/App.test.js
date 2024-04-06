import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

jest.mock('react-syntax-highlighter/dist/esm/styles/prism', () => ({
  nord: jest.fn(),
}));

test('renders App component without errors', () => {
  render(<App />);
});
