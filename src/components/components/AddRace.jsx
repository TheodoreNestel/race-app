import { useState } from "react"
import { toast , ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
export default function AddRace(props){


//controls what div is displayed currently
const [whatDiv , setWhatDiv] =useState(false)
//false is the coords true the rest 






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

//this function will assemble the race into one object so it can be sent to the backend for storage 
async function addRace(payload){
    try{
        //try to make a post request to our backend
        const res = await axios.post('https://race-app-backend.onrender.com/races' , payload)

        //also we want to add the new race if we have a success to our mapPage so it can have the new data wihout needing to make a request
        let raceArr = [...props.races]
        raceArr.push(payload.race)
        props.addRace(raceArr)
        //console.log(raceArr , props.races , 'whats going on here')
        props.focus(payload.race)

        //if its successful close the component
        props.close(false);
    }
    catch(err){
        //lets the user know if something went wrong
        toast.error(err.response.data.message)
    }
}
function raceAssembler(){

    
    const race = {

            race :{status: props.raceStatus,
        topspeed: props.topSpeed,
        start: props.start,
        finish: props.finish,
         carMake : props.userInfo.carMake,
         carModel : props.userInfo.carModel,
         hp : props.userInfo.hp,
        racer: {
          carMake: props.racerMake,
          carModel: props.racerModel,
          hp: props.racerHp,
          racerPfp: '/assets/user.png'
        },
        knownRacer: "Unknown Racer"
    },
        username : props.username
      };


    //Then here he we would use the setter passed down from mapPage -> googleMap -> here to push the race to the array using prevstate I imagine

    //then an asyn function would be called here to add the one new race 
    addRace(race)

    //add to local none being to backend state 

    props.reset()

    

}

// {` Lat : ${props.start.lat} Lng : ${props.start.lng}`}

//function to update our controlled inputs



function truncate(input) {
    let input2 = input.toString()
    if (input2.length > 8) {
       return input2.substring(0, 8) + '...';
    }
    return input2;
 };


 //basic setter function to change state on change for controlled inputs
function handleChange( setter , value){
    setter(value)
}





    return(
        <div className="map-page-google-map-container__Add-race-container">

            <img
            className="map-page-google-map-container__Add-race-container__xout"
            src="/assets/plus.png"
            onClick={()=>props.close(false)}
             />
            <ToastContainer />

          {      

          !whatDiv ? 

            <div className="map-page-google-map-container__Add-race-container__coord-div">

                    <h2 className="map-page-google-map-container__Add-race-container__coord-div__title">
                        Click on the race's starting point then on the finish point
                    </h2>

                    <h4 className="map-page-google-map-container__Add-race-container__coord-div__coord1">
                        Start : {` Lat : ${truncate(props.start.lat)} Lng : ${truncate(props.start.lng)}`}
                    </h4>

                    <h4  className="map-page-google-map-container__Add-race-container__coord-div__coord2">
                        Finish : {` Lat : ${truncate(props.finish.lat)} Lng : ${truncate(props.finish.lng)}`}
                    </h4>

                    <button
                    className="map-page-google-map-container__Add-race-container__coord-div__btn"
                    onClick={()=> setWhatDiv(!whatDiv)}
                    >
                        Next
                    </button>
                    <button className="map-page-google-map-container__Add-race-container__coord-div__btn2"
                    onClick={()=> props.reset()}
                    >
                        Reset
                    </button>
            </div>
                :
            <div className="map-page-google-map-container__Add-race-container__racer-info-div">

                <h2 className="map-page-google-map-container__Add-race-container__racer-info-div__title">
                    Racer's info. Leave blank if unknown
                </h2>
            <div className="map-page-google-map-container__Add-race-container__racer-info-div__winlose">
                <input 
                className="map-page-google-map-container__Add-race-container__racer-info-div__winlose__input"
                type="checkbox"
                id="raceStatus"
                name="raceStatus"
                value={true}
                onChange={(e)=> handleChange(props.setRaceStatus, e.target.checked)}
                />
                <label for="raceStatus" className="map-page-google-map-container__Add-race-container__racer-info-div__winlose__label">Win?</label>
            </div>

                <input
                className="map-page-google-map-container__Add-race-container__racer-info-div__carMake-input" 
                type="text"
                id="racerCarMake"
                name="racerCarMake"
                placeholder="Racer's Car Make"
                onChange={(e)=> handleChange(props.setRacerMake, e.target.value)}
                />
                <input
                 className="map-page-google-map-container__Add-race-container__racer-info-div__carModel-input" 
                type="text"
                id="racerCarModel"
                name="racerCarModel"
                placeholder="Racer's Car Model"
                onChange={(e)=> handleChange(props.setRacerModel, e.target.value)}
                />
                <input 
                 className="map-page-google-map-container__Add-race-container__racer-info-div__carHp-input" 
                type="text"
                id="racerCarHp"
                name="racerCarHp"
                placeholder="Racer's Car Hp"
                onChange={(e)=> handleChange(props.setRacerHp, e.target.value)}
                />
                <input 
                className="map-page-google-map-container__Add-race-container__racer-info-div__speed-input" 
                type="text"
                id="speed"
                name="speed"
                placeholder="Top Speed Achieved"
                onChange={(e)=> handleChange(props.setTopSpeed, e.target.value)}
                />
                <button
                className="map-page-google-map-container__Add-race-container__racer-info-div__btn"
                onClick={()=> {raceAssembler(); }}
                >
                    Add Race
                </button>
                <img 
                className="map-page-google-map-container__Add-race-container__racer-info-div__back"
                src="/assets/x.png"
                onClick={()=> setWhatDiv(!whatDiv)}
                />
            </div >
        }


        </div>
    )
}