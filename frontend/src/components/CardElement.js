import React ,{ useState}from 'react';
import { Card, CardContent, CardActions, Typography, IconButton, Checkbox, Skeleton, TextField } from '@mui/material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {nord as syntax} from 'react-syntax-highlighter/dist/esm/styles/prism'
import app_logo from "../assets/codecraft.png";
import Export from "../assets/export.png";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { renderToString } from 'react-dom/server';
import "../styles/CardElement.css";

const CardElement = ({usecase,query,response,isLoading})=>{
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
    navigator.clipboard.writeText(response)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
      })
      .catch((error) => {
        console.error('Failed to copy:', error);
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
      plaintext: ".txt"
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
    const lines = string.trim().split('\n');
    let language = 'jsx';
    const firstLine = lines[0].trim();
    const languageRegex = /^(python|java|c|c\+\+|c\#|assembly|javascript|jsx|html|css|ruby|php|kotlin|r|perl|json|plaintext)\b/i;
    // If the first line matches, extract the language and remove it from the code
    if (languageRegex.test(firstLine)) {
      language = firstLine.match(languageRegex)[0].toLowerCase();
      lines.shift();
    }
    const code = lines.join('\n');
    return (
      <SyntaxHighlighter language={language} style={syntax} >
          {code}
      </SyntaxHighlighter>
    );
  };
  const tempResponse = `<code>${response}</code>`
  const modifiedFeedback = tempResponse.replace(/```([\s\S]*?)```/g, (match, code) => {
        return `<pre class="code-block"><code>${renderToString( highlightCodeBlock(code))}</code></pre>`;
    });
  const formattedUsecase = usecase.split('_').join(' ').toUpperCase();
  return (
    <Card variant="outlined" sx={{ width: '700px', marginBottom: '25px' }}>
        <CardContent>
            {isLoading ? (
                <>
                    <Skeleton variant="text" width={550} height={20} />
                    <Skeleton variant="text" width={550} height={20} />
                    <Skeleton variant="text" width={550} height={80} />
                </>
            ) : (
                <>
                    <div className='buttons-container'>
                        <button
                          className="copy-button"
                          onClick={() => {
                            copyToClipboard(response);
                          }}
                        >
                          <ContentCopyIcon sx={{height: "20px", width: "20px"}}/>
                        </button>
                        <button
                            className="export-button"
                            onClick={() => {
                              handleExportClick(response);
                            }}
                            >
                            <img src={Export} alt="Export Icon" className="export-img" />
                        </button>
                    </div>
                    <Typography sx={{ fontSize: 14 }} style={{ fontFamily: "'Courier New', Courier, monospace", display: "flex", flexDirection: "row" }} color="text.secondary" gutterBottom>
                        <img src={app_logo} alt="App Logo" style={{ width: '15px', height: '15px', marginTop: "3px", marginRight: "3px" }} />
                        <div>{formattedUsecase? formattedUsecase : 'Code Analysis'}</div>
                    </Typography>
                    <Typography
                      sx={{ mb: 1.5 }}
                      style={{ marginTop: "20px", marginBottom: "40px", textAlign: "left" }}
                      color="text.secondary"
                    >
                      {query.length > 90 ? query.slice(0, 90) + "..." : query}
                    </Typography>
                    {response.includes('```') && response.split('```').length >= 1 ? (
                      <Typography sx={{ fontSize: 11 }} style={{ textAlign: "left" }} variant="body2">
                        <div dangerouslySetInnerHTML={{ __html: modifiedFeedback }} />
                        <br />
                      </Typography>
                    ) : (
                      <Typography sx={{ fontSize: 11 }} style={{ textAlign: "left" }} variant="body2">
                        
                        <pre className="code-block">{highlightCodeBlock(response)}</pre>
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
