import React, {useState} from 'react'
import '../styles/SubmissionPage.css'

// function Submission(){
//     return(
//         <p style ={{fontSize :"30px"}}>Submission Page!</p>
//     )
    
// }
const SubmissionPage = () => {

    const[input, setInput] = useState('');
    const[selectedLanguage, setSelectedLangugage] = useState('--Select a Language--');
    const[feedback, setFeedback] = useState('');


    /*Takes input */
    const handleTextBoxChange = (event) => {
        setInput(event.target.value);
    };

    /*Takes Selected Language */
    const handleLanguageSelected = (language) => {
        setSelectedLangugage(language);
    };

    /*Handle Submit, probably need to send the in take info to back end and ai */
    const handleSubmit = () =>{
        /*Maybe, a language detecter ???*/ 
        if (selectedLanguage === '--Select a Language--'){
            alert("Please select a language before sumbitting");
            return;
        }

        if(input.trim() === ''){
            alert("Please Enter some code before submitting");
            return;
        }

        setFeedback(`Submission successful. Language: ${selectedLanguage}`);

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


    return [
        <>
            <div class="wave"></div>
            <div class="wave"></div>
            <div class="wave"></div>

            <div><h1 class="">Evaluation Page</h1></div>


            <div class="languageDropdown">
                <button onClick={()=> handleLanguageSelected('Select a Language')}>{selectedLanguage === 'Select a Language'
                    ? 'Select a Language Please'
                    : `Language Selected: ${selectedLanguage}`}</button>

                <div class="languages">
                    <p onClick={() => handleLanguageSelected("Java")}>Java</p>
                    <p onClick={() => handleLanguageSelected("Python")}>Python</p>
                    <p onClick={() => handleLanguageSelected("C")}>C</p>
                </div>
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