import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Dropdown from '../components/Dropdown';

test('renders dropdown with input type selection', () => {
  const { getByText } = render(<Dropdown />);

  const inputTypeDropdownButton = getByText('-Select Input Type-');

  expect(inputTypeDropdownButton).toBeInTheDocument();

  fireEvent.click(inputTypeDropdownButton);
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