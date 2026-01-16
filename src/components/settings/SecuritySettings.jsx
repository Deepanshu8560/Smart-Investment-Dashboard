import React, { useState } from 'react';
import { Shield, Smartphone, EyeOff, Lock, AlertCircle } from 'lucide-react';

const SecuritySettings = () => {
    const [hidePortfolio, setHidePortfolio] = useState(false);
    const [autoLock, setAutoLock] = useState(true);

    return (
        <div className="space-y-6">
            <h3 className="section-title">Security & Privacy</h3>

            {/* Privacy Controls */}
            <div className="card p-6">
                <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <EyeOff className="text-primary" size={20} /> Privacy Controls
                </h4>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="font-medium">Hide Portfolio Values</div>
                            <div className="text-xs text-muted">Mask sensitive numbers on the dashboard</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" checked={hidePortfolio} onChange={() => setHidePortfolio(!hidePortfolio)} />
                            <div className="w-11 h-6 bg-surface-hover peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="font-medium">Auto-Lock App</div>
                            <div className="text-xs text-muted">Lock screen after 5 minutes of inactivity</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" checked={autoLock} onChange={() => setAutoLock(!autoLock)} />
                            <div className="w-11 h-6 bg-surface-hover peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                    </div>
                </div>
            </div>

            {/* Authentication (Simulated/Clerk Info) */}
            <div className="card p-6">
                <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <Lock className="text-primary" size={20} /> Authentication
                </h4>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-surface-hover border border-border">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-background rounded-full"><Smartphone size={16} /></div>
                            <div>
                                <div className="font-medium">2-Factor Authentication</div>
                                <div className="text-xs text-muted">Protect your account with OTP</div>
                            </div>
                        </div>
                        <button className="btn btn-sm btn-outline">Enable</button>
                    </div>

                    <div className="flex items-center gap-2 text-warning text-sm p-3 bg-warning/10 rounded-lg">
                        <AlertCircle size={16} />
                        Password changed 3 months ago. It's recommended to update it.
                    </div>

                    <div className="pt-2">
                        <button className="btn btn-secondary w-full">Change Password via Clerk</button>
                    </div>
                </div>
            </div>

            {/* Session Management */}
            <div className="card p-6">
                <h4 className="font-bold text-lg mb-4">Active Sessions</h4>
                <div className="flex items-center justify-between p-3 border-b border-border last:border-0">
                    <div>
                        <div className="font-medium">Windows PC - Chrome</div>
                        <div className="text-xs text-muted">Mumbai, India • Current Session</div>
                    </div>
                    <div className="text-success text-xs font-bold">Active</div>
                </div>
            </div>
        </div>
    );
};

export default SecuritySettings;
