import React, { useState } from 'react';
import HeaderImage from '../assets/IBM_white.PNG';
import Sidebar from '../components/Sidebar';
import '../styles/SubmissionPage.css';


const SubmissionPage = () => {

    const[input, setInput] = useState('');
    const[useCase, setUseCase] = useState('');
    const[aiModel, setAIModel] = useState('');
    const[feedback, setFeedback] = useState('');
    const[isLoading, setIsLoading] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    // const[dropdownVisible, setDropdownVisible] = useState(false);


    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
 

    /*Takes input */
    const handleTextBoxChange = (event) => {
        setInput(event.target.value);
    };


    const handleUseCaseChange = (event) =>{
        setUseCase(event.target.value);
    };

    const handleAiModelChange = (event) => {
        setAIModel(event.target.value);
    };



    /*Handle Submit, probably need to send the in take info to back end and ai */
    const handleSubmit = async () =>{
        /* Language Detector - Not Necessary for the moment
        if (selectedLanguage === '--Select a Language--'){
            alert("Please select a language before sumbitting");
            return;
        }*/

        if(input.trim() === ''){
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

            if (response.ok){
                const responseData = await response.json();
                setFeedback(`Submission successful. \n Feedback: ${JSON.stringify(responseData)}`);
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
        //console.log("Language: ", selectedLanguage);
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

    // const dropDown = () => {
    //     setDropdownVisible(!dropdownVisible);
    // };

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

                    <div className='useCaseDropDown'>
                        <label>Select Use Case</label>
                            <select value={useCase} onChange={handleUseCaseChange}>
                                <option value="code_generation">Code Generation</option>
                                <option value="code_completion">Code Completion</option>
                                <option value="code_analysis">Code Analysis</option>
                            </select>
                    </div>

                    <div className='aiDropDown'>
                        <label>Select AI Model</label>
                            <select value={aiModel} onChange={handleAiModelChange}>
                                <option value="watsonx.ai">WatsonX AI</option>
                                <option value="openai">OpenAI</option>
                            </select>
                    </div>

                    <div className='textBoxContainer'>
                        <textarea 
                            type='text'
                            value={input}
                            onChange={handleTextBoxChange}
                            class="textbox"
                            placeholder='Code Submission Area'
                            onKeyDown={handleKeyDown}
                        ></textarea>
                        
                    </div>


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