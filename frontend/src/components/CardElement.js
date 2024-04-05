import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Checkbox,
  Skeleton,
  TextField,
} from "@mui/material";
import { toast } from "react-hot-toast";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nord as syntax } from "react-syntax-highlighter/dist/esm/styles/prism";
import app_logo from "../assets/codecraft.png";
import Export from "../assets/export.png";
import CopyCode from "@mui/icons-material/ContentCopy";
import ExecuteCode from "@mui/icons-material/PlayCircleFilled";
import { renderToString } from "react-dom/server";
import ReactMarkdown from 'react-markdown';
import "../styles/CardElement.css";

const CardElement = ({ usecase, query, response, isLoading }) => {
  const [copied, setCopied] = useState(false);
  const [customFileName, setCustomFileName] = useState("");

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
        if (!copied) toast.success("Code Copied to Clipboard!");
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

      const status = await fetch("http://localhost:8080/execute", {
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
            <div className="buttons-container">
              <button
                className="copy-button"
                onClick={() => {
                  copyToClipboard(response);
                }}
              >
                <CopyCode sx={{ height: "20px", width: "20px" }} />
              </button>
              <button
                className="export-button"
                onClick={() => {
                  handleExportClick(response);
                }}
              >
                <img src={Export} alt="Export Icon" className="export-img" />
              </button>
              <button
                onClick={() => {
                  handleExecutedCode();
                }}
                className="executeCode-button"
              >
                <ExecuteCode
                  sx={{ height: "20px", width: "20px" }}
                ></ExecuteCode>
              </button>
            </div>
            <Typography
              sx={{ fontSize: 14 }}
              style={{
                fontFamily: "'Courier New', Courier, monospace",
                display: "flex",
                flexDirection: "row",
              }}
              color="text.secondary"
              gutterBottom
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
            <Typography
              sx={{ mb: 1.5 }}
              style={{
                marginTop: "20px",
                marginBottom: "20px",
                textAlign: "left",
              }}
              color="text.secondary"
            >
              {query.length > 90 ? query.slice(0, 90) + "..." : query}
            </Typography>
            {response.includes("```") && response.split("```").length >= 1 ? (
              <Typography
                sx={{ fontSize: 11 }}
                style={{ textAlign: "left" }}
                variant="body2"
              >
                <div dangerouslySetInnerHTML={{ __html: modifiedFeedback }} />
                <br />
              </Typography>
            ) : (
              <Typography
                sx={{ fontSize: 11 }}
                style={{ textAlign: "left" }}
                variant="body2"
              >
                {usecase !== "code_analysis" ? (
                    <pre className="code-block">{highlightCodeBlock(response)}</pre>
                  ) : (
                    <ReactMarkdown>{response}</ReactMarkdown>
                  )
                }
                <br />
              </Typography>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};
export default CardElement;
