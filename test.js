const express = require('express');
const firebase = require('firebase');

const firebaseConfig = {
    apiKey: "AIzaSyAqCyweTU7W-2JbOTcdEYpU8a8z-QYyf_c",
    authDomain: "fir-reactnative-e4275.firebaseapp.com",
    databaseURL: "https://fir-reactnative-e4275.firebaseio.com",
    projectId: "fir-reactnative-e4275",
    storageBucket: "fir-reactnative-e4275.appspot.com",
    messagingSenderId: "144876078188",
    appId: "1:144876078188:web:d844eac240afb72d96c449",
    measurementId: "G-8ESQJH5QXQ"
  };
  firebase.initializeApp(firebaseConfig);
  console.log(firebase.database())