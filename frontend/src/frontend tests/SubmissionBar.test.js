import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SubmissionBar from '../components/SubmissionBar';


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