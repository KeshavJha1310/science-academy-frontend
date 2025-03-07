import React from 'react';
import './PaymentOffer.css';

const PaymentOffer = () => {
  return (
    <div className="payment-offer">
      <h2 className='offer'>Special Offer!</h2>
      <p>Full payment in one installment</p>
      <h8>and Save upto !</h8>
      <p className="highlighted">500/- INR</p>
      <p className="hurry-up">Hurry Up!</p>
    </div>
  );
};

export default PaymentOffer;
