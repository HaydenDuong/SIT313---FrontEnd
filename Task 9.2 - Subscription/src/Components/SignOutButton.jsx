import React from 'react';
import { getAuth, signOut } from 'firebase/auth';
import '../CSS/SignOutButton.css';

const SignOutButton = () => {

    const auth = getAuth();

    const handleSignOut = () => {

        signOut(auth).then(() => {
            console.log("User has signed out");
        }).catch((error) => {
            console.error("Error signing out: ", error);
        });
    };

    return (

        <button className = 'signout-button' onClick = {handleSignOut}>
            Sign Out
        </button>
    );
};

export default SignOutButton;