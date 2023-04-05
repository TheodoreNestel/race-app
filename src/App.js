import MainPage from "./components/pages/MainPage";
import MapPage from "./components/pages/MapPage";
import MobilePage from "./components/pages/MobilePage";

import dummyData from "./data/dummyData.json"
import anime from "animejs";

import { useState  , useEffect} from "react";

function App() {

  //login / signup calls will be done here and the page changing will also happen here based on the calls returned values

   //this piece of state will contain the data we get back when a user is authenticated and their data is returned
   const [requestData , setRequestData] = useState(dummyData.Data)//**PLACEHOLDER DATA this will come from login */
   //we will drill the setter into our login form as it will log us in and return the data 
   //and we will drill the data into map page so it can populate the page with the user's data



   const isMobile = window.innerWidth <= 768; //if the user is on mobile.


  const [page, setPage] = useState("mainPage");
  //we always start with this


  //thsi state is used to check if our animation is playing or not
  const [hasBlured, setHasBlured] = useState(false);


  //////////////////////////////////////////////////////////////////

  //animation that will play when we exit the main page 
  

  function blurPage(){
    console.log("animation tried to run" , (hasBlured))
    const timeline = anime.timeline({
      easing: "easeOutExpo",
      duration: 2000,
    });

    
    // Define the blur animation
    timeline.add({
      targets: ".blur-div",
      filter: ["blur(0px)", "blur(20px)"],
    });

    timeline.add({
      targets: ".blur-div",
      filter: ["blur(0px)"],
    });




  
      timeline.play();
      
    
    
  }
  

  //////////////////////////////////////////////////////////////////

  
  const pages = {
    mainPage: <MainPage setPage={setPage} setData={setRequestData} anim={blurPage}/>,
    mapPage: <MapPage userData={requestData} setPage={setPage}  anim={blurPage} onLoad={()=> console.log("meow")}/>
  }

  

  return (
    <>

    {
      <div className="App blur-div">
     {!isMobile ? pages[page] : <MobilePage/>}
      </div>
    }

    </>
  );
}

export default App;








// mainPage : <MainPage switchPage={setPage}/>,
// mapPage : <mapPage userData={requestData} switchPage={setPage} />