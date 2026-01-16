import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../index.css';

// Sub-components as defined in the user's images
const SSOButtons = () => (
    <div className="sso-buttons">
        <button type="button" className="sso-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
        </button>
        <button type="button" className="sso-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
        </button>
        <button type="button" className="sso-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453-2.87 0-5.184-2.358-5.184-5.257s2.314-5.257 5.184-5.257c1.328 0 2.529.475 3.451 1.258l2.67-2.77c-1.742-1.628-4.013-2.502-6.121-2.502-5.776 0-10.457 4.545-10.457 10.271 0 5.725 4.681 10.271 10.457 10.271 2.879 0 5.48-1.042 7.429-2.85 2.126-1.972 3.195-5.289 2.508-7.989z" /></svg>
        </button>
    </div>
);

const Hero = ({ type, active, title, text, buttonText, onClick }) => (
    <div className={`hero ${type} ${active ? "active" : ""}`}>
        <div className="hero-content">
            <h2>{title}</h2>
            <p>{text}</p>
            <button type="button" className="btn-toggle" onClick={onClick}>
                {buttonText}
            </button>
        </div>
    </div>
);

const AuthForm = ({ type, active, title, children }) => (
    <div className={`form ${type} ${active ? "active" : ""}`}>
        <h2>{title}</h2>
        <SSOButtons />
        <p className="divider-text">Or use your email address</p>
        <div className="form-inputs">
            {children}
        </div>
    </div>
);

const AuthPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { login, signup } = useAuth();

    // Determine initial view based on URL
    const initialView = location.pathname === '/signup' ? 'signup' : 'signin';
    const [view, setView] = useState(initialView);
    const isSignup = view === "signup";

    // Form State
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        setView(location.pathname === '/signup' ? 'signup' : 'signin');
    }, [location.pathname]);

    const toggleView = () => {
        const newView = isSignup ? 'signin' : 'signup';
        setView(newView);
        navigate(newView === 'signup' ? '/signup' : '/login', { replace: true });
        setError('');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            setError('Invalid credentials');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            await signup(name, email, password);
            setShowSuccess(true);
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (err) {
            setError(err.message || 'Error creating account');
        } finally {
            setIsLoading(false);
        }
    };

    if (showSuccess) {
        return (
            <div className="auth-container-fullscreen">
                <div className="card text-center p-8 flex flex-col items-center justify-center">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4 shadow-lg animate-bounce">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Success!</h2>
                    <p className="text-muted">Account Created Successfully</p>
                    <p className="text-sm text-muted mt-4">Redirecting to dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="auth-container-fullscreen">
            <div className="card">
                <div
                    className="card-bg"
                    style={{ transform: isSignup ? "translateX(0)" : "translateX(100%)" }}
                />

                {/* Sign Up Content */}
                <Hero
                    type="signup"
                    active={isSignup}
                    title="Welcome Back!"
                    text="To keep connected with us please login with your personal info"
                    buttonText="SIGN IN"
                    onClick={toggleView}
                />

                <AuthForm type="signup" active={isSignup} title="Create Account">
                    <form onSubmit={handleSignup} className="actual-form">
                        <input
                            type="text" placeholder="Name"
                            value={name} onChange={e => setName(e.target.value)} required
                        />
                        <input
                            type="email" placeholder="Email"
                            value={email} onChange={e => setEmail(e.target.value)} required
                        />
                        <input
                            type="password" placeholder="Password"
                            value={password} onChange={e => setPassword(e.target.value)} required
                        />
                        {error && isSignup && <span className="error-msg">{error}</span>}
                        <button type="submit" disabled={isLoading}>
                            {isLoading ? 'SIGNING UP...' : 'SIGN UP'}
                        </button>
                    </form>
                </AuthForm>

                {/* Sign In Content */}
                <Hero
                    type="signin"
                    active={!isSignup}
                    title="Hello, Friend!"
                    text="Enter your personal details and start your journey with us"
                    buttonText="SIGN UP"
                    onClick={toggleView}
                />

                <AuthForm type="signin" active={!isSignup} title="Sign In">
                    <form onSubmit={handleLogin} className="actual-form">
                        <input
                            type="email" placeholder="Email"
                            value={email} onChange={e => setEmail(e.target.value)} required
                        />
                        <input
                            type="password" placeholder="Password"
                            value={password} onChange={e => setPassword(e.target.value)} required
                        />
                        <a href="#" className="forgot-pass-link">Forgot your password?</a>
                        {error && !isSignup && <span className="error-msg">{error}</span>}
                        <button type="submit" disabled={isLoading}>
                            {isLoading ? 'SIGNING IN...' : 'SIGN IN'}
                        </button>
                    </form>
                </AuthForm>
            </div>
        </div>
    );
};

export default AuthPage;
