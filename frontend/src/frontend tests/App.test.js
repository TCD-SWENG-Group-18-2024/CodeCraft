import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

jest.mock('react-syntax-highlighter/dist/esm/styles/prism', () => ({
  nord: jest.fn(),
}));

jest.mock('react-markdown', () => {
  return {
    __esModule: true,
    default: () => <div>Mocked ReactMarkdown component</div>,
  };
});

test('renders App component without errors', () => {
  render(<App />);
});
