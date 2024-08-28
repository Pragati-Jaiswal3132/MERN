

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email_id, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem('user');
    if (auth) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = async () => {
    let result = await fetch("http://localhost:5000/login", {
      method: 'post',
      body: JSON.stringify({ email_id, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    result = await result.json();
    console.warn(result);
    if (result.name) {
      localStorage.setItem('user', JSON.stringify(result));
      navigate("/");
    } else {
      alert("Please enter correct details");
    }
  };

  return (
    
    <div className="inputDiv">
      <h1>Login</h1>
      <label className="inputLabel"> Email ID
        <input
          className="inputBox"
          type="email"
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email_id}
        />
      </label>
      <label className="inputLabel"> Password
        <input
          className="inputBox"
          type="password"
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      <button onClick={handleLogin} className="appButton" type="button">Login</button>
    </div>
  );
};

export default Login;
