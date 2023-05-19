import { initializeApp } from "firebase/app";
const STORAGE_BUCKET = process.env.STORAGE_BUCKET;
console.log('storageBucket',STORAGE_BUCKET);
const firebaseConfig = {
    apiKey:process.env.apiKey,
authDomain:"shoppie-384804.firebaseapp.com",
projectId:"shoppie-384804",
storageBucket:"shoppie-384804.appspot.com",
messagingSenderId:"1097000774",
appId:"1:1097000774:web:1acd492fa1123470186747",
//   apiKey: process.env.API_KEY,
//   authDomain: process.env.AUTH_DOMAIN,
//   projectId: process.env.PROJECT_ID,
//   storageBucket: process.env.STORAGE_BUCKET,
//   messagingSenderId: process.env.MESSAGING_SENDER_ID,
//   appId: process.env.APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;