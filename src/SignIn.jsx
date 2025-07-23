import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignIn.css';

function SignIn() {
  const [user, setUser] = useState({
    username: '',
    password: '',
    email: '',
    phone: '',
    gender: '',
    country: ''
  });

  const [loggedInUser, setLoggedInUser] = useState(localStorage.getItem('user'));
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedInUser) {
      navigate("/home");
    }
  }, [loggedInUser, navigate]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('user', JSON.stringify(user));
    setLoggedInUser(user.username);
    navigate("/home");
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setLoggedInUser(null);
  };

  if (loggedInUser) {
    return (
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <h2>Welcome, {loggedInUser}!</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }

  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" required onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" required onChange={handleChange} />

        <div className="radio-group">
          <label>Gender:</label>
          <label><input type="radio" name="gender" value="male" required onChange={handleChange} /> Male</label>
          <label><input type="radio" name="gender" value="female" onChange={handleChange} /> Female</label>
        </div>

        <select name="country" required onChange={handleChange}>
          <option value="" disabled selected>Select your country</option>
          <option value="usa">United States</option>
          <option value="india">India</option>
          <option value="uk">United Kingdom</option>
        </select>

        <input type="email" name="email" placeholder="example@gmail.com" required onChange={handleChange} />
        <input type="tel" name="phone" placeholder="+91 1234567890" required onChange={handleChange} />

        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default SignIn;
