# Deployment Guide

This document outlines the step-by-step process for deploying the V1 application to staging and production environments.

> [!WARNING]
> Ensure all tests are passing and the CI/CD pipeline is green before initiating a production deployment.

## 1. Architecture Overview
Briefly describe the deployment architecture (e.g., Frontend on Vercel, Backend APIs on Docker/AWS, Database managing via RDS).

## 2. Environment Variables Management
List precisely which environment variables differ between Staging and Production. Detail where these are managed (e.g., Vercel Dashboard, AWS Secrets Manager).

| Variable Name | Staging Source | Production Source | Notes |
| :--- | :--- | :--- | :--- |
| `DATABASE_URL` | Staging DB | Prod DB | Must point to respective instances |
| `STRIPE_KEY` | Test Mode Key | Live Mode Key | Critical: Ensure test keys never hit prod |

## 3. Staging Deployment Protocol
How do we push changes to staging for QA?
*(Example)*
1. Ensure your branch is merged into `develop`.
2. Push to `develop` to trigger the staging GitHub Action.
3. Once successful, notify the QA team on Slack for visual inspection.

## 4. Production Release Protocol
How do we safely release to production?
*(Example)*
1. Create a Release Candidate (RC) tag (e.g., `v1.2.0-rc1`) from `main`.
2. Create a standardized Release Note outlining the changes.
3. Procure approval from the Lead Engineer and the Product Owner.
4. Run database migrations on the production database **before** switching traffic:
   ```bash
   # Apply migrations safely
   npx prisma migrate deploy
   ```
5. Trigger the production deployment pipeline.
6. Monitor Datadog/Sentry immediately following the release for anomaly detection.

## 5. Rollback Procedure
If the deployment fails or introduces a critical bug, execute the following steps:
*(Example)*
1. Revert the commit on `main` to the previous stable release tag.
2. Force a redeploy of the previous stable tag via the CI provider.
3. If database migrations were destructive, [Detail the database restore protocol].
