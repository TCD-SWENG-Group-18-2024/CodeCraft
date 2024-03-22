import React, { useState } from 'react';
import {Card, CardContent, CardActions, Typography, IconButton, Checkbox, Skeleton, TextField } from '@mui/material';
import app_logo from "../assets/codecraft.png";


const CardElement = ({usecase,query,response,isLoading})=>{
  const formattedUsecase = usecase.split('_').join(' ').toUpperCase();
  return (
    <Card variant="outlined" sx={{ width: '700px' }}>
        <CardContent>
            {isLoading ? (
                <>
                    <Skeleton variant="text" width={550} height={20} />
                    <Skeleton variant="text" width={700} height={20} />
                    <Skeleton variant="text" width={550} height={80} />
                </>
            ) : (
                <>
                    <Typography sx={{ fontSize: 14 }} style={{ fontFamily: "'Courier New', Courier, monospace", display: "flex", flexDirection: "row" }} color="text.secondary" gutterBottom>
                        <img src={app_logo} alt="App Logo" style={{ width: '15px', height: '15px', marginTop: "3px", marginRight: "3px" }} />
                        <div>{formattedUsecase}</div>
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} style={{ marginBottom: "30px", textAlign: "left" }} color="text.secondary">
                        {query}
                    </Typography>
                    {usecase === "code_translation" || usecase === "code_completion" ? (
                    <Typography sx={{ fontSize: 11 }} style={{ textAlign: "left" }} variant="body2">
                      <pre className="code-block">{response}</pre>
                      <br />
                    </Typography>
                  ) : (
                    <Typography sx={{ fontSize: 11 }} style={{ textAlign: "left" }} variant="body2">
                      <div dangerouslySetInnerHTML={{ __html: response }} />
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