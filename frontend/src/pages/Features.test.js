import React from 'react';
import { render, screen } from '@testing-library/react';
import Features from './Features';
import { MemoryRouter } from 'react-router-dom';

describe('Features Component', () => {
  test('renders CodeCraft text', () => {
    const { container } = render(
      <MemoryRouter>
        <Features />
      </MemoryRouter>
    );

    // Use a case-insensitive regex to match the text
    const textElements = container.querySelectorAll(':not(script):not(style)'); // Excluding script and style elements

    // Assert that at least one matching element is present
    let found = false;
    textElements.forEach(element => {
      if (element.textContent.match(/Experience the future of coding with CodeCraft/i)) {
        found = true;
      }
    });
    expect(found).toBe(true);
  });
});
   test('renders "Learn More" button', () => {
     const { getByText } = render(<MemoryRouter>
      <Features />
     </MemoryRouter>);
     const learnMoreButton = getByText('Learn More');

    expect(learnMoreButton).toBeInTheDocument();
   });

   test('renders feature sections', () => {
    const { queryByText } = render(<MemoryRouter>
       <Features />
     </MemoryRouter>);
     const languageSupportSection = screen.getByText((content, element) => {
      // Check if the text contains "Comprehensive" and "anguage Support" with an underlined "L"
      const hasComprehensive = content.includes('Comprehensive');
      const hasLanguageSupport = content.includes('anguage Support');
      const hasUnderlinedL = element?.querySelector('.underline-letter-dark');
      return hasComprehensive && hasLanguageSupport && hasUnderlinedL;
    });
  
    // Assert that the section is present
    expect(languageSupportSection).toBeInTheDocument();
  });