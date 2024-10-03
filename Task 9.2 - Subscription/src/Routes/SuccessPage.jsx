import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import axios from 'axios';
import { useAuthState } from 'react-firebase-hooks/auth';

const SuccessPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    const updateSubscriptionStatus = async () => {
      // Wait until authentication state is ready
      if (loading) {
        return;
      }

      if (error) {
        console.error('Authentication error:', error);
        return;
      }

      if (!user) {
        console.error('No authenticated user found');
        return;
      }

      const sessionId = searchParams.get('session_id');
      if (!sessionId) {
        console.error('No session_id found');
        return;
      }

      try {
        // Fetch session details from your Express server
        const response = await axios.get(`http://localhost:5000/success?session_id=${sessionId}`);
        const { priceId } = response.data;

        // Check if the priceId corresponds to the premium plan
        const isPremium = priceId === 'price_1Q5LhbDRVqAMvGKsTWomwWye'; // Replace with your premium plan price ID

        const userRef = doc(getFirestore(), 'user', user.uid);

        // Update Firestore with the user's subscription status
        await setDoc(userRef, {
          subscriptionStatus: isPremium ? 'premium' : 'basic',
          isPremium: isPremium
        }, { merge: true });

        console.log('Subscription status updated successfully');

      } catch (error) {
        console.error('Error updating subscription status:', error);
      }
    };

    updateSubscriptionStatus();
  }, [loading, user, error, searchParams]);

  const handleHomeRedirect = () => {
    navigate('/');
  };

  return (
    <div>
      <h1>Thank you for subscribing!</h1>
      <p>Your subscription was successful. Redirecting...</p>
      <button onClick={handleHomeRedirect}>Go to Home Page.</button>
    </div>
  );
};

export default SuccessPage;
