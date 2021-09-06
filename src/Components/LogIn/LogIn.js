import React, { useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';
import './LogIn.css';
import { initializeLogInFrameWork, manageGoogleSignIn } from './LogInManager/LoginManager';

const LogIn = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    // const [user, setUser] = useState({
    //     isSignedIn: false,
    //     goIn: false,
    //     name: "",
    //     email: "",
    //     password: "",
    //     photoURL: "",
    //     error: ""
    // });
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };



    initializeLogInFrameWork();
    const saveUserInDb = (user)=>{
        const dbUser = {...user, loginTime: new Date()}


        fetch('https://nameless-meadow-14932.herokuapp.com/addUser', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dbUser)
        })
            .then(res => {
                console.log("Successfully Saved User")
            })
    }

    const handleResponse = (res, redirect) => {
        // setUser(res);
        setLoggedInUser(res);
        localStorage.setItem(res.email, res.isSignedIn);
        saveUserInDb(res);
        if (redirect) {
            history.replace(from);
        }
    }

    const signInWithGoogle = () => {
        manageGoogleSignIn()
            .then(res => {
                handleResponse(res, true);
            })
    }

    return (
        <div className="login-container">
                <h2>Please Sign In with</h2>
            <div className="button-container">
                <h1 onClick={signInWithGoogle}>
                    <span><i className="fab fa-google"> </i>oogle</span>
                    <span><i className="fab fa-google"> </i>oogle</span>
                </h1>
            </div>
        </div>
    );
};

export default LogIn;