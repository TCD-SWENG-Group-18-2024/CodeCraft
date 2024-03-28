import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext'
import Header from '../components/Header';

test('renders Header component', () => {
  const contextValue = { isLoggedIn: true }; 
  render(
    <MemoryRouter>
      <AuthContext.Provider value={contextValue}>
        <Header />
      </AuthContext.Provider>
    </MemoryRouter>
  );
  
  const headerElement = screen.getByText(/Account/i); 
  expect(headerElement).toBeInTheDocument();
});