import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, DecCart, IncCart, orderDetails, removeFromCart } from './store';
import './cart.css';
import { useNavigate } from 'react-router-dom';
import QRCode from 'react-qr-code';
import emailjs from '@emailjs/browser';

function Cart() {
  const dispatch = useDispatch();
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const cartObjects = useSelector((state) => state.cart);
  const couponCodeRef = useRef();
  const [couponCodeDiscountPer, setCouponCodeDiscountPer] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('');
  const cardNumberRef = useRef();
  const cardExpiryRef = useRef();
  const cardCVVRef = useRef();
  const [customerEmail, setCustomerEmail] = useState("abinayareddy2121@gmail.com");
  const [showThankYou, setShowThankYou] = useState(false);
  const navigate = useNavigate();

  const handlePurchase = () => {
    setShowThankYou(true);
    setTimeout(() => {
      navigate("/orders");
    }, 3000);
  };

  const handlingCouponPer = () => {
    const coupons = {
      ABI10: 10,
      ABINAYA: 20,
      VINNI: 30
    };
    const couponCode = couponCodeRef.current.value.trim().toUpperCase();
    if (coupons[couponCode]) {
      setCouponCodeDiscountPer(coupons[couponCode]);
    } else {
      alert('Invalid Coupon Code');
      setCouponCodeDiscountPer(0);
    }
  };

  const listCartObjects = cartObjects.map((item, index) => (
    <li key={index}>
      <img src={item.image} alt={item.name} width="50" height="50" />
      <strong>{item.name}</strong> - ${item.price} | Quantity: {item.quantity}
      <div>
        <button className="btn-increase" onClick={() => dispatch(IncCart(item))}>+</button>
        <button className="btn-decrease" onClick={() => dispatch(DecCart(item))}>-</button>
        <button className="btn-remove" onClick={() => dispatch(removeFromCart(item))}>Remove</button>
      </div>
    </li>
  ));

  const calculatingAmount = () => {
    let totalPrice = cartObjects.reduce(
      (total, item) => total + item.price * item.quantity, 0);
    const totalDiscountPercentage = discountPercentage + couponCodeDiscountPer;
    const discount = totalPrice * (totalDiscountPercentage / 100);
    let amountAfterDiscount = totalPrice - discount;
    const tax = amountAfterDiscount * 0.05;
    let finalAmount = amountAfterDiscount + tax;
    return { totalPrice, discount, tax, finalAmount, totalDiscountPercentage };
  };

  const { totalPrice, discount, tax, finalAmount, totalDiscountPercentage } = calculatingAmount();

  const handleCompletePurchase = () => {
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }


    const purchaseDateTime = new Date().toLocaleString();
    const orderDetailsObject = {
      orderId: 'ORD' + new Date().getTime(),
      purchaseDateTime,
      items: [...cartObjects],
      finalPrice: finalAmount
    };

    const templateParams = {
      order_id: orderDetailsObject.orderId,
      email: customerEmail,
      orders: orderDetailsObject.items.map(item => ({
        name: item.name,
        price: item.price.toFixed(2),
        units: item.quantity,
        image_url: item.image
      })),
      
      cost: {
        shipping: 0.00,
        tax: tax.toFixed(2),
        total: finalAmount.toFixed(2)
      }
    };

    emailjs.send(
      'service_gmkwegb',
      'template_u5lsh47',
      templateParams,
      'zxZO5u51oHC1UaMKG'
    ).then(() => {
      console.log("Email sent Successfully");
    }).catch((error) => {
      alert("Email sending Failed: " + error.text);
    });

    setShowThankYou(true);
    dispatch(orderDetails(orderDetailsObject));
    dispatch(clearCart());
    handlePurchase();
  };

  return (
    <div>
      <h1>This Cart Contains</h1>
      <ol>{listCartObjects.length === 0 ? <p>Your Cart is Empty.</p> : listCartObjects}</ol>

      <div className="discount-buttons">
        <button onClick={() => setDiscountPercentage(10)}>Apply 10% Discount</button>
        <button onClick={() => setDiscountPercentage(20)}>Apply 20% Discount</button>
        <button onClick={() => setDiscountPercentage(30)}>Apply 30% Discount</button>
      </div>

      <input type='text' ref={couponCodeRef} placeholder='Enter the coupon' />
      <button onClick={handlingCouponPer}>Apply Coupon</button>

      <div className="total-summary">
        <h2>Total Before Discount: ₹{totalPrice.toFixed(2)}</h2>
        <h2>Discount ({totalDiscountPercentage}%): ₹{discount.toFixed(2)}</h2>
        <h2>Tax (5%): ₹{tax.toFixed(2)}</h2>
        <h2><strong>Total Bill: ₹{finalAmount.toFixed(2)}</strong></h2>
      </div>

      <div className="payment-method">
        <h3>Select Payment Method:</h3>
        <button onClick={() => setPaymentMethod('qr')}>QR Code</button>
        <button onClick={() => setPaymentMethod('card')}>Card</button>
      </div>

      {paymentMethod === 'qr' && (
        <div className="qr-section">
          <h4>Scan UPI QR to Pay ₹{finalAmount.toFixed(2)}</h4>
          <QRCode
            value={`upi://pay?pa=9381773162@axl&pn=AbinayaReddy&am=${finalAmount.toFixed(2)}&cu=INR`}
            size={200}
            level="H"
            includeMargin={true}
          />
          <p><strong>UPI ID:</strong> 9381773162@axl</p>
        </div>
      )}

      {paymentMethod === 'card' && (
        <div className="card-section">
          <h4>Enter Card Details</h4>
          <input type="text" placeholder="Card Number" ref={cardNumberRef} />
          <input type="text" placeholder="Expiry MM/YY" ref={cardExpiryRef} />
          <input type="text" placeholder="CVV" ref={cardCVVRef} />
        </div>
      )}

      <div className='mb-3'>
        <label className='form-label'>Enter Your Email For Order Confirmation</label>
        <input
          type='email'
          value={customerEmail}
          onChange={(e) => setCustomerEmail(e.target.value)}
        />
      </div>

      <button
        onClick={handleCompletePurchase}
        disabled={cartObjects.length === 0 || !paymentMethod}
      >
        Complete Purchase
      </button>

      {showThankYou && (
        <h2 style={{ color: 'green' }}>
          Thank You for Your Purchase! Redirecting to orders...
        </h2>
      )}
    </div>
  );
}

export default Cart;
