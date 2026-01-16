import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check local storage for persisted user
        const storedUser = localStorage.getItem('smart_invest_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const response = await fetch('http://localhost:3001/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Login failed');
            }

            setUser(data.user);
            localStorage.setItem('smart_invest_user', JSON.stringify(data.user));
            return data.user;
        } catch (err) {
            console.error(err);
            throw err;
        }
    };

    const signup = async (name, email, password) => {
        try {
            const response = await fetch('http://localhost:3001/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Signup failed');
            }

            // Immediately login the user after signup (or just set user state if API returns user)
            // The API currently returns { user: ... }
            setUser(data.user);
            localStorage.setItem('smart_invest_user', JSON.stringify(data.user));
            return data.user;
        } catch (err) {
            console.error(err);
            throw err;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('smart_invest_user');
    };

    const value = {
        user,
        login,
        signup,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
