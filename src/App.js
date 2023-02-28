import MainPage from "./components/pages/MainPage";
import MapPage from "./components/pages/MapPage";

import dummyData from "./data/dummyData.json"

import { useState } from "react";

function App() {

  //login / signup calls will be done here and the page changing will also happen here based on the calls returned values

   //this piece of state will contain the data we get back when a user is authenticated and their data is returned
   const [requestData , setRequestData] = useState(dummyData.Data)//**PLACEHOLDER DATA this will come from login */
   //we will drill the setter into our login form as it will log us in and return the data 
   //and we will drill the data into map page so it can populate the page with the user's data


  //TODO here
  //add the page switch logic 
  const [page, setPage] = useState("mainPage");
  //we always start with this
  
  const pages = {
    mainPage: <MainPage setPage={setPage} setData={setRequestData}/>,
    mapPage: <MapPage userData={requestData} setPage={setPage} />
  }

  

  return (
    <div className="App">
     {pages[page]}
    </div>
  );
}

export default App;








// mainPage : <MainPage switchPage={setPage}/>,
// mapPage : <mapPage userData={requestData} switchPage={setPage} />