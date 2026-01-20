# ExamenFinal_Back

Backend REST API for the Examen Final project, POKEMON GAME.

## What it does
- Provides user authentication (JWT), Pokemon operations, and CRUD endpoints for the project's core entities.
- Structured for local development, automated tests, and containerized deployment.
- Centralized config, consistent JSON responses, and middleware for validation and error handling.

## Tools / libraries
- Node.js
- Web framework: Express (or equivalent)
- Authentication: JSON Web Tokens (jwt)
- Environment: dotenv (.env)
- Database: MongoDB (via ORM/ODM — TypeORM / Sequelize / Knex / Mongoose)
- Testing: Jest + Supertest
- Dev tooling: nodemon, eslint, prettier
- Containerization & CI: Docker, docker-compose, (GitHub Actions recommended)
- Logging / Errors: winston or pino; Sentry optional

## Quick commands
- Install: npm ci
- Dev: npm run dev
- Test: npm test
- Build: npm run build
