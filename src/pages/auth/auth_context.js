// src/AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import {deleteCookie, getCookie, setCookie} from "../../utils/cookie";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(() => getCookie('auth_token'));
    const [username, setUsername] = useState(() => getCookie('username'));

    const login = (token, username) => {
        setAuthToken(token);
        setUsername(username);
        setCookie('auth_token', token);
        setCookie('username', username);
    };

    const logout = () => {
        setAuthToken(null);
        setUsername(null);
        deleteCookie('auth_token');
        deleteCookie('username');
    };

    return (
        <AuthContext.Provider value={{ authToken, username, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
