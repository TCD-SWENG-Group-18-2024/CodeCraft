import React, { useState } from 'react';
import HeaderImage from '../assets/IBM_white.PNG';
import Sidebar from '../components/Sidebar';
import '../styles/SubmissionPage.css';

const SubmissionPage = () => {
  const [inputType, setInputType] = useState('textbox');
  const [input, setInput] = useState('');
  const [useCase, setUseCase] = useState('');
  const [aiModel, setAIModel] = useState('watsonx.ai');
  const [feedback, setFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [droppedFiles, setDroppedFiles] = useState([]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleTextBoxChange = (event) => {
    setInput(event.target.value);
  };

  const handleUseCaseChange = (event) => {
    setUseCase(event.target.value);
  };

  const handleAiModelChange = (event) => {
    setAIModel(event.target.value);
  };

  const handleInputTypeChange = (event) => {
    setInputType(event.target.value);
    setInput('');
    setDroppedFiles([]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = "copy";
  };

  const handleFileDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const files = Array.from(event.dataTransfer.files);
    setDroppedFiles(prevFiles => [...prevFiles, ...files]);
  };

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    setDroppedFiles(prevFiles => [...prevFiles, ...files]);
  };

  const formatFeedback = (responseData) => {
   
    const { code, text } = responseData;
    
    
    const unescapedCode = code.replace(/\\n/g, '\n').replace(/\\"/g, '"');
    const unescapedText = text.replace(/\\n/g, '\n').replace(/\\"/g, '"');
    
  
    return `Submission successful.\n\nFeedback:\n${unescapedCode}\n\n${unescapedText}`;
  };

  const handleTextSubmit = async () => {
    if (input.trim() === '') {
      alert("Please Enter some code before submitting");
      return;
    }

    setIsLoading(true);

    const data = {
      user_input: input,
      use_case: useCase, 
      ai_model: aiModel
    };

    try {
      const response = await fetch("http://localhost:8080/llm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        const formattedFeedback = formatFeedback(responseData);
        setFeedback(formattedFeedback);
      } else {
        setFeedback(`Submission failed. Server returned ${response.status} status.`);
      }
    } catch(error) {
      setFeedback(`Error occurred while submitting: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      const start = event.target.selectionStart;
      const end = event.target.selectionEnd;
      setInput(input.substring(0, start) + '\t' + input.substring(end));
      event.target.selectionStart = event.target.selectionEnd = start + 1;
    }
  };

  const handleFileSubmit = async () => {
    if (droppedFiles.length === 0) {
      alert("Please select or drop some files before submitting");
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    droppedFiles.forEach((file, index) => {
      formData.append(`file${index + 1}`, file);
    });

    try {
      const response = await fetch("http://localhost:8080/llm", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const responseData = await response.json();
        const formattedFeedback = formatFeedback(responseData);
        setFeedback(formattedFeedback);
      } else {
        setFeedback(`File Submission failed, Server returned ${response.status} status.`);
      }
    }

        catch (error){
            setFeedback(`Error occurred while submitting files: ${error.message}`)
        }
        finally{
            setIsLoading(false);
        }

        console.log("Submitted Files: ", droppedFiles);
        console.log("Feedback", feedback);
    }


    const handleSubmit = () => {
        if(inputType === "textbox"){
            handleTextSubmit();
        }
        else if (inputType === "files"){
            handleFileSubmit();
        }
    }

    /* issues with {inputType === "files" && (
                        <div className='fileInputContainer'></div>

                        - the submit button does not move when inputs are added
                        - the dragging files in is bugged, only allows one file
                        -

                        */
    return [
    <>
        
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        <div className={`main-content ${isSidebarOpen ? 'with-sidebar' : ''}`}>
            <header className="submission-header">
                <h1 className="submission-title">Submission Area</h1>
                <img src={HeaderImage} alt="Code Craft" className="header-image"/>
            </header>

            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>

            <div className="userArea">

                <div className='submissionArea'>

                    <div className='dropDownContainer'>

                        <div className='inputTypeDropDown'>
                            <label>Select Input Type </label>
                            <select value={inputType} onChange={handleInputTypeChange}>
                                <option value="textbox">Textbox</option>
                                <option value="files">Files</option>

                            </select>
                        </div>

                        <div className='useCaseDropDown'>
                            <label>Select Use Case </label>
                                <select value={useCase} onChange={handleUseCaseChange}>
                                    <option value="code_generation">Code Generation</option>
                                    <option value="code_completion">Code Completion</option>
                                    <option value="code_analysis">Code Analysis</option>
                                    <option value="code_translation">Code Translation</option>
                                </select>
                        </div>

                        <div className='aiDropDown'>
                            <label>Select AI Model </label>
                                <select value={aiModel} onChange={handleAiModelChange}>
                                    <option value="watsonx.ai">WatsonX AI</option>
                                    <option value="openai">OpenAI</option>
                                </select>
                        </div>
                    </div>

                    {inputType === "textbox" && (
                        <div className='textBoxContainer'>
                            <textarea 
                                type='text'
                                value={input}
                                onChange={handleTextBoxChange}
                                className="textbox"
                                placeholder='Code Submission Area'
                                onKeyDown={handleKeyDown}
                            ></textarea>
                            
                        </div>
                    )}



                    {inputType === "files" && (
                        <div className='fileInputContainer'>
                            <div class='fileDropZone' onDrop={handleFileDrop} onDragOver={handleDragOver} 
                                onClick={()=> document.getElementById("fileInput").click()}>
                                <p>Drag files here or Click to select</p>
                                <input id="fileInput" type="file" onChange={handleFileSelect}></input>
                            </div>
                            {droppedFiles.length > 0 && (
                                <div className='droppedFileContainer'>
                                    <p>Dropped Files: </p>
                                    <ul>
                                        {droppedFiles.map((file, index) =>
                                        <li key={index}>{file && file.name}</li>)}
                                    </ul>
                                </div>
                            )}
                            
                        </div>

                    )}


                    <button onClick={handleSubmit} className="submitButton">Submit</button>

                </div> 


                <div className='feedBackArea'>

                    {isLoading && <div className="loading">
                        <div className='loading1'></div>
                        <div className='loading2'></div>
                        <div className='loading3'></div>
                        </div>}

                    {!isLoading && feedback &&( 
                        <div class="feedBackBox">
                            <p>{feedback}</p>
                        </div>
                    )}

                </div>

            </div>

        </div>

            
    </>
    ];
};

export default SubmissionPage;