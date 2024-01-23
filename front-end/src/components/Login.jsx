// Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import '../index.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/login', { username, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      setLoggedIn(true);
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
      {loggedIn ? (
        <div>
          <h2>Welcome, {username}!</h2>
          {/* Display user information or redirect to another page */}
        </div>
      ) : (
        <div>
          <h2>Login</h2>
          {error && <p className="login-error">{error}</p>}
          <label className="form-label">Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-input"
          />

          <label className="form-label">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
          />

          <button type="button" onClick={handleLogin} className="form-button">
            Log In
          </button>
        </div>
      )}
    </div>
  );
}

export default Login;
