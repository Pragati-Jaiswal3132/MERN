

import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const SignUp = ({ onSignUp }) => {
    const [name, setName] = useState("");
    const [email_id, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState('user');
    const navigate = useNavigate();

    const collectData = async () => {
        try {
            console.warn(name, email_id, password, role);
            let result = await fetch("http://localhost:5000/register", {
                method: 'POST',
                body: JSON.stringify({ name, email_id, password, role }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!result.ok) {
                throw new Error(`HTTP error! status: ${result.status}`);
            }

            result = await result.json();
            localStorage.setItem("user", JSON.stringify(result));
            onSignUp(result);
            navigate('/');
        } catch (error) {
            console.error("Error during signup:", error);
            alert("An error occurred during signup. Please try again.");
        }
    };

    return (
        <div className="inputDiv">
            <h1>Sign Up</h1>
            <label className="inputLabel">Your Name
                <input className="inputBox" type="text" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label className="inputLabel">Your email ID
                <input className="inputBox" type="email" placeholder="Enter Email" value={email_id} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label className="inputLabel">Set Password
                <input className="inputBox" type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <label className="inputLabel">Sign Up as:</label>
            <label className="radioBtn">
                <input type="radio" value="user" checked={role === 'user'} onChange={(e) => setRole(e.target.value)} />User
            </label>
            <label className="radioBtn">
                <input type="radio" value="admin" checked={role === 'admin'} onChange={(e) => setRole(e.target.value)} />Admin
            </label>
            <button onClick={collectData} className="appButton" type="button">Sign Up</button>
        </div>
    );
};

export default SignUp;
