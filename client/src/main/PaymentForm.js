import React, { useState } from 'react';

import {
  CardElement,
  Elements,
  RecurlyProvider,
  useRecurly
} from '@recurly/react-recurly';

const handleBlur = () => console.log('[blur]');
const handleChange = change => console.log('[change]', change);
const handleFocus = () => console.log('[focus]');
const handleReady = () => console.log('[ready]');

export function PaymentForm (props) {
  const [fontSize, setFontSize] = useState('18');

//   const handleChangeFontSize = event => setFontSize(event.target.value);

  return (
    <div className="DemoSection">
      <RecurlyProvider publicKey={'d57d76f0126d41dc8e2eaef03bbd9009'}>
        <Elements>
          <CardForm fontSize={`${fontSize}px`} />
        </Elements>
      </RecurlyProvider>

      <div>
        {/* <label htmlFor="element-font-size-card-demo">font size</label> */}
        {/* <input
          id="element-font-size-card-demo"
          type="range"
          value={fontSize}
          onChange={handleChangeFontSize}
          min="0"
          max="32"
        /> */}
        {/* {fontSize}px */}
      </div>
    </div>
  );
}

function CardForm (props) {
    const { fontSize } = props;
    const recurly = useRecurly();
    let form = React.createRef();
  
    const handleSubmit = event => {
      if (event.preventDefault) event.preventDefault();
      recurly.token(form.current, (err, token) => {
        if (err) console.log('[error]', err);
        else console.log('[token]', token);
      });
    };
  
    return (
        
      <form onSubmit={handleSubmit} ref={form}>
        <div>
        <h3>card information</h3>
          <input
            data-recurly="first_name"
            placeholder="First Name"
            defaultValue="John"
          />
          <input
            data-recurly="last_name"
            placeholder="Last Name"
            defaultValue="Rambo"
          />
          <input
            data-recurly="postal_code"
            placeholder="Postal Code"
            defaultValue="94117"
          />
        </div>
        <CardElement
          onBlur={handleBlur}
          onChange={handleChange}
          onFocus={handleFocus}
          onReady={handleReady}
          onSubmit={handleSubmit}
          style={{ height: '1vh', width: '3vw' }}
        />
        <div>
          <button>Pay</button>
        </div>
      </form>
    );
  }