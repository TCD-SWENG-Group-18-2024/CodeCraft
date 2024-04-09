import React, { useState, useRef } from 'react';
import { TextField, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const SubmissionBar = ({ input, handleTextBoxChange, handleKeyDown, handleSubmit, submissionRef}) => {
  return (
    <div className='submission-bar' style={{ display: 'flex', alignItems: 'flex-start', width: '728px' }}>
      <TextField
        id='code-submission'
        label='Submission Area'
        multiline
        minRows={1}
        maxRows={4}
        variant='outlined'
        value={input}
        onChange={handleTextBoxChange}
        onKeyDown={handleKeyDown}
        ref={submissionRef}
        fullWidth
        sx={{
          flex: 1,
          '& .MuiInputBase-input': {
            fontFamily: 'monospace',
          },
        }}
      />
      <Button variant='contained' onClick={handleSubmit} sx={{ ml: 2, height: '56px' }}>
        Submit
      </Button>
    </div>
  );
};

export default SubmissionBar;