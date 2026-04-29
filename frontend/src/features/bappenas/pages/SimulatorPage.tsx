import React, { useState } from 'react';
import { mockPolicySimulations } from '../../../mocks/bappenasData';
import { ActivitySquare, AlertTriangle, Play, BrainCircuit } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const SimulatorPage: React.FC = () => {
    const sim = mockPolicySimulations[0];
    const [budget, setBudget] = useState(sim.baseline);
    const [isSimulating, setIsSimulating] = useState(false);

    // Calculate simulated impacts based on budget multiplier
    const budgetDiff = budget - sim.baseline;
    const flwImpact = sim.impacts[0].baselineValue + (budgetDiff * sim.impacts[0].effectMultiplier);
    const panganImpact = sim.impacts[1].baselineValue + (budgetDiff * sim.impacts[1].effectMultiplier);

    const handleSimulate = () => {
        setIsSimulating(true);
        setTimeout(() => setIsSimulating(false), 800);
    };

    // Chart Data
    const labels = ['2024 (Baseline)', '2025', '2026', '2027', '2028', '2029 (Target)'];
    const baselineData = [1200, 1250, 1300, 1350, 1400, 1450];
    const simulatedData = [
        1200, 
        1250 + (budgetDiff * 2), 
        1300 + (budgetDiff * 5), 
        1350 + (budgetDiff * 9), 
        1400 + (budgetDiff * 12), 
        1450 + (budgetDiff * 15) // max impact reached
    ];

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Baseline Projection (Ton)',
                data: baselineData,
                borderColor: 'rgba(100, 116, 139, 0.5)',
                backgroundColor: 'rgba(100, 116, 139, 0.1)',
                borderDash: [5, 5],
                fill: true,
                tension: 0.4,
            },
            {
                label: 'Simulated Projection (Ton)',
                data: simulatedData,
                borderColor: '#1D9E75', // orionTeal
                backgroundColor: 'rgba(29, 158, 117, 0.15)',
                fill: true,
                tension: 0.4,
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                grid: { color: 'rgba(255, 255, 255, 0.05)' },
                ticks: { color: '#94a3b8' }
            },
            x: {
                grid: { display: false },
                ticks: { color: '#94a3b8' }
            }
        },
        plugins: {
            legend: { labels: { color: '#e2e8f0' } }
        }
    };

    return (
        <div className="h-full w-full flex flex-col p-6 overflow-y-auto no-scrollbar">
            <header className="mb-6 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-display font-bold text-white tracking-tight flex items-center gap-3">
                        <BrainCircuit className="text-orionBlue w-8 h-8" />
                        Causal AI Policy Simulator
                    </h1>
                    <p className="text-slate-400 mt-1">Simulate budget interventions and observe causal impacts on IKU targets.</p>
                </div>
            </header>

            <div className="flex gap-6 flex-col lg:flex-row h-full">
                {/* Control Panel */}
                <div className="w-full lg:w-1/3 flex flex-col gap-6">
                    <div className="glass-panel p-6 rounded-2xl border-slate-700">
                        <h2 className="text-lg font-display font-semibold text-white mb-4">Simulation Parameters</h2>
                        
                        <div className="space-y-6">
                            <div>
                                <label className="flex justify-between text-sm font-medium text-slate-300 mb-2">
                                    {sim.variable}
                                    <span className="text-orionYellow font-bold">Rp {budget} Miliar</span>
                                </label>
                                <input 
                                    type="range" 
                                    min="0" 
                                    max={sim.max} 
                                    step="10"
                                    value={budget}
                                    onChange={(e) => setBudget(parseInt(e.target.value))}
                                    className="w-full accent-orionBlue h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                                />
                                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                                    <span>Rp 0M</span>
                                    <span>Baseline: Rp {sim.baseline}M</span>
                                    <span>Rp {sim.max}M</span>
                                </div>
                            </div>

                            <button 
                                onClick={handleSimulate}
                                className="w-full bg-orionBlue hover:bg-orionBlueDeep text-white px-4 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 group"
                            >
                                <Play size={16} className="group-hover:text-orionYellow transition-colors" /> 
                                Run Simulation
                            </button>
                        </div>
                    </div>

                    {/* AI Causal Alerts */}
                    <div className="glass-panel p-6 rounded-2xl border-orionYellow/30 bg-orionYellow/5 relative overflow-hidden flex-1">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-orionYellow/10 blur-[30px] rounded-bl-full pointer-events-none"></div>
                        <h2 className="text-lg font-display font-semibold text-orionYellow mb-4 flex items-center gap-2">
                            <AlertTriangle size={18} />
                            Causal Risk Alerts
                        </h2>
                        <ul className="space-y-4">
                            {budget < sim.baseline && (
                                <li className="text-sm text-slate-300 bg-black/20 p-3 rounded-lg border border-red-500/20 border-l-2 border-l-red-500">
                                    <strong className="text-red-400 block mb-1">High Risk (89% Confidence)</strong>
                                    Penurunan anggaran di bawah baseline akan mengakibatkan gagalnya target IKU Penurunan Susut Pangan 2029.
                                </li>
                            )}
                            <li className="text-sm text-slate-300 bg-black/20 p-3 rounded-lg border border-orionYellow/20 border-l-2 border-l-orionYellow">
                                <strong className="text-orionYellow block mb-1">Bottleneck Detected</strong>
                                Kenaikan anggaran di atas Rp 150M membutuhkan penambahan SDM Dinas Pangan Daerah. Dampak akan melandai (diminishing returns).
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Dashboard / Charts */}
                <div className="w-full lg:w-2/3 flex flex-col gap-6">
                    {/* KPI Cards */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="glass-card p-5 rounded-2xl border-slate-700">
                            <h3 className="text-slate-400 font-medium text-xs uppercase tracking-wider mb-2">Penurunan Susut Pangan</h3>
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-display font-bold text-white">{flwImpact.toFixed(1)}%</span>
                                <span className={`text-sm font-medium ${budget >= sim.baseline ? 'text-emerald-400' : 'text-red-400'}`}>
                                    vs Baseline ({sim.impacts[0].baselineValue}%)
                                </span>
                            </div>
                        </div>
                        <div className="glass-card p-5 rounded-2xl border-slate-700">
                            <h3 className="text-slate-400 font-medium text-xs uppercase tracking-wider mb-2">Pangan Terselamatkan (2029)</h3>
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-display font-bold text-white">{panganImpact.toLocaleString()} Ton</span>
                                <span className={`text-sm font-medium ${budget >= sim.baseline ? 'text-emerald-400' : 'text-red-400'}`}>
                                    vs Baseline ({sim.impacts[1].baselineValue})
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Main Chart */}
                    <div className="glass-panel p-6 rounded-2xl border-slate-700 flex-1 min-h-[300px] relative">
                        {isSimulating && (
                            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm z-10 flex items-center justify-center rounded-2xl">
                                <div className="text-orionBlue flex flex-col items-center gap-3">
                                    <ActivitySquare className="w-8 h-8 animate-spin" />
                                    <span className="font-medium tracking-widest uppercase text-xs">Computing Causal Graph...</span>
                                </div>
                            </div>
                        )}
                        <h3 className="text-slate-300 font-medium text-sm mb-4">Proyeksi Jumlah Pangan Terselamatkan (Ton)</h3>
                        <div className="h-[90%]">
                            <Line data={chartData} options={chartOptions} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SimulatorPage;
