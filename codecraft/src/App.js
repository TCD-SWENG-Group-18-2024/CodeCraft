import React,{useState,useEffect}from 'react'
import "./App.css"
import Home from "./pages/Home"
import SubmissionPage from './pages/SubmissionPage';
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom';

import IBM from "./assets/IBM.PNG"

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
      <img src={IBM} alt="logo" className="logo" />
      
      <Router>
        <Routes>
          {/*landing page, default route path*/}
          <Route path ="/" exact element ={<Home/>}/>
          <Route path ="/SubmissionPage" exact element = {<SubmissionPage/>}/>
        </Routes>
      </Router>
      
      
      
      
  
    </div>
    
  )
}
export default App;
