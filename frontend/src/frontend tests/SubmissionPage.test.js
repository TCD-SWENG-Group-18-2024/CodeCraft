import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext'
import SubmissionPage from '../pages/SubmissionPage';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import SubmissionBar from '../components/SubmissionBar';
import Footer from '../components/FooterDetailed';
import Dropdown from '../components/Dropdown';

jest.mock('react-syntax-highlighter/dist/esm/styles/prism', () => ({
    nord: jest.fn(),
  }));
  
  describe('SubmissionPage', () => {
  test('renders submission page without crashing', () => {
    render(<MemoryRouter>
      <SubmissionPage />
    </MemoryRouter>);
  });

  it('renders the card area', () => {
    const { container } = render(<MemoryRouter>
      <SubmissionPage />
    </MemoryRouter>);
    const cardArea = container.querySelector('.card-area');
    expect(cardArea).toBeInTheDocument();
  });

 
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

  test('handles input change and submit button click', () => {
    const handleTextBoxChangeMock = jest.fn();
    const handleKeyDownMock = jest.fn();
    const handleSubmitMock = jest.fn();
  
    const { getByLabelText, getByRole } = render(
      <SubmissionBar 
        input=""
        handleTextBoxChange={handleTextBoxChangeMock}
        handleKeyDown={handleKeyDownMock}
        handleSubmit={handleSubmitMock}
      />
    );
  
    const textField = getByLabelText('Submission Area');
    fireEvent.change(textField, { target: { value: 'Test submission' } });
  
    const submitButton = getByRole('button', { name: 'Submit' });
    fireEvent.click(submitButton);
  
    expect(handleTextBoxChangeMock).toHaveBeenCalledWith(expect.any(Object));
    expect(handleKeyDownMock).not.toHaveBeenCalled();
    expect(handleSubmitMock).toHaveBeenCalled();
  });

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

  test('renders dropdown with AI model selection', () => {
    const { getByText } = render(<Dropdown />);
  
   const aiModelDropdownButton = getByText(/-Select AI Model-/);
  
    expect(aiModelDropdownButton).toBeInTheDocument();
  
    fireEvent.click(aiModelDropdownButton);
  });
  
  test('renders dropdown with use case selection', () => {
    const setUseCase = jest.fn();
    const { getByText } = render(
      <Dropdown useCase="code_analysis" setUseCase={setUseCase} />
    );
  
    const useCaseDropdown = getByText('Code Analysis');
    expect(useCaseDropdown).toBeInTheDocument();
  
    fireEvent.click(useCaseDropdown);
  
    const codeGenerationOption = getByText('Code Generation');
    expect(codeGenerationOption).toBeInTheDocument();
  
    fireEvent.click(codeGenerationOption);
  
    expect(setUseCase).toHaveBeenCalledWith('code_generation');
  });

  

  });

 
