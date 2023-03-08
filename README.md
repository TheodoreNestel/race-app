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





        //LEFT TODO MARCH

          //Hook up the Google maps api 
          //Create a new component (AddRace) which will use the google maps api to add new races to the back end 
          //Add error handling on the front end so a user knows whats going on (wrong login credential Server error etc.)
          //final pass Make sure everything is gucci prior to launch (anim work / new - updated scss)

          //ETA Sunday March 12 for completion will launch sometime that week




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







the mongo schema chatgpt made 



const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RaceSchema = new Schema({
  status: {
    type: Boolean, // true if user won the race, false if lost
    required: true
  },
  topspeed: {
    type: Number // top speed achieved during the race (Optional)
  },
  start: {
    type: String, // starting coords whatever format google map api needs
    required: true
  },
  finish: {
    type: String, // ending coords whatever format google map api needs
    required: true
  },
  carMake: {
    type: String, // user's car make ie: Honda
    required: true
  },
  carModel: {
    type: String, // User's car model ie : Type R
    required: true
  },
  hp: {
    type: Number, // user's car horsepower ie : 305
    required: true
  },
  racer: {
    carMake: {
      type: String, // opponent car make
      required: true
    },
    carModel: {
      type: String, // opponent car model
      required: true
    },
    hp: {
      type: Number, // opponent car hp
      required: true
    },
    racerPfp: {
      type: String, // default img selected for unknown racers
      required: true
    }
  },
  knownRacer: {
    type: Schema.Types.Mixed // blank if unregister racer otherwise : data in the same format as userInfo
  }
});

const UserSchema = new Schema({
  userInfo: {
    username: {
      type: String, // User's username
      required: true
    },
    carMake: {
      type: String, // user's car make ie: Honda
      required: true
    },
    carModel: {
      type: String, // User's car model ie : Type R
      required: true
    },
    hp: {
      type: Number, // user's car horsepower ie : 305
      required: true
    },
    userPfp: {
      type: String, // user profile picture path
      required: true
    }
  },
  userRaces: {
    type: [RaceSchema], // array of user races
    default: []
  }
});

module.exports = mongoose.model('User', UserSchema);
