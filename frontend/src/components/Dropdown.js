import React, { useState } from 'react';
import '../styles/Dropdown.css';

// Dropdown component
const Dropdown = ({inputType, setInputType, 
                   useCase, setUseCase, 
                   aiModel, setAIModel, 
                   inputLanguage, setInputLanguage, 
                   outputLanguage, setOutputLanguage,
                   checked, setChecked}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const capitaliseFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

  const formatInputType = (inputType) => {
    if (inputType === "files") return "File Submission"
    else return "Text Submission"
  };

  const formatUseCase = (useCase) => { 
    return useCase
      .split('_')
      .map(capitaliseFirstLetter)
      .join(' ');
  };
  
  const formatAIModel = (aiModel) => {
    if (aiModel === "openai") return "GPT 3.5"
    else if (aiModel === "llama") return "Code Llama"
    return capitaliseFirstLetter(aiModel);
  };

  return (
    <div className='dropDownContainer'>
      <nav className='dropdownMenu'>
      <div className="arrow-down"></div> 
        <ol>

        <li className='menu-item'>
            <a href='#0'onMouseEnter={()=>setIsDropdownOpen(true)}>
                {useCase === "code_generation" || useCase === "code_completion"
                || useCase === "code_analysis" || useCase === "code_translation"
                ? <>Use Case: {formatUseCase(useCase)}</> : <>Use Case: Code Analysis</>}
            </a>
            <ol className={isDropdownOpen?'sub-menu':'hide-dropdown' }onClick={()=>setIsDropdownOpen(false)}> 

                <li className="menu-item">
                    <a href="#0" onClick={() => {setUseCase("code_analysis"); setChecked(true); setInputType("files");}}>
                        Code Analysis
                    </a>
                </li>
                <li className="menu-item">
                    <a href="#0" onClick={() => {setUseCase("code_generation"); setChecked(false); setInputType("textbox");}}>
                        Code Generation
                    </a>
                </li>
                <li className="menu-item">
                    <a href="#0" onClick={() => {setUseCase("code_completion"); setChecked(false); setInputType("textbox");}}>
                        Code Completion
                    </a>
                </li>
                <li className="menu-item">
                    <a href="#0" onClick={() => {setUseCase("code_translation"); setChecked(true); setInputType("files");}}>
                        Code Translation
                    </a>
                </li>
            </ol>   
        </li>

        <li className="menu-item">
            <a href='#0'onMouseEnter={()=>setIsDropdownOpen(true)}>
                {aiModel === "StarCoder" || aiModel === "openai" || aiModel === "llama"
                ? <>AI model: {formatAIModel(aiModel)}</> : <>-Select AI Model-</>}
            </a>
            <ol className={isDropdownOpen?'sub-menu':'hide-dropdown' }onClick={()=>setIsDropdownOpen(false)}>
                <li className="menu-item">
                    <a href="#0" onClick={() => setAIModel("StarCoder")}>
                        StarCoder
                    </a>
                </li>
                <li className="menu-item">
                    <a href="#0" onClick={() => setAIModel("openai")}>
                        GPT3.5
                    </a>
                </li>
                <li className="menu-item">
                    <a href="#0" onClick={() => setAIModel("llama")}>
                        Code Llama
                    </a>
                </li>
            </ol>   
        </li>

        {useCase === "code_completion" || useCase === "code_translation" ? (<>
            <li className="menu-item">
                <a href='#0'onMouseEnter={()=>setIsDropdownOpen(true)}>
                    {inputLanguage === "java" || inputLanguage === "python" || inputLanguage === "c"
                ? <>Input Language: {capitaliseFirstLetter(inputLanguage)}</> : <>-Select Input Language-</>}
                    
                </a>
                <ol className={isDropdownOpen?'sub-menu':'hide-dropdown' }onClick={()=>setIsDropdownOpen(false)}>
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
                <a href='#0'onMouseEnter={()=>setIsDropdownOpen(true)}>
                    {outputLanguage === "java" || outputLanguage === "python" || outputLanguage === "c" 
                ? <>Output Language: {capitaliseFirstLetter(outputLanguage)}</> : <>-Select Output Language-</>}
                    
                
                </a>
                <ol className={isDropdownOpen?'sub-menu':'hide-dropdown' }onClick={()=>setIsDropdownOpen(false)}>
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
);
};
export default Dropdown;
