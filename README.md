<div align="center">

<img src="https://raw.githubusercontent.com/mr-deepansh/Trip_planner-collaboration/main/frontend/public/logo.png" alt="Trip Planner Logo" width="80" height="80" />

# Trip Planner — Collaboration

**A production-ready, full-stack collaborative travel planning platform.**  
Plan smarter. Travel together.

<br />

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Node.js](https://img.shields.io/badge/Node.js-20+-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-5-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=flat-square&logo=postgresql&logoColor=white)](https://postgresql.org)
[![Sequelize](https://img.shields.io/badge/Sequelize-6-52B0E7?style=flat-square&logo=sequelize&logoColor=white)](https://sequelize.org)
[![Zod](https://img.shields.io/badge/Zod-Validation-3E67B1?style=flat-square)](https://zod.dev)
[![ESLint](https://img.shields.io/badge/ESLint-9-4B32C3?style=flat-square&logo=eslint&logoColor=white)](https://eslint.org)
[![Prettier](https://img.shields.io/badge/Prettier-3-F7B93E?style=flat-square&logo=prettier&logoColor=black)](https://prettier.io)
[![MIT License](https://img.shields.io/badge/License-MIT-22c55e?style=flat-square)](./LICENSE)
[![Live Demo](https://img.shields.io/badge/Live-Demo-6366f1?style=flat-square&logo=vercel&logoColor=white)](https://trip-planner-collaboration.vercel.app)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

**Trip Planner Collaboration** eliminates the friction of group travel coordination. Instead of scattered spreadsheets and group chats, teams get a centralized workspace to build itineraries, manage daily activities, assign roles, and collaborate — all in one place.

Built with a clean separation of concerns: a **React + Vite** frontend, a **Node.js + Express** REST API, and a **PostgreSQL** relational database managed through **Sequelize ORM**.

> **Live →** [trip-planner-collaboration.vercel.app](https://trip-planner-collaboration.vercel.app)

---

## Architecture
```
┌─────────────────────────────────────┐
│           Client (Vercel)           │
│     React 19 + Vite 7 + Tailwind    │
└────────────────┬────────────────────┘
                 │ HTTPS / REST
┌────────────────▼────────────────────┐
│           API (Render)              │
│     Node.js 20 + Express 5          │
│     JWT Auth · Zod Validation       │
│     Winston Logging · RBAC          │
└────────────────┬────────────────────┘
                 │ Sequelize ORM
┌────────────────▼────────────────────┐
│         Database (Render)           │
│         PostgreSQL 16               │
│   Trips → Days → Activities         │
└─────────────────────────────────────┘
```

**Data model cascade:**
```
User
 └── Trip (owner)
      ├── TripMember (role: owner | editor | viewer)
      └── Day
           └── Activity (type: flight | hotel | food | sightseeing | custom)
```

---

## Features

### Authentication & Security
- Stateless JWT authentication stored in **HTTP-Only cookies** — XSS-proof by design
- **OAuth 2.0** social login via Google & GitHub
- **Role-Based Access Control (RBAC)** — Owner / Editor / Viewer per trip
- Cryptographic password reset — time-limited, single-use hashed tokens via Nodemailer
- Runtime request validation with **Zod** schemas on every endpoint

### Trip & Itinerary Management
- **Smart Itinerary Builder** — auto-generates Day 1, Day 2… from trip start/end dates
- **Activity Cards** — typed support for Flights, Hotels, Sightseeing, Food, and Custom events
- **Cascading deletes** — PostgreSQL foreign key constraints ensure relational integrity
- Invite collaborators by email, upgrade/downgrade their access tier at any time

### Developer Experience
- **ESLint v9** flat config + **Prettier** with pre-commit enforcement via **Husky**
- **Winston** structured logging with log levels per environment
- Centralized error pipeline — raw DB errors never reach the client
- ES Modules (`import/export`) throughout — no CommonJS

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite 7, Tailwind CSS 4, React Router 6, Context API, Lucide React |
| Backend | Node.js 20+, Express 5, Sequelize 6 |
| Database | PostgreSQL 16 |
| Auth | JWT (HTTP-Only Cookies), OAuth 2.0 (Google, GitHub) |
| Validation | Zod |
| Email | Nodemailer (SMTP) |
| Logging | Winston |
| Tooling | ESLint 9, Prettier 3, Husky, lint-staged |
| Deployment | Render (API + DB), Vercel (Frontend) |

---

## Project Structure
```
Trip_planner-collaboration/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/         # Axios API layer
│   │   └── utils/
│   ├── .env.example
│   └── vite.config.js
│
├── backend/
│   ├── src/
│   │   ├── config/           # DB, env
│   │   ├── constants/        # Roles, enums
│   │   ├── middleware/        # Auth, error, validation
│   │   ├── modules/
│   │   │   ├── auth/         # controller, service, schema, route
│   │   │   ├── trips/
│   │   │   ├── days/
│   │   │   ├── activities/
│   │   │   └── members/
│   │   └── utils/            # ApiError, ApiResponse, logger
│   ├── .env.example
│   └── server.js
│
├── render.yaml
├── .gitignore
└── LICENSE
```

---

## Getting Started

### Prerequisites

- Node.js `>=20.0.0`
- PostgreSQL `>=16` running on port `5432`

### 1. Clone
```bash
git clone https://github.com/mr-deepansh/Trip_planner-collaboration.git
cd Trip_planner-collaboration
```

### 2. Backend
```bash
cd backend
cp .env.example .env      # fill in your values
npm install
npm run dev               # http://localhost:8000
```

> Sequelize syncs the schema automatically on boot — no manual migrations needed.

### 3. Frontend
```bash
cd frontend
cp .env.example .env      # set VITE_API_URL=http://localhost:8000
npm install
npm run dev               # http://localhost:5173
```

---

## Environment Variables

**`backend/.env.example`**
```env
NODE_ENV=development
PORT=8000

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/trip_planner

# Auth
JWT_SECRET=your_jwt_secret_min_32_chars
JWT_EXPIRES_IN=7d
COOKIE_SECRET=your_cookie_secret

# OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your@email.com
SMTP_PASS=your_app_password

# Client
CLIENT_URL=http://localhost:5173
```

**`frontend/.env.example`**
```env
VITE_API_URL=http://localhost:8000
```

---

## Deployment

### Database — Render / Supabase / Neon
Provision a managed PostgreSQL instance and set `DATABASE_URL` in your backend environment.

### Backend — Render
| Setting | Value |
|---|---|
| Build Command | `npm install` |
| Start Command | `npm start` |
| Environment | Add all variables from `.env.example` |

### Frontend — Vercel
| Setting | Value |
|---|---|
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Environment | `VITE_API_URL` → your Render backend URL |

---

## Contributing

Contributions are welcome. Please follow these steps:

1. Fork the repository and create a feature branch:
```bash
   git checkout -b feature/your-feature-name
```

2. Make your changes. Ensure code passes all checks:
```bash
   npm run lint
   npm run format:check
```

3. Commit using [Conventional Commits](https://www.conventionalcommits.org):
```bash
   git commit -m "feat(trips): add member invitation by email"
```

4. Push and open a Pull Request against `main` with a clear description of your changes.

**When reporting a bug**, please include your Node version, OS, steps to reproduce, and any relevant logs.

---

## License

Licensed under the [MIT License](./LICENSE).  
© 2026 [Deepansh](https://github.com/mr-deepansh)
