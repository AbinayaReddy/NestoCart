import React from 'react';
import { useSelector } from 'react-redux';
import './orderStyle.css';

function Orders() {
  const orderedItems = useSelector(state => state.orders) || [];

  return (
    <div className="orders-container">
      <h2>Your Orders</h2>
      {orderedItems.length === 0 ? (
        <p className="empty-message">No orders placed yet.</p>
      ) : (
        orderedItems.map(orderitem => (
          <div className="order-card" key={orderitem.orderId}>
            <h3>Order ID: {orderitem.orderId}</h3>
            <p><strong>Date:</strong> {orderitem.purchaseDateTime}</p>
            <p><strong>Final Price:</strong> ₹{orderitem.finalPrice.toFixed(2)}</p>
            <h4>Items:</h4>
            <ul>
              {orderitem.items.map((item, index) => (
                <li key={item.id || index} className="order-item">
                  <img
                    src={item.image || './fallback-image.png'}
                    alt={item.name}
                    className="order-item-image"
                    width="50"
                    height="50"
                  />
                  {item.name} - ₹{item.price} × {item.quantity}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;
