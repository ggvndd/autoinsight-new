# Environment Setup

This guide details how to set up the local development environment for the V1 project.

## 1. Prerequisites
Ensure you have the following installed on your machine:
- Node.js (vX.X.X or higher)
- [e.g., Python 3.10+]
- [e.g., Docker desktop]
- [e.g., PostgreSQL (or rely on docker container)]

## 2. Cloning the Repository
```bash
git clone [repository_url]
cd [project_folder]
```

## 3. Installing Dependencies
*Split into frontend and backend if applicable.*

```bash
# Example for a monorepo
npm install
# Or yarn
yarn install
```

## 4. Environment Variables
Copy the example environment files and configure them.
> [!IMPORTANT]
> Never commit actual `.env` files to the repository.

```bash
# Example
cp .env.example .env.local
```
**Key Variables to Configure:**
- `DATABASE_URL`: Connection string to your local DB instance.
- `API_KEY`: Generate a test API key from [Service Name].

## 5. Database Setup & Seeding
If your project uses a database, describe how to initialize it.
```bash
# Example
npx prisma db push
npx prisma db seed
```

## 6. Running the Development Server
```bash
# Example
npm run dev
```
The application should now be accessible at `http://localhost:3000`.

## 7. Running Tests
```bash
# Example
npm run test
```

## Troubleshooting
- **Issue:** `Error connecting to database` -> **Fix:** Ensure your Docker container is running and credentials in `.env.local` match.
