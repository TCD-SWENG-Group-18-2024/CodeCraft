import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import AboutPage from './AboutPage'; 

test('renders CodeCraft text', () => {
  render(
    <BrowserRouter>
      <AboutPage />
    </BrowserRouter>
  );

  const textElements = screen.getAllByText(/CodeCraft/i); 

  // Assert that at least one matching element is present
  expect(textElements.length).toBeGreaterThan(0);

  textElements.forEach(element => {
    expect(element).toBeInTheDocument();
  });
});

test('renders "About Us" text', () => {
  render(
    <BrowserRouter>
    <AboutPage />
    </BrowserRouter>);
  const textElements = screen.getAllByText(/About Us/i);
  const textElement = textElements[0];
  expect(textElement).toBeInTheDocument();
});

test('renders project description', () => {
  render(<MemoryRouter>
    <AboutPage />
    </MemoryRouter>);
  const projectDescriptionElement = screen.getByText(/CodeCraft: Revolutionizing Software Engineering with AI/i);
  expect(projectDescriptionElement).toBeInTheDocument();
});

test('renders IBM description', () => {
  render(<MemoryRouter>
    <AboutPage />
    </MemoryRouter>);
  const ibmDescriptionElement = screen.getByText(/IBM \(International Business Machines Corporation\) is a leading technology and consulting company/i);
  expect(ibmDescriptionElement).toBeInTheDocument();
});

test('renders clients section', () => {
  render(<MemoryRouter>
    <AboutPage />
    </MemoryRouter>);
  const clientsSectionElement = screen.getByText(/Meet Our Clients/i);
  expect(clientsSectionElement).toBeInTheDocument();
});

test('renders Hero Image', () => {
  render(<MemoryRouter>
    <AboutPage />
    </MemoryRouter>);
  const heroImageElement = screen.getByAltText('Hero');
  expect(heroImageElement).toBeInTheDocument();
  expect(heroImageElement).toHaveAttribute('src', 'HeroImage.png');
});
