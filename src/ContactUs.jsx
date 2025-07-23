import React, { useRef, useState } from 'react';
import './ContactUs.css';
import emailjs from '@emailjs/browser';

function ContactUs() {
  const formRef = useRef();
  const [isSent, setIsSent] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_gmkwegb',           
        'template_u5lsh47',          
        formRef.current,
        'zxZO5u51oHC1UaMKG'          
      )
      .then(
        () => {
          setIsSent(true);
          formRef.current.reset();
        },
        (error) => {
          alert('Failed to send message: ' + error.text);
        }
      );
  };

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p>Have questions, feedback, or suggestions? We'd love to hear from you!</p>

      <form ref={formRef} onSubmit={sendEmail} className="contact-form">
        <div className="form-group">
          <label>Name</label>
          <input type="text" name="user_name" placeholder="Your name" required />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" name="user_email" placeholder="you@example.com" required />
        </div>

        <div className="form-group">
          <label>Message</label>
          <textarea name="message" placeholder="Type your message here..." required />
        </div>

        <button type="submit">Send Message</button>
      </form>

      {isSent && <p className="success-message">✅ Message sent successfully!</p>}
    </div>
  );
}

export default ContactUs;
