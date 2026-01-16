import React from 'react';
import { FileText, Download, Database, Clock } from 'lucide-react';

const ReportSettings = () => {
    return (
        <div className="space-y-6">
            <h3 className="section-title">Reports & Data Management</h3>

            {/* Generate Reports */}
            <div className="card p-6">
                <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <FileText className="text-primary" size={20} /> Generate Reports
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="border border-border p-4 rounded-xl hover:border-primary/50 transition-colors">
                        <div className="font-bold mb-1">Tax Report (FY 2024-25)</div>
                        <p className="text-xs text-muted mb-4">Capital Gains, Dividends, and transaction summary.</p>
                        <button className="btn btn-sm btn-outline w-full flex items-center justify-center gap-2">
                            <Download size={16} /> Download PDF
                        </button>
                    </div>
                    <div className="border border-border p-4 rounded-xl hover:border-primary/50 transition-colors">
                        <div className="font-bold mb-1">Portfolio Statement</div>
                        <p className="text-xs text-muted mb-4">Detailed holdings and valuations.</p>
                        <button className="btn btn-sm btn-outline w-full flex items-center justify-center gap-2">
                            <Download size={16} /> Download Excel
                        </button>
                    </div>
                </div>
            </div>

            {/* Data Management */}
            <div className="card p-6">
                <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <Database className="text-primary" size={20} /> Data Retention & Backup
                </h4>
                <div className="space-y-4">
                    <div className="flex items-center gap-4 p-3 bg-surface-hover rounded-lg">
                        <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg">
                            <Clock size={20} />
                        </div>
                        <div className="flex-1">
                            <div className="font-medium">Automatic Cloud Backup</div>
                            <div className="text-xs text-muted">Data synced daily at 12:00 AM</div>
                        </div>
                        <div className="text-success text-xs font-bold">Enabled</div>
                    </div>

                    <button className="btn btn-outline text-danger hover:bg-danger hover:text-white border-danger/30 w-full">
                        Clear Local Cache
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReportSettings;
