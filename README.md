# ADT Practice — Java Data Structures Web App

An interactive web app for practicing Java abstract data types through visual simulations and coding challenges.

## Architecture

```
adt-practice/
├── backend/          # Spring Boot 3.2 + Java 21
│   └── JShell API for sandboxed code execution
├── frontend/         # React 18 + Vite + Tailwind CSS
│   └── Monaco Editor + Framer Motion visualizations
└── challenges/       # (future) external challenge packs
```

## Quick Start

### Prerequisites
- **Java 21** (JShell API requires JDK 9+, project targets 21)
- **Maven 3.9+**
- **Node.js 18+** and npm

### Backend

```bash
cd backend
mvn spring-boot:run
```

The API starts on `http://localhost:8080`. On first run, it seeds the SQLite database with sample challenges.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Opens on `http://localhost:5173` with a proxy to the backend API.

## Troubleshooting

### Merge Conflicts with package-lock.json

If you encounter merge conflicts in `package-lock.json`:

```bash
# Regenerate the lock file (safest approach)
cd frontend
rm package-lock.json
npm install
cd ..

# Mark as resolved
git add frontend/package-lock.json
git commit -m "Resolve merge conflict: regenerate package-lock.json"
```

To prevent future conflicts, `package-lock.json` should never be manually edited. Always run `npm install` to update it.

## API Endpoints

| Method | Endpoint                | Description                    |
|--------|-------------------------|--------------------------------|
| GET    | `/api/challenges`       | List all challenges            |
| GET    | `/api/challenges?adt=X` | Filter by ADT type             |
| GET    | `/api/challenges/{id}`  | Get single challenge           |
| GET    | `/api/challenges/types` | List available ADT types       |
| POST   | `/api/execute`          | Run Java code via JShell       |

### POST /api/execute

```json
{
  "code": "Stack<Integer> s = new Stack<>(); s.push(1); System.out.println(s.pop());",
  "challengeId": 1
}
```

## Features

- [x] ADT selector with 6 data structures
- [x] Stack visualizer with push/pop/peek animations
- [x] Monaco Editor with Java syntax highlighting
- [x] JShell-based code execution with timeout protection
- [x] Challenge system with test validation
- [x] Seed data for Stack, Queue, HashMap, LinkedList challenges
- [x] Queue visualizer with enqueue/dequeue/peek animations
- [ ] HashMap visualizer (bucket diagram)
- [ ] LinkedList visualizer (node-and-pointer)
- [ ] User progress tracking
- [ ] Timed drill mode

## Tech Stack

**Backend:** Spring Boot 3.2, JPA + SQLite, JShell API  
**Frontend:** React 18, Vite, Tailwind CSS, Monaco Editor, Framer Motion
