import React, { useState } from 'react';
import { executeTrade } from '../services/api';
import { DollarSign, Activity } from 'lucide-react';
import '../index.css';

const TradePanel = ({ availableCash, onTradeComplete, availableHoldings }) => {
    const [symbol, setSymbol] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [type, setType] = useState('buy');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleTrade = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const result = await executeTrade({ symbol: symbol.toUpperCase(), quantity, type });
            setSuccess(`Successfully ${type === 'buy' ? 'bought' : 'sold'} ${quantity} shares of ${symbol.toUpperCase()}`);
            setSymbol('');
            setQuantity(1);
            if (onTradeComplete) onTradeComplete();
        } catch (err) {
            setError(err.response?.data?.error || 'Trade failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card h-full">
            <div className="flex items-center gap-2 mb-4">
                <Activity size={20} color="var(--accent-primary)" />
                <h3 className="text-lg font-bold">Trade Simulation</h3>
            </div>

            <div className="mb-4 p-3 bg-secondary rounded-lg border border-border">
                <p className="text-sm text-muted">Available Cash</p>
                <div className="text-xl font-mono text-success flex items-center">
                    <DollarSign size={16} />
                    {availableCash?.toFixed(2)}
                </div>
            </div>

            <form onSubmit={handleTrade} className="flex flex-col gap-4">
                <div>
                    <label className="block text-sm text-muted mb-1">Type</label>
                    <div className="flex gap-2">
                        <button
                            type="button"
                            className={`flex-1 p-2 rounded-md font-medium transition-colors ${type === 'buy' ? 'bg-success text-white' : 'bg-hover text-muted'}`}
                            onClick={() => setType('buy')}
                        >
                            Buy
                        </button>
                        <button
                            type="button"
                            className={`flex-1 p-2 rounded-md font-medium transition-colors ${type === 'sell' ? 'bg-danger text-white' : 'bg-hover text-muted'}`}
                            onClick={() => setType('sell')}
                        >
                            Sell
                        </button>
                    </div>
                </div>

                <div>
                    <label className="block text-sm text-muted mb-1">Symbol</label>
                    <input
                        type="text"
                        value={symbol}
                        onChange={(e) => setSymbol(e.target.value)}
                        className="w-full p-2 rounded-md bg-hover border border-border focus:border-accent outline-none text-white uppercase"
                        placeholder="e.g. AAPL"
                        required
                        list="stock-symbols"
                    />
                    <datalist id="stock-symbols">
                        <option value="AAPL" />
                        <option value="GOOGL" />
                        <option value="AMZN" />
                        <option value="TSLA" />
                        <option value="MSFT" />
                        <option value="BARC" />
                    </datalist>
                </div>

                <div>
                    <label className="block text-sm text-muted mb-1">Quantity</label>
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                        className="w-full p-2 rounded-md bg-hover border border-border focus:border-accent outline-none text-white"
                        min="1"
                        required
                    />
                </div>

                {error && <div className="text-danger text-sm">{error}</div>}
                {success && <div className="text-success text-sm">{success}</div>}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full p-2 mt-2 bg-accent-primary hover:bg-accent-secondary text-white rounded-md font-bold transition-all disabled:opacity-50"
                >
                    {loading ? 'Processing...' : 'Execute Order'}
                </button>
            </form>
        </div>
    );
};

export default TradePanel;
