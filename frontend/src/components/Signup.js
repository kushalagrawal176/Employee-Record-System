import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', form);
      localStorage.setItem('token', res.data.token);
      setMsg('Signup successful!');
      navigate('/dashboard');
    } catch (err) {
      if (err.response?.data?.msg) {
        setMsg('Error: ' + err.response.data.msg);
      } else {
        setMsg('Unexpected Error: ' + (err.message || 'Unknown'));
      }
    }
  };

  return (
    <div style={formContainerStyle}>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <input name="name" placeholder="Name" onChange={handleChange} required style={inputStyle} />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required style={inputStyle} />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required style={inputStyle} />
        <button type="submit" style={btnStyle}>Signup</button>
      </form>
      {msg && <p style={{ color: msg.startsWith('Error') ? 'red' : 'green' }}>{msg}</p>}
    </div>
  );
}

const formContainerStyle = {
  maxWidth: 400,
  margin: '60px auto',
  padding: 24,
  background: '#fafafa',
  borderRadius: 8,
  boxShadow: '0 0 10px #eee',
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
};

const inputStyle = {
  padding: 10,
  fontSize: '1rem',
  borderRadius: 6,
  border: '1px solid #ccc',
};

const btnStyle = {
  padding: 12,
  fontSize: '1rem',
  borderRadius: 6,
  backgroundColor: '#1976d2',
  color: '#fff',
  border: 'none',
  cursor: 'pointer',
};

export default Signup;
