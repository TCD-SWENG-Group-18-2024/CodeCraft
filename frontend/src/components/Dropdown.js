import React, { useState, useRef } from 'react';
import '../styles/Dropdown.css';

// Dropdown component
const Dropdown = ({inputType, setInputType, 
                   useCase, setUseCase, 
                   aiModel, setAIModel, 
                   inputLanguage, setInputLanguage, 
                   outputLanguage, setOutputLanguage,
                   checked, setChecked}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const [outputFocused, setOutputFocused] = useState(false);
  const inputRef = useRef(null);
  const outputRef = useRef(null);

  const handleInputFocus = () => {
    setInputFocused(true);
  };

  const handleOutputFocus = () => {
    setOutputFocused(true);
  }

  const handleInputBlur = () => {
    setInputFocused(false);
  };

  const handleOutputBlur = () => {
    setOutputFocused(false);
  };

  const handleInputChange = (e) => {
    setInputLanguage(e.target.value);
  };

  const handleOutputChange = (e) => {
    setOutputLanguage(e.target.value);
  };

  const handleInputEnter = (e) => {
    if (e.key == "Enter") {
        e.preventDefault();
        inputRef.current.blur();
    }
  }

  const handleOutputEnter = (e) => {
    if (e.key == "Enter") {
        e.preventDefault();
        outputRef.current.blur();
    }
  }

  let displayedInput = inputLanguage;
  if (!inputFocused && inputLanguage) {
    displayedInput = `Input Language: ${inputLanguage}`;
  }

  let displayedOutput = outputLanguage;
  if (!outputFocused && outputLanguage) {
    displayedOutput = `Output Language: ${outputLanguage}`;
  }

  const capitaliseFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

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
            <li className="text-item">
                <input
                    value={inputFocused ? inputLanguage : displayedInput}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    onKeyDown={handleInputEnter}
                    placeholder="-Enter Input Language-"
                    ref={inputRef}
                />
            </li>
        </>): null}

        {useCase === "code_translation" ? (<>
            <li className="text-item">
                <input
                    value={outputFocused ? outputLanguage : displayedOutput}
                    onChange={handleOutputChange}
                    onFocus={handleOutputFocus}
                    onBlur={handleOutputBlur}
                    onKeyDown={handleOutputEnter}
                    placeholder="-Enter Output Language-"
                    ref={outputRef}
                />
            </li>
        </>):null}


    </ol>
 
</nav>
</div>
);
};
export default Dropdown;
