import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, ArrowRight, Github, Chrome } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const useNavigateHook = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            await login(email, password);
            useNavigateHook('/dashboard');
        } catch (err) {
            setError('Failed to log in. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-bg-primary">
            {/* Background Decor */}
            <div className="hero-bg-grid" />
            <div className="hero-bg-glow glow-1 opacity-20" />
            <div className="hero-bg-glow glow-2 opacity-20" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 w-full max-w-md p-8 bg-bg-card backdrop-blur-xl border border-glass-border rounded-2xl shadow-2xl"
            >
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-2">Welcome Back</h1>
                    <p className="text-text-secondary">Enter your credentials to access your account</p>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-text-secondary">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                            <input
                                type="email"
                                required
                                className="w-full bg-surface-hover border border-glass-border rounded-lg pl-10 pr-4 py-3 text-text-primary focus:outline-none focus:border-accent-primary transition-colors"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-text-secondary">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                            <input
                                type="password"
                                required
                                className="w-full bg-surface-hover border border-glass-border rounded-lg pl-10 pr-4 py-3 text-text-primary focus:outline-none focus:border-accent-primary transition-colors"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2 cursor-pointer text-text-secondary">
                            <input type="checkbox" className="rounded bg-surface-hover border-glass-border text-accent-primary" />
                            Remember me
                        </label>
                        <a href="#" className="text-accent-primary hover:text-accent-secondary transition-colors">Forgot password?</a>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full btn btn-primary py-3 rounded-lg font-bold shadow-lg hover:shadow-accent-primary/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isLoading ? 'Signing In...' : <>Sign In <ArrowRight size={18} /></>}
                    </button>
                </form>

                <div className="my-8 flex items-center gap-4">
                    <div className="h-px bg-glass-border flex-1" />
                    <span className="text-xs text-text-muted uppercase">Or continue with</span>
                    <div className="h-px bg-glass-border flex-1" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <button className="btn btn-outline py-2.5 flex items-center justify-center gap-2 hover:bg-surface-hover">
                        <Github size={18} /> Github
                    </button>
                    <button className="btn btn-outline py-2.5 flex items-center justify-center gap-2 hover:bg-surface-hover">
                        <Chrome size={18} /> Google
                    </button>
                </div>

                <div className="mt-8 text-center text-sm text-text-secondary">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-accent-primary hover:text-accent-secondary font-medium transition-colors">
                        Sign up for free
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
