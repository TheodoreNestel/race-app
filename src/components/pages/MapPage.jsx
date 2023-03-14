


    //OBJECT STRUCTURE 
        //Data returned from the backend (request object data pending knowledge on authentication)
        // {
        //     userInfo : {
        //         username : "User's username",
        //         carMake : "user's car make ie: Honda",
        //         carModel : "User's car model ie : Type R",
        //         hp : "user's car horsepower ie : 305",
        //         userPfp : "/assets/user.png"
        //     },
        //     userRaces : [
        //         {
        //             status : "win / lose perhaps in the form of true or false",
        //             topspeed: "top speed achieved during the race (Optional)",
        //              start : {lat : 0.222 , lng : 1,00},
        //              finish : {lat : 0.222 , lng : 1,00},
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
        //             start : {lat : 0.222 , lng : 1,00},
        //             finish : {lat : 0.222 , lng : 1,00},
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
        //             start : {lat : 0.222 , lng : 1,00},
        //             finish : {lat : 0.222 , lng : 1,00},
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



    import SummarizedRace from "../components/SummarizedRace"
    import UserInfo from "../components/UserInfo"
    import dummyData from "../../data/dummyData.json"
    import MapContainer from "../components/MapContainer"
    import { useState , useRef } from "react"
    import anime from "animejs"
    //logic to toast a user if something goes wrong with any of our async functions s
    import { toast , ToastContainer} from 'react-toastify';
    import 'react-toastify/dist/ReactToastify.css';
    

    export default function MapPage(props){

        //missing links (small items I need to solve for)
            //when adding a race a way to get the current date in m/d/y 
            //when adding a race a way to get the distance traveled (using google most likely)
            //if no racer is filled when adding a race add placeholders

       
        //we will store the current focused on race in state and use it fill out all the stuff 
        const [focusedRace , setFocusedRace] = useState(props.userData.userRaces[0])


        //we extract all the user's races into state so we can edit it further down in the map component and always have all of a user's races
        const [userRaces , setUserRaces] = useState(props.userData.userRaces)


        //to open the edit card option 
        const [editUser , setEditUser] = useState(false)

        //state to keep track of user's profile changes without needing a new call to the backend
        const [userData , setUserData] = useState(props.userData.userInfo)

        
        //animation code for this page 
    
        //we call this to switch between the two cards
        const editUserRef = useRef()
        const mainRef = useRef()
        function animateSwitch(){
            //**jun help */
            setEditUser(!editUser)

        }
   


        return(

        <div className="map-page">

                {
                    
                    editUser ?  <UserInfo
                    data={userData}
                    close={animateSwitch} 
                    setNewData={setUserData}
                    /> 
                    
                    : 
                   
    
              
                <div className="map-page__data-card">


                      
                      {  

                      focusedRace ?
                        <div className="map-page__data-card__race-summary">

                            
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
                        : 
                        <div className="map-page__data-card__summary-placeholder">
                        <h4 className="map-page__data-card__summary-placeholder__summary">No Selected Race</h4>
                        </div>
                        }



                         {/*This div contains the shortned most recent races*/}

                        { 
                            focusedRace ?
                            <div className="map-page__data-card__most-recent-races">
                                <div className="map-page__data-card__most-recent-races__inner">
                                        {
                                            //TODO ******* NEED TO CHANGE THAT TO USE THE STATE INSTEAD OF DIRECT PROPS
                                            //ALSO NEEDED A WAY TO DELETE A RACE 
                                            
                                            userRaces.map((race)=>{
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
                            </div>
                            :
                            <div className="map-page__data-card__placeholder">
                            <p className="map-page__data-card__placeholder__p">
                            Your races will be displayed here click the plus button on the right to get started</p>
                            </div>
                         }



                        {/* Nav HTML */}
                        <div className="map-page__data-card__UI-box">

                            <a className="map-page__data-card__UI-box__notifications">
                                <img
                                className="map-page__data-card__UI-box__notifications__icon-img"
                                src="/assets/bell.png"
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

                            <a
                            className="map-page__data-card__UI-box__logout-button"
                            onClick={()=> props.setPage("mainPage")}
                            >
                                <h3 className="map-page__data-card__UI-box__logout-button__logout-text">Logout</h3>
                            </a>

                        </div>


                </div>

               }

                
                

                {/*Place holder img for now */}
                <div className="map-page-google-map-container">
                   <MapContainer
                   races={userRaces}
                   addRace={setUserRaces}
                   username={userData.username}
                   userInfo={userData}
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
