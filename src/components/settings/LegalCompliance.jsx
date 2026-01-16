import React from 'react';
import { Scale, FileText, ExternalLink } from 'lucide-react';

const LegalCompliance = () => {
    return (
        <div className="space-y-6">
            <h3 className="section-title">Legal & Compliance</h3>

            <div className="card p-6">
                <div className="space-y-4">
                    {[
                        { title: 'Terms of Service', date: 'Last updated: Jan 2025' },
                        { title: 'Privacy Policy', date: 'Last updated: Dec 2024' },
                        { title: 'Risk Disclosure', date: 'Important Read' },
                        { title: 'Data Processing Agreement', date: 'GDPR Compliant' }
                    ].map((doc, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 rounded-lg hover:bg-surface-hover cursor-pointer border border-transparent hover:border-border transition-all">
                            <div className="flex items-center gap-3">
                                <FileText className="text-muted" size={20} />
                                <div>
                                    <div className="font-medium">{doc.title}</div>
                                    <div className="text-xs text-muted">{doc.date}</div>
                                </div>
                            </div>
                            <ExternalLink size={16} className="text-muted" />
                        </div>
                    ))}
                </div>
            </div>

            <div className="card p-6 bg-surface-hover">
                <h4 className="font-bold mb-2 flex items-center gap-2">
                    <Scale size={18} /> Regulatory Status
                </h4>
                <p className="text-sm text-muted">
                    SmartInvest is a registered investment advisor with SEBI (Reg No: INA000012345).
                    All investment advice is provided in accordance with applicable laws and regulations.
                </p>
            </div>
        </div>
    );
};

export default LegalCompliance;
