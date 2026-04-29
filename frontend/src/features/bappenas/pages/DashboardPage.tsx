import React from 'react';
import { mockDashboardMetrics } from '../../../mocks/bappenasData';
import { Activity, Database, FileText, AlertTriangle, ArrowRightCircle, CheckCircle2 } from 'lucide-react';

const DashboardPage: React.FC = () => {
    return (
        <div className="h-full w-full overflow-y-auto no-scrollbar p-8 flex flex-col gap-8 relative">
            <header className="mb-2">
                <h1 className="text-3xl font-display font-bold text-white tracking-tight">ETL & Data Pipeline</h1>
                <p className="text-slate-400 mt-2">Real-time monitoring of document ingestion and processing layers.</p>
            </header>

            {/* Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <MetricCard 
                    title="Total Docs Extracted" 
                    value={mockDashboardMetrics.ingestion.totalDocuments.toLocaleString()} 
                    icon={<FileText className="text-orionBlue w-6 h-6" />}
                    trend="+12% this week"
                />
                <MetricCard 
                    title="Satu Data Records" 
                    value={mockDashboardMetrics.ingestion.satuDataRecords.toLocaleString()} 
                    icon={<Database className="text-emerald-500 w-6 h-6" />}
                    trend="Synced 2 mins ago"
                />
                <MetricCard 
                    title="Anomalies Detected" 
                    value={mockDashboardMetrics.ingestion.anomaliesDetected.toString()} 
                    icon={<AlertTriangle className="text-orionYellow w-6 h-6" />}
                    trend="Requires validation"
                    alert
                />
            </div>

            {/* Pipelines */}
            <div>
                <h2 className="text-xl font-display font-semibold text-white mb-4 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-orionTeal" />
                    Active Processing Pipelines (Layer 3)
                </h2>
                <div className="grid grid-cols-1 gap-4">
                    {mockDashboardMetrics.etlStatus.map(pipeline => (
                        <div key={pipeline.id} className="glass-card p-5 rounded-2xl flex items-center justify-between group">
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${pipeline.status === 'active' ? 'bg-orionBlue/20 border border-orionBlue/30 text-orionBlue' : 'bg-slate-800 border border-slate-700 text-slate-500'}`}>
                                    {pipeline.status === 'active' ? <Activity className="w-6 h-6 animate-pulse" /> : <CheckCircle2 className="w-6 h-6" />}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white text-lg">{pipeline.name}</h3>
                                    <p className="text-sm text-slate-400">
                                        Processed: <span className="text-white">{pipeline.processed.toLocaleString()} records</span> 
                                        <span className="mx-2">•</span> 
                                        Errors: <span className={pipeline.errors > 0 ? "text-orionYellow" : "text-emerald-500"}>{pipeline.errors}</span>
                                    </p>
                                </div>
                            </div>
                            
                            {pipeline.status === 'active' && (
                                <div className="flex items-center gap-3">
                                    <div className="w-48 h-2 bg-slate-800 rounded-full overflow-hidden relative">
                                        <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-orionBlue to-orionTeal w-1/2 animate-pipeline-flow rounded-full"></div>
                                    </div>
                                    <span className="text-xs font-semibold text-orionTeal uppercase tracking-wider bg-orionTeal/10 px-2 py-1 rounded border border-orionTeal/20">Extracting...</span>
                                </div>
                            )}
                            {pipeline.status === 'idle' && (
                                <div className="flex items-center gap-3 text-slate-500">
                                    <span className="text-xs font-semibold uppercase tracking-wider bg-slate-800 px-2 py-1 rounded border border-slate-700">Idle</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Diagram Placeholder */}
            <div className="mt-4 glass-panel p-6 rounded-2xl border-dashed border-2 border-slate-700 bg-slate-900/20 flex flex-col items-center justify-center py-12">
                <ArrowRightCircle className="w-10 h-10 text-slate-600 mb-3" />
                <p className="text-slate-400 text-center font-medium">Data safely normalized and pushed to AI Analytics Layer (Layer 2).</p>
            </div>
        </div>
    );
};

const MetricCard = ({ title, value, icon, trend, alert = false }: any) => (
    <div className={`glass-card p-6 rounded-2xl flex flex-col relative overflow-hidden ${alert ? 'border-orionYellow/30 shadow-[0_0_15px_rgba(255,207,0,0.05)]' : ''}`}>
        {alert && <div className="absolute top-0 right-0 w-16 h-16 bg-orionYellow/10 blur-[20px] rounded-bl-full"></div>}
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-400 font-medium text-sm uppercase tracking-wider">{title}</h3>
            {icon}
        </div>
        <div className="text-4xl font-display font-bold text-white mb-2">{value}</div>
        <div className={`text-xs font-medium ${alert ? 'text-orionYellow' : 'text-emerald-400'}`}>{trend}</div>
    </div>
);

export default DashboardPage;
