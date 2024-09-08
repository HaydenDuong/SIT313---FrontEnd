import React, { useState } from 'react';
import '../CSS/SignUpPage.css';
import { createAuthUserWithEmailAndPassword, createUserDocFromAuth } from '../Utilities/firebase';
import { Navigate } from 'react-router-dom';

const SignUpPage = (props) => {
  const [newUser, setNewUser] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const {displayName, email, password, confirmPassword} = newUser;
  console.log(newUser);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewUser((preValue) => {
      return {
        ...preValue,
        [name]: value
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match')
      return;
    }

    try{
      const {user} = await createAuthUserWithEmailAndPassword(email, password)
      await createUserDocFromAuth(user, {displayName});
      Navigate('/login');
    }
    catch(error){
      console.log('error in creating user', error.message);
    }
  }

  return (
    <div className="signup-container">
      <form className="signup-form">
        <h1>Create a DEV@Deakin Account</h1>

        {/* Name Field */}
        <div className="form-group">
          <label htmlFor="name">Name*</label>
          <input
            id="name"
            name="displayName"
            type="text"
            value={newUser.displayName}
            onChange={handleChange}
          />
        </div>

        {/* Email Field */}
        <div className="form-group">
          <label htmlFor="email">Email*</label>
          <input
            id="email"                  // Links the label and input for accessibility
            name="email"                // The name used for form-submission and state-manangement
            type="email"                // Enforces proper email format
            value={newUser.email}       // Binds the input value to the state
            onChange={handleChange}     // Updates state when the input change
          />
        </div>

        {/* Password Field */}
        <div className="form-group">
          <label htmlFor="password">Password*</label>
          <input
            id="password"
            name="password"
            type="password"
            value={newUser.password}
            onChange={handleChange}
          />
        </div>

        {/* Confirm Password Field */}
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm password*</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={newUser.confirmPassword}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="create-button" onClick = {handleSubmit}>
          Create
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;
