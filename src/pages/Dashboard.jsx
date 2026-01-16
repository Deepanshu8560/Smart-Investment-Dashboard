import React, { useState, useEffect } from 'react';

import { getMarketData } from '../services/api';
import ChartWidget from '../components/ChartWidget';
import { Activity, TrendingUp, DollarSign, BarChart3 } from 'lucide-react';
import '../index.css';



const Dashboard = () => {
    const [marketData, setMarketData] = useState([]);
    const [history, setHistory] = useState({}); // { symbol: [{time, price}] }
    const [layouts, setLayouts] = useState({
        lg: [
            { i: 'AAPL', x: 0, y: 0, w: 6, h: 4 },
            { i: 'GOOGL', x: 6, y: 0, w: 6, h: 4 },
            { i: 'AMZN', x: 0, y: 4, w: 4, h: 4 },
            { i: 'TSLA', x: 4, y: 4, w: 4, h: 4 },
            { i: 'MSFT', x: 8, y: 4, w: 4, h: 4 },
        ]
    });

    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        try {
            const data = await getMarketData();
            console.log("Fetched market data:", data); // Debug log
            if (data && data.length > 0) {
                setMarketData(data);
                updateHistory(data);
            }
            // eslint-disable-next-line no-unused-vars
        } catch (error) {
            console.error("Dashboard fetch error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const updateHistory = (data) => {
        const now = new Date().toLocaleTimeString();
        setHistory(prev => {
            const newHistory = { ...prev };
            data.forEach(stock => {
                if (!newHistory[stock.symbol]) newHistory[stock.symbol] = [];
                newHistory[stock.symbol] = [
                    ...newHistory[stock.symbol],
                    { time: now, price: stock.price }
                ].slice(-20); // Keep last 20 points
            });
            return newHistory;
        });
    };

    useEffect(() => {
        fetchData(); // Initial fetch
        const interval = setInterval(fetchData, 1000); // Poll every second
        return () => clearInterval(interval);
    }, []);

    const getStockData = (symbol) => {
        return history[symbol] || [];
    };

    const getStockInfo = (symbol) => {
        return marketData.find(s => s.symbol === symbol) || { price: 0, change: 0, name: symbol };
    };

    return (
        <div className="dashboard-container container py-6">
            <header className="mb-6 flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold mb-1">Market Overview</h2>
                    <p className="text-muted">Real-time market insights and analytics</p>
                </div>
                <div className="status-indicator flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
                    <span className="text-sm text-muted">Live Market Data</span>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {layouts.lg.map(item => {
                    const info = getStockInfo(item.i);
                    const isPositive = info.change >= 0;

                    return (
                        <div key={item.i} className="card dashboard-widget p-6 flex flex-col hover:border-primary/40 transition-all duration-300 group">
                            {/* Icon & Header */}
                            <div className="mb-4">
                                <div className="w-12 h-12 rounded-xl bg-gray-800/50 border border-gray-700/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                    {isPositive ?
                                        <TrendingUp className="text-emerald-500" size={24} /> :
                                        <Activity className="text-rose-500" size={24} />
                                    }
                                </div>
                                <h3 className="text-xl font-bold text-white mb-1">{info.name}</h3>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-mono text-gray-400">{item.i}</span>
                                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${isPositive ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                                        {isPositive ? '+' : ''}{info.change}%
                                    </span>
                                </div>
                            </div>

                            {/* Price Section */}
                            <div className="mb-6">
                                <div className="text-3xl font-bold text-white tracking-tight">
                                    ${info.price?.toFixed(2)}
                                </div>
                                <p className="text-sm text-gray-500 mt-1">Real-time market price</p>
                            </div>

                            {/* Chart Area - Auto Scale */}
                            <div className="flex-1 min-h-[120px] -mx-2">
                                <ChartWidget
                                    data={getStockData(item.i)}
                                    color={isPositive ? '#10b981' : '#f43f5e'}
                                    type="area"
                                    showAxes={false}
                                    height="100%"
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Dashboard;
