import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import './SignUp.css';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://ey-final-project-1.onrender.com/auth/signup', {
        username,
        email,
        password,
      });
      alert(res.data.msg);
      navigate('/'); 
    } catch (err) {
      setError(err.response?.data?.msg || 'Something went wrong');
    }
  };

  return (
    <div className="signup">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign Up</button>
        <p>Alreay have an account <a href="/login">Login</a></p>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default SignUp;

