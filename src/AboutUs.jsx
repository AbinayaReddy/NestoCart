import React from 'react';
import './aboutUs.css';

function AboutUs() {
  return (
    <div className="about-container">
      <h1>About NestoCart</h1>
      <p>
        <strong>NestoCart</strong> is a modern and responsive grocery e-commerce web application designed to simplify the way people shop for their daily needs. Inspired by platforms like Blinkit, NestoCart offers a seamless and intuitive online shopping experience with fast checkout and product discovery features.
      </p>

      <h2>🎯 Our Aim</h2>
      <p>
        The main goal of creating NestoCart is to build a full-stack, real-world-like project using React and Redux Toolkit while mastering state management, routing, UI styling, and integration of third-party services like EmailJS and QR code payments. It’s not just a learning project, but a showcase of practical e-commerce implementation.
      </p>

      <h2>🛍️ What We Offer</h2>
      <ul>
        <li>🧁 A variety of categories like <strong>Chocolates</strong>, <strong>Milk Products</strong>, <strong>Vegetables</strong>, <strong>Non-Veg Items</strong>, and <strong>Frozen Foods</strong>.</li>
        <li>🛒 Easy-to-use shopping cart with quantity controls and remove functionality.</li>
        <li>💰 Discount options through flat % discounts and coupon codes.</li>
        <li>📦 Complete order summary with tax calculations and final billing.</li>
        <li>📧 Email order confirmation using <strong>EmailJS</strong>.</li>
        <li>💳 Simulated payments via QR Code or Card input for practice/testing.</li>
        <li>📜 Order history page to view all your previous purchases.</li>
        <li>🔐 SignIn support (optional extension for authentication).</li>
      </ul>

      <h2>🚀 Why NestoCart?</h2>
      <p>
        NestoCart is built with a vision to provide a clean, scalable, and responsive UI backed by powerful state management. It helps developers and learners understand how a real-world shopping experience is developed using modern web technologies.
      </p>

      <p><strong>Thank you for using NestoCart — happy shopping!</strong></p>
    </div>
  );
}

export default AboutUs;
