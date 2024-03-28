import React from 'react';
import { render } from '@testing-library/react';
import Footer from '../components/FooterDetailed';

test('renders Footer component with expected content', () => {
    
    const { getByText } =  render(<Footer />);
    
    const codeCraftHeader = getByText('CodeCraft');
    const ibmHeader = getByText('IBM');
    const codeCraftAddress = getByText('Trinity College Dublin');
    const ibmAddress = getByText('Charlemont Exchange, WeWork Office Space, Saint Kevin\'s, Dublin');
    
    expect(codeCraftHeader).toBeInTheDocument();
    expect(ibmHeader).toBeInTheDocument();
    expect(codeCraftAddress).toBeInTheDocument();
    expect(ibmAddress).toBeInTheDocument();
  });