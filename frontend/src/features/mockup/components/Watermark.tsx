import React from 'react';

const Watermark: React.FC<{ label?: string }> = ({ label = 'Orionex' }) => (
    <div
        className="pointer-events-none absolute left-6 top-6 z-50 flex items-center gap-2 select-none"
        aria-hidden="true"
    >
        <img
            src="https://storage.orionex.id/orionex-storage/orionex_tiny_white.png"
            alt={label}
            className="h-7 w-auto"
            style={{ filter: 'invert(1)' }}
        />
    </div>
);

export default Watermark;
