import React from 'react';
import { CreditCard, Check, Star } from 'lucide-react';

const BillingSettings = () => {
    return (
        <div className="space-y-6">
            <h3 className="section-title">Subscription & Billing</h3>

            {/* Current Plan */}
            <div className="card p-6 border-primary/50 bg-primary/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Star size={100} />
                </div>
                <div className="relative z-10">
                    <div className="text-sm font-bold text-primary uppercase tracking-wider mb-2">Current Plan</div>
                    <div className="flex justify-between items-end">
                        <h4 className="text-3xl font-bold">Pro Investor</h4>
                        <span className="text-xl font-bold">$10<span className="text-sm font-normal text-muted">/mo</span></span>
                    </div>
                    <p className="text-muted mt-2 mb-4">Next billing date: <strong>Feb 15, 2026</strong> via Visa ending in 4242</p>
                    <div className="flex gap-3">
                        <button className="btn btn-primary">Manage Subscription</button>
                        <button className="btn btn-outline bg-surface">View Invoices</button>
                    </div>
                </div>
            </div>

            {/* Plan Features */}
            <div className="card p-6">
                <h4 className="font-bold text-lg mb-4">Your Plan Benefits</h4>
                <div className="grid md:grid-cols-2 gap-3">
                    {['Unlimited Watchlists', 'Real-time Market Data', 'Advanced Charting Tools', 'Priority Support', 'Tax Reports', 'Broker Sync'].map((feature) => (
                        <div key={feature} className="flex items-center gap-2 text-sm">
                            <div className="bg-success/20 text-success rounded-full p-1">
                                <Check size={12} strokeWidth={3} />
                            </div>
                            {feature}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BillingSettings;
