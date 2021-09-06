import { initializeApp } from "@firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebaseConfig } from './firebase-config';


export const initializeLogInFrameWork =()=>{
    initializeApp(firebaseConfig);
}


export const manageGoogleSignIn = ()=>{
        const GoogleProvider = new GoogleAuthProvider();
        const auth = getAuth();

        return signInWithPopup(auth,GoogleProvider)
        .then(res =>{
            const {displayName, photoURL, email} = res.user;
            const signedInUser = {
                isSignedIn: true,
                goIn: true,
                name: displayName,
                email: email,
                photoURL: photoURL,
            }
            return signedInUser;
        })
        .catch(error => {
            console.log(error.message);
        })
}

