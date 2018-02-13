import * as firebase from 'firebase';


const prodConfig = {
  apiKey: "AIzaSyDOA__0NTA5fLFNvQIi6m2ILz2KmDJ_QWE",
    authDomain: "tracker-b6d66.firebaseapp.com",
    databaseURL: "https://tracker-b6d66.firebaseio.com",
    projectId: "tracker-b6d66",
    storageBucket: "tracker-b6d66.appspot.com",
    messagingSenderId: "870986436179"
};

const devConfig = {
  apiKey: "AIzaSyDOA__0NTA5fLFNvQIi6m2ILz2KmDJ_QWE",
    authDomain: "tracker-b6d66.firebaseapp.com",
    databaseURL: "https://tracker-b6d66.firebaseio.com",
    projectId: "tracker-b6d66",
    storageBucket: "tracker-b6d66.appspot.com",
    messagingSenderId: "870986436179"
};

const config = process.env.NODE_ENV === 'production'
  ? prodConfig
  : devConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();

export {
  db,
  auth,
};
