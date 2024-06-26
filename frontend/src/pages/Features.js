import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar'; // Import the Sidebar component
import "../styles/Features.css";

const Features = () =>{

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Function to toggle the Sidebar
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        
        const handleScroll = () => {
            const fadeContainers = document.querySelectorAll('.fade-container');
            const windowHeight = window.innerHeight;
    
            fadeContainers.forEach(container => {
                const containerRect = container.getBoundingClientRect();
                // Calculate the top and bottom positions of the container relative to the viewport
                const containerTop = containerRect.top;
                const containerBottom = containerRect.bottom;
                // Calculate the height of the container
                const containerHeight = containerBottom - containerTop;
                // Calculate the distance from the top of the container to the bottom of the viewport
                const distanceToViewportBottom = windowHeight - containerTop;
                // Calculate the visible percentage of the container
                const visiblePercentage = Math.min(1, distanceToViewportBottom / containerHeight);

                let opacity = 1;
                if (container.classList.contains('toolkit-container')) {
                    // For the toolkit container, start vanishing when only 1/5 is left on the screen
                    opacity = containerTop < windowHeight && distanceToViewportBottom > containerHeight * (1/5) ? visiblePercentage : 0.2;
                } else {
                    // Default condition for other containers
                    opacity = containerTop < windowHeight && distanceToViewportBottom > containerHeight * (1/3) ? visiblePercentage : 0;
                }
                // Apply the opacity to the container
                container.style.opacity = opacity.toFixed(2);
            });
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

   // const [isLoggedIn, setIsLoggedInIn] = useState(false);
   // const [userID, setUserID] = useState(null);

   // const checkAuthentication = () => {
   //     const storedUserID = localStorage.getItem("userID")
   //     setIsLoggedInIn(!!storedUserID);
   //     setUserID(storedUserID);
  //  };

    return(
        <>
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className = "features-container">
            <div className="back-to-home">
            </div>
            <div className = "hero-sec">
                <div className = "hero-container">    
                    <h1 className="hero-title">Features</h1>
                    <p className="hero-overview">Experience the future of coding with CodeCraft – an advanced coding platform equipped with cutting-edge AI capabilities. From code translation to intelligent code completion and analysis, CodeCraft empowers developers to write, review, and deploy code with unparalleled efficiency and accuracy.</p>
                    <a href="#llms-container" className="lm-button">Learn More</a>
                </div>   
            </div>
            <div className = "fade-container llms-container" id="llms-container">
                <div className = "llms-column">
                    <h2>Integration with <span className = "underline-letter">L</span>LMs</h2>
                </div>
                <div className = "llms-content">
                    <p>Our Codecraft integrates
                        with leading language models such as <a href="https://openai.com" className="llm-link">OpenAI</a>, <a href="https://ai.meta.com/blog/code-llama-large-language-model-coding/" className="llm-link">Code Llama</a> and <a href="https://www.ibm.com/watsonx" className="llm-link">WatsonX</a>. 
                        <br/>
                        With OpenAI's expertise in natural language understanding and generation, 
                        and WatsonX's advanced natural language processing capabilities, CodeCraft empowers developers like never before.
                        With the AI capabilities of our CodeCraft, you can explain your coding ideas in everyday language, and it will turn them into ready-to-use code. 
                    </p>
                </div>
            </div>
            <div className = "fade-container file-container">
                <div className = "file-column">
                    <h2>File <span className = "underline-letter">M</span>anagement</h2>
                </div>
                <div className = "file-content">
                    <p>
                    CodeCraft offers file management capabilities, simplifying the process of handling result files within 
                    the platform. Users can seamlessly export their result files in various formats, including Java, Python and C, while also benifiting from the copy-to-clipboard feature.
                    </p>
                </div>
            </div>
            <div className = "fade-container language-container">
                <div className = "language-column">
                    <h2>Comprehensive <span className = "underline-letter-dark">L</span>anguage Support</h2>
                </div>
                <div className = "language-content">
                    <p>
                    CodeCraft offers support for various programming languages including Java, Python and C, catering to the diverse needs
                    of developers across different domains, the feedback box incorporates advanced functionality that automatically identifies
                    the language type by analyzing the code pattern within provided code snippets, it is also equipped with comprehensive syntax highlighting
                    , ensuring clear differentiation of code elements for enhanced readability and comprehension.
                    </p>
                </div>
            </div>
            <div className = "fade-container toolkit-container">
                <div className = "toolkit-content">
                    <h2>Code<span className = "underline-letter">C</span>raft 's <span className = "underline-letter">To</span>olkit</h2>
                    <h3 className = "toolkit-subheading">Code Analysis</h3>
                    <p>
                    CodeCraft provides functionalities to help users analyze their code effectively. 
                    From identifying errors and performance to ensuring code quality and security, 
                    CodeCraft's analysis tools empower developers to maintain robust and reliable codebases. 
                    </p>
                    <h3 className = "toolkit-subheading">Code Completion</h3>
                    <p>
                    With CodeCraft's code completion feature, developers can enhance their coding efficiency and accuracy. 
                    As users write code, CodeCraft offers context-aware suggestions, helping them quickly complete code snippets, 
                    functions, or variable names.
                    </p>
                    <h3 className = "toolkit-subheading">Code Translation</h3>
                    <p>
                    With code translation, Developers can seamlessly convert code
                    written in one language to another, eliminating the need for manual translation and reducing development time. 
                    </p>
                    <h3 className = "toolkit-subheading">Code Generation</h3>
                    <p>
                    CodeCraft has the ability to generate code snippets and algorithms directly from user input expressed in plain English. 
                    These generated snippets cover a wide range of common programming tasks and patterns, providing users with a helpful starting point 
                    for their projects.
                    </p>



                </div>
            
            </div>

        </div>
        </>
    );
};

export default Features;
