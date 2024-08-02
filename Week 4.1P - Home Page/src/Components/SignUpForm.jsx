import React, { useState } from 'react';
import './SignUpForm.css';

function SignUpForm() {
  const [email, setEmail] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:5000/send-welcome', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    });
    const result = await response.json();
    alert(result.message);
  };

  return (
    <div className="signup-form">
      <form id="signupForm" onSubmit={handleSubmit}>
        <label htmlFor="email">SIGN UP FOR OUR DAILY INSIDER</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Subscribe</button>
      </form>
    </div>
  );
}

export default SignUpForm;