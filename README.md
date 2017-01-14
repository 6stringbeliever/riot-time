Riot Time
=========

A simple time-tracking app based on Riot.js and Firebase.

Setup
-----
1. Create a new Firebase database project to use.
2. Create a new config.js file in `dev\js` in this format:
  ~~~ JavaScript
  // Initialize Firebase
  var config = {
    apiKey: "from firebase",
    authDomain: "from firebase",
    databaseURL: "from firebase",
    storageBucket: "from firebase",
    messagingSenderId: "from firebase"
  };

  export default config;
  ~~~
3. `npm install`
4. `gulp serve`
