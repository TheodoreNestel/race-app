BUGS
    -reveal password needs to clicks to reveal password when hidden unsure as to why 
    probably state bullshitery 







Arjun Questions 
    -Trying to select the parent when hovering a child but getting confused with selector and scc & included classes 
    (loginForm.scss )






TODO 
    -GLobal page will need to pass state down to login to get a user's account info / authenticate them 
        cycle 
            main page : user logins / signs up -> make a request to back to get a user's data or create an account for them -> set a user's data new or returning to the user state in global and then passes it down to MapPage 
            to create the map layout and populate the other necessary data -> if logout is clicked send them back to mainPage using that same state (we can run a check on an object key or something)





        //Thursday 2/16/22
            //-create the data object structure
            //-create summarisedRace component
            //-create the user's profile page / the ability to create a new data object with new userData
            //-populate all fields with dummy data for styling 

        //Friday 2/17/22
            //-Style the available parts of this page 
            //-Media-Queries / optimize site for mobile / other screen sizes 
        
        //Monday 2/20/22
            //begin research on Node Express for the backend 
            //(Tentative) Setup Node Express backend 




DATA STRUCTURE 

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

