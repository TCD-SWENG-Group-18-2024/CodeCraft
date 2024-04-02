import React, { useState, useEffect, useMemo, Suspense } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nord as syntax } from "react-syntax-highlighter/dist/esm/styles/prism";
import { toast } from "react-hot-toast";
import Sidebar from "../components/Sidebar";
import SubmissionBar from "../components/SubmissionBar";
import Dropdown from "../components/Dropdown";
import { Button } from "@mui/material";
import "../styles/SubmissionPage.css";
import "./Home";
import "./LoginSignUp";
import Export from "../assets/export.png";
import CardElement from "../components/CardElement";
import ResponsiveDialog from "../components/ConfirmationButton";

const SubmissionPage = () => {
  const [inputType, setInputType] = useState("textbox");
  const [input, setInput] = useState("");
  const [useCase, setUseCase] = useState(""); // set default cases
  const [aiModel, setAIModel] = useState("openai"); //set default AI model
  const [feedback, setFeedback] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [droppedFiles, setDroppedFiles] = useState([]);
  const [inputLanguage, setInputLanguage] = useState("java");
  const [outputLanguage, setOutputLanguage] = useState("");
  const [isDropdownOpen, setIsDropdownopen] = useState(true);
  const [cards, setCards] = useState([]); // whenever submit is clicked
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  /*Takes input */
  const handleTextBoxChange = (event) => {
    setInput(event.target.value);
  };

  /*Handle the dropdowns */
  const handleUseCaseChange = (event) => {
    setUseCase(event.target.value);
  };

  const handleAiModelChange = (event) => {
    setAIModel(event.target.value);
  };

  const handleInputTypeChange = (event) => {
    setInputType(event.target.value);
    setInput(""); // clear the input when changing between drop file and input text
    setDroppedFiles([]);
  };

  const handleInputLanguageChange = (event) => {
    setInputLanguage(event.target.value);
  };

  const handleOutputLanguageChange = (event) => {
    setOutputLanguage(event.target.value);
  };

  const [customFileName, setCustomFileName] = useState("");

  const highlightCodeBlock = (code) => (
    <SyntaxHighlighter language="jsx" style={syntax}>
      {code}
    </SyntaxHighlighter>
  );
  // takes input - files
  const handleDragOver = (event) => {
    event.preventDefault();
    //When stopPropagation is called inside an event handler,
    // it prevents the event from traveling any further up
    // (or down) the DOM tree.
    event.stopPropagation();
    event.dataTransfer.dropEffect = "copy";
  };

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
    const filteredFiles = selectFile.filter(
      (file) => file.size <= MAX_FILE_SIZE
    );

    if (filteredFiles.length > 0) {
      setDroppedFiles((prevFiles) => [...prevFiles, ...selectFile]);
      console.log("Selected File: ", selectFile);
    } else {
      // alert("Selected File(s) to exceeded the size limit of 10000 bytes");
      toast.error("Selected File(s) to exceeded the size limit of 10000 bytes");
    }
  };

  /*Handle Submit for text box */
  const handleTextSubmit = async () => {
    /* Language Detector - Not Necessary for the moment
        if (selectedLanguage === '--Select a Language--'){
            alert("Please select a language before sumbitting");
            return;
        }*/
    if (input.trim() === "" && inputType === "textbox") {
      // alert("Please Enter some code before submitting");
      toast.error("Please Enter some code before submitting");
      return;
    }

    const data = {
      user_input: input,
      use_case: useCase,
      ai_model: aiModel,
      input_language: inputLanguage,
      output_language: outputLanguage,
    };

    console.log(data);

    try {
      const response = await fetch("http://localhost:8080/llm/text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        setFeedback(responseData.text);
      } else {
        setFeedback(
          `Submission failed. Server returned ${response.status} status.`
        );
      }
    } catch (error) {
      setFeedback(`Error occurred while submitting: ${error.message}`);
    } finally {
      setTimeout(() => {
        // Simulate API response
        setIsLoading(false);
      }, 1000);
    }

    // setFeedback(`Submission successful. Language: ${selectedLanguage}`);

    console.log("Submitted: ", input);
    console.log("Feedback", feedback);
  };

  // Allows user to key into tab in the submission box
  const handleKeyDown = (event) => {
    if (event.key === "Tab") {
      event.preventDefault();

      const { selectionStart, selectionEnd } = event.target;

      setInput(
        input.substring(0, selectionStart) +
          "\t" +
          input.substring(selectionEnd)
      );

      event.target.setSelectionRange(selectionStart + 1, selectionStart + 1);
    }
  };

  const formatFeedback = (responseData) => {
    let formattedFeedback = "";

    if (useCase === "code_generation") {
      const formattedText = responseData.text
        ? `\n${responseData.text.replace(/\\n/g, "\n")}`
        : "";

      formattedFeedback = [formattedText].filter(Boolean).join("\n\n");
    } else if (useCase === "code_completion") {
      const formattedCode = responseData.text
        ? `Completed Code:\n${JSON.stringify(responseData.text, null, 2)}`
        : "";

      formattedFeedback = [formattedCode].filter(Boolean).join("\n\n");
    } else if (useCase === "code_analysis") {
      const formattedText = responseData.text
        ? `Analysis:\n${responseData.text.replace(/\\n/g, "\n")}`
        : "";

      formattedFeedback = [formattedText].filter(Boolean).join("\n\n");
    } else if (useCase === "code_translation") {
      const formattedText = responseData.text
        ? `Translated Code: \n${responseData.text.replace(/\\n/g, "\n")}`
        : "";

      formattedFeedback = [formattedText].filter(Boolean).join("\n\n");
    } else {
      // empty use case: just generic LLM response
      const formattedText = responseData.text
        ? `${responseData.text.replace(/\\n/g, "\n")}`
        : "";

      formattedFeedback = [formattedText].filter(Boolean).join("\n\n");
    }

    return formattedFeedback;
  };

  // need a function that handles submitting a file to backend.
  // https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/

  const handleFileSubmit = async () => {
    // haven't test if it works or not
    if (droppedFiles.length === 0) {
    //   alert("Please select or drop some files before submitting");
      toast.error("Please select or drop some files before submitting");
      return;
    }

    const formData = new FormData();
    droppedFiles.forEach((file) => {
      formData.append(`file`, file);
    });

    formData.append("use_case", useCase);
    formData.append("ai_model", aiModel);
    formData.append("input_language", inputLanguage);
    formData.append("output_language", outputLanguage);

    const fileContent = "Hello, this is the content of the file.";
    const testFile = new File([fileContent], "testFile.txt", {
      type: "text/plain",
    });
    const formDataTest = new FormData();
    formDataTest.append("file", testFile);
    formDataTest.append("use_case", "code_analysis");
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
      } else {
        setFeedback(
          `File Submission failed, Server return ${response.status} status`
        );
      }
    } catch (error) {
      setFeedback(`Error occurred while submitting files: ${error.message}`);
    } finally {
      setTimeout(() => {
        // Simulate API response
        setIsLoading(false);
      }, 1000);
    }
    console.log("Feedback", feedback);
  };

  const handleSubmit = () => {
    setIsLoading(true);
    if (inputType === "textbox") {
      handleTextSubmit();
    } else if (inputType === "files") {
      handleFileSubmit();
    }
  };

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleNewConversation = () => {
    setDialogOpen(true);
  };
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };
  const handleYesClick = () => {
    if (cards.length === 0) {
      handleCloseDialog();
    } else {
      fetch("http://localhost:8080/llm/clearmemory", {
        method: "DELETE",
        //headers: {
        //    'Content-Type': 'application/json',
        //},
        // Not needed right now but possibly in future
      })
        .then((response) => {
          if (response.ok) {
            console.log("API request successful");
            setCards([]);
            handleCloseDialog();
          } else {
            console.error("API request failed:", response.status);
            handleCloseDialog();
          }
        })
        .catch((error) => {
          console.error("Error calling API:", error);
          handleCloseDialog();
        });
    }
  };

  const capitaliseFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const formatUseCase = (str) => {
    const words = str.split("_");
    const capitalizedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );
    return capitalizedWords.join(" ");
  };

  const formatAIModel = (str) => {
    if (str === "StarCoder") {
      return "StarCoder";
    } else return "GPT3.5";
  };

  useEffect(() => {
    // have to wait for feedback to update before you can add card
    if (feedback) {
      addCard();
      setTimeout(() => {
        setCards((prevCards) => {
          const updatedCards = [...prevCards];
          updatedCards[0].isLoading = false; // takes too long so have to set state to false manually.
          return updatedCards;
        });
      }, 500); // Adjust the delay time as needed
    }
  }, [feedback]);
  const addCard = () => {
    const newCard = {
      usecase: useCase,
      query: input,
      response: feedback,
      isLoading: isLoading,
    };
    setCards((prevCards) => [newCard, ...prevCards]); // Add the new card to the dictionary
  };



  // const pastCards = useMemo(() => {
  //     return cards.slice(1).map((card, index) => (
  //         <div key={index}>
  //             <CardElement
  //                 usecase={card.usecase}
  //                 response={card.response}
  //                 isLoading={false} // Set isLoading to false for all cards except the most recent one
  //             />
  //         </div>
  //     ));
  // }, [cards, isLoading]);

  return [
    <>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className={`main-content ${isSidebarOpen ? "with-sidebar" : ""}`}>
        <div className="userArea">
          <div className="submissionArea">
            <Dropdown
              inputType={inputType}
              setInputType={setInputType}
              useCase={useCase}
              setUseCase={setUseCase}
              aiModel={aiModel}
              setAIModel={setAIModel}
              inputLanguage={inputLanguage}
              setInputLanguage={setInputLanguage}
              outputLanguage={outputLanguage}
              setOutputLanguage={setOutputLanguage}
            />
            <div>
              {inputType === "textbox" && (
                <div className="submission">
                  <SubmissionBar
                    input={input}
                    handleTextBoxChange={handleTextBoxChange}
                    handleKeyDown={handleKeyDown}
                    handleSubmit={handleSubmit}
                  />
                  <ResponsiveDialog
                    open={dialogOpen}
                    handleClose={handleCloseDialog}
                    handleYesClick={handleYesClick}
                  />
                  <Button
                    variant="contained"
                    onClick={handleNewConversation}
                    sx={{ ml: 2, height: "56px", padding: "15px" }}
                  >
                    New Conversation
                  </Button>
                </div>
              )}
            </div>
            {inputType === "files" && (
              <div className="fileInputContainer">
                <div
                  className="fileDropZone"
                  onDrop={handleFileDrop}
                  onDragOver={handleDragOver}
                  onClick={() => document.getElementById("fileInput").click()}
                >
                  {droppedFiles.length > 0 ? (
                    <a>
                      {droppedFiles.map((file, index) => (
                        <li key={index}>{file && file.name}</li>
                      ))}
                    </a>
                  ) : (
                    <p>Drag files here or Click to select</p>
                  )}
                  <input
                    id="fileInput"
                    type="file"
                    onChange={(e) => {
                      handleFileSelect(e);
                    }}
                  />
                </div>
                <ResponsiveDialog
                  open={dialogOpen}
                  handleClose={handleCloseDialog}
                  handleYesClick={handleYesClick}
                />
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  sx={{ ml: 2, height: "64px", padding: "16px 32px" }}
                >
                  Submit
                </Button>
                <Button
                  variant="contained"
                  onClick={handleNewConversation}
                  sx={{ ml: 2, height: "64px", padding: "16px 48px" }}
                >
                  New Conversation
                </Button>
              </div>
            )}
          </div>

          <div className="feedBackArea">
            <div className="card-area">
              {/* <div>
                            <CardElement
                                usecase={useCase}
                                response={feedback}
                                isLoading={isLoading} // Set isLoading to false for all cards except the most recent one
                            />
                        </div> */}
              {cards.map((card, index) => (
                <div key={index}>
                  <CardElement
                    className="card"
                    usecase={card.usecase}
                    query={card.query}
                    response={card.response}
                    isLoading={card.isLoading} // Use the isLoading state from each card
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="wave_container">
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
      </div>
    </>,
  ];
};

export default SubmissionPage;

// for export file format
{
  /* <input
    type="text"
    value={customFileName}
    onChange={(e) => setCustomFileName(e.target.value)}    
    placeholder="Enter custom file name"
/> */
}
