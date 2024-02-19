import React, { useState, useRef } from 'react';
import HeaderImage from '../assets/IBM_white.PNG';
import Sidebar from '../components/Sidebar';
import '../styles/SubmissionPage.css';


const SubmissionPage = () => {

    const [inputType, setInputType] = useState('textbox');
    const [input, setInput] = useState('');
    const [useCase, setUseCase] = useState(''); // set default cases
    const [aiModel, setAIModel] = useState('watsonx.ai'); 
    const [feedback, setFeedback] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [droppedFiles, setDroppedFiles] = useState([]);
    // const[dropdownVisible, setDropdownVisible] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
 
    /*Takes input */
    const handleTextBoxChange = (event) => {
        setInput(event.target.value);
    };

    /*Handle the dropdowns */
    const handleUseCaseChange = (event) =>{
        setUseCase(event.target.value);
    };

    const handleAiModelChange = (event) => {
        setAIModel(event.target.value);
    };

    const handleInputTypeChange = (event) =>{
        setInputType(event.target.value);
        setInput(''); // clear the input when changing between drop file and input text
        setDroppedFiles([]);
    };


    // const handleFileSubmit = (event) => {
    //     const file = event.target.files[0];
    //     console.log("File selected: ", file);
    // }

// takes input - files 
    const handleDragOver = (event) => { 
        event.preventDefault();
        event.stopPropagation();
        event.dataTransfer.dropEffect = "copy";
    }

    const handleFileDrop = (event) => {
        event.preventDefault();
        event.stopPropagation();

        const droppedFiles = Array.from(event.dataTransfer.files);
        setDroppedFiles((prevFiles) => [...prevFiles, ...droppedFiles]); // deconstruct array into separate variables
        console.log("Dropped Files: ", droppedFiles);
    };

    // need to set max size
    const MAX_FILE_SIZE = 3000;

    const handleFileSelect = (event) => {
        const selectFile = Array.from(event.target.files);
        // if (selectFile){
        //     setDroppedFiles([...droppedFiles, selectFile]);
        // }
        const filteredFiles = selectFile.filter((file) => file.size <= MAX_FILE_SIZE);

        if (filteredFiles.length > 0 ){
            setDroppedFiles((prevFiles) => [...prevFiles, ...selectFile]);
            console.log("Selected File: ", selectFile);
        }
        else {
            alert("Selected File(s) to exceeded the size limit of 3000 bytes");
        }
    };
    

    /*Handle Submit for text box */
    const handleTextSubmit = async () =>{
        /* Language Detector - Not Necessary for the moment
        if (selectedLanguage === '--Select a Language--'){
            alert("Please select a language before sumbitting");
            return;
        }*/
        if(input.trim() === '' && inputType== "textbox"){
            alert("Please Enter some code before submitting");
            return;
        }

        setIsLoading(true);

        const data ={
            user_input: input,
            use_case: useCase, 
            ai_model: aiModel
        };

        console.log(data);
        
        try {
            const response = await fetch("http://localhost:8080/llm", 
            {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const responseData = await response.json();
                setFeedback(formatFeedback(responseData));
            }
            else {
                setFeedback(`Submission failed. Server returned ${response.status} status.`)
            }
        } 
        catch(error){
            setFeedback(`Error occurred while submitting: ${error.message}`)
        }
        finally{
            setIsLoading(false);
        }

        // setFeedback(`Submission successful. Language: ${selectedLanguage}`);

        console.log("Submitted: ",input);
        console.log("Feedback", feedback);
    };



    // Allows user to key into tab in the submission box
    const handleKeyDown = (event) => {
        if (event.key === 'Tab'){
            event.preventDefault();

            const {selectionStart, selectionEnd} = event.target;

            setInput(
                input.substring(0, selectionStart) + '\t' + input.substring(selectionEnd)
            );

            event.target.setSelectionRange(selectionStart + 1, selectionStart + 1);
        }
    };

    const formatFeedback = (responseData) => {
       
        const formattedCode = responseData.code ? `Code:\n${JSON.stringify(responseData.code, null, 2)}` : '';
        const formattedText = responseData.text ? `Analysis:\n${responseData.text.replace(/\\n/g, '\n')}` : '';
        const formattedTips = responseData.tips ? `Tips:\n${responseData.tips.replace(/\\n/g, '\n')}` : '';
      
      
        return [formattedCode, formattedText, formattedTips].filter(Boolean).join('\n\n');
      };


    // const dropDown = () => {
    //     setDropdownVisible(!dropdownVisible);
    // };

    // need a function that handles submitting a file to backend.
    // https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/
    
    const handleFileSubmit = async () =>{
        // haven't test if it works or not 
        if (droppedFiles.length === 0){
            alert("Please select or drop some files before submitting");
            return;
        }
        setIsLoading(true);

        const formData = new FormData();
        droppedFiles.forEach((file, index) =>{
            formData.append(`file${index + 1}`, file);
        });

        try {
            const response = await fetch("http://localhost:8080/llm", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const responseData = await response.json();
                setFeedback(formatFeedback(responseData));
            }
            else {
                setFeedback(`File Submission failed, Server return ${response.status} status`);
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