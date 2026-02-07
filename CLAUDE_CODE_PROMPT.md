# Claude Code Prompt — ADT Practice Web App

## Project Overview

You are building a full-stack web app called **ADT Practice** that helps Java students interactively learn abstract data types. The project scaffold is outlined in this file. Your job is to **implement the full working code** for every file, following the patterns and contracts established in the scaffold.

Read the `README.md` first for the full architecture overview and feature checklist.

## Tech Stack

- **Backend:** Spring Boot 3.2, Java 21, JPA + SQLite (via `hibernate-community-dialects`), JShell API (`jdk.jshell`)
- **Frontend:** React 18, Vite 5, Tailwind CSS 3.4, Monaco Editor (`@monaco-editor/react`), Framer Motion 11, React Router 6, Lucide React icons

## Directory Structure

```
adt-practice/
├── backend/
│   ├── pom.xml
│   └── src/main/java/com/adtpractice/
│       ├── AdtPracticeApplication.java       # Spring Boot entry point
│       ├── config/
│       │   ├── WebConfig.java                # CORS filter for React dev server
│       │   └── DataSeeder.java               # Seeds sample challenges on first run
│       ├── controller/
│       │   ├── ChallengeController.java      # GET /api/challenges, /api/challenges/{id}, /api/challenges/types
│       │   └── ExecutionController.java      # POST /api/execute
│       ├── model/
│       │   ├── Challenge.java                # JPA entity: id, adtType, title, description, starterCode, testCode, expectedOutput, difficulty, sortOrder
│       │   └── ExecutionDto.java             # Record DTOs: ExecuteRequest(code, challengeId), ExecuteResponse(success, output, error, allTestsPassed, executionTimeMs)
│       └── service/
│           ├── ChallengeService.java         # CRUD via EntityManager: findAll, findByAdtType, findById, getAvailableAdtTypes, save
│           └── JShellExecutionService.java   # Core engine: creates JShell per request, evaluates code, enforces timeout, captures stdout
│
├── frontend/
│   ├── package.json, vite.config.js, tailwind.config.js, postcss.config.js, index.html
│   └── src/
│       ├── main.jsx, App.jsx, index.css
│       ├── utils/api.js                      # fetchChallenges, fetchChallenge, fetchAdtTypes, executeCode
│       ├── hooks/useFetch.js                 # Generic async fetch hook
│       ├── data/adtData.js                   # Static ADT metadata (type, name, icon, color, description, timeComplexity)
│       ├── components/
│       │   ├── Layout/Navbar.jsx
│       │   ├── ADTSelector/ADTSelector.jsx   # Animated card grid linking to /practice/:adtType
│       │   ├── CodeEditor/CodeEditor.jsx     # Monaco wrapper, Java syntax, JetBrains Mono font
│       │   ├── ChallengePanel/ChallengePanel.jsx  # Description + editor + run button + pass/fail output
│       │   └── Visualizer/
│       │       ├── Visualizer.jsx            # Registry that maps adtType → component
│       │       └── StackVisualizer.jsx       # Interactive push/pop/peek with Framer Motion
│       └── pages/
│           ├── HomePage.jsx                  # Hero text + ADTSelector
│           └── PracticePage.jsx              # Two-column: Visualizer | ChallengePanel with tab switching
│
└── README.md
```

## Implementation Instructions

### Backend

1. **JShellExecutionService** is the most critical file. Each execution must:
   - Create a **new JShell instance** (no shared state between requests)
   - Pre-import `java.util.*` and `java.util.stream.*`
   - Redirect JShell stdout to a `ByteArrayOutputStream` for capture
   - Run inside an `ExecutorService` with a configurable timeout (`app.jshell.timeout-seconds`, default 5s)
   - Truncate output at `app.jshell.max-output-length` (default 10000 chars)
   - For challenge mode: concatenate user code + challenge's `testCode`, run together, compare captured stdout against `expectedOutput`
   - Return `ExecuteResponse` with success flag, output, error, testsPassed, and execution time in ms

2. **DataSeeder** should seed 6+ challenges across STACK, QUEUE, HASHMAP, and LINKEDLIST on first boot. Each challenge needs:
   - `starterCode`: template with TODOs the student fills in
   - `testCode`: hidden Java code appended after user code that prints a deterministic result
   - `expectedOutput`: the exact stdout string that a correct solution produces
   - Skip seeding if challenges already exist in the database

3. **SQLite config** in `application.properties` uses `org.hibernate.community.dialect.SQLiteDialect`. The DB file `adt_practice.db` lives in the project root. Use `ddl-auto=update`.

4. **CORS** must allow the Vite dev server at `http://localhost:5173`.

### Frontend

1. **Vite proxy**: `/api` requests proxy to `http://localhost:8080` during development.

2. **ADTSelector**: Render cards from `adtData.js`. Each card links to `/practice/:adtType`. Use Framer Motion staggered fade-in. Show icon, name, description, and time complexity badge.

3. **StackVisualizer**: Client-side only (no backend calls). Maintain a JS array as the stack. Support push (from text input), pop, and peek. Animate items with `AnimatePresence`. Highlight the top element. Show a status message after each operation.

4. **Visualizer registry** (`Visualizer.jsx`): Map ADT types to visualizer components. For types without a visualizer yet, render a "coming soon" placeholder. This makes it trivial to add QueueVisualizer, HashMapVisualizer, etc. later.

5. **ChallengePanel**: Load `challenge.starterCode` into Monaco on mount. On "Run Code", POST to `/api/execute` with the editor content and `challenge.id`. Display the response: green border + checkmark if `allTestsPassed`, red border + X if not. Show output and errors in a `<pre>` block. Include a "Reset" button that restores starter code. Show execution time.

6. **PracticePage**: Fetch challenges for the current `adtType` from URL params. Render challenge tabs at the top. Two-column layout on `lg:` breakpoints — visualizer on left, challenge panel on right. Stack vertically on mobile.

7. **Styling**: Dark theme using the custom `surface-*` and `primary-*` colors in `tailwind.config.js`. JetBrains Mono for code, Inter for UI text (loaded from Google Fonts in `index.html`). Monaco theme: `vs-dark`.

## Key Contracts

- **API base URL**: `/api` (proxied by Vite in dev, same-origin in production)
- **ADT type strings**: `STACK`, `QUEUE`, `HASHMAP`, `LINKEDLIST`, `TREEMAP`, `PRIORITYQUEUE` (uppercase)
- **Challenge difficulty**: `EASY`, `MEDIUM`, `HARD`
- **Execute endpoint**: `POST /api/execute` with body `{ code: string, challengeId: number | null }`
- **Execute response**: `{ success: boolean, output: string, error: string | null, allTestsPassed: boolean, executionTimeMs: number }`

## Quality Expectations

- All Java code compiles and runs on JDK 21
- JShell execution is properly sandboxed with timeout — no infinite loops
- Frontend renders without console errors
- Monaco editor loads with Java syntax highlighting
- Stack visualizer animations are smooth
- Challenge flow works end-to-end: load starter code → edit → run → see pass/fail
- Responsive layout: usable on both desktop and mobile
- No hardcoded localhost URLs in frontend code (use relative `/api` paths)

## What NOT to Do

- Don't change the directory structure or rename files
- Don't swap out the tech stack (no switching to Gradle, no switching to Next.js, etc.)
- Don't add authentication or user accounts yet — that's Phase 2
- Don't over-engineer — keep it clean and working, not production-hardened
