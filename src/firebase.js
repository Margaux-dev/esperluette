import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAQAb_JgzATKiPFzdfDYo4AHiVwlVHlPz8",
    authDomain: "esperluette-6fa89.firebaseapp.com",
    databaseURL: "https://esperluette-6fa89.firebaseio.com",
    projectId: "esperluette-6fa89",
    storageBucket: "esperluette-6fa89.appspot.com",
    messagingSenderId: "62255658658",
    appId: "1:62255658658:web:5be425d29826887bdc09fb",
    measurementId: "G-ZDP8G8G3CB"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;