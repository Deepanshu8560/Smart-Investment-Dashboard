import React, { useState } from 'react';
import {
    User, Shield, TrendingUp, Bell, Link as LinkIcon,
    Monitor, FileText, CreditCard, Scale, HelpCircle
} from 'lucide-react';
import ProfileSettings from '../components/settings/ProfileSettings';
import SecuritySettings from '../components/settings/SecuritySettings';
import InvestmentSettings from '../components/settings/InvestmentSettings';
import NotificationSettings from '../components/settings/NotificationSettings';
import IntegrationSettings from '../components/settings/IntegrationSettings';
import DisplaySettings from '../components/settings/DisplaySettings';
import ReportSettings from '../components/settings/ReportSettings';
import BillingSettings from '../components/settings/BillingSettings';
import LegalCompliance from '../components/settings/LegalCompliance';
import HelpSupport from '../components/settings/HelpSupport';

const Settings = () => {
    const [activeTab, setActiveTab] = useState('profile');

    const menuItems = [
        { id: 'profile', label: 'Account & Profile', icon: User, color: 'text-blue-500' },
        { id: 'security', label: 'Security & Privacy', icon: Shield, color: 'text-green-500' },
        { id: 'investment', label: 'Investment Preferences', icon: TrendingUp, color: 'text-purple-500' },
        { id: 'notifications', label: 'Notifications', icon: Bell, color: 'text-yellow-500' },
        { id: 'integrations', label: 'Data & Integrations', icon: LinkIcon, color: 'text-cyan-500' },
        { id: 'display', label: 'Dashboard & UI', icon: Monitor, color: 'text-pink-500' },
        { id: 'reports', label: 'Reports', icon: FileText, color: 'text-orange-500' },
        { id: 'billing', label: 'Subscription', icon: CreditCard, color: 'text-emerald-500' },
        { id: 'legal', label: 'Legal & Compliance', icon: Scale, color: 'text-gray-500' },
        { id: 'help', label: 'Help & Feedback', icon: HelpCircle, color: 'text-indigo-500' },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'profile': return <ProfileSettings />;
            case 'security': return <SecuritySettings />;
            case 'investment': return <InvestmentSettings />;
            case 'notifications': return <NotificationSettings />;
            case 'integrations': return <IntegrationSettings />;
            case 'display': return <DisplaySettings />;
            case 'reports': return <ReportSettings />;
            case 'billing': return <BillingSettings />;
            case 'legal': return <LegalCompliance />;
            case 'help': return <HelpSupport />;
            default: return <ProfileSettings />;
        }
    };

    return (
        <div className="container py-6 h-[calc(100vh-80px)]">


            <div className="grid lg:grid-cols-12 gap-6 h-full min-h-[600px]">
                {/* Sidebar Navigation */}
                <div className="lg:col-span-3">
                    <div className="h-full pr-4">
                        <nav className="space-y-1">
                            {menuItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = activeTab === item.id;
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveTab(item.id)}
                                        className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                                    >
                                        <Icon size={18} className="nav-icon" />
                                        <span>{item.label}</span>
                                        {isActive && (
                                            <div className="active-indicator"></div>
                                        )}
                                    </button>
                                );
                            })}
                        </nav>
                    </div>
                </div>

                {/* Content Area */}
                <div className="lg:col-span-9 h-full overflow-y-auto pr-2 pb-10">
                    <div className="p-1">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
