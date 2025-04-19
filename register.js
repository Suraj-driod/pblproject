
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDlpNopcAtbNwojnGSSHMVeVZcprE4RPWI",
    authDomain: "jansuvidha-3fca1.firebaseapp.com",
    projectId: "jansuvidha-3fca1",
    storageBucket: "jansuvidha-3fca1.firebasestorage.app",
    messagingSenderId: "960503717321",
    appId: "1:960503717321:web:bfeac93b7e049c13d71c18",
    measurementId: "G-XJKYMW9MVR"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
