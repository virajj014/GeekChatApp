// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';


const firebaseConfig = {
    apiKey: "AIzaSyD9DgWnrKcKAsN9qXi_jPSvwtzc9ldRgtU",
    authDomain: "geekchat1-bacd8.firebaseapp.com",
    projectId: "geekchat1-bacd8",
    storageBucket: "geekchat1-bacd8.appspot.com",
    messagingSenderId: "561479870115",
    appId: "1:561479870115:web:df3b2725e21206a2fe0116"
};


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };