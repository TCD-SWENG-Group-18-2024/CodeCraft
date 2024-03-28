import React from 'react';
import { Card, CardContent, CardActions, Typography, IconButton, Checkbox, Skeleton, TextField } from '@mui/material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {nord as syntax} from 'react-syntax-highlighter/dist/esm/styles/prism'
import app_logo from "../assets/codecraft.png";
import { renderToString } from 'react-dom/server';

const CardElement = ({usecase,query,response,isLoading})=>{
  
  const highlightCodeBlock = (code) => (
    <SyntaxHighlighter language="jsx" style={syntax} >
        {code}
    </SyntaxHighlighter>
);
  const tempResponse = `<code>${response}</code>`
  const modifiedFeedback = tempResponse.replace(/```([\s\S]*?)```/g, (match, code) => {
        return `<pre class="code-block"><code>${renderToString( highlightCodeBlock(code))}</code></pre>`;
    });
  const formattedUsecase = usecase.split('_').join(' ').toUpperCase();
  return (
    <Card variant="outlined" sx={{ width: '700px' }}>
        <CardContent>
            {isLoading ? (
                <>
                    <Skeleton variant="text" width={550} height={20} />
                    <Skeleton variant="text" width={550} height={20} />
                    <Skeleton variant="text" width={550} height={80} />
                </>
            ) : (
                <>
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
