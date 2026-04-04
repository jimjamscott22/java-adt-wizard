# CLAUDE.md

## Project Overview

Interactive web app for practicing Java abstract data types (ADTs) through visual simulations and coding challenges. Two-tier architecture: Spring Boot backend + React frontend.

## Quick Start

```bash
# Backend (runs on :8080)
cd backend
mvn spring-boot:run

# Frontend (runs on :5173, proxies /api to backend)
cd frontend
npm install
npm run dev
```

## Prerequisites

- Java 17+ (JDK, not just JRE — needed for JShell API)
- Maven 3.9+
- Node.js 18+ and npm

## Project Structure

```
backend/                         Spring Boot 3.2 + Java 17
  src/main/java/com/adtpractice/
    config/                      WebConfig (CORS), DataSeeder (seed challenges)
    controller/                  ChallengeController, ExecutionController
    model/                       Challenge (JPA entity), ExecutionDto (records)
    service/                     ChallengeService, JShellExecutionService

frontend/                        React 18 + Vite + Tailwind CSS
  src/
    components/
      ADTSelector/               ADT type picker (links to /practice/{TYPE})
      ADTReferencePanel/         Slide-out reference panel
      ChallengePanel/            Challenge display and test runner
      CodeEditor/                Monaco Editor wrapper
      Layout/                    Navbar
      Learn/                     Shared components for educational pages
      Visualizer/                ADT visualizers (Stack, Queue, HashMap)
    data/                        Static data (adtData, algorithms, OOP, etc.)
    hooks/                       useFetch custom hook
    pages/                       Route pages (Home, Practice, Learn topics)
    utils/                       API helper (api.js)
```

## Key Patterns

- **Visualizer routing:** `Visualizer.jsx` maps ADT type strings (e.g., `STACK`, `QUEUE`, `HASHMAP`) to visualizer components. Unregistered types show a "Coming Soon" placeholder.
- **Adding a new visualizer:** Create `<Name>Visualizer.jsx` in `components/Visualizer/`, add it to the `visualizerMap` in `Visualizer.jsx`.
- **ADT data:** All ADT metadata (icons, operations, examples) lives in `frontend/src/data/javaAdtData.js` (Java) and `frontend/src/data/pythonAdtData.js` (Python).
- **Backend code execution:** `POST /api/execute` runs user Java code via JShell with a 5-second timeout.
- **Database:** SQLite file (`adt_practice.db`) auto-created in `backend/` on first run. Schema managed by Hibernate `ddl-auto=update`.
- **Seed data:** `DataSeeder.java` populates challenges on first boot if the DB is empty.

## Styling

- Dark theme using custom Tailwind `surface-*` and `primary-*` color tokens (defined in `tailwind.config.js`)
- Fonts: Inter (UI), JetBrains Mono / Fira Code (code)
- Animations: Framer Motion with spring transitions

## Common Commands

```bash
# Backend: clean rebuild
cd backend && mvn clean package

# Frontend: production build
cd frontend && npm run build

# Frontend: preview production build
cd frontend && npm run preview
```

## Gotchas

- The frontend Vite dev server proxies `/api` requests to `localhost:8080` — the backend must be running for code execution and challenges to work.
- Visualizers are frontend-only (no API calls) — they work without the backend.
- `package-lock.json` merge conflicts: delete it and run `npm install` to regenerate.
- The SQLite DB file is gitignored. Each environment creates its own on first run.
