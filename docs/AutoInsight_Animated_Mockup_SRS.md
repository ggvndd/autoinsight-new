# Software Requirements Specification (SRS)
## AutoInsight — Animated Interactive Mockup
### For Startup Grind Conference 2026 Booth Display

---

**Document Version:** 1.0
**Prepared for:** PT Orionex Solusi Digital
**Prepared by:** Product Strategy, Orionex Solutions
**Date:** April 2026
**Classification:** Internal Use Only

---

## 1. Introduction

### 1.1 Purpose
This document specifies the functional and non-functional requirements for an animated, interactive web mockup of AutoInsight — Orionex Solutions' enterprise AI data intelligence platform. The mockup will be deployed as the primary visual asset at the Orionex booth during Startup Grind Conference 2026.

### 1.2 Scope
The mockup is a single-page interactive web application that demonstrates the end-to-end AutoInsight experience through five key flows: file upload with OCR extraction, transparent data pipeline processing, dashboard generation, natural language data querying ("Chat with Data"), and AI-driven business recommendations. It runs as an auto-playing loop by default but permits visitor interaction to explore specific flows on demand.

### 1.3 Intended Audience
- Design and engineering team building the mockup
- Booth staff operating the display during the conference
- Orionex leadership reviewing visual fidelity before production

### 1.4 Definitions & Acronyms
- **SRS:** Software Requirements Specification
- **OCR:** Optical Character Recognition
- **KPI:** Key Performance Indicator
- **RAG:** Retrieval-Augmented Generation
- **Loop Mode:** Auto-playing demonstration mode with no user input
- **Explore Mode:** Interactive mode triggered when a visitor taps or clicks

---

## 2. Overall Description

### 2.1 Product Perspective
The mockup is a standalone demonstration artifact. It does not connect to the production AutoInsight backend. All data, processing animations, and AI responses are pre-scripted and simulated for visual impact and narrative clarity. The mockup runs in a modern browser on a touchscreen display or laptop positioned at the booth.

### 2.2 Product Functions
1. Auto-playing narrative loop showcasing the full AutoInsight journey in approximately 90 seconds.
2. Visitor-triggered exploration mode allowing manual navigation between flows.
3. Visual demonstration of the "any file in, insights out" value proposition.
4. Transparent pipeline visualization that differentiates AutoInsight from black-box competitors.
5. Simulated Chat with Data interaction using pre-scripted queries and responses.

### 2.3 User Classes
- **Passive viewer:** Conference attendees observing the looping display from a distance.
- **Engaged visitor:** Attendees who approach the booth and interact with the display.
- **Booth operator:** Orionex staff who may reset, pause, or demo specific flows.

### 2.4 Operating Environment
- Modern browsers (Chrome, Edge, Safari — latest two major versions).
- Desktop or touchscreen display with minimum 1920×1080 resolution.
- Offline-capable (no external API calls required during the event).
- Optimized for 16:9 horizontal orientation; fallback layout for 9:16 vertical.

### 2.5 Design Constraints
- Must reflect AutoInsight's established visual identity: primary blue (#185FA5) with teal accent (#1D9E75), white surfaces, flat modern aesthetic.
- No third-party branding or logos.
- All copy in English (primary) with provision for Bahasa Indonesia toggle as a stretch goal.
- Loop duration must not exceed 90 seconds before resetting.

### 2.6 Assumptions & Dependencies
- Booth will have stable power and a dedicated display.
- Visual assets (logos, fonts, iconography) will be provided by the brand team.
- Realistic but fictional sample data will be created for the shipping/oil & gas use case, aligned with the KKKS Migas pilot narrative.

---

## 3. Functional Requirements

### 3.1 Scene 1 — The Problem (Duration: ~8 seconds)

**FR-1.1** The mockup shall open with a minimal screen showing scattered business artifacts: PDF icons, spreadsheet thumbnails, scanned invoice images, and handwritten note icons animating in from the edges of the screen.

**FR-1.2** The elements shall visually "clutter" the screen, conveying the pain of fragmented, unstructured data.

**FR-1.3** A tagline shall fade in centrally: *"Your business data is everywhere. But nowhere."*

**FR-1.4** Transition to Scene 2 shall occur via a smooth sweep animation that gathers all scattered elements toward a single focal point.

### 3.2 Scene 2 — Upload Any File (Duration: ~12 seconds)

**FR-2.1** The mockup shall display a clean upload interface centered on screen, with a dashed drop zone and the label "Drop any file — or any data source."

**FR-2.2** An animated cursor (in Loop Mode) shall drag and drop four file types in sequence into the drop zone:
- A PDF invoice (filename: `invoice_SUPPLIER_2026.pdf`)
- A scanned receipt image (filename: `receipt_scan.jpg`)
- An Excel logbook (filename: `vessel_daily_log.xlsx`)
- A Word document (filename: `contract_addendum.docx`)

**FR-2.3** Each file drop shall trigger a brief upload progress animation (1.5 seconds) with a green checkmark on completion.

**FR-2.4** A small side panel shall display connected data sources as additional input options: "Database", "Airtable", "URL import", "Email ingestion" — indicating breadth beyond file upload.

**FR-2.5** In Explore Mode, the visitor shall be able to click any file icon to see a magnified preview of its contents.

### 3.3 Scene 3 — Data Pipeline Transparency (Duration: ~18 seconds)

**FR-3.1** The mockup shall transition to a horizontal pipeline view with four clearly labeled stages connected by flowing data particles:
1. **OCR & Extraction** — reading the uploaded files
2. **Data Sanitation** — cleaning, validating, deduplicating
3. **Structuring** — mapping to the data template
4. **Processing Pipeline** — user-configured transformations

**FR-3.2** Each stage shall illuminate in sequence with a subtle animation (teal glow effect) as data flows through it.

**FR-3.3** Each stage shall display a small status indicator:
- Files processed count (e.g., "4 files → 127 rows extracted")
- Validation status (e.g., "0 errors, 3 warnings handled")
- Fields identified (e.g., "Vendor, Date, Amount, Tax ID")

**FR-3.4** A transparency callout shall appear mid-animation: *"Every step is visible. No black box."* — differentiating AutoInsight from opaque AI competitors.

**FR-3.5** In Explore Mode, clicking any stage shall expand a detail panel showing the specific operations performed (e.g., clicking OCR shows "Layout-Aware OCR: tables preserved, tax IDs extracted").

### 3.4 Scene 4 — Dashboard Generation (Duration: ~18 seconds)

**FR-4.1** The mockup shall transition to a blank dashboard canvas with the label "Building your dashboard…" which then animates into a populated dashboard.

**FR-4.2** The dashboard shall assemble itself with the following components appearing in sequence:
- Top-row KPI cards (4 cards): Fuel Efficiency, Utilization Rate, Safety Compliance, Operational Cost
- Primary chart: Fuel Consumption vs Weather (bar chart, animated bars rising)
- Secondary chart: Engine Running Hours distribution (stacked bar)
- Tertiary chart: Route efficiency map (simplified geographic visualization)
- Data table: recent vessel log entries (rows fading in)

**FR-4.3** The dashboard shall use realistic-looking but fictional data aligned with the shipping/maritime industry context (vessel names, Indonesian port names, plausible numbers).

**FR-4.4** A floating annotation shall highlight: *"From 15 hours of manual reporting — to this."* with a subtle animation.

**FR-4.5** In Explore Mode, visitors shall be able to hover over charts to see tooltip interactions (simulated; not dynamic).

### 3.5 Scene 5 — Chat with Data (Duration: ~20 seconds)

**FR-5.1** A chat interface panel shall slide in from the right side of the dashboard, positioned like a sidebar.

**FR-5.2** A simulated user message shall type itself into the input field character by character (typewriter effect): *"Why is Vessel 3's fuel consumption higher this month?"*

**FR-5.3** After a brief processing indicator ("AutoInsight is analyzing…" with animated dots), the AI response shall stream in word by word.

**FR-5.4** The AI response shall reference specific data points visible on the dashboard, demonstrating grounded retrieval:
*"Vessel 3's fuel consumption is 18% above average this month. Analysis of the voyage logs shows three contributing factors: rough sea conditions on routes to Balikpapan (7 days), extended port waiting time at Tanjung Priok (average 14 hours vs fleet average 6 hours), and one documented engine maintenance delay."*

**FR-5.5** Relevant chart elements on the dashboard shall highlight in sync with the response (e.g., the Vessel 3 bar pulses when mentioned, the weather chart highlights rough sea data).

**FR-5.6** In Explore Mode, a set of pre-scripted follow-up questions shall appear as clickable chips:
- "What can we do about port delays?"
- "Show me the cost impact"
- "Compare with last quarter"

### 3.6 Scene 6 — AI Business Recommendations (Duration: ~12 seconds)

**FR-6.1** The mockup shall transition to a "Recommendations" view showing three prioritized action cards.

**FR-6.2** Each card shall display:
- A priority tag (High / Medium / Low) with semantic color
- A concise recommendation headline
- An estimated impact metric
- A "Why this matters" one-liner grounded in the analyzed data

**FR-6.3** Example recommendations:
1. **High priority** — "Renegotiate port slot allocation at Tanjung Priok" | Estimated impact: 11% reduction in idle time | Based on: 28 days of port log data.
2. **Medium priority** — "Schedule Vessel 3 preventive maintenance before Q3" | Estimated impact: avoid 4-day unplanned downtime | Based on: engine hours and maintenance history.
3. **Medium priority** — "Adjust route planning during monsoon window" | Estimated impact: 6% fuel savings | Based on: weather correlation across 12 months.

**FR-6.4** A causal chain indicator shall appear briefly to emphasize the Causal Inference Engine: *"Not just correlation — causation."*

### 3.7 Scene 7 — Closing (Duration: ~4 seconds)

**FR-7.1** The mockup shall fade to a clean closing screen displaying the AutoInsight wordmark, the Orionex logo, and the tagline: *"Any file in. Insights out."*

**FR-7.2** A subtle call-to-action shall appear: *"Visit orionex.id"* or *"Talk to our team at the booth."*

**FR-7.3** The closing shall hold for 4 seconds before looping back to Scene 1.

### 3.8 Loop & Interaction Controls

**FR-8.1** The mockup shall run in auto-playing Loop Mode by default with no user input required.

**FR-8.2** A tap or click anywhere on the screen shall pause the loop and enter Explore Mode.

**FR-8.3** Explore Mode shall display a simple navigation bar at the bottom with scene-jump buttons (1 through 7) and a "Resume Loop" control.

**FR-8.4** After 30 seconds of inactivity in Explore Mode, the mockup shall automatically resume the loop from Scene 1.

**FR-8.5** A small, unobtrusive "Orionex" watermark shall remain visible in the top-left corner at all times.

---

## 4. Non-Functional Requirements

### 4.1 Performance
**NFR-1** Initial load time shall not exceed 2 seconds on a standard booth laptop.
**NFR-2** All animations shall maintain 60 frames per second on modern hardware.
**NFR-3** The mockup shall run for at least 8 continuous hours without memory leaks or degraded performance.

### 4.2 Usability
**NFR-4** All on-screen text shall be legible from a distance of 2 meters (minimum font size 18px for body, 28px for headlines at 1080p).
**NFR-5** Color contrast shall meet WCAG AA standards.
**NFR-6** Interaction affordances (clickable elements in Explore Mode) shall be visually obvious without instruction.

### 4.3 Visual Design
**NFR-7** The mockup shall use the Orionex brand palette: Primary Blue (#185FA5), Accent Teal (#1D9E75), Neutral Dark (#2C2C2A), Clean background (#FFFFFF or #F7F8FA).
**NFR-8** Typography shall be modern sans-serif (Inter or Plus Jakarta Sans preferred).
**NFR-9** All animations shall be smooth, purposeful, and avoid gratuitous motion that distracts from the narrative.
**NFR-10** The visual density shall feel enterprise-grade — clean, confident, not startup-ish.

### 4.4 Reliability
**NFR-11** The mockup shall recover automatically from any runtime error and restart the loop.
**NFR-12** The mockup shall work fully offline; no network calls shall be made during display.

### 4.5 Maintainability
**NFR-13** Scene durations, sample data, and chat responses shall be configurable via a single JSON configuration file, allowing last-minute content updates without code changes.
**NFR-14** The codebase shall use React (functional components with hooks) for interactive logic and CSS animations or Framer Motion for transitions.

### 4.6 Compatibility
**NFR-15** The mockup shall be a single-file distributable (bundled HTML with inlined CSS and JS) that can be opened by double-clicking, or deployed as a static site.

---

## 5. Data Requirements

### 5.1 Sample Data Set
The mockup shall include a fictional but realistic dataset representing a shipping/oil & gas operation. The data is presented as the pre-processed output of AutoInsight, not real-time data.

**Core entities:**
- **Vessels:** 5 vessels with names (e.g., "MV Samudera Jaya", "MV Bahari Nusa"), types, and operational status.
- **Voyages:** 30 days of voyage logs with origin/destination ports, duration, fuel consumed, weather conditions.
- **Ports:** 8 Indonesian ports (Tanjung Priok, Tanjung Perak, Balikpapan, Makassar, Belawan, Banjarmasin, Samarinda, Bitung).
- **Crew entries:** Engine running hours, operational mode, safety drill compliance per voyage.

### 5.2 Chat Scripts
Pre-scripted user queries and corresponding AI responses shall be stored as a JSON array. Minimum of 3 query/response pairs for Loop Mode; 5-8 additional pairs available in Explore Mode.

### 5.3 Recommendation Cards
A JSON array of 3-5 recommendation cards with priority, headline, impact estimate, and data basis.

---

## 6. User Interaction Flow

### 6.1 Loop Mode Sequence
Scene 1 (8s) → Scene 2 (12s) → Scene 3 (18s) → Scene 4 (18s) → Scene 5 (20s) → Scene 6 (12s) → Scene 7 (4s) → Loop restart.

Total loop duration: approximately 92 seconds.

### 6.2 Explore Mode Triggers
- Tap/click on screen → pauses loop, shows navigation bar, highlights currently visible scene.
- Click chat chip → triggers alternate chat response sequence.
- Click pipeline stage → expands detail panel.
- Inactivity timeout (30s) → automatic return to Loop Mode from Scene 1.

---

## 7. Acceptance Criteria

The mockup shall be considered complete when:

1. All 7 scenes render correctly in sequence within the specified durations (±2 seconds each).
2. All 5 specified AutoInsight flows are demonstrated clearly.
3. Loop Mode runs continuously for at least 1 hour without errors or visual artifacts.
4. Explore Mode allows free navigation between all 7 scenes.
5. Visual design adheres to the Orionex brand specifications.
6. All sample data is internally consistent (numbers in dashboard match numbers cited in chat responses).
7. The mockup loads offline from a single distributable file.
8. Playback is smooth on the target booth hardware (minimum 60fps).
9. Copy is free of typos, in professional English, and reflects the AutoInsight value proposition accurately.
10. The Orionex watermark is consistently visible without being intrusive.

---

## 8. Out of Scope

The following are explicitly not part of this mockup:

- Real-time data ingestion from actual files or databases.
- Genuine AI inference or LLM integration (all chat responses are pre-scripted).
- User authentication, multi-tenant simulation, or data persistence.
- Mobile-responsive layouts beyond the 9:16 fallback for vertical displays.
- Multi-language support beyond English (Bahasa Indonesia is a stretch goal).
- Sound effects or background audio (the booth will have a separate narrative video with audio).
- Real backend integration with AutoInsight's production systems.

---

## 9. Appendices

### Appendix A — Scene Timing Summary

| Scene | Name | Duration | Primary Flow |
|-------|------|----------|--------------|
| 1 | The Problem | 8s | Contextual setup |
| 2 | Upload Any File | 12s | File upload + OCR |
| 3 | Data Pipeline | 18s | Pipeline transparency |
| 4 | Dashboard Generation | 18s | Auto-generated dashboards |
| 5 | Chat with Data | 20s | Natural language query |
| 6 | Recommendations | 12s | AI business recommendations |
| 7 | Closing | 4s | Brand close |
| — | **Total** | **~92s** | Full loop |

### Appendix B — Key Messaging

- **Hero message:** "Any file in. Insights out."
- **Differentiator message:** "Every step is visible. No black box."
- **Outcome message:** "From 15 hours of manual reporting — to this."
- **Causation message:** "Not just correlation — causation."
- **Closing message:** "Orionex. Igniting limitless growth."

### Appendix C — Visual Reference
Booth deployment should mirror the aesthetic of the AutoInsight product overview deck: deep navy accents, clean white surfaces, confident typography, and a clear information hierarchy. The mockup should feel like a glimpse of the actual product, not a prototype.

---

**— End of SRS Document —**
