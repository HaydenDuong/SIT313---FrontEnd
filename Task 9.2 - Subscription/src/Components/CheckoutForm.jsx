import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import '../CSS/CheckoutForm.css';  // Importing the CSS for the CheckoutForm

const CheckoutForm = ({ selectedPlan }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const card = elements.getElement(CardElement);

    const { token, error } = await stripe.createToken(card);

    if (error) {
      console.error(error);
    } else {
      // Send the token and selected plan to the backend for processing
      const response = await fetch('http://localhost:5000/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: token.id, plan: selectedPlan }),
      });

      const subscription = await response.json();

      if (subscription.status === 'active') {
        alert('Subscription successful!');
      } else {
        alert('Subscription failed.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <h2>Enter Payment Information</h2>
      <CardElement className="card-element" />
      <button type="submit" disabled={!stripe}>
        Subscribe
      </button>
    </form>
  );
};

export default CheckoutForm;

