import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from '../pages/Home';

describe('Home component', () => {
    test('renders IBM logo', () => {
      render(<MemoryRouter>
        <Home />
      </MemoryRouter>);
      const ibmLogo = screen.getByAltText('IBM Logo');
      expect(ibmLogo).toBeInTheDocument();
    });

    test('renders start analysis button', () => {
      render(<MemoryRouter>
        <Home />
      </MemoryRouter>);
      const startAnalysisButton = screen.getByText('Start Analysis');
      expect(startAnalysisButton).toBeInTheDocument();
    });

    test('renders sidebar closed by default', () => {
      render(<MemoryRouter>
        <Home />
      </MemoryRouter>);
      const sidebar = screen.queryByTestId('sidebar');
      expect(sidebar).not.toBeInTheDocument();
    });
});