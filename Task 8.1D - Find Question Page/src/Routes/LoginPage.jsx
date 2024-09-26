import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/LoginPage.css';
import { signInWithGooglePopup, createUserDocFromAuth, signinAuthUserWithEmailAndPassword } from '../Utilities/firebase';
import { getDoc } from 'firebase/firestore';

const LoginPage = (props) => {
    // Define a variable for navigating to the SignUp Page
    const navigate = useNavigate(); 

    // Function that direct to the SignUp Page
    const goToSignUp = () => {
        navigate('/signup');
    }

    const logGoogleUser = async () => {
        try {
            const {user} = await signInWithGooglePopup();
            const userDocRef = await createUserDocFromAuth(user);

            const userSnapshot = await getDoc(userDocRef);
            if (userSnapshot.exists()) {
                console.log('User already exists in Firestore Database:', userSnapshot.data());
            } else {
                console.log('Creating new user document');
            }

            console.log('Google user Signin:', user);
            navigate("/");
        }
        catch(error){
            console.error('Error with Google Sign-in:', error.message);
            alert(`Google Sign-In error: ${error.message}`);
        }
    }

    const [member, setMember] = useState({
        email: '',
        password: ''
    })

    const {email, password} = member

    const handleChange = (event) => {
        const {name, value} = event.target
        setMember ((preValue) => {
            return {
                ...preValue,
                [name]: value
            }
        })
    }

    const handleSubmit = async(event) => {
        event.preventDefault();

        try{
            const response = await signinAuthUserWithEmailAndPassword(email, password);
            console.log(response);
            navigate("/");
        }
        catch(error){
            console.log('error in login', error.message);
            <h3>Incorrect email or password!</h3>
        }
    }

    return (
        <div className = 'loginpage-login-container'>
            <form className = 'loginpage-login-form'>
                
                <div className = 'loginpage-signup-button-container'>
                    <button type = 'button' className = 'loginpage-signup-button' onClick = {goToSignUp}>
                        Sign Up
                    </button>
                </div>

                <h2 className = "loginpage-h2">Your Email</h2>
                <input
                    id = 'email'             
                    name = 'email'
                    type = 'email'
                    value = {member.email}
                    onChange = {handleChange}
                />

                <h2 className = "loginpage-h2">Your Password</h2>
                <input
                    id = 'password'
                    name = 'password'
                    type = 'password'
                    value = {member.password}
                    onChange = {handleChange}
                />

                <button type = 'submit' className = 'loginpage-login-button' onClick = {handleSubmit}>
                    Login
                </button>

                <button type = 'button' className = 'loginpage-login-button' onClick={logGoogleUser}>
                    Login with Gmail
                </button>

            </form>
        </div>
    )
}

export default LoginPage;