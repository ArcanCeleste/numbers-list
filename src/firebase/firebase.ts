
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDvy0YK4jWBF9-Br-2aLi1CFCMUqIGeP6E",
  authDomain: "guilherme-numbers-list.firebaseapp.com",
  projectId: "guilherme-numbers-list",
  storageBucket: "guilherme-numbers-list.appspot.com",
  messagingSenderId: "1081563445831",
  appId: "1:1081563445831:web:f886b842a5a53b45748f62"
};


export const fbConfig = initializeApp(firebaseConfig);