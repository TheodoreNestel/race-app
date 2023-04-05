BUGS
    -reveal password needs to clicks to reveal password when hidden unsure as to why 
    probably state bullshitery 







Arjun Questions 
    -Trying to select the parent when hovering a child but getting confused with selector and scc & included classes 
    (loginForm.scss )

    -My add race call is working and populating the back end but I get an error anyways ? but not on the front end 
    the error only shows on the back end






TODO 
    -GLobal page will need to pass state down to login to get a user's account info / authenticate them 
        cycle 
            main page : user logins / signs up -> make a request to back to get a user's data or create an account for them -> set a user's data new or returning to the user state in global and then passes it down to MapPage 
            to create the map layout and populate the other necessary data -> if logout is clicked send them back to mainPage using that same state (we can run a check on an object key or something)





        //LEFT TODO MARCH

          //And loading animations for login and map start up 
         
          //final pass Make sure everything is gucci prior to launch (anim work / new - updated scss)





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
