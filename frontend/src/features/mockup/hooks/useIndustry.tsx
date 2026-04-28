import React, { createContext, useContext, useMemo, useState } from 'react';
import type { IndustryDataset, IndustryKey } from '../types';
import shipping from '../data/industries/shipping.json';
import finance from '../data/industries/finance.json';
import fmcg from '../data/industries/fmcg.json';
import config from '../data/config.json';

const DATASETS: Record<IndustryKey, IndustryDataset> = {
    shipping: shipping as IndustryDataset,
    finance: finance as IndustryDataset,
    fmcg: fmcg as IndustryDataset,
};

interface IndustryContextValue {
    industry: IndustryKey;
    data: IndustryDataset;
    setIndustry: (i: IndustryKey) => void;
    options: { key: IndustryKey; label: string }[];
}

const IndustryContext = createContext<IndustryContextValue | null>(null);

export const IndustryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [industry, setIndustry] = useState<IndustryKey>(
        (config.activeIndustry as IndustryKey) ?? 'shipping',
    );

    const value = useMemo<IndustryContextValue>(() => ({
        industry,
        data: DATASETS[industry],
        setIndustry,
        options: [
            { key: 'shipping', label: 'Shipping & Oil/Gas' },
            { key: 'finance', label: 'Finance' },
            { key: 'fmcg', label: 'FMCG' },
        ],
    }), [industry]);

    return <IndustryContext.Provider value={value}>{children}</IndustryContext.Provider>;
};

export const useIndustry = (): IndustryContextValue => {
    const ctx = useContext(IndustryContext);
    if (!ctx) throw new Error('useIndustry must be used within IndustryProvider');
    return ctx;
};
