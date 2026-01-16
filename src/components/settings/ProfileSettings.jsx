import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Shield, Upload, CheckCircle, AlertTriangle } from 'lucide-react';

const ProfileSettings = () => {
    const { user } = useAuth();

    return (
        <div className="space-y-6">
            <h3 className="section-title">Account & Profile</h3>

            {/* Profile Header */}
            <div className="card p-6 flex flex-col items-center sm:flex-row sm:items-start gap-6">
                <div className="relative">
                    <img
                        src={user?.avatar || "https://ui-avatars.com/api/?name=User&background=random"}
                        alt="Profile"
                        className="w-24 h-24 rounded-full border-4 border-surface shadow-lg"
                    />
                    <button className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors shadow-md">
                        <Upload size={16} />
                    </button>
                </div>

                <div className="flex-1 text-center sm:text-left space-y-2">
                    <h4 className="text-2xl font-bold">{user?.name || "Guest User"}</h4>
                    <p className="text-muted">{user?.email || "guest@example.com"}</p>
                    <div className="flex flex-wrap gap-2 justify-center sm:justify-start mt-2">
                        <span className="badge bg-success/10 text-success border-success/20 px-3 py-1 rounded-full text-xs font-medium">Active</span>
                        <span className="badge bg-primary/10 text-primary border-primary/20 px-3 py-1 rounded-full text-xs font-medium">Pro Plan</span>
                    </div>
                </div>

                <button className="btn btn-outline text-sm">Edit Profile</button>
            </div>

            {/* KYC Status Section */}
            <div className="card p-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h4 className="font-bold text-lg flex items-center gap-2">
                            <Shield className="text-primary" size={20} /> KYC Verification
                        </h4>
                        <p className="text-muted text-sm">Complete your Know Your Customer verification to unlock all features.</p>
                    </div>
                    <span className="badge bg-warning/20 text-warning border-warning/40 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                        <AlertTriangle size={14} /> Pending
                    </span>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div className="p-4 rounded-lg bg-surface-hover border border-border">
                        <div className="text-sm text-muted mb-1">PAN Card</div>
                        <div className="font-mono">ABC*****123</div>
                        <div className="text-success text-xs flex items-center gap-1 mt-1"><CheckCircle size={12} /> Verified</div>
                    </div>
                    <div className="p-4 rounded-lg bg-surface-hover border border-border">
                        <div className="text-sm text-muted mb-1">Aadhaar</div>
                        <div className="font-mono">**** **** 9087</div>
                        <div className="text-success text-xs flex items-center gap-1 mt-1"><CheckCircle size={12} /> Verified</div>
                    </div>

                </div>
            </div>


        </div>
    );
};

export default ProfileSettings;
