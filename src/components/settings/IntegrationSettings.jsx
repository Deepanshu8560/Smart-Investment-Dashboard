import React from 'react';
import { Link2, Plus, RefreshCw, Key, Copy } from 'lucide-react';

const IntegrationSettings = () => {
    return (
        <div className="space-y-6">
            <h3 className="section-title">Data & Integrations</h3>

            {/* Connected Accounts */}
            <div className="card p-6">
                <div className="flex justify-between items-center mb-4">
                    <h4 className="font-bold text-lg flex items-center gap-2">
                        <Link2 className="text-primary" size={20} /> Connected Brokers
                    </h4>
                    <button className="btn btn-sm btn-outline flex items-center gap-1">
                        <Plus size={16} /> Add Broker
                    </button>
                </div>

                <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-surface-hover border border-border">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-600/20 text-blue-500 flex items-center justify-center font-bold">Z</div>
                            <div>
                                <div className="font-medium">Zerodha (Kite)</div>
                                <div className="text-xs text-muted">Last synced: 2 mins ago</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-success text-xs font-bold flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-success"></span> Connected
                            </span>
                            <button className="btn btn-icon btn-ghost btn-sm" title="Sync Now">
                                <RefreshCw size={16} />
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg bg-surface-hover border border-border">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-indigo-600/20 text-indigo-500 flex items-center justify-center font-bold">U</div>
                            <div>
                                <div className="font-medium">Upstox</div>
                                <div className="text-xs text-muted">Sync failed: Invalid Token</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-danger text-xs font-bold flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-danger"></span> Error
                            </span>
                            <button className="btn btn-sm btn-secondary text-xs">Reconnect</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* API Access */}
            <div className="card p-6">
                <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <Key className="text-primary" size={20} /> API Access
                </h4>
                <p className="text-muted text-sm mb-4">
                    Use these keys to access your portfolio data programmatically. Do not share these keys.
                </p>

                <div className="bg-background-dark p-4 rounded-lg font-mono text-sm relative group border border-border">
                    <div className="text-muted text-xs mb-1">Public API Key</div>
                    <div className="break-all tracking-wide">pk_live_58923...92834</div>
                    <button className="absolute top-3 right-3 text-muted hover:text-foreground p-1 rounded transition-colors">
                        <Copy size={16} />
                    </button>
                </div>
                <div className="flex justify-end mt-4">
                    <button className="btn btn-secondary">Generate New Keys</button>
                </div>
            </div>
        </div>
    );
};

export default IntegrationSettings;
