# Orionex Solutions Project Template

Welcome to the **Orionex Solutions Fullstack Template**. This repository serves as the definitive starting point for all standard, modern web application projects executed by Orionex Solutions. 

It provides an enterprise-ready frontend, a high-performance backend, and a comprehensive set of templated project documentation.

## ⚠️ Architectural Quirk Notice

> [!WARNING]
> When cloning this template, please be aware that the submodule directory names are currently **swapped** relative to their actual tech stacks:
> - **The `/backend` folder** contains the **ViteJS React Frontend**.
> - **The `/frontend` folder** contains the **FastAPI Python Backend**.
>
> You may need to rename these folders immediately after initializing your repository for team clarity.

---

## 📂 Repository Structure

This repository is orchestrated around Git Submodules and a centralized documentation strategy.

### 1. The ViteJS Frontend (Currently in `/backend`)
A production-ready, highly optimized React SPA built for maximum client-side performance. 
- **Stack:** React, ViteJS (SWC), TailwindCSS, Million.js, Framer Motion.
- **Key Features:** Domain-Driven Design layout, advanced bundling (LightningCSS, Partytown), and integrated theming.
- 🔗 **[Read the Frontend Guide](./backend/README.md)**

### 2. The FastAPI Backend (Currently in `/frontend`)
An extreme-throughput Python backend designed for low latency and high concurrency.
- **Stack:** Python 3.10+, FastAPI, Motor (MongoDB Async), Redis, uvloop.
- **Key Features:** Strict connection pooling, explicit background tasks, native GZip payload compression, structured JSON logging.
- 🔗 **[Read the Backend Guide](./frontend/README.md)**

### 3. Comprehensive Documentation (`/docs`)
A rigorous set of markdown templates to enforce documentation standards across all projects.
- **`/docs/mvp`**: Lightweight templates built for rapid prototyping and minimum viable demos.
- **`/docs/v1`**: Comprehensive technical templates built for production releases (Environment setup, Deployment Guides, DB Schemas, MVP Gaps).
- **`/docs/example`**: Generalized best-practice examples on how to fill out complex diagrams (Mermaid.js) and architecture documents.
- 🔗 **[Read the Document Strategy Guide](./docs/README.md)**

---

## 🚀 Getting Started

Since this template heavily utilizes Git Submodules to fetch the frontend and backend boilerplates, a standard `git clone` is insufficient.

### 1. Clone with Submodules
To clone the overarching structure and immediately fetch the respective frontend/backend commits, run:

```bash
git clone --recursive [repository_url] [your_project_name]
cd [your_project_name]
```

*(If you already ran a standard `git clone`, initialize the submodules via: `git submodule update --init --recursive`)*

### 2. Rename the Swapped Directories (Recommended)
Before you start committing your own feature branches, we highly suggest fixing the directory structure locally to prevent developer confusion regarding the backend/frontend quirk.

### 3. Initialize Independent Git Histories
If starting a fresh project, you will likely want to sever ties with the base template's git history:

```bash
# In the root, and within both submodules as needed:
rm -rf .git
git init
git add .
git commit -m "Initialize project from Orionex Template"
git remote add origin [your_new_repo_url]
```

### 4. Review the Documentation
Before writing any code, review the `docs/README.md` and complete the necessary `MVP` or `V1` templates (like the `project-overview.md`) required for the current phase of your deliverable.
