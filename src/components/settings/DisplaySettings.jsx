import React, { useState } from 'react';
import { Monitor, Moon, Sun, Layout, Type } from 'lucide-react';

const DisplaySettings = () => {
    const [theme, setTheme] = useState('dark');
    const [fontSize, setFontSize] = useState('medium');

    React.useEffect(() => {
        const root = document.documentElement;

        const applyTheme = (targetTheme) => {
            if (targetTheme === 'dark') {
                root.setAttribute('data-theme', 'dark');
            } else if (targetTheme === 'light') {
                root.setAttribute('data-theme', 'light');
            }
        };

        if (theme === 'system') {
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            applyTheme(systemTheme);

            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            const handleChange = (e) => applyTheme(e.matches ? 'dark' : 'light');
            mediaQuery.addEventListener('change', handleChange);
            return () => mediaQuery.removeEventListener('change', handleChange);
        } else {
            applyTheme(theme);
        }
    }, [theme]);

    return (
        <div className="space-y-6">
            <h3 className="section-title">Dashboard & UI Customization</h3>

            {/* Theme Selection */}
            <div className="card p-6">
                <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <Monitor className="text-primary" size={20} /> App Theme
                </h4>
                <div className="space-y-3">
                    {[
                        { id: 'dark', label: 'Dark Mode', icon: Moon },
                        { id: 'light', label: 'Light Mode', icon: Sun },
                        { id: 'system', label: 'System Default', icon: Monitor }
                    ].map((item) => (
                        <div
                            key={item.id}
                            onClick={() => setTheme(item.id)}
                            className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${theme === item.id
                                ? 'border-primary bg-primary/5'
                                : 'border-transparent hover:bg-surface-hover'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-full ${theme === item.id ? 'bg-primary/20 text-primary' : 'bg-surface-hover text-muted-foreground'}`}>
                                    <item.icon size={20} />
                                </div>
                                <span className={`font-medium ${theme === item.id ? 'text-primary' : 'text-foreground'}`}>
                                    {item.label}
                                </span>
                            </div>

                            {/* Radio Slider Button */}
                            <div className={`radio-circle ${theme === item.id ? 'selected' : ''}`}></div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Layout Customization */}
            <div className="card p-6">
                <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <Layout className="text-primary" size={20} /> Dashboard Layout
                </h4>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="font-medium">Show Portfolio Summary</div>
                            <div className="text-xs text-muted">Display total value widget on top</div>
                        </div>
                        <input type="checkbox" className="toggle toggle-primary" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="font-medium">Compact Mode</div>
                            <div className="text-xs text-muted">Reduce padding and usage of space</div>
                        </div>
                        <input type="checkbox" className="toggle toggle-primary" />
                    </div>
                </div>
            </div>

            {/* Accessibility */}
            <div className="card p-6">
                <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <Type className="text-primary" size={20} /> Accessibility
                </h4>
                <div>
                    <label className="block text-sm font-medium mb-3">Font Size</label>
                    <div className="flex bg-surface-hover rounded-lg p-1">
                        {['small', 'medium', 'large'].map((size) => (
                            <button
                                key={size}
                                onClick={() => setFontSize(size)}
                                className={`flex-1 py-2 text-sm rounded-md capitalize transition-colors ${fontSize === size ? 'bg-surface shadow text-foreground font-bold' : 'text-muted hover:text-foreground'
                                    }`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DisplaySettings;
