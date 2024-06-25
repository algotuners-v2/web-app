// src/Auth.js
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import "./auth.css"
import {BASE_URL} from "../../api";
import {useNavigate} from "react-router-dom";
import {useAuth} from "./auth_context";

const LoginAuth = () => {
    const [username, setUsername] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { login, authToken, authUserName } = useAuth();


    useEffect(() => {
        if(authToken === null || authUserName === null) {
            return
        }
        navigate('/dashboard')
    }, [])

    const handleLogin = async () => {
        try {
            const response = await axios.post(BASE_URL + '/auth-token', {
                "username": username,
            }, );
            if (response.status === 200) {
                login(response.data.token, username)
                setError(null);
                navigate("/dashboard")
            }
        } catch (err) {
            setError('Invalid username or password');
        }
    };

    return (
        <div className="auth-container">
            <div className="login-box">
                <h2>    Login</h2>
                {error && <p className="error">{error}</p>}
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="input-field"
                />
                <button onClick={handleLogin} className="login-button">Login</button>
            </div>
        </div>
    );
};

export default LoginAuth;