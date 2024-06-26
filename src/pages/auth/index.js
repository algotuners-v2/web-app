// src/Auth.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./auth.css"
import { BASE_URL } from "../../api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth_context";

const LoginAuth = () => {
    const [username, setUsername] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { login, authToken, authUserName } = useAuth();

    const handleLogin = async (event) => {
        event.preventDefault(); // Prevent the default form submission
        try {
            const response = await axios.post(BASE_URL + '/auth-token', {
                "username": username,
            });
            if (response.status === 200) {
                login(response.data.token, username);
                setError(null);
                navigate("/dashboard");
            }
        } catch (err) {
            setError('Invalid username or password');
        }
    };

    useEffect(() => {
        if (authToken && authUserName) {
            navigate('/dashboard');
        }
    }, []);

    return (
        <div className="auth-container">
            <div className="login-box">
                <h2>Login (NEED VPN TO LOGIN)</h2>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleLogin}> {/* Form element to handle the submission */}
                    <input
                        type="text"
                        autoFocus
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="input-field"
                    />
                    <button type="submit" className="login-button">Login</button>
                </form>
            </div>
        </div>
    );
};

export default LoginAuth;
