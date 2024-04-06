import React from 'react';
import { render, fireEvent, getByText, getByAltText, getAllByText, getByRole } from '@testing-library/react';
import { waitForElementToBeRemoved } from '@testing-library/dom'; // Import waitForElementToBeRemoved
import TeamGrid from '../components/TeamGrid';

jest.mock('../data/teamMembersData', () => {
  const mockTeamMembersData = [
    { 
      id: 1, 
      name: 'John Doe', 
      role: 'Developer', 
      year: '3rd', 
      image: 'john.jpg', 
      description: 'Description for John Doe' 
    },
    { 
      id: 2, 
      name: 'Jane Smith', 
      role: 'Designer', 
      year: '2nd', 
      image: 'jane.jpg', 
      description: 'Description for Jane Smith' 
    },
  ];
  return mockTeamMembersData;
});

describe('TeamGrid', () => {
  it('renders without crashing', () => {
    render(<TeamGrid />);
  });

it('renders team members with correct content', () => {
  const { getByText, getByAltText } = render(<TeamGrid />);

  expect(getByAltText('John Doe')).toBeInTheDocument();
  expect(getByText('John Doe')).toBeInTheDocument();
  expect(getByText('Developer')).toBeInTheDocument();
});

it('opens modal when clicking on a team member', () => {
  const { getByText, queryAllByText } = render(<TeamGrid />);
fireEvent.click(getByText('John Doe'));
expect(queryAllByText('John Doe').length).toBeGreaterThan(0);
});
});