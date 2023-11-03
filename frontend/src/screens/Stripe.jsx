import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useParams } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { useSelector } from 'react-redux';
import CheckoutForm from '../components/CheckoutForm';

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripePromise = loadStripe(
  'pk_test_51NZWXtBFSvH91bJimgI56uDpkb6KrwA4QyocRfsQB9Vlfylb6CueOMLg6PxTJH4oRLYaefedqoA8KDbsdHx3oRED00pda05M6V'
);

export default function Stripe() {
  const [clientSecret, setClientSecret] = useState('');
  const { id: orderId } = useParams();

  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: cart.cartItems }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className='m-4'>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm idP={orderId} />
        </Elements>
      )}
    </div>
  );
}
