import React, { useState, useEffect , useRef , useMemo , useCallback } from 'react';
import { Map, GoogleApiWrapper , Marker , DirectionsRenderer , Polyline } from 'google-maps-react';
import AddRace from './AddRace';

//google api key : AIzaSyAwemI1ofx4QTEP02XsnbnovxyBAI_Rrks
function MapContainer(props) {

const [center, setCenter] = useState(null);


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

//array to store start and finish for the purpose of markers 
const [markerArr , setMarkerArr] = useState([])

//we will store all the google route data here so we can render them on the map 
const [raceRoute , setRaceRoute] = useState([])

//to tag our polyline so we can change its color dynamically
const polylineRefs = useRef([])


//get the user's current location //might need a useLayoutEffect instead **JUN 
useEffect(() => {
    const userLoc = 'userLocation';
  
    if (!localStorage.getItem(userLoc)) {
      const successCallback = (position) => {
        setCenter({ lat: position.coords.latitude, lng: position.coords.longitude });
        localStorage.setItem(userLoc, JSON.stringify({ lat: position.coords.latitude, lng: position.coords.longitude }));
      };
    
      const errorCallback = (error) => {
        console.log('Error getting user location:', error);
      };
    
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
      }
    } else {
      setCenter(JSON.parse(localStorage.getItem(userLoc)));
    }
  }, []);
  


  //machine assited styles (with my own twist on values) i put it in a memo so it doesnt run it each time 
  const darkTheme = useMemo(()=>([  {    featureType: 'all',    elementType: 'labels.text.fill',    stylers: [      {        saturation: 36,      },      {        color: '#ffffff',      },      {        lightness: 40,      },    ],
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
]),[])  
  




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
            setMarkerArr([...markerArr , {
                lat : event.latLng.lat(),
                lng : event.latLng.lng()
            }])
            coordCounter.current ++
            
            return
        }
        //sets the finish coords 
        if(coordCounter.current === 1){
           
            setFinish({
                lat : event.latLng.lat(),
                lng : event.latLng.lng()
            })
            setMarkerArr([...markerArr , {
                lat : event.latLng.lat(),
                lng : event.latLng.lng()
            }])
            coordCounter.current ++
          
           
        }

        //Added logic to have like a dropper when clicking ? 
       

    
  }


  // { sample of what we need to send the backend

    //             status : "win / lose perhaps in the form of true or false",
    //             topspeed: "top speed achieved during the race (Optional)",
    //             start : "starting coords whatever format google map api needs",
    //             finish : "ending coords whatever format google map api needs",
    //             racer : {
    //                 carMake : "opponent car make",
    //                 carModel : "opponent car model",
    //                 hp : "opponent car hp",
    //                 racerPfp : "default img selected for unknown racers"
    //             },
    //             knownRacer : "blank if unregister racer otherwise : data in the same format as userInfo"
    //         }




    //**********THIS WILL NEED TO BE CHANGED 
    //I didnt understand how google maps worked before I made 90% of the app but this is mega not efficient. in the future this 
    //data being pulled from google I will save to the back end to avoid having ten million pull requests.
    //&&Actually it seems google has done it on purpose so that you have to use the api more which is locked out unless
    //you use the paid version 
    async function renderRaces() {
  const DirectionsService = new props.google.maps.DirectionsService();

  const snapToRoad = async (lat, lng) => {
    const response = await fetch(`https://roads.googleapis.com/v1/snapToRoads?path=${lat},${lng}&interpolate=true&key=AIzaSyAwemI1ofx4QTEP02XsnbnovxyBAI_Rrks`);
    const data = await response.json();
    return data.snappedPoints[0].location;
  }

  const routeArr = await Promise.all(props.races.map(async (race) => {
    const startLatLng = { lat: race.start.lat, lng: race.start.lng };
    const finishLatLng = { lat: race.finish.lat, lng: race.finish.lng };

    const start = await snapToRoad(race.start.lat, race.start.lng);
    const finish = await snapToRoad(race.finish.lat, race.finish.lng);

    return new Promise((resolve, reject) => {
      DirectionsService.route(
        {
          origin: startLatLng,
          destination: finishLatLng,
          travelMode: props.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === props.google.maps.DirectionsStatus.OK) {
            result.race = race;
            resolve(result);
          } else {
            reject(`Error fetching directions: ${status}`);
          }
        }
      );
    });
  }));

  setRaceRoute(routeArr);
}



    //useEffect to create direction we can use to render a user's races 
    useEffect(() => {
       
        renderRaces();
        
        
      }, [props.races]);

    

    // useEffect(()=>{
    //     renderRaces();
    // },[props.focusId])


    const resetCoords = useCallback(() => {
        coordCounter.current = 0;
        setStart({ lat: 0, lng: 0 });
        setFinish({ lat: 0, lng: 0 });
        setMarkerArr([]);
      }, [setStart, setFinish, setMarkerArr]);



  


  //Find a way to create several routes based on the user's races object 
  

  

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
        focus={props.setFocus}
        


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
      
    >
        {
            markerArr.map((marker , index)=>{
                return(<Marker key={index} position={marker} />)
            })
        }

{
    raceRoute.map((route, index) => {
       
      return (
        <Polyline
        key={route.race._id}
        path={route.routes[0].overview_path}
        options={{
          strokeColor: (() => {
           
          switch (true) {
              case route.race.status === true:
                return "#0AD3FF";
              case route.race.status === false:
                return "#ee1b8c";
              default:
                return "white";
            }}
          )(),
          strokeOpacity: 0.8,
          strokeWeight: 5
        }}
        onClick={()=> props.setFocus(route.race)}
      />
      )
    })
  }
    </Map>
    </>
  );
}

//a wrapper to help us fetch the map asynchonosly and not cause weird rendering 
export default GoogleApiWrapper({
  apiKey: 'AIzaSyAwemI1ofx4QTEP02XsnbnovxyBAI_Rrks',
  
})(MapContainer);


