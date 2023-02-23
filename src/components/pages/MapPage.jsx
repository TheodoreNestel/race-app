


//This is the map page that will have all of the google maps logic as well as our back end calls for data

//this page will need to :
    //get state from App's userState if an authentication went through that state should contain all the necessary data to populate this page (returned from our backend the calls will be made in Login and the data will be passed up to app)
    //- User account info 
        //username 
        //Profile-picture 
        //user car info (hp , make , model)
        //All race data 
            //start and finish location of race 
            //top speed 
            //other racer (only one other racer for version1.0)
                //name (potential for @ing other Race-app users *tentative*)
                //car (make model , hp (if known)) **optional
            //race outcome (win or loss)
            //option to delete a race would go here as well 
            //when a race is clicked on the map it should expand on it in the card 
    //This page will also need to let the user add new races (pending on api and how I can feed it data)***

    //This Page will funcion differently on mobile so add an element that hide or reveal the entire card based on state
    //we can use anime js to hide and reveal this component based on a click 



    //OBJECT STRUCTURE 
        //Data returned from the backend (request object data pending knowledge on authentication)
        // {
        //     userInfo : {
        //         username : "User's username",
        //         carMake : "user's car make ie: Honda",
        //         carModel : "User's car model ie : Type R",
        //         hp : "user's car horsepower ie : 305",
        //         userPfp : "user's pfp in whatever format that is"
        //     },
        //     userRaces : [
        //         {
        //             status : "win / lose perhaps in the form of true or false",
        //             topspeed: "top speed achieved during the race (Optional)",
        //             start : "starting coords whatever format google map api needs",
        //             finish : "ending coords whatever format google map api needs",
        //              carMake : "user's car make ie: Honda",
        //              carModel : "User's car model ie : Type R",
        //              hp : "user's car horsepower ie : 305",
        //             racer : {
        //                 carMake : "opponent car make",
        //                 carModel : "opponent car model",
        //                 hp : "opponent car hp",
        //                 racerPfp : "default img selected for unknown racers"
        //             },
        //             knownRacer : "blank if unregister racer otherwise : data in the same format as userInfo"
        //         },
        //         {
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
        //         },
        //         {
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

        //     ]
        // }




        //TODO still 
        //add a notification  component (for later expansion)
        //add create the edit info / show my info component 

    import SummarizedRace from "../components/SummarizedRace"
    import UserInfo from "../components/UserInfo"
    import dummyData from "../../data/dummyData.json"
    import { useState , useRef } from "react"

    export default function MapPage(props){

        //missing links (small items I need to solve for)
            //when adding a race a way to get the current date in m/d/y 
            //when adding a race a way to get the distance traveled (using google most likely)
            //if no racer is filled when adding a race add placeholders

       
       

        //we will store the current focused on race in state and use it fill out all the stuff 
        const [focusedRace , setFocusedRace] = useState(dummyData.Data.userRaces[0])


        //to open the edit card option 
        const [editUser , setEditUser] = useState(false)

        //state to keep track of user's profile changes without needing a new call to the backend
        const [userData , setUserData] = useState(dummyData.Data.userInfo)

        console.log(userData)





        //this function is called when the user wants to see their profile
        function serveProfile(e){

        }




       

        



        return(

        <div className="map-page">

                {
                    editUser ?  <UserInfo data={dummyData} close={setEditUser}  setNewData={setUserData}/> : ""
                }
               

                {/* this is the div that will be the main card */}
                <div className="map-page__data-card">


                        {/* The part of the data card that has the expanded race info */}
                        <div className="map-page__data-card__race-summary">
                                {/* the main title with the user icon and the icon highlight based on win or loss */}
                                <div className="map-page__data-card__race-summary__result-head">

                                    {/*Needs a toggle class based on win or loss*/}
                                    <img
                                    className="map-page__data-card__race-summary__result-head__user-icon"
                                    src={userData.userPfp}
                                    style={{ borderColor: focusedRace.status ? "rgb(7, 255, 7)" : "red" }}
                                    />
                                    {/*This div contains the result title and the underline*/}
                                    <div className="map-page__data-card__race-summary__result-head__result-title-zone">
                                            <h2 className="map-page__data-card__race-summary__result-head__result-title-zone__title">
                                                Result
                                            </h2>
                                            <div className="map-page__data-card__race-summary__result-head__result-title-zone__underline"></div>
                                    </div>

                                    {/*Needs a toggle class based on win or loss*/}
                                    <img
                                    className="map-page__data-card__race-summary__result-head__racer-icon"
                                    src={focusedRace.racer.racerPfp}
                                    style={{ borderColor: !focusedRace.status ? "rgb(7, 255, 7)" : "red" }}
                                    />

                                </div>

                                {/*This div contains the info on the user's car and the racer's*/}
                                {/*This div breaks down all the data into three other divs for styling*/}
                                <div className="map-page__data-card__race-summary__racer-data">

                                    {/*Div for car data*/}
                                    <div className="map-page__data-card__race-summary__racer-data__cars">

                                        <h4 className="map-page__data-card__race-summary__racer-data__cars__user-car">
                                            {focusedRace.carModel}
                                        </h4>
                                        <h3 className="map-page__data-card__race-summary__racer-data__cars__title">
                                            Cars
                                        </h3>
                                        <h4 className="map-page__data-card__race-summary__racer-data__cars__racer-car">
                                            {focusedRace.racer.carModel}
                                        </h4>

                                    </div>
                                    {/*Div for Hp data*/}
                                    <div className="map-page__data-card__race-summary__racer-data__hp">

                                        <h4 className="map-page__data-card__race-summary__racer-data__hp__user-hp">
                                            {focusedRace.hp}
                                        </h4>
                                        <h3 className="map-page__data-card__race-summary__racer-data__hp__title">
                                            HP
                                        </h3>
                                        <h4 className="map-page__data-card__race-summary__racer-data__hp__racer-hp">
                                        {focusedRace.racer.hp}
                                        </h4>
                                    </div>

                                    {/*Div for race summary data*/}
                                    <div className="map-page__data-card__race-summary__racer-data__race-summary">

                                        <h5 className="map-page__data-card__race-summary__racer-data__race-summary__date">
                                            {focusedRace.date}
                                        </h5>

                                        <h3 className="map-page__data-card__race-summary__racer-data__race-summary__speed">
                                            Top speed: {focusedRace.topspeed ? focusedRace.topspeed : "..."}mph
                                        </h3>

                                        <h3 className="map-page__data-card__race-summary__racer-data__race-summary__distance">
                                            Distance: {focusedRace.distance} miles
                                        </h3>

                                    </div>
                                            

                                </div>
                                

                        </div>



                         {/*This div contains the shortned most recent races*/}
                         <div className="map-page__data-card__most-recent-races">
                                        {
                                            dummyData.Data.userRaces.map((race)=>{
                                                if(race === focusedRace){
                                                    return( <SummarizedRace
                                                    race={race}
                                                    user={userData.userPfp}
                                                    setRace={setFocusedRace}
                                                    style={{ border: "1px solid #ffffff" }}
                                                    />)

                                                }
                                               return(
                                                <SummarizedRace
                                                    race={race}
                                                    user={userData.userPfp}
                                                    setRace={setFocusedRace}
                                                 />
                                               )
                                            })
                                        }
                                </div>



                        {/* Nav HTML */}
                        <div className="map-page__data-card__UI-box">

                            <a className="map-page__data-card__UI-box__notifications">
                                <img
                                className="map-page__data-card__UI-box__notifications__icon-img"
                                src="/assets/lock.png"
                                />
                            </a>

                            <a
                            className="map-page__data-card__UI-box__profile-icon"
                            onClick={()=> setEditUser(true)}
                            >
                                <img
                                className="map-page__data-card__UI-box__profile-icon__pfp-img"
                                src={userData.userPfp}
                                />
                            </a>

                            <a className="map-page__data-card__UI-box__logout-button">
                                <h3 className="map-page__data-card__UI-box__logout-button__logout-text">Logout</h3>
                            </a>

                        </div>


                </div>


                {/*Need to begin using the google maps api before I can code this one*/}
                <div className="map-page__add-race-card">

                </div>
                

                {/*Place holder img for now */}
                <div className="map-page-google-map-container">
                    <img
                    className="map-page-google-map-container-mapImg"
                    src="#"
                    />
                </div>


        </div>
        )



    }





    //TODO 
        //Thursday 2/16/22
            //-create the data object structure DONE
            //-create summarisedRace component DONE
            //-populate all fields with dummy data for styling DONE

        //Friday 2/17/22
            //-Style the available parts of this page 
            //-Media-Queries / optimize site for mobile / other screen sizes 
        

        //Monday 2/20/22
            //begin research on Node Express for the backend 
            //(Tentative) Setup Node Express backend 




    //TODO backend 
        ////-create the user's profile page / the ability to create a new data object with new userData
            //this will be its own component but Id like to do this after I know how I can add photos and such




            //idea for loading up the correct race when clicking on stuff 
            //have the race component take in a state setter from this component with an onclick set on it to 
            //set state of the summary to itelsef 
