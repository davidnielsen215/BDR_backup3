import React from 'react';
import { RecurlyProvider, Elements } from '@recurly/react-recurly';
import { PaymentForm } from './PaymentForm';

export default function Recurly() {
  return (
    <RecurlyProvider publicKey="d57d76f0126d41dc8e2eaef03bbd9009">
      
      <Elements>
        <PaymentForm />
      </Elements>
    </RecurlyProvider>
  );
}