import React, {useState} from 'react'
import '../styles/SubmissionPage.css'
import IBM_White from "../assets/IBM_white.PNG"
import { Link } from 'react-router-dom'

const SubmissionPage = () => {

    const[input, setInput] = useState('');
    const[selectedLanguage, setSelectedLangugage] = useState('--Select a Language--');
    const[feedback, setFeedback] = useState('');
    const[dropdownVisible, setDropdownVisible] = useState(false);

    /*Takes input */
    const handleTextBoxChange = (event) => {
        setInput(event.target.value);
    };

    /*Takes Selected Language */
    const handleLanguageSelected = (language) => {
        setSelectedLangugage(language);
        setDropdownVisible(false);
    };

    /*Handle Submit, probably need to send the in take info to back end and ai */
    const handleSubmit = async () =>{
        /*Maybe, a language detecter ???*/ 
        if (selectedLanguage === '--Select a Language--'){
            alert("Please select a language before sumbitting");
            return;
        }

        if(input.trim() === ''){
            alert("Please Enter some code before submitting");
            return;
        }

        const data ={
            language: selectedLanguage,
            code: input,
        };

        console.log(data);
        
        try {
            const response = await fetch("backend-api-url", 
            {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok){
                const responseData = await response.json();
                setFeedback(`Submission successful. Feedback: ${JSON.stringify(responseData)}`);
            }
            else {
                setFeedback(`Submission failed. Server returned ${response.status} status.`)
            }
        } 
        catch(error){
            setFeedback(`Error occurred while submitting: ${error.message}`)
        }

        // setFeedback(`Submission successful. Language: ${selectedLanguage}`);

        console.log("Submitted: ",input);
        console.log("Language: ", selectedLanguage);
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

    const dropDown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    return [
        <>

            <Link to="/">
            <button className='backButton'>
                Back to Home
            </button>
            </Link>

            <a href='https://www.ibm.com/us-en' target='blank_'><img src={IBM_White} alt="logo" className="logo" /></a>

            <div class="wave"></div>
            <div class="wave"></div>
            <div class="wave"></div>

            <div><h1 class="Heading">Evaluation Page</h1></div>


            <div class="languageDropdown">
                <button onClick={dropDown} >{selectedLanguage === 'Select a Language'
                    ? 'Select a Language Please'
                    : `Language Selected: ${selectedLanguage}`}</button>

                {dropdownVisible && (
                <div class="languages">
                    <p className="Java" onClick={() => handleLanguageSelected("Java")}>Java</p>
                    <p className="Python" onClick={() => handleLanguageSelected("Python")}>Python</p>
                    <p className="C" onClick={() => handleLanguageSelected("C")}>C</p>
                </div>
                )}
            </div>



            <div class="submissionArea">
                <div className='textContainer'>
                    <textarea 
                        type='text'
                        value={input}
                        onChange={handleTextBoxChange}
                        class="textbox"
                        placeholder='Code Submission Area'
                        onKeyDown={handleKeyDown}
                    >
                    </textarea>

                    {feedback &&( 
                        <div class="feedBackBox">
                            <p>{feedback}</p>
                        </div>
                    )}
                </div>

                <button onClick={handleSubmit} class="submitButton">Submit</button>



            </div>

            
        </>
    ];
};



export default SubmissionPage;