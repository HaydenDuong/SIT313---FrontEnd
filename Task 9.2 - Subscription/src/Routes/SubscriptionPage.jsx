import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
//import { Elements } from '@stripe/react-stripe-js';
//import CheckoutForm from '../Components/CheckoutForm';
import '../CSS/SubscriptionPage.css';

// Load your Stripe public key
const stripePromise = loadStripe('pk_test_51Q4xNaDRVqAMvGKsm1RNmzYEBlw8eF2FoME1EEWF5HUdfUzgBhpiy8qQPHMhfGyTjaX7Eu8ywX3TehXg9szDsMGs00O3MesQ17');

const SubscriptionPlans = () => {
  const [selectedPlan, setSelectedPlan] = useState('');

  const handlePlanSelect = (planId) => {
    setSelectedPlan(planId);
  };

  const handleCheckout = async () => {
    try {
      const response = await fetch('http://localhost:5000/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: selectedPlan })
      });
      const { id } = await response.json();

      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({ sessionId: id });
      if (error) console.error(error.message);
    } catch (error) {
      console.error('Error redirecting to checkout', error);
    }
  };

  return (
    <div className="subscription-container">
      <h2>Subscription Plan</h2>

      <div className="plans-container">
        {/* Basic Plan */}
        <div 
          className={`plan-card ${selectedPlan === 'price_1Q5LgVDRVqAMvGKsXN6iSxNe' ? 'selected' : ''}`} 
          onClick={() => handlePlanSelect('price_1Q5LgVDRVqAMvGKsXN6iSxNe')}
        >
          <h3>Basic</h3>
          <p className="price">$1/month</p>
          <button>Select Basic Plan</button>
        </div>

        {/* Premium Plan */}
        <div 
          className={`plan-card ${selectedPlan === 'price_1Q5LhbDRVqAMvGKsTWomwWye' ? 'selected' : ''}`} 
          onClick={() => handlePlanSelect('price_1Q5LhbDRVqAMvGKsTWomwWye')}
        >
          <h3>Premium</h3>
          <p className="price">$10/month</p>
          <button>Select Premium Plan</button>
        </div>
      </div>

      {selectedPlan && (
      <button onClick={handleCheckout}>
        Proceed to Checkout
      </button>
      )}
    </div>
  );
};

export default SubscriptionPlans;
