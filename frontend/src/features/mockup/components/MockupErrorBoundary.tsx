import React from 'react';

interface State { hasError: boolean; retryKey: number }

class MockupErrorBoundary extends React.Component<{ children: React.ReactNode }, State> {
    state: State = { hasError: false, retryKey: 0 };
    private timer: number | null = null;

    static getDerivedStateFromError(): State {
        return { hasError: true, retryKey: 0 };
    }

    componentDidCatch(error: unknown): void {
        // eslint-disable-next-line no-console
        console.error('Mockup runtime error — restarting loop', error);
        this.timer = window.setTimeout(() => {
            this.setState((s) => ({ hasError: false, retryKey: s.retryKey + 1 }));
        }, 1500);
    }

    componentWillUnmount(): void {
        if (this.timer !== null) window.clearTimeout(this.timer);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="fixed inset-0 flex items-center justify-center bg-orionSurface">
                    <div className="text-orionDark/60 text-[18px]">Resetting display…</div>
                </div>
            );
        }
        return <React.Fragment key={this.state.retryKey}>{this.props.children}</React.Fragment>;
    }
}

export default MockupErrorBoundary;
