import React, { useState } from 'react';
import HeaderImage from '../assets/IBM_white.PNG';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import '../styles/SubmissionPage.css';
import './LoginSignUp';
import './Home';

const SubmissionPage = () => {

    const [inputType, setInputType] = useState('textbox');
    const [input, setInput] = useState('');
    const [useCase, setUseCase] = useState(''); // set default cases
    const [aiModel, setAIModel] = useState('watsonx.ai'); 
    const [feedback, setFeedback] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [droppedFiles, setDroppedFiles] = useState([]);
    const [inputLanguage, setInputLanguage] = useState('java');
    const [outputLanguage, setOutputLanguage] = useState('');

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

    const handleInputLanguageChange = (event) =>{
        setInputLanguage(event.target.value);
    };

    const handleOutputLanguageChange = (event) =>{
        setOutputLanguage(event.target.value);
    };

// takes input - files 
    const handleDragOver = (event) => { 
        event.preventDefault();
        //When stopPropagation is called inside an event handler, 
        // it prevents the event from traveling any further up 
        // (or down) the DOM tree.
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
    const MAX_FILE_SIZE = 10000;

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
            alert("Selected File(s) to exceeded the size limit of 10000 bytes");
        }
    };

    /*Handle Submit for text box */
    const handleTextSubmit = async () =>{
        /* Language Detector - Not Necessary for the moment
        if (selectedLanguage === '--Select a Language--'){
            alert("Please select a language before sumbitting");
            return;
        }*/
        if(input.trim() === '' && inputType === "textbox"){
            alert("Please Enter some code before submitting");
            return;
        }

        setIsLoading(true);

        const data ={
            user_input: input,
            use_case: useCase, 
            ai_model: aiModel,
            input_language: inputLanguage,
            output_language: outputLanguage
        };

        console.log(data);
        
        try {
            const response = await fetch("http://localhost:8080/llm/text", 
            {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const responseData = await response.json();
                setFeedback(responseData.text);
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

        let formattedFeedback = ''; 
       
        if (useCase === "code_generation") {

            const formattedText = responseData.text ? `\n${responseData.text.replace(/\\n/g, '\n')}` : '';
        
            formattedFeedback = [formattedText].filter(Boolean).join('\n\n');
       
        } else if (useCase === "code_completion") {

            const formattedCode = responseData.text ? `Completed Code:\n${JSON.stringify(responseData.text, null, 2)}` : '';
        
            formattedFeedback = [formattedCode].filter(Boolean).join('\n\n');
        
        } else if (useCase === "code_analysis") {

            const formattedText = responseData.text ? `Analysis:\n${responseData.text.replace(/\\n/g, '\n')}` : '';

            formattedFeedback = [formattedText].filter(Boolean).join('\n\n');
        
        } else if (useCase === "code_translation") {
        
            const formattedText = responseData.text ? `Translated Code: \n${responseData.text.replace(/\\n/g, '\n')}` : '';

            formattedFeedback = [formattedText].filter(Boolean).join('\n\n');
        } else {
            // empty use case: just generic LLM repsonse
            const formattedText = responseData.text ? `${responseData.text.replace(/\\n/g, '\n')}` : '';

            formattedFeedback = [formattedText].filter(Boolean).join('\n\n');
        }
        
        return formattedFeedback;
      };
      
    
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
        droppedFiles.forEach((file) =>{
            formData.append(`file`, file);
        });

        formData.append("use_case", useCase);
        formData.append("ai_model", aiModel);
        formData.append("input_language", inputLanguage);
        formData.append("output_language", outputLanguage);

        const fileContent = "Hello, this is the content of the file.";
        const testFile = new File([fileContent], "testFile.txt", { type: "text/plain" });
        const formDataTest = new FormData();
        formDataTest.append("file", testFile);
        formDataTest.append("use_case", 'code_analysis');
        formDataTest.append("ai_model", "openAI");
    
        // console.log(...formDataTest);

        try {
            const response = await fetch("http://localhost:8080/llm/file", {
                method: "POST",
                body: formData, 
                // headers: {
                //     "Content-Type" : "multipart/form-data",
                // },
            });

            const responseData = await response.json();

            if (response.ok) {
                setFeedback(responseData.text);
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
        console.log("Feedback", feedback);
    }


    const handleSubmit = () => {
        if(inputType === "textbox"){
            handleTextSubmit();
        }
        else if (inputType === "files"){
            handleFileSubmit();
        }
    };

    const capitaliseFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };
 
    const formatUseCase = (str) => {
        const words = str.split('_');
        const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
        return capitalizedWords.join(' ');
    };

    const formatAIModel = (str) => {
        if (str === "watsonx.ai"){
            return "watsonx";
        }

        else return "OpenAI";
    };

    return [
    <>


        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        <div className={`main-content ${isSidebarOpen ? 'with-sidebar' : ''}`}>
            <header className="submission-header">
                <h1 className="submission-title">Submission Area</h1>

                <nav className="App-nav">
                    <div className="App-nav-links">
                        <Link to="/"><img src={HeaderImage} alt="Code Craft" className="header-image"/></Link>
                        <a href="#features">Features</a>
                        <Link to="/team">Meet the Team</Link>
                        <a href="#about">About</a>
                        <Link to="/LoginSignUp" className="App-sign-up">Sign up</Link>
                    </div>
                </nav>

            </header>

            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>

            <div className="userArea">

                <div className='submissionArea'>

                    <div className='dropDownContainer'>
 
                        <nav className='dropdownMenu'>
                            <ol>

                                <li className="menu-item">
                                    <a href='#0'>
                                        
                                        {inputType === "textbox" || inputType === "files" 
                                        ? <>{capitaliseFirstLetter(inputType)}</> : <>-Select Input Type-</>}
                                    </a>
                                    <ol className='sub-menu'>
                                        <li className="menu-item">
                                            <a href="#0" onClick={() => setInputType("textbox")}>
                                                Texbox
                                            </a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="#0" onClick={() => setInputType("files")}>
                                                File
                                            </a>
                                        </li>
                                    </ol>   
                                </li>

                                <li className="menu-item">
                                    <a href='#0'>
                                        {useCase === "code_generation" || useCase === "code_completion"
                                        || useCase === "code_analysis" || useCase === "code_translation"
                                        ? <>Use Case: {formatUseCase(useCase)}</> : <>Generic AI repsonse</>}
                                    </a>
                                    <ol className='sub-menu'>
                                        <li className="menu-item">
                                            <a href="#0" onClick={() => setUseCase("")}>
                                                Generic AI repsonse
                                            </a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="#0" onClick={() => setUseCase("code_generation")}>
                                                Code Generation
                                            </a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="#0" onClick={() => setUseCase("code_completion")}>
                                                Code Completion
                                            </a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="#0" onClick={() => setUseCase("code_analysis")}>
                                                Code Analysis
                                            </a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="#0" onClick={() => setUseCase("code_translation")}>
                                                Code Translation
                                            </a>
                                        </li>

                                    </ol>   
                                </li>

                                <li className="menu-item">
                                    <a href='#0'>
                                        {aiModel === "watsonx.ai" || aiModel === "openai"
                                        ? <>AI model: {formatAIModel(aiModel)}</> : <>-Select AI Model-</>}
                                    </a>
                                    <ol className='sub-menu'>
                                        <li className="menu-item">
                                            <a href="#0" onClick={() => setAIModel("watsonx.ai")}>
                                                watsonx
                                            </a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="#0" onClick={() => setAIModel("openai")}>
                                                OpenAI
                                            </a>
                                        </li>
                                    </ol>   
                                </li>

                                {useCase === "code_completion" || useCase === "code_translation" ? (<>
                                    <li className="menu-item">
                                        <a href='#0'>
                                            {inputLanguage !== " " 
                                        ? <>Selected Language: {capitaliseFirstLetter(inputLanguage)}</> : <>-Select Input Language-</>}
                                            
                                        </a>
                                        <ol className='sub-menu'>
                                            <li className="menu-item">
                                                <a href="#0" onClick={()=>setInputLanguage("java")}>
                                                    Java
                                                </a>
                                            </li>
                                            <li className="menu-item">
                                                <a href="#0" onClick={()=>setInputLanguage("python")}>
                                                    Python
                                                </a>
                                            </li>
                                            <li className="menu-item">
                                                <a href="#0" onClick={()=>setInputLanguage("c")}>
                                                    C
                                                </a>
                                            </li>
                                        </ol>   
                                    </li>
                                </>): null}

                                {useCase === "code_translation" ? (<>
                                    <li className="menu-item">
                                        <a href='#0'>
                                            {outputLanguage !== " " 
                                        ? <>Selected Language: {capitaliseFirstLetter(outputLanguage)}</> : <>-Select Output Language-</>}
                                            
                                        
                                        </a>
                                        <ol className='sub-menu'>
                                            <li className="menu-item">
                                                <a href="#0" onClick={()=>setOutputLanguage("java")}>
                                                    Java
                                                </a>
                                            </li>
                                            <li className="menu-item">
                                                <a href="#0" onClick={()=>setOutputLanguage("python")}>
                                                    Python
                                                </a>
                                            </li>
                                            <li className="menu-item">
                                                <a href="#0" onClick={()=>setOutputLanguage("c")}>
                                                    C
                                                </a>
                                            </li>
                                        </ol>   
                                    </li>
                                </>):null}


                            </ol>

                        </nav>
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