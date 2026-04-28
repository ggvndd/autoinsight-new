# MVP to V1 Gaps Tracker

This document tracks the crucial gaps between the initial Minimum Viable Product (MVP) demonstrator and the target Production V1 system.

## 1. Feature Porting & Upgrades
List functional features from the MVP that need to be completely rewritten, expanded, or transitioned to real backend services rather than mocked data.

| MVP Feature | V1 Requirement | Status | Assigned To | Notes |
| :--- | :--- | :--- | :--- | :--- |
| Mock Login | Integrate with Orionex Auth & IdP | Not Started | Frontend Team | Implement JWT verification and OAuth flows |
| Static Dashboard | Fetch live data from `GET /api/v1/dashboard/metrics` | In Progress | Fullstack Team | Implement caching layer for performance |

## 2. Security Implementations (Hardening)
Identify required security measures missing from the MVP that are mandatory for V1.
- [ ] Implement Rate Limiting on all public API routes.
- [ ] Switch from HTTP to HTTPS in all config files (ensure SSL certs are ready).
- [ ] Implement CSRF protection for all mutating endpoints.
- [ ] Conduct vulnerability scanning on dependencies before release.

## 3. Infrastructure & DevOps Upgrades
What deployment/hosting changes are required to move from the temporary MVP staging environment to the robust V1 production infrastructure?
- [ ] Set up auto-scaling groups for backend services (e.g., AWS ECS/EKS).
- [ ] Migrate the database from a single instance to a replicated cluster.
- [ ] Implement robust CI/CD pipelines (e.g., GitHub Actions) blocking merges that fail tests.
- [ ] Set up monitoring and alerting (e.g., Datadog, Sentry, Prometheus/Grafana) for the production domain.

## 4. Other Identified Gaps
- [ ] Need to implement actual email delivery rather than console logs.
- [ ] Review all placeholder text and 'lorem ipsum' in the UI and replace with finalized copy approved by stakeholders.
