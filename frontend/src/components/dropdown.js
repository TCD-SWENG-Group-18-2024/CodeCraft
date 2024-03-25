import React, { useState } from 'react';
import '../styles/dropdown.css';

const capitaliseFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const formatUseCase = (useCase) => {
  return useCase
    .split('_')
    .map(capitaliseFirstLetter)
    .join(' ');
};

const formatAIModel = (aiModel) => {
  return capitaliseFirstLetter(aiModel);
};

// Dropdown component
const Dropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [inputType, setInputType] = useState('');
  const [useCase, setUseCase] = useState('code_analysis'); // Default use case
  const [aiModel, setAIModel] = useState('');
  const [inputLanguage, setInputLanguage] = useState('');
  const [outputLanguage, setOutputLanguage] = useState('');

  return (
    <div className='dropDownContainer'>
      <nav className='dropdownMenu'>
      <div className="arrow-down"></div> 
        <ol>
          <li className='menu-item'>
            <a href='#0' onMouseEnter={() => setIsDropdownOpen(true)}>
              {inputType === "textbox" || inputType === "files" 
                ? <>{capitaliseFirstLetter(inputType)}</> : <>-Select Input Type-</>}
            </a>
            <ol className={isDropdownOpen ? 'sub-menu' : 'hide-dropdown'} onClick={() => setIsDropdownOpen(false)}>
              <li className='menu-item'>
                <a href="#0" onClick={() => setInputType("textbox")}>Textbox</a>
              </li>
              <li className='menu-item'>
                <a href="#0" onClick={() => setInputType("files")}>File</a>
              </li>
            </ol>   
          </li>
        <li className='menu-item'>
            <a href='#0'onMouseEnter={()=>setIsDropdownOpen(true)}>
                {useCase === "code_generation" || useCase === "code_completion"
                || useCase === "code_analysis" || useCase === "code_translation"
                ? <>Use Case: {formatUseCase(useCase)}</> : <>Code Analysis</>}
            </a>
            
            <ol className={isDropdownOpen?'sub-menu':'hide-dropdown' }onClick={()=>setIsDropdownOpen(false)}> 
            
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
            <a href='#0'onMouseEnter={()=>setIsDropdownOpen(true)}>
                {aiModel === "StarCoder" || aiModel === "openai"
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
                        CodeLlama
                    </a>
                </li>
            </ol>   
        </li>

        {useCase === "code_completion" || useCase === "code_translation" ? (<>
            <li className="menu-item">
                <a href='#0'onMouseEnter={()=>setIsDropdownOpen(true)}>
                    {inputLanguage !== " " 
                ? <>Selected Language: {capitaliseFirstLetter(inputLanguage)}</> : <>-Select Input Language-</>}
                    
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
                    {outputLanguage !== " " 
                ? <>Selected Language: {capitaliseFirstLetter(outputLanguage)}</> : <>-Select Output Language-</>}
                    
                
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