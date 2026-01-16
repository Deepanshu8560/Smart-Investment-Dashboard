import React from 'react';
import { HelpCircle, MessageCircle, Mail, AlertTriangle } from 'lucide-react';

const HelpSupport = () => {
    return (
        <div className="space-y-6">
            <h3 className="section-title">Help & Feedback</h3>

            {/* Support Channels */}
            <div className="grid md:grid-cols-2 gap-4">
                <div className="card p-6 hover:border-primary/50 cursor-pointer transition-colors">
                    <MessageCircle className="text-primary mb-3" size={28} />
                    <h4 className="font-bold text-lg">Live Chat</h4>
                    <p className="text-muted text-sm mb-4">Chat with our support team (9 AM - 6 PM)</p>
                    <button className="btn btn-sm btn-primary w-full">Start Chat</button>
                </div>
                <div className="card p-6 hover:border-primary/50 cursor-pointer transition-colors">
                    <Mail className="text-primary mb-3" size={28} />
                    <h4 className="font-bold text-lg">Email Support</h4>
                    <p className="text-muted text-sm mb-4">Get response within 24 hours</p>
                    <button className="btn btn-sm btn-outline w-full">Send Email</button>
                </div>
            </div>

            {/* FAQs */}
            <div className="card p-6">
                <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <HelpCircle className="text-primary" size={20} /> Frequently Asked Questions
                </h4>
                <div className="space-y-2">
                    {[
                        'How do I reset my password?',
                        'How is my portfolio data secured?',
                        'Can I link multiple bank accounts?',
                        'What are the charges for mutual funds?'
                    ].map((faq, idx) => (
                        <div key={idx} className="p-3 bg-surface-hover rounded-lg text-sm font-medium cursor-pointer hover:bg-surface-hover/80">
                            {faq}
                        </div>
                    ))}
                </div>
            </div>

            {/* Danger Zone */}
            <div className="card p-6 border-danger/30">
                <h4 className="font-bold text-lg mb-2 text-danger flex items-center gap-2">
                    <AlertTriangle size={20} /> Danger Zone
                </h4>
                <p className="text-sm text-muted mb-4">
                    Once you delete your account, there is no going back. Please be certain.
                </p>
                <button className="btn btn-outline text-danger border-danger hover:bg-danger hover:text-white">Delete Account</button>
            </div>
        </div>
    );
};

export default HelpSupport;
