import CopyCode from "@mui/icons-material/ContentCopy";
import ExecuteCode from "@mui/icons-material/PlayCircleFilled";
import {
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Skeleton,
  Typography,
  Tooltip
} from "@mui/material";
import React, { useState } from "react";
import { renderToString } from "react-dom/server";
import { toast } from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nord as syntax } from "react-syntax-highlighter/dist/esm/styles/prism";
import app_logo from "../assets/codecraft.png";
import Export from "../assets/export.png";
import "../styles/CardElement.css";

const backendURL = process.env.REACT_APP_BACKEND_URL;
console.log("backend URL: " + backendURL);

const CardElement = ({ usecase, query, response, isLoading }) => {
  const [copied, setCopied] = useState(false);
  const [customFileName, setCustomFileName] = useState("");
  const [codeStatus, setCodeStatus] = useState("");
  const [codeOutput, setCodeOutput] = useState("");
  const [showOnlyCode, setShowOnlyCode] = useState(false);

  const isCode = (usecase !== "code_analysis" ? "Code" : "Content");

  const copyToClipboard = (response) => {
    const lines = response.split("\n");
    let codeBlock = "";
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.startsWith("```")) {
        line.substring(3).trim();
        for (let j = i + 1; j < lines.length; j++) {
          const codeLine = lines[j].trim();
          if (codeLine.endsWith("```")) {
            codeBlock = lines.slice(i + 1, j).join("\n");
            response = codeBlock;
            break;
          }
        }
        break;
      }
    }
    navigator.clipboard
      .writeText(response)
      .then(() => {
        if (!copied) toast.success(isCode + " Copied to Clipboard!");
        setCopied(true);
        setTimeout(() => setCopied(false), 3000); // Reset copied state after 3 seconds
      })
      .catch((error) => {
        console.error("Failed to copy:", error);
      });
  };

  const handleExportClick = (response) => {
    const lines = response.split("\n");

    let codeBlock = "";
    let language = "";

    // Loop through each line to find the starting marker
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      if (line.startsWith("```")) {
        // Extract the language from the line
        language = line.substring(3).trim();

        // Start capturing the code block from the next line
        for (let j = i + 1; j < lines.length; j++) {
          const codeLine = lines[j].trim();

          // Check if the line is the ending marker
          if (codeLine.endsWith("```")) {
            // Extract the code block content
            codeBlock = lines.slice(i + 1, j).join("\n");
            response = codeBlock;
            break; // Exit the loop once the ending marker is found
          }
        }
        break; // Exit the loop once the starting marker is found
      }
    }
    const extensionMap = {
      python: ".py",
      java: ".java",
      c: ".c",
      "c++": ".cpp",
      "c#": ".cs",
      assembly: ".S",
      javascript: ".js",
      jsx: ".jsx",
      html: ".html",
      css: ".css",
      ruby: "ruby",
      php: "php",
      kotlin: ".kt",
      r: ".R",
      perl: ".pl",
      json: ".json",
      plaintext: ".txt",
      // Add more mappings for other languages as needed
    };

    const fileExtension = extensionMap[language] || ".txt";

    // Call the export function with the determined file extension
    exportFeedback(response, fileExtension);
  };

  const exportFeedback = (response, fileExtension) => {
    const fileName = customFileName || "feedback";

    const blob = new Blob([response], { type: "text/plain;charset=utf-8" });

    const a = document.createElement("a");
    a.style.display = "none";

    a.href = window.URL.createObjectURL(blob);

    a.download = fileName + fileExtension;

    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
  };

  const highlightCodeBlock = (string) => {
    const lines = string.trim().split("\n");
    let language = "txt";
    const firstLine = lines[0].trim();
    const languageRegex =
      /^(python|java|c|cpp|cs|assembly|javascript|jsx|html|css|ruby|php|kotlin|r|perl|json|plaintext)\b/i;
    // If the first line matches, extract the language and remove it from the code
    if (languageRegex.test(firstLine)) {
      language = firstLine.match(languageRegex)[0].toLowerCase();
      lines.shift();
    }
    const code = lines.join("\n");
    return (
      <SyntaxHighlighter language={language} style={syntax}>
        {code}
      </SyntaxHighlighter>
    );
  };

  const getOnlyCode = (response) => {
    const lines = response.split("\n");
    let codeBlock = "";
    let language = "";
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.startsWith("```")) {
        language = line.substring(3).trim();
        for (let j = i + 1; j < lines.length; j++) {
          const codeLine = lines[j].trim();
          if (codeLine.endsWith("```")) {
            codeBlock = lines.slice(i + 1, j).join("\n");
            response = codeBlock;
            break;
          }
        }
        break;
      }
    }
    return (
      <SyntaxHighlighter language={language} style={syntax}>
        {response}
      </SyntaxHighlighter>
    );
  };

  const codeResponse = getOnlyCode(response);

  const tempResponse = `<code>${response}</code>`;

  const modifiedFeedback = tempResponse.replace(
    /```([\s\S]*?)```/g,
    (match, code) => {
      return `<pre class="code-block"><code>${renderToString(
        highlightCodeBlock(code)
      )}</code></pre>`;
    }
  );

  const formattedUsecase = usecase.split("_").join(" ").toUpperCase();

  const parseCodeResponse = (response) => {
    if (typeof response !== "string") return null; // Check if response is a string

    const codeBlocks = response.match(/```(\w*)\s*([\s\S]*?)\s*```/g);

    if (!codeBlocks) {
      toast.error("Code was not executed: No Code Block Detected");
      return null;
    }

    const parsedCode = codeBlocks.map((block) => {
      const [, language, code] = block.match(/```(\w*)\s*([\s\S]*?)\s*```/);
      return { language: language || "plaintext", code };
    });

    return parsedCode.length > 0 ? parsedCode[0] : null; // Return the first element only
  };

  const handleExecutedCode = async () => {
    const data = parseCodeResponse(response);
    console.log(data);

    try {
      if (!data) {
        toast.error("No response data found.");
        return;
      }

      const status = await fetch(backendURL + "/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (status.ok) {
        const responseData = await status.json();
        console.log(responseData);

        toast.success("Code has been successfully executed");
        
        setCodeStatus(responseData.exit_code);
        setCodeOutput(responseData.stdout);
      } else {
        toast.error("Code was not executed: Error Code " + status.status);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Code was not executed: " + error);
    }
  };

  return (
    <Card variant="outlined" sx={{ width: "700px", marginBottom: "25px" }}>
      <CardContent>
        {isLoading ? (
          <>
            <Skeleton variant="text" width={550} height={20} />
            <Skeleton variant="text" width={550} height={20} />
            <Skeleton variant="text" width={550} height={80} />
          </>
        ) : (
          <>
            <div className="card-header">
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
                style={{
                  fontFamily: "'Courier New', Courier, monospace",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <img
                  src={app_logo}
                  alt="App Logo"
                  style={{
                    width: "15px",
                    height: "15px",
                    marginTop: "3px",
                    marginRight: "3px",
                  }}
                />
                <div>{formattedUsecase ? formattedUsecase : "Code Analysis"}</div>
              </Typography>
              <div className="buttons-container">
                <div className="checkbox-container">
                  {usecase !== "code_analysis" ? (
                    <FormControlLabel
                      label="Show Only Code"
                      labelPlacement="start"
                      control={
                        <Checkbox
                          checked={showOnlyCode}
                          onChange={(e) => setShowOnlyCode(e.target.checked)}
                        />
                      }
                      sx={{
                        marginRight: '1px',
                        marginLeft: 'auto',
                        display: 'flex',
                        flexDirection: 'row-reverse', 
                        alignItems: 'center',
                      }}
                    />
                  ) : ("")}
                </div>
                <Tooltip title={"Copy " + isCode + " to Clipboard"} arrow>
                  <button
                    className="copy-button"
                    onClick={() => copyToClipboard(response)}
                  >
                    <CopyCode sx={{ height: "20px", width: "20px" }} />
                  </button>
                </Tooltip>
                <Tooltip title={"Export " + isCode + " to File"} arrow>
                  <button
                    className="export-button"
                    onClick={() => handleExportClick(response)}
                  >
                    <img src={Export} alt="Export Icon" className="export-img" />
                  </button>
                </Tooltip>
                {usecase !== "code_analysis" ? (
                  <Tooltip title="Attempt Code Execution" arrow>
                    <button
                      onClick={handleExecutedCode}
                      className="executeCode-button"
                    >
                      <ExecuteCode sx={{ height: "20px", width: "20px" }} />
                    </button>
                  </Tooltip>
                ) : ("")}
              </div>
            </div>
            <Typography
              sx={{ mb: 1.5 }}
              color="text.secondary"
              style={{
                marginTop: "10px",
                marginBottom: "15px",
                textAlign: "left",
              }}
            >
              {query.length > 90 ? query.slice(0, 90) + "..." : query}
            </Typography>
            <Typography
              sx={{ fontSize: 11 }}
              style={{ textAlign: "left" }}
              variant="body2"
            >
              {/*Sometimes a query may contain triple backticks, don't want that parsed*/}
              {response.includes("```") && usecase !== "code_analysis" ? (
                <>
                  {showOnlyCode ? (
                    codeResponse
                  ) : (
                    <div dangerouslySetInnerHTML={{ __html: modifiedFeedback }} />
                  )}
                </>
              ) : (
                <ReactMarkdown>{response}</ReactMarkdown>
              )}
            </Typography>
            <>
              {usecase !== "code_analysis" && codeStatus ? (
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  style={{ textAlign: "left", marginTop: "10px" }}
                >
                  <code>Code Status: {codeStatus}</code>
                </Typography>
              ) : ("")}
              {usecase !== "code_analysis" && codeOutput ? (
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  style={{ textAlign: "left" }}
                >
                  <code>Code Output: {codeOutput}</code>
                </Typography>
              ) : ("")}
            </>
          </>
        )}
      </CardContent>
    </Card>
  ); 
              };
export default CardElement;
