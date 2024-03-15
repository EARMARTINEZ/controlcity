import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// var firebaseConfig = {
//   apiKey: "AIzaSyAA_2jfqF7tdqXEpQYdAHYTDL9KMUXOvng",
//   authDomain: "urgencias-25ce3.firebaseapp.com",
//   projectId: "urgencias-25ce3",
//   storageBucket: "urgencias-25ce3.appspot.com",
//   messagingSenderId: "1026434947688",
//   appId: "1:1026434947688:web:dca499709863d89cd4b9dd",
//   measurementId: "G-N2H4TS1PH6"
// };

const firebaseConfig = {
  apiKey: "AIzaSyClOgt2_lEFvHubtk67vETECNp40LW9Hz8",
  authDomain: "nueveonce-69a5f.firebaseapp.com",
  projectId: "nueveonce-69a5f",
  storageBucket: "nueveonce-69a5f.appspot.com",
  messagingSenderId: "278212357",
  appId: "1:278212357:web:71528f7a11ca6ff157916c"
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();
