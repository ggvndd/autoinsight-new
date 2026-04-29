import React, { useState } from 'react';
import { motion } from 'framer-motion';
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

interface SceneProps {
    mode: 'explore' | 'loop';
}

const Scene5Simulator: React.FC<SceneProps> = () => {
    const sim = mockPolicySimulations[0];
    const [budget, setBudget] = useState(sim.baseline);
    const [isSimulating, setIsSimulating] = useState(false);

    const budgetDiff = budget - sim.baseline;
    const flwImpact = sim.impacts[0].baselineValue + (budgetDiff * sim.impacts[0].effectMultiplier);
    const panganImpact = sim.impacts[1].baselineValue + (budgetDiff * sim.impacts[1].effectMultiplier);

    const handleSimulate = () => {
        setIsSimulating(true);
        setTimeout(() => setIsSimulating(false), 800);
    };

    const labels = ['2024 (Baseline)', '2025', '2026', '2027', '2028', '2029 (Target)'];
    const baselineData = [1200, 1250, 1300, 1350, 1400, 1450];
    const simulatedData = [
        1200, 
        1250 + (budgetDiff * 2), 
        1300 + (budgetDiff * 5), 
        1350 + (budgetDiff * 9), 
        1400 + (budgetDiff * 12), 
        1450 + (budgetDiff * 15)
    ];

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Baseline Projection (Ton)',
                data: baselineData,
                borderColor: '#cbd5e1', // slate-300
                backgroundColor: 'rgba(241, 245, 249, 0.5)', // slate-100
                borderDash: [5, 5],
                fill: true,
                tension: 0.4,
            },
            {
                label: 'Simulated Projection (Ton)',
                data: simulatedData,
                borderColor: '#1D9E75', // orionTeal
                backgroundColor: 'rgba(29, 158, 117, 0.1)',
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
                grid: { color: 'rgba(0, 0, 0, 0.05)' },
                ticks: { color: '#64748b', font: { weight: 'bold' } }
            },
            x: {
                grid: { display: false },
                ticks: { color: '#64748b', font: { weight: 'bold' } }
            }
        },
        plugins: {
            legend: { labels: { color: '#334155', font: { weight: 'bold' } } }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.6 }}
            className="w-full h-full p-8 max-w-[1400px] mx-auto flex flex-col gap-8 pb-28"
        >
            <header className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-display font-bold text-slate-900 tracking-tight flex items-center gap-4">
                        <div className="p-2.5 bg-orionBlue/10 rounded-xl text-orionBlue">
                            <BrainCircuit className="w-8 h-8" />
                        </div>
                        Causal AI Policy Simulator
                    </h1>
                    <p className="text-slate-500 mt-2 text-lg font-medium">Simulate budget interventions and observe causal impacts on IKU targets.</p>
                </div>
            </header>

            <div className="flex gap-8 flex-col lg:flex-row min-h-[500px] flex-1">
                {/* Control Panel */}
                <div className="w-full lg:w-1/3 flex flex-col gap-6">
                    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl">
                        <h2 className="text-xl font-display font-bold text-slate-800 mb-6">Simulation Parameters</h2>
                        
                        <div className="space-y-8">
                            <div>
                                <label className="flex justify-between text-sm font-bold text-slate-500 mb-4">
                                    {sim.variable}
                                    <span className="text-orionBlue">Rp {budget} Miliar</span>
                                </label>
                                <input 
                                    type="range" 
                                    min="0" 
                                    max={sim.max} 
                                    step="10"
                                    value={budget}
                                    onChange={(e) => setBudget(parseInt(e.target.value))}
                                    className="w-full accent-orionBlue h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                                />
                                <div className="flex justify-between text-xs font-bold text-slate-400 mt-2">
                                    <span>Rp 0M</span>
                                    <span>Baseline: Rp {sim.baseline}M</span>
                                    <span>Rp {sim.max}M</span>
                                </div>
                            </div>

                            <button 
                                onClick={handleSimulate}
                                className="w-full bg-slate-900 hover:bg-slate-800 text-white px-4 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 group shadow-lg"
                            >
                                <Play size={18} className="text-orionYellow transition-colors" /> 
                                Run Simulation
                            </button>
                        </div>
                    </div>

                    {/* AI Causal Alerts */}
                    <div className="bg-white p-8 rounded-3xl border border-amber-200 shadow-xl relative overflow-hidden flex-1">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-bl-full pointer-events-none"></div>
                        <h2 className="text-xl font-display font-bold text-amber-600 mb-6 flex items-center gap-3">
                            <AlertTriangle size={22} />
                            Causal Risk Alerts
                        </h2>
                        <ul className="space-y-4">
                            {budget < sim.baseline && (
                                <li className="text-sm font-medium text-slate-700 bg-red-50 p-4 rounded-xl border border-red-200 border-l-4 border-l-red-500">
                                    <strong className="text-red-700 block mb-1">High Risk (89% Confidence)</strong>
                                    Penurunan anggaran di bawah baseline akan mengakibatkan gagalnya target IKU Penurunan Susut Pangan 2029.
                                </li>
                            )}
                            <li className="text-sm font-medium text-slate-700 bg-amber-50 p-4 rounded-xl border border-amber-200 border-l-4 border-l-amber-500 relative z-10">
                                <strong className="text-amber-700 block mb-1">Bottleneck Detected</strong>
                                Kenaikan anggaran di atas Rp 150M membutuhkan penambahan SDM Dinas Pangan Daerah. Dampak akan melandai (diminishing returns).
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Dashboard / Charts */}
                <div className="w-full lg:w-2/3 flex flex-col gap-6">
                    {/* KPI Cards */}
                    <div className="grid grid-cols-2 gap-6">
                        <div className="bg-white shadow-xl p-6 rounded-3xl border border-slate-200">
                            <h3 className="text-slate-500 font-bold text-xs uppercase tracking-widest mb-3">Penurunan Susut Pangan</h3>
                            <div className="flex items-baseline gap-3">
                                <span className="text-4xl font-display font-bold text-slate-900">{flwImpact.toFixed(1)}%</span>
                                <span className={`text-sm font-bold ${budget >= sim.baseline ? 'text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md' : 'text-red-600 bg-red-50 px-2 py-1 rounded-md'}`}>
                                    vs Baseline ({sim.impacts[0].baselineValue}%)
                                </span>
                            </div>
                        </div>
                        <div className="bg-white shadow-xl p-6 rounded-3xl border border-slate-200">
                            <h3 className="text-slate-500 font-bold text-xs uppercase tracking-widest mb-3">Pangan Terselamatkan (2029)</h3>
                            <div className="flex items-baseline gap-3">
                                <span className="text-4xl font-display font-bold text-slate-900">{panganImpact.toLocaleString()} Ton</span>
                                <span className={`text-sm font-bold ${budget >= sim.baseline ? 'text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md' : 'text-red-600 bg-red-50 px-2 py-1 rounded-md'}`}>
                                    vs Baseline ({sim.impacts[1].baselineValue})
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Main Chart */}
                    <div className="bg-white shadow-xl p-8 rounded-3xl border border-slate-200 flex-1 relative min-h-[300px]">
                        {isSimulating && (
                            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex items-center justify-center rounded-3xl">
                                <div className="text-orionBlue flex flex-col items-center gap-4">
                                    <ActivitySquare className="w-10 h-10 animate-spin" />
                                    <span className="font-bold tracking-widest uppercase text-sm">Computing Causal Graph...</span>
                                </div>
                            </div>
                        )}
                        <h3 className="text-slate-800 font-display font-bold text-lg mb-6">Proyeksi Jumlah Pangan Terselamatkan (Ton)</h3>
                        <div className="h-[85%]">
                            <Line data={chartData} options={chartOptions} />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Scene5Simulator;
