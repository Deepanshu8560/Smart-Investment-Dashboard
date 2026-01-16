import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TrendingUp, Shield, Globe, ArrowRight, PieChart, Check, Star } from 'lucide-react';
import Navbar from '../components/Navbar';

const LandingPage = () => {
    return (
        <div className="landing-page">
            {/* Hero Section */}
            <section className="hero-section">
                {/* Background Grid & Glows */}
                <div className="hero-bg-grid" />
                <div className="hero-bg-glow glow-1" />
                <div className="hero-bg-glow glow-2" />

                <div className="container hero-container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="hero-text-content"
                    >
                        <div className="badge-beta">
                            <span className="badge-dot"></span>
                            <span className="badge-text">v2.0 Now Available</span>
                        </div>

                        <h1 className="hero-title">
                            Master Your <br />
                            <span className="text-gradient">Financial Future</span>
                        </h1>

                        <p className="hero-subtitle">
                            Professional-grade analytics for the retail investor. <br />
                            Real-time data, AI predictions, and zero latency.
                        </p>

                        <div className="hero-buttons">
                            <Link to="/signup">
                                <button className="btn btn-primary btn-lg btn-glow">
                                    Start Investing Now <ArrowRight size={20} />
                                </button>
                            </Link>
                            <Link to="/dashboard" className="btn btn-secondary btn-lg">
                                Live Demo
                            </Link>
                        </div>
                    </motion.div>

                    {/* Dashboard Preview Graphic */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 40 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="dashboard-preview-container"
                    >
                        <div className="dashboard-preview-overlay" />
                        <img
                            src="/dashboard-preview.png"
                            alt="Dashboard Preview"
                            className="dashboard-preview-img"
                        />
                    </motion.div>
                </div>
            </section>



            {/* Features Section */}
            <section className="features-section">
                <div className="container">
                    <div className="section-header text-center">
                        <h2 className="section-heading">Everything you need to succeed</h2>
                        <p className="section-subheading">Professional-grade tools made simple for everyone.</p>
                    </div>

                    <div className="landing-grid features-grid">
                        <FeatureCard
                            icon={TrendingUp}
                            title="Real-Time Analytics"
                            desc="Monitor market movements with millisecond precision and live charting tools."
                            delay={0.1}
                        />
                        <FeatureCard
                            icon={Shield}
                            title="Bank-Grade Security"
                            desc="Your data is protected with state-of-the-art encryption and enterprise security standards."
                            delay={0.2}
                        />
                        <FeatureCard
                            icon={PieChart}
                            title="Portfolio Intelligence"
                            desc="Deep insights into your asset allocation, risk exposure, and performance metrics."
                            delay={0.3}
                        />
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="pricing-section">
                <div className="hero-bg-glow glow-center" />

                <div className="container">
                    <div className="section-header text-center">
                        <h2 className="section-heading">Transparent Pricing</h2>
                        <p className="section-subheading">Choose the plan that fits your trading style. No hidden fees.</p>
                    </div>

                    <div className="landing-grid pricing-grid">
                        <PricingCard
                            title="Starter"
                            price="$0"
                            desc="Perfect for beginners learning the ropes."
                            features={['Real-time market data', 'Basic portfolio tracking', '5 Watchlists', 'Community Support']}
                        />
                        <PricingCard
                            title="Pro"
                            price="$29"
                            desc="For serious traders who need an edge."
                            features={['Everything in Starter', 'AI-Powered Insights', 'Unlimited Watchlists', 'Advanced Charting', 'Priority Support']}
                            popular={true}
                        />
                        <PricingCard
                            title="Enterprise"
                            price="Custom"
                            desc="Institutional-grade tools for firms."
                            features={['Everything in Pro', 'API Access', 'Dedicated Account Manager', 'Custom Integrations', 'SLA Guarantee']}
                        />
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="testimonials-section">
                <div className="container">
                    <div className="section-header text-center">
                        <h2 className="section-heading">Loved by Investors</h2>
                        <p className="section-subheading">Don't just take our word for it.</p>
                    </div>

                    <div className="landing-grid testimonials-grid">
                        <TestimonialCard
                            name="Sarah Chen"
                            role="Portfolio Manager"
                            content="The AI insights have completely transformed my trading strategy. I can't imagine working without SmartInvest now."
                        />
                        <TestimonialCard
                            name="Michael Ross"
                            role="Day Trader"
                            content="Fastest data execution I've seen in a web app. The interface is stunning and intuitive."
                        />
                        <TestimonialCard
                            name="David Miller"
                            role="Crypto Analyst"
                            content="Finally, a dashboard that handles both stocks and crypto seamlessly. The dark mode is perfect for late nights."
                        />
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="landing-footer">
                <div className="container text-center">
                    <p>&copy; 2026 SmartInvest. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

const FeatureCard = ({ icon: Icon, title, desc, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
        className="feature-card"
    >
        <div className="feature-icon">
            <Icon size={24} />
        </div>
        <h3 className="card-title">{title}</h3>
        <p className="card-desc">{desc}</p>
    </motion.div>
);

const PricingCard = ({ title, price, desc, features, popular }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className={`pricing-card ${popular ? 'popular' : ''}`}
    >
        {popular && (
            <div className="popular-badge">
                Most Popular
            </div>
        )}
        <h3 className="card-title">{title}</h3>
        <div className="price-block">
            <span className="price-amount">{price}</span>
            {price !== 'Custom' && <span className="price-period">/month</span>}
        </div>
        <p className="card-desc mb-md">{desc}</p>

        <div className="features-list">
            {features.map((feature, i) => (
                <div key={i} className="feature-item">
                    <Check size={18} className="feature-check" />
                    <span>{feature}</span>
                </div>
            ))}
        </div>

        <button className={`btn btn-block ${popular ? 'btn-primary' : 'btn-outline'}`}>
            Get Started
        </button>
    </motion.div>
);

const TestimonialCard = ({ name, role, content }) => (
    <div className="testimonial-card">
        <div className="stars">
            {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
        </div>
        <p className="testimonial-content">"{content}"</p>
        <div className="testimonial-author">
            <div className="author-avatar">
                {name[0]}
            </div>
            <div>
                <div className="author-name">{name}</div>
                <div className="author-role">{role}</div>
            </div>
        </div>
    </div>
);

export default LandingPage;
