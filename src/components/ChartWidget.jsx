import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    AreaChart, Area
} from 'recharts';
import '../index.css';

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip" style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                padding: '8px 12px',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-md)'
            }}>
                <p className="label" style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginBottom: '4px' }}>{label}</p>
                <p className="price" style={{ color: 'var(--text-primary)', fontWeight: 'bold' }}>
                    ${payload[0].value.toFixed(2)}
                </p>
            </div>
        );
    }
    return null;
};

const ChartWidget = ({ title, data, dataKey = "price", color = "#3b82f6", type = "line", showAxes = false, height = "100%" }) => {
    return (
        <div className="chart-widget w-full" style={{ height }}>
            {title && (
                <div className="widget-header mb-2 flex justify-between items-center">
                    <h3 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>{title}</h3>
                </div>
            )}

            <div className="chart-container w-full h-full">
                <ResponsiveContainer width="100%" height="100%">
                    {type === 'area' ? (
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id={`color${dataKey}`} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                                    <stop offset="95%" stopColor={color} stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            {showAxes && <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} opacity={0.3} />}
                            <XAxis dataKey="time" hide />
                            <YAxis
                                domain={['auto', 'auto']}
                                orientation="right"
                                hide={!showAxes}
                                tick={{ fill: 'var(--text-secondary)', fontSize: 10 }}
                                axisLine={false}
                                tickLine={false}
                                width={showAxes ? 40 : 0}
                            />
                            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--border-color)', strokeWidth: 1 }} />
                            <Area
                                type="monotone"
                                dataKey={dataKey}
                                stroke={color}
                                fillOpacity={1}
                                fill={`url(#color${dataKey})`}
                                strokeWidth={2}
                                isAnimationActive={false}
                            />
                        </AreaChart>
                    ) : (
                        <LineChart data={data}>
                            {showAxes && <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} opacity={0.3} />}
                            <XAxis dataKey="time" hide />
                            <YAxis
                                domain={['auto', 'auto']}
                                orientation="right"
                                hide={!showAxes}
                                tick={{ fill: 'var(--text-secondary)', fontSize: 10 }}
                                axisLine={false}
                                tickLine={false}
                                width={showAxes ? 40 : 0}
                            />
                            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--border-color)', strokeWidth: 1 }} />
                            <Line
                                type="monotone"
                                dataKey={dataKey}
                                stroke={color}
                                strokeWidth={2}
                                dot={false}
                                isAnimationActive={false}
                            />
                        </LineChart>
                    )}
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ChartWidget;
