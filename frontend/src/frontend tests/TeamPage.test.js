import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TeamPage from '../pages/TeamPage';

describe('TeamPage component', () => {
  test('renders page title and description', () => {
    render(<MemoryRouter>
      <TeamPage />
    </MemoryRouter>);
    const titleElement = screen.getByText('Meet the Team', { selector: 'h1' });
    const descriptionElement = screen.getByText(
      'We are a dynamic team of 2nd and 3rd-year college students collaborating with IBM, fueled by innovation and driven to push boundaries in every project we undertake.'
    );
    expect(titleElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
  });

  test('renders images for each team member', () => {
    render(<MemoryRouter>
      <TeamPage />
    </MemoryRouter>);

   const images = screen.getAllByRole('img');

    // Assert that there is at least one image for each team member
    expect(images.length).toBeGreaterThan(10);

    images.forEach((image) => {

      const filename = image.src.split('/').pop().toLowerCase();
      
      expect(filename).toMatch(/\.(png|jpg|jpeg)$/);
      });
  });
});