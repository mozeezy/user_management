import React, { useState } from 'react';
import axios from 'axios';
import Card from "../Card/Card"
import classes from "./form.module.css";
import { useNavigate } from 'react-router-dom';

const Form = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("")
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/login/', { username, password });
      localStorage.setItem('profile', JSON.stringify(response.data));
      navigate('/dashboard');
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.error)
        setUsername("")
        setPassword("")
      }
    }
  };

  return (
    <Card>
          <div className={classes.form}>
            <br />
            <h2>Login</h2>
            <br />
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Enter your username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                placeholder="Enter your password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit" className="btn btn-outline-info">
                Submit
              </button>
            </form>
            {error && <small style={{color: "red"}}>{error}</small>}
          </div>
        </Card>
  );
};

export default Form;
