import React, { useState, useEffect , useRef } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import AddRace from './AddRace';

//google api key : AIzaSyAwemI1ofx4QTEP02XsnbnovxyBAI_Rrks
function MapContainer(props) {

  const [center, setCenter] = useState({ lat: 0, lng: 0 });


  //state for controlled inputs in the child component 
const [raceStatus , setRaceStatus] = useState(false) //loss by default
const [racerMake , setRacerMake] = useState("Unknown") //the racer's care make
const [racerModel , setRacerModel] = useState("Unknown") //the racer's model
const [racerHp , setRacerHp] = useState("Unknown") //the racer's hp
const [topSpeed , setTopSpeed] = useState("Unknown") //top speed


//bool for turning on Add race mode 
const [addingRace , setAddingRace] = useState(false)
// a ref that keeps track of how many coord pair we have gotten so far 
const coordCounter = useRef(0)

//the coordinates 
const [start , setStart] = useState({
    lat : 0 ,
    lng : 0
})
const [finish , setFinish] = useState({
    lat : 0 ,
    lng : 0
})




  //machine assited styles (with my own twist on values)
  const darkTheme = [  {    featureType: 'all',    elementType: 'labels.text.fill',    stylers: [      {        saturation: 36,      },      {        color: '#ffffff',      },      {        lightness: 40,      },    ],
  },
  {
    featureType: 'all',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        visibility: 'on',
      },
      {
        color: '#000000',
      },
      {
        lightness: 16,
      },
    ],
  },
  {
    featureType: 'all',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'administrative',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#000000',
      },
      {
        lightness: 20,
      },
    ],
  },
  {
    featureType: 'administrative',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#000000',
      },
      {
        lightness: 17,
      },
      {
        weight: 1.2,
      },
    ],
  },
  {
    featureType: 'landscape',
    elementType: 'geometry',
    stylers: [
      {
        color: '#000000',
      },
      {
        lightness: 20,
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [
      {
        color: '#000000',
      },
      {
        lightness: 21,
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#000000',
      },
      {
        lightness: 17,
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#000000',
      },
      {
        lightness: 29,
      },
      {
        weight: 0.2,
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [
      {
        color: '#000000',
      },
      {
        lightness: 18,
      },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#000000',
      },
      {
        lightness: 16,
      },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#000000',
      },
      {
        lightness: 16,
      },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [
      {
        color: '#000000',
      },
      {
        lightness: 19,
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#1c1c1c',
      },
      {
        lightness: 17,
      },
    ],
  },
];


  //get the user's current location //might need a useLayoutEffect instead **JUN 
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCenter({ lat: position.coords.latitude, lng: position.coords.longitude });
      },
      () => {
        console.log('Error getting user location');
      }
    );
  }, []);

  const containerStyle = {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    zIndex: 0
  };
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //function that can grab to sets of coords after an inital value is selected 

  function handleRaceCoords(event){

    //not the fanciest logic but we are just using a ref to keep track of how many sets we have and we go from there 


        //sets the starting coords 
        if(coordCounter.current === 0){
            setStart({
                lat : event.latLng.lat(),
                lng : event.latLng.lng()
            })
            coordCounter.current ++
            return
        }
        //sets the finish coords 
        if(coordCounter.current === 1){
            console.log(event.latLng.lat() , event.latLng.lng(), coordCounter.current , "current vals")
            setFinish({
                lat : event.latLng.lat(),
                lng : event.latLng.lng()
            })
            coordCounter.current = 0
            console.log("both pairs of coords aquired")
            
        }
        


        
    
  }

  function resetCoords(){
        coordCounter.current = 0 
        setStart({
            lat : 0,
            lng : 0,
        })
        setFinish({
            lat : 0,
            lng : 0,
        })
        
  }
  

  

  //Missing logic. We also need to be able to add a race from here Im thinking creating the add race component and loading it here maybe ? a
  //and if not have it hold the coords setter function so we can pass up the coords gotten from the map here 

  return (
    <>

    {
        addingRace ? 
    <AddRace

        setRaceStatus={setRaceStatus}
        raceStatus={raceStatus}
        setRacerMake={setRacerMake}
        racerMake={racerMake}
        setRacerModel={setRacerModel}
        racerModel={racerModel}
        setRacerHp={setRacerHp}
        racerHp={racerHp}
        setTopSpeed={setTopSpeed}
        topSpeed={topSpeed}
        start={start}
        finish={finish}
        addRace={props.addRace}
        races={props.races}
        username={props.username}
        userInfo={props.userInfo}
        close={setAddingRace}
        reset={resetCoords}


    />
    : 
    <img 
    className='plus-button-add-race'
    src='/assets/plus.png'
    onClick={() => setAddingRace(!addingRace)}
    />

    }
    <Map
      google={props.google}
      zoom={14}
      containerStyle={containerStyle}
      center={center}
      styles={darkTheme}
      className="map-page-google-map-container__map"
      onClick={(google , styles , event) => {
        addingRace ? handleRaceCoords(event) : console.log("not currently adding a race")
      }}
      
    />
    </>
  );
}

//a wrapper to help us fetch the map asynchonosly and not cause weird rendering 
export default GoogleApiWrapper({
  apiKey: 'AIzaSyAwemI1ofx4QTEP02XsnbnovxyBAI_Rrks',
})(MapContainer);


