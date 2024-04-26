import { initializeApp } from "firebase/app";
import { TwitterAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAdNv2gC2ixPWikzxGlCtygzqEPtI3o9ow",
    authDomain: "twitter-demo-9c79d.firebaseapp.com",
    projectId: "twitter-demo-9c79d",
    storageBucket: "twitter-demo-9c79d.appspot.com",
    messagingSenderId: "748037864752",
    appId: "1:748037864752:web:fd067e3efb290180e55cf5"
};


export default function handleTwitter(){
    const app = initializeApp(firebaseConfig);
    const provider = new TwitterAuthProvider();

    const auth = getAuth();
    signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
    // You can use these server side with your app's credentials to access the Twitter API.
    const credential = TwitterAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    const secret = credential?.secret;
    console.log(secret,"::",token)

    // The signed-in user info.
    const user = result.user;
    console.log(user);
    console.log(result);
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = TwitterAuthProvider.credentialFromError(error);
    // ...
  });
}
