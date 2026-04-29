export const mockMetadata = {
    source: "https://data.badanpangan.go.id/datasetpublications/9b2/jumlah-total-pangan-yang-terselamatkan",
    namaData: "Jumlah Total Pangan Yang Terselamatkan",
    kodeInstansi: "109",
    namaInstansi: "Badan Pangan Nasional",
    idDdp: "DDP-001-2026",
    namaDdp: "Ketahanan Pangan dan Gizi Nasional",
    sumberReferensi: "Direktorat Kewaspadaan Pangan dan Gizi",
    tahunTersedia: "2026",
    kodeSds: "SDS-BP-001",
    typeSds: "Kuantitatif",
    versiSds: "1.0",
    definisi: "Jumlah total pangan (dalam Ton) yang berhasil diselamatkan dari potensi susut dan sisa (food loss and waste) melalui berbagai program intervensi.",
    ukuran: "Ton",
    satuan: "Ton",
    klasifikasiPenyajian: "Provinsi, Kabupaten/Kota",
    kodeReferensi: "REF-PGN-2026",
    versiKodeReferensi: "1.0",
    metode: "Agregasi data laporan bulanan dari dinas urusan pangan daerah dan lembaga mitra Food Bank."
};

export const mockDashboardMetrics = {
    etlStatus: [
        { id: '1', name: 'PDF Extractor (Renstra)', status: 'active', processed: 1420, errors: 3 },
        { id: '2', name: 'CSV Pipeline (Satu Data)', status: 'active', processed: 84500, errors: 12 },
        { id: '3', name: 'Excel Crawler (On-Premise)', status: 'idle', processed: 450, errors: 0 },
    ],
    ingestion: {
        totalDocuments: 12450,
        satuDataRecords: 2450000,
        anomaliesDetected: 14,
    }
};

export const mockRagChatHistory = [
    {
        role: "user",
        content: "Berapa target penurunan Food Loss and Waste pada RPJMN 2025-2029?"
    },
    {
        role: "assistant",
        content: "Berdasarkan dokumen RPJMN 2025-2029 Bab Ketahanan Pangan, target penurunan Food Loss and Waste (FLW) ditetapkan sebesar **15% pada tahun 2029** dibandingkan baseline tahun 2024. Strategi utama mencakup optimalisasi logistik rantai dingin dan kampanye stop boros pangan.",
        citations: [
            { id: 1, title: "RPJMN 2025-2029 - Bab 4.pdf", page: 112 },
            { id: 2, title: "Renstra Badan Pangan Nasional 2025-2029.pdf", page: 45 }
        ]
    }
];

export const mockPolicySimulations = [
    {
        id: "sim-1",
        name: "Dampak Kenaikan Anggaran Logistik Rantai Dingin",
        variable: "Anggaran Bantuan Fasilitas Pendingin (Miliar Rp)",
        baseline: 50,
        current: 50,
        max: 200,
        impacts: [
            { kpi: "Penurunan Susut Pangan Pasca Panen", baselineValue: 5, unit: "%", effectMultiplier: 0.08 }, // +0.08% for every 1B
            { kpi: "Jumlah Pangan Terselamatkan", baselineValue: 1200, unit: "Ton", effectMultiplier: 15 } // +15 Ton for every 1B
        ]
    }
];
