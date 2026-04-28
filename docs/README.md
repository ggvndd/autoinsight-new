# Orionex Project Documentation Template

Welcome to the Orionex Solutions Project Documentation Template. This repository is structured to separate documentation into two distinct phases of a project's lifecycle: **MVP** and **V1**.

## Directory Structure

- `/docs/mvp/`: Documentation for the Minimum Viable Product (MVP) phase.
- `/docs/v1/`: Documentation for the production-ready (V1) phase.
- `/docs/example/`: Generalized examples of how to fill out complex templates (APIs, Schemas, Maps).
- `/docs/web-brand-guide.md`: The brand guidelines for the project.

## MVP vs V1 Documentation

### MVP (Minimum Viable Product)
The MVP phase focuses on rapid prototyping, demonstrating core capabilities to stakeholders, and often relies on minimal or mocked backend services. The documentation here is meant to be lightweight but clear enough to guide a demo application.

### V1 (Production Release)
The V1 documentation represents the comprehensive, production-ready project derived from the Software Requirements Specification (SRS) and project brief. This phase includes robust architectures, fully implemented backends, and strict deployment and compliance guidelines.

## Mandatory vs Optional Documents

Most of the markdown files provided in this template are considered **mandatory** core documents for their respective phases to ensure standard Orionex quality.

However, depending on specific **project focuses**, additional non-mandatory documents (such as specific compliance specifications) may be required. These are not included as base templates but should be added to the respective folders as needed per project brief.

## Design Theme

> [!IMPORTANT]
> By default, these templates and the resulting MVP assume the use of the **Orionex Design Theme** (defined in `docs/orionex-web-brand-guide.md`) unless a brand identity has already been established by the company.
>
> If a client wishes to use their own design theme, they must delete `docs/orionex-web-brand-guide.md` and edit `docs/web-brand-guide.md` to reflect their specific branding requirements before development begins.
