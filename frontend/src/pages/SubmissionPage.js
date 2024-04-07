import React, { useState, useEffect, useMemo, Suspense } from "react";
import Switch from "@mui/material/Switch"; // Import from `@mui/material` not `@mui/joy`
import Typography from "@mui/material/Typography"; // Import from `@mui/material`
import { toast } from "react-hot-toast";
import Sidebar from "../components/Sidebar";
import SubmissionBar from "../components/SubmissionBar";
import Dropdown from "../components/Dropdown";
import { Button, Tooltip } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import "../styles/SubmissionPage.css";
import "./Home";
import "./LoginSignUp";
import CardElement from "../components/CardElement";
import ResponsiveDialog from "../components/ConfirmationButton";

const backendURL = process.env.REACT_APP_BACKEND_URL;
console.log("backend URL: " + backendURL);

const SubmissionPage = () => {
  const userID = localStorage.getItem("userID");
  const [inputType, setInputType] = useState("files");
  const [input, setInput] = useState("");
  const [useCase, setUseCase] = useState("code_analysis"); // set default cases
  const [aiModel, setAIModel] = useState("openai"); //set default AI model
  const [feedback, setFeedback] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [droppedFiles, setDroppedFiles] = useState([]);
  const [inputLanguage, setInputLanguage] = useState("");
  const [outputLanguage, setOutputLanguage] = useState("");
  const [checked, setChecked] = React.useState(true);
  const [fileName, setFileName] = React.useState("");
  const [tooltipText, setTooltipText] = useState("");
  const infoArray = [
    "For Code Analysis and Code Translation, its best to submit a file!",
    "Feel Like you are not gettting a response you want? Try start a new conversation!",
    "For Code Completion and Code Generation, its recommended type in a prompt!",
    "Sign up for saving your history!",
    "Want to run your code here? Just press the play button on the cards!",
    "Save generated code with click of a button. Just press the clipboard icon on the top right of the card :)",
    
  ];
  const [cards, setCards] = useState(() => {
    if (userID === "") {
      return [];
    }
    const storedCards = localStorage.getItem(userID);
    return storedCards ? JSON.parse(storedCards) : [];
  });

  const handleTooltipHover = () => {
    // Select a random information from the array
    const randomIndex = Math.floor(Math.random() * infoArray.length);
    const randomInfo = infoArray[randomIndex];
    setTooltipText(randomInfo);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  /*Takes input */
  const handleTextBoxChange = (event) => {
    setInput(event.target.value);
  };
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
    setDroppedFiles(droppedFiles);
    console.log("Dropped Files: ", droppedFiles);
  };

  const MAX_FILE_SIZE = 10000;

  const handleFileSelect = (event) => {
    const selectFile = Array.from(event.target.files);
    const filteredFiles = selectFile.filter(
      (file) => file.size <= MAX_FILE_SIZE
    );
    if (filteredFiles.length > 0) {
      setDroppedFiles(selectFile);
      setFileName(selectFile[0].name);
      console.log("Selected File: ", selectFile);
    } else {
      toast.error(
        "Selected File exceeds the size limit of " + MAX_FILE_SIZE / 1000 + "KB"
      );
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
      toast.error("Please enter some code before submitting");
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
      const response = await fetch(backendURL + "/llm/text", {
        method: "POST",
        credentials: "include",
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
      setIsLoading(false);
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

  const handleFileSubmit = async () => {
    // haven't test if it works or not
    if (droppedFiles.length === 0) {
      toast.error("Please select or drop a file before submitting");
      return;
    }

    const formData = new FormData();
    droppedFiles.forEach((file) => {
      formData.set(`file`, file);
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
      const response = await fetch(backendURL + "/llm/file", {
        method: "POST",
        body: formData,
        credentials: "include",
        // headers: {
        //     "Content-Type" : "multipart/form-data",
        // },
      });

      const responseData = await response.json();

      if (response.ok) {
        setFeedback(responseData.text);
      } else {
        setFeedback(
          `File Submission failed, Server returned ${response.status} status`
        );
      }
    } catch (error) {
      setFeedback(`Error occurred while submitting files: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
    console.log("Feedback", feedback);
  };

  const handleSubmit = () => {
    setIsLoading(true);
    if (inputType === "textbox") {
      toast.promise(handleTextSubmit(), {
        loading: "Loading...",
        success: "Success!",
        error: "Something went wrong, please try again",
      });
    } else if (inputType === "files") {
      toast.promise(handleFileSubmit(), {
        loading: "Loading...",
        success: "Success!",
        error: "Something went wrong, please try again",
      });
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
      fetch(backendURL + "/llm/clearmemory", {
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

  useEffect(() => {
    localStorage.setItem(userID, JSON.stringify(cards));
  }, [cards, userID]);

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
    const newCard =
      inputType === "files"
        ? {
            usecase: useCase,
            query: fileName,
            response: feedback,
            isLoading: isLoading,
          }
        : {
            usecase: useCase,
            query: input,
            response: feedback,
            isLoading: isLoading,
          };

    // Only store the latest 10 cards
    setCards((prevCards) => {
      const updatedCards = [newCard, ...prevCards.slice(0, 9)];
      return updatedCards;
    });
  };

  const handleInputTypeToggle = (event) => {
    setChecked(event.target.checked);
    setInputType(event.target.checked ? "files" : "textbox");
  };

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
              checked={checked}
              setChecked={setChecked}
            />
            <div style={{ display: "flex" }}>
              <Tooltip
                title={
                  <span style={{ fontSize: "18px", color: "white" }}>
                    {tooltipText}
                  </span>
                }
                followCursor
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: "10px",
                  }}
                  className="infoButton"
                  onMouseEnter={handleTooltipHover}
                >
                  <InfoIcon sx={{ color: "white" }}></InfoIcon>
                </div>
              </Tooltip>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginRight: "10px",
                }}
              >
                <Typography component="div" level="body2">
                  Text
                </Typography>
                <Switch checked={checked} onChange={handleInputTypeToggle} />
                <Typography component="div" level="body2">
                  File
                </Typography>
              </div>
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
                    sx={{ ml: 2, height: "56px", padding: "16px 32px" }}
                  >
                    Submit
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleNewConversation}
                    sx={{ ml: 2, height: "56px", padding: "16px 48px" }}
                  >
                    New Conversation
                  </Button>
                </div>
              )}
            </div>
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
    </>,
  ];
};

export default SubmissionPage;
