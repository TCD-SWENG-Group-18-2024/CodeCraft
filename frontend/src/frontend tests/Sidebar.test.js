import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

test('renders sidebar with correct menu items based on isOpen and location', () => {
  
  const isOpen = true;
  const pathname = '/SubmissionPage';
  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: () => ({ pathname })
  }));

  const { getByText } = render(
    <Router>
      <Sidebar isOpen={isOpen} toggleSidebar={() => {}} />
    </Router>
  );
  expect(getByText('Submission Page')).toBeInTheDocument();
  expect(getByText('Features')).toBeInTheDocument();
  expect(getByText('Meet the Team')).toBeInTheDocument();
  expect(getByText('About Us')).toBeInTheDocument();
});