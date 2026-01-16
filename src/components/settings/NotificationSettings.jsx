import React, { useState } from 'react';
import { Bell, Zap, TrendingUp, Mail, MessageSquare, Smartphone } from 'lucide-react';

const NotificationSettings = () => {
    // Basic state toggles
    const [marketAlerts, setMarketAlerts] = useState(true);
    const [portfolioAlerts, setPortfolioAlerts] = useState(true);
    const [newsAlerts, setNewsAlerts] = useState(false);

    const [pushEnabled, setPushEnabled] = useState(true);
    const [emailEnabled, setEmailEnabled] = useState(true);
    const [smsEnabled, setSmsEnabled] = useState(false);

    return (
        <div className="space-y-6">
            <h3 className="section-title">Notifications & Alerts</h3>

            {/* Alert Preferences */}
            <div className="card p-6">
                <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <Zap className="text-primary" size={20} /> Alert Triggers
                </h4>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="font-medium">Market Volatility</div>
                            <div className="text-xs text-muted">Notify when watchlist stocks move {'>'} 5%</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" checked={marketAlerts} onChange={() => setMarketAlerts(!marketAlerts)} />
                            <div className="w-11 h-6 bg-surface-hover peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <div className="font-medium">Portfolio Performance</div>
                            <div className="text-xs text-muted">Daily profit/loss summary</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" checked={portfolioAlerts} onChange={() => setPortfolioAlerts(!portfolioAlerts)} />
                            <div className="w-11 h-6 bg-surface-hover peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <div className="font-medium">Market News</div>
                            <div className="text-xs text-muted">Breaking financial news & IPOs</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" checked={newsAlerts} onChange={() => setNewsAlerts(!newsAlerts)} />
                            <div className="w-11 h-6 bg-surface-hover peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                    </div>
                </div>
            </div>

            {/* Delivery Channels */}
            <div className="card p-6">
                <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <Bell className="text-primary" size={20} /> Delivery Channels
                </h4>
                <div className="grid md:grid-cols-3 gap-4">
                    <label className={`cursor-pointer p-4 rounded-xl border flex flex-col items-center text-center transition-all ${pushEnabled ? 'border-primary bg-primary/5' : 'border-border'}`}>
                        <input type="checkbox" className="hidden" checked={pushEnabled} onChange={() => setPushEnabled(!pushEnabled)} />
                        <span className={`p-3 rounded-full mb-3 ${pushEnabled ? 'bg-primary text-white' : 'bg-surface-hover text-muted'}`}>
                            <Smartphone size={20} />
                        </span>
                        <span className="font-bold text-sm">Push Notifications</span>
                        <span className="text-xs text-muted mt-1">Instant mobile alerts</span>
                    </label>

                    <label className={`cursor-pointer p-4 rounded-xl border flex flex-col items-center text-center transition-all ${emailEnabled ? 'border-primary bg-primary/5' : 'border-border'}`}>
                        <input type="checkbox" className="hidden" checked={emailEnabled} onChange={() => setEmailEnabled(!emailEnabled)} />
                        <span className={`p-3 rounded-full mb-3 ${emailEnabled ? 'bg-primary text-white' : 'bg-surface-hover text-muted'}`}>
                            <Mail size={20} />
                        </span>
                        <span className="font-bold text-sm">Email Digest</span>
                        <span className="text-xs text-muted mt-1">Daily & Weekly reports</span>
                    </label>

                    <label className={`cursor-pointer p-4 rounded-xl border flex flex-col items-center text-center transition-all ${smsEnabled ? 'border-primary bg-primary/5' : 'border-border'}`}>
                        <input type="checkbox" className="hidden" checked={smsEnabled} onChange={() => setSmsEnabled(!smsEnabled)} />
                        <span className={`p-3 rounded-full mb-3 ${smsEnabled ? 'bg-primary text-white' : 'bg-surface-hover text-muted'}`}>
                            <MessageSquare size={20} />
                        </span>
                        <span className="font-bold text-sm">SMS Alerts</span>
                        <span className="text-xs text-muted mt-1">Critical security OTPs only</span>
                    </label>
                </div>
            </div>

        </div>
    );
};

export default NotificationSettings;
