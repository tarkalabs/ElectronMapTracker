import * as firebase from 'firebase';


const prodConfig = {
  // apiKey: YOUR_API_KEY,
  // authDomain: YOUR_AUTH_DOMAIN,
  // databaseURL: YOUR_DATABASE_URL,
  // projectId: YOUR_PROJECT_ID,
  // storageBucket: '',
  // messagingSenderId: YOUR_MESSAGING_SENDER_ID,
};

const devConfig = {
  apiKey: "AIzaSyDPSYv-0wzdU_kp-hzqq8_A2gfU8pcVDkE",
  authDomain: "tarkalabstracker-1517842574793.firebaseapp.com",
  databaseURL: "https://tarkalabstracker-1517842574793.firebaseio.com",
  projectId: "tarkalabstracker-1517842574793",
  storageBucket: "tarkalabstracker-1517842574793.appspot.com",
  messagingSenderId: "1052174299732"
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
