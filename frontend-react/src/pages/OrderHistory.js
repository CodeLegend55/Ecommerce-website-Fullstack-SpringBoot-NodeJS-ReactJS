import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './OrderHistory.css';

function OrderHistory({ user }) {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchOrders();
  }, [user, navigate]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/orders/user/${user.id}`
      );
      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'PENDING': '#ffc107',
      'CONFIRMED': '#17a2b8',
      'SHIPPED': '#007bff',
      'DELIVERED': '#28a745',
      'CANCELLED': '#dc3545'
    };
    return colors[status] || '#6c757d';
  };

  if (loading) {
    return <div className="loading">Loading orders...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="page-container">
      <h1 className="page-title">My Orders</h1>

      {orders.length === 0 ? (
        <div className="empty-state">
          <h2>No orders yet</h2>
          <p>Start shopping to see your orders here!</p>
          <button onClick={() => navigate('/products')} className="btn btn-primary">
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div>
                  <h3>Order #{order.id}</h3>
                  <p className="order-date">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="order-status" style={{ backgroundColor: getStatusColor(order.status) }}>
                  {order.status}
                </div>
              </div>

              <div className="order-items">
                {order.orderItems.map(item => (
                  <div key={item.id} className="order-item">
                    <img src={item.product.imageUrl} alt={item.product.name} />
                    <div className="order-item-details">
                      <h4>{item.product.name}</h4>
                      <p>Quantity: {item.quantity}</p>
                      <p className="order-item-price">${item.subtotal.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-footer">
                <div className="order-shipping">
                  <h4>Shipping Address:</h4>
                  <p>{order.shippingAddress}</p>
                  <p>{order.shippingCity}, {order.shippingState} {order.shippingZipCode}</p>
                </div>
                <div className="order-total">
                  <strong>Total: ${order.totalAmount.toFixed(2)}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderHistory;
