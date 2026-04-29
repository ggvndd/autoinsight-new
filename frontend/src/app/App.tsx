import React from 'react';
import BappenasShell from '../features/bappenas/components/BappenasShell';
import MockupErrorBoundary from '../features/mockup/components/MockupErrorBoundary';

const App: React.FC = () => {
    return (
        <MockupErrorBoundary>
            <BappenasShell />
        </MockupErrorBoundary>
    );
};

export default App;
