import React, { useState } from 'react';
import { TrendingUp, Target, PieChart, RefreshCw } from 'lucide-react';

const InvestmentSettings = () => {
    const [riskProfile, setRiskProfile] = useState('moderate');
    const [rebalance, setRebalance] = useState(true);

    return (
        <div className="space-y-6">
            <h3 className="section-title">Investment Preferences</h3>

            {/* Risk Profile */}
            <div className="card p-6">
                <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <TrendingUp className="text-primary" size={20} /> Risk Profile
                </h4>
                <div className="grid md:grid-cols-3 gap-4">
                    {['conservative', 'moderate', 'aggressive'].map((profile) => (
                        <div
                            key={profile}
                            onClick={() => setRiskProfile(profile)}
                            className={`cursor-pointer p-4 rounded-xl border-2 transition-all ${riskProfile === profile
                                    ? 'border-primary bg-primary/10'
                                    : 'border-border hover:border-primary/50'
                                }`}
                        >
                            <div className="capitalize font-bold mb-1">{profile}</div>
                            <div className="text-xs text-muted">
                                {profile === 'conservative' && 'Prioritizes stability over high returns.'}
                                {profile === 'moderate' && 'Balances growth and safety.'}
                                {profile === 'aggressive' && 'Maximizes growth with higher volatility.'}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Investment Goals */}
            <div className="card p-6">
                <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <Target className="text-primary" size={20} /> Investment Goals
                </h4>
                <div className="space-y-3">
                    {['Wealth Creation', 'Retirement Planning', 'Tax Saving', 'Short-term Gains'].map((goal) => (
                        <label key={goal} className="flex items-center gap-3 p-3 rounded-lg hover:bg-surface-hover transition-colors cursor-pointer">
                            <input type="checkbox" className="form-checkbox h-5 w-5 text-primary rounded" defaultChecked={goal === 'Wealth Creation'} />
                            <span>{goal}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Asset Allocation */}
            <div className="card p-6">
                <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <PieChart className="text-primary" size={20} /> Target Allocation
                </h4>

                <div className="space-y-4">
                    <div>
                        <div className="flex justify-between text-sm mb-1">
                            <span>Equity (Stocks)</span>
                            <span>60%</span>
                        </div>
                        <div className="w-full bg-surface-hover rounded-full h-2.5">
                            <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '60%' }}></div>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between text-sm mb-1">
                            <span>Debt (Bonds)</span>
                            <span>30%</span>
                        </div>
                        <div className="w-full bg-surface-hover rounded-full h-2.5">
                            <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '30%' }}></div>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between text-sm mb-1">
                            <span>Alternative (Gold/Crypto)</span>
                            <span>10%</span>
                        </div>
                        <div className="w-full bg-surface-hover rounded-full h-2.5">
                            <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '10%' }}></div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center gap-2">
                        <RefreshCw size={18} className="text-muted" />
                        <div>
                            <div className="font-medium text-sm">Auto-Rebalancing</div>
                            <div className="text-xs text-muted">Adjust portfolio quarterly</div>
                        </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={rebalance} onChange={() => setRebalance(!rebalance)} />
                        <div className="w-11 h-6 bg-surface-hover peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default InvestmentSettings;
