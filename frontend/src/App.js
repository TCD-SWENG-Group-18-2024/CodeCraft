import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import "./App.css";
import AboutPage from './pages/AboutPage';
import Features from './pages/Features';
import Home from "./pages/Home";
import LoginSignUp from './pages/LoginSignUp';
import SubmissionPage from './pages/SubmissionPage';
import TeamPage from './pages/TeamPage';
import Account from './pages/Account';
// move the logo to the indivdual pages
// import IBM from "./assets/IBM.PNG"
// import IBM_White from "./assets/IBM_white.PNG"

function App(){
  // Not useful at the moment,for fetching data from the endpoint(backend)
  const [data,setData] = useState([{}])
  useEffect(() =>{
    fetch("/...").then(
      //res.json() parses the response body as JSON. The resulting 
      //promise resolves to the JavaScript object described by the JSON string.
      res=>res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  },[])

  return(
    <div className='App'>
      
      <Router>
        <Routes>
          {/*landing page, default route path*/}
          <Route path ="/" exact element ={<Home/>}/>
          <Route path = "/features" exact element = {<Features/>}/>
          <Route path ="/SubmissionPage" exact element = {<SubmissionPage/>}/>
          <Route path ="/LoginSignUp" exact element = {<LoginSignUp/>}/>
          <Route path="/about" element={<AboutPage />} />

          <Route path="/team" element={<TeamPage />} />
          <Route path="/Account" element={<Account />}/>
        </Routes>
      </Router>
      
      
      
  
    </div>
    
  )
}
export default App;