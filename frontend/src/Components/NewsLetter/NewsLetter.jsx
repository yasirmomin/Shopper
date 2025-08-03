<<<<<<< HEAD
import React, { useState } from 'react';
import './NewsLetter.css';

const NewsLetter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (!email.trim()) {
      alert("Please enter a valid email address");
      return;
    }
    alert(`Subscribed successfully with ${email}`);
    setEmail(""); 
  };

  return (
    <div className='newsletter'>
      <h1>Get Exclusive Offers On Your Email</h1>
      <p>Subscribe to our newsletter and stay updated.</p>
      <div>
        <input
          type="email"
          placeholder="Your email id"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleSubscribe}>Subscribe</button>
      </div>
    </div>
  );
};

export default NewsLetter;
=======
import React from 'react'
import './NewsLetter.css'

const NewsLetter = () => {
  return (
    <div className='newsletter'>
      <h1>Get Exclusive Offers On Your Email</h1>
      <p>Subscribe to our newsletter and stay updated.</p>
      <div>
        <input type="email" placeholder='Your email id' />
        <button>Subscribe</button>
      </div>
    </div>
  )
}

export default NewsLetter
>>>>>>> 66ab953c41f4acab04279f47b36f42e420f40982
