export type SceneMode = 'loop' | 'explore';

export interface SceneComponentProps {
    mode: SceneMode;
    onComplete?: () => void;
}

export type IndustryKey = 'shipping' | 'finance' | 'fmcg';

export interface KPICard {
    label: string;
    value: string;
    delta: string;
    tone: 'positive' | 'negative' | 'neutral';
}

export interface ChartSeries {
    label: string;
    data: number[];
    highlight?: number[];
}

export interface ChartSpec {
    type: 'bar' | 'stackedBar' | 'line';
    title: string;
    xLabels: string[];
    series: ChartSeries[];
    unit?: string;
}

export interface TableSpec {
    columns: string[];
    rows: (string | number)[][];
}

export interface MapPoint {
    name: string;
    lat: number;
    lng: number;
    weight?: number;
    highlight?: boolean;
}

export interface ChatScript {
    userQuery: string;
    aiResponse: string;
    highlightTargets?: string[];
    followUps?: string[];
}

export interface Recommendation {
    priority: 'High' | 'Medium' | 'Low';
    headline: string;
    impact: string;
    rationale: string;
}

export interface IndustryDataset {
    key: IndustryKey;
    displayName: string;
    context: string;
    kpis: KPICard[];
    primaryChart: ChartSpec;
    secondaryChart: ChartSpec;
    mapTitle: string;
    mapPoints: MapPoint[];
    table: TableSpec;
    dashboardAnnotation: string;
    chatScripts: ChatScript[];
    recommendations: Recommendation[];
}
