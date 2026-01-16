import React, { useState, useEffect } from 'react';
import { getPortfolio } from '../services/api';
import TradePanel from '../components/TradePanel';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { motion } from 'framer-motion';
import '../index.css';

const Portfolio = () => {
    const [portfolio, setPortfolio] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchPortfolio = async () => {
        const data = await getPortfolio();
        setPortfolio(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchPortfolio();
        const interval = setInterval(fetchPortfolio, 3000); // Polling for portfolio updates
        return () => clearInterval(interval);
    }, []);

    if (loading && !portfolio) return <div className="container py-6">Loading...</div>;

    const dataForPie = portfolio?.holdings?.map(h => ({ name: h.symbol, value: parseFloat(h.value) })) || [];
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

    return (
        <div className="portfolio-container container py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Simulation Panel */}
            <div className="col-span-1">
                <TradePanel
                    availableCash={portfolio?.cash}
                    onTradeComplete={fetchPortfolio}
                    availableHoldings={portfolio?.holdings}
                />
            </div>

            {/* Portfolio Overview */}
            <div className="col-span-1 lg:col-span-2 flex flex-col gap-6">
                <div className="card">
                    <h2 className="text-2xl font-bold mb-4">Portfolio Summary</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="p-4 bg-hover rounded-lg">
                            <p className="text-sm text-muted">Total Value</p>
                            <p className="text-2xl font-bold text-white">${portfolio?.totalValue?.toFixed(2)}</p>
                        </div>
                        <div className="p-4 bg-hover rounded-lg">
                            <p className="text-sm text-muted">Holdings Value</p>
                            <p className="text-2xl font-bold text-accent-secondary">${portfolio?.holdingsValue?.toFixed(2)}</p>
                        </div>
                        <div className="p-4 bg-hover rounded-lg">
                            <p className="text-sm text-muted">Cash Balance</p>
                            <p className="text-2xl font-bold text-success">${portfolio?.cash?.toFixed(2)}</p>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1 min-h-[300px]">
                            <h3 className="text-lg font-semibold mb-2">Allocation</h3>
                            {dataForPie.length > 0 ? (
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Pie
                                            data={dataForPie}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={100}
                                            fill="#8884d8"
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {dataForPie.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="text-center text-muted py-10">No holdings yet. Start trading!</div>
                            )}
                        </div>

                        <div className="flex-1">
                            <h3 className="text-lg font-semibold mb-2">Holdings</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-border text-muted text-sm">
                                            <th className="py-2">Symbol</th>
                                            <th className="py-2 text-right">Qty</th>
                                            <th className="py-2 text-right">Price</th>
                                            <th className="py-2 text-right">Value</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {portfolio?.holdings?.map((holding, index) => (
                                            <motion.tr
                                                key={holding.symbol}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                className="border-b border-border hover:bg-hover"
                                            >
                                                <td className="py-3 font-bold">{holding.symbol}</td>
                                                <td className="py-3 text-right">{holding.quantity}</td>
                                                <td className="py-3 text-right">${holding.currentPrice?.toFixed(2)}</td>
                                                <td className="py-3 text-right font-mono">${holding.value}</td>
                                            </motion.tr>
                                        ))}
                                    </tbody>
                                </table>
                                {portfolio?.holdings?.length === 0 && (
                                    <div className="text-center text-muted py-4">No assets found.</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default Portfolio;
