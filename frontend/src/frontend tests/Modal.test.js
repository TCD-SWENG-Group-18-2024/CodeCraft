import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Modal from '../components/Modal';

const mockMember = {
    name: 'John Doe',
    role: 'Developer',
    description: 'Description for John Doe',
    image: 'john.jpg'
  };

  test('renders modal with member details', () => {
    const onCloseMock = jest.fn();
  
    const { getByText, queryByText } = render(<Modal member={mockMember} onClose={onCloseMock} />);
  
    expect(getByText('John Doe')).toBeInTheDocument();
    expect(getByText('Developer')).toBeInTheDocument();
    expect(getByText('Description for John Doe')).toBeInTheDocument();
  
  });