 import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import AiAssistant from './AiAssistant';

const API = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : 'http://localhost:8080';

function App() {
  const [foods, setFoods] = useState([]);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  const loadFoods = async () => {
    try {
      const res = await axios.get(API + '/api/food');
      setFoods(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadFoods();
  }, []);

  const addFood = async (e) => {
    e.preventDefault();
    if (!name) {
      alert('Please enter food name');
      return;
    }
    if (!expiryDate) {
      alert('Please select expiry date');
      return;
    }
    await axios.post(API + '/api/food', { name, quantity, expiryDate });
    setName('');
    setQuantity('');
    setExpiryDate('');
    loadFoods();
  };

  const deleteFood = async (id) => {
    await axios.delete(API + '/api/food/' + id);
    loadFoods();
  };

  const urgentFoods = foods.filter(function(f) {
    return f.status === 'URGENT';
  });

  const totalFoods = foods.length;

  const expiredCount = foods.filter(function(f) {
    return f.status === 'EXPIRED';
  }).length;

  return (
    <div className="container">
      <h1>Food Waste Tracker</h1>
      <p className="subtitle">Save food before it expires</p>

      <div className="stats">
        <div className="stat-card">
          <h2>{totalFoods}</h2>
          <p>Total Items</p>
        </div>
        <div className="stat-card red">
          <h2>{urgentFoods.length}</h2>
          <p>Expiring Soon</p>
        </div>
        <div className="stat-card gray">
          <h2>{expiredCount}</h2>
          <p>Expired</p>
        </div>
      </div>

      {urgentFoods.length > 0 ? (
        <div className="reminder-banner">
          REMINDER: {urgentFoods.map(function(f) { return f.name; }).join(', ')} will expire soon. Please use it today.
        </div>
      ) : null}

      <AiAssistant foods={foods} />

      <form onSubmit={addFood} className="form-box">
        <input placeholder="Food Name" value={name} onChange={e => setName(e.target.value)} />
        <input placeholder="Quantity" value={quantity} onChange={e => setQuantity(e.target.value)} />
        <input type="date" value={expiryDate} onChange={e => setExpiryDate(e.target.value)} />
        <button type="submit">Add Food</button>
      </form>

      <h2 className="list-title">Your Food Items</h2>

      <div className="cards">
        {foods.length === 0 ? (
          <p className="empty-text">No food items yet. Add from above.</p>
        ) : null}
        {foods.map(function(f) {
          return (
            <div key={f.id} className="card">
              <div className="card-top">
                <h3>{f.name}</h3>
                <button className="del" onClick={() => deleteFood(f.id)}>Delete</button>
              </div>
              <p>Quantity: {f.quantity}</p>
              <p>Expiry Date: {f.expiryDate}</p>
              <span className="badge">{f.status}</span>
            </div>
          );
        })}
      </div>

      <p className="footer">Made with React and Spring Boot</p>
    </div>
  );
}

export default App;