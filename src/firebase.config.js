import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB4FGPtk4VTWiH5CQUA9yy9KIeLc7qz1I0",
    authDomain: "trial-project---kingsley-g.firebaseapp.com",
    projectId: "trial-project---kingsley-g",
    storageBucket: "trial-project---kingsley-g.appspot.com",
    messagingSenderId: "271074623378",
    appId: "1:271074623378:web:7962484771d266f99b0b4b"
  };

initializeApp(firebaseConfig);

export const db = getFirestore();
