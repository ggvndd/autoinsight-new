import React from 'react';
import { IndustryProvider } from '@/features/mockup/hooks/useIndustry';
import MockupShell from '@/features/mockup/components/MockupShell';
import MockupErrorBoundary from '@/features/mockup/components/MockupErrorBoundary';

const App: React.FC = () => (
    <MockupErrorBoundary>
        <IndustryProvider>
            <MockupShell />
        </IndustryProvider>
    </MockupErrorBoundary>
);

export default App;
