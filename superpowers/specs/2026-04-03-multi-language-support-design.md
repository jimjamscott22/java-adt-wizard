# Multi-Language Support: Java + Python Tracks

## Overview

Add Python as a second language track alongside Java. Users choose their language on the landing page via a tabbed interface, then get the same ADT practice experience with language-specific code, methods, and execution.

## Routing

| Route | Purpose |
|---|---|
| `/` | Landing page with language tabs (Java/Python) + ADT grid |
| `/:lang/practice/:adtType` | Practice page scoped to language (e.g., `/python/practice/STACK`) |
| `/learn/*` | Unchanged — language-neutral educational content |

- `:lang` is `java` or `python`
- Old route `/practice/:adtType` redirects to `/java/practice/:adtType` for backwards compatibility (bookmarked URLs)
- Learn pages remain at their current paths

## Landing Page

The current `HomePage.jsx` is reworked:

- Hero title becomes language-neutral: "Master **Data Structures**"
- A pill-style tab toggle (Java | Python) sits below the hero text
- The ADT grid below updates based on the active tab, pulling from the corresponding data file
- Tab state is local component state, defaults to Java
- Clicking an ADT card navigates to `/:lang/practice/:adtType` based on the active tab

## Python ADT Mappings

| Java ADT | Python Equivalent | Module |
|---|---|---|
| Stack | `list` (`append`/`pop`) | built-in |
| Queue | `collections.deque` (`append`/`popleft`) | collections |
| HashMap | `dict` | built-in |
| LinkedList | `collections.deque` | collections |
| TreeMap | `SortedDict` | sortedcontainers |
| PriorityQueue | `heapq` | heapq |

## Python Execution (Pyodide)

- Pyodide loads on-demand when a user first enters a Python practice page (not on the landing page)
- Loading indicator shown during initialization (~10MB download, cached by browser after first load)
- `sortedcontainers` installed via `micropip` on Pyodide init (pure Python package)
- A `pyodideService.js` module handles:
  - Loading and caching the Pyodide runtime
  - Running user code and capturing stdout/stderr
  - 5-second timeout enforcement via web worker
  - Error formatting (syntax errors, runtime errors) matching the Java execution result shape
- The Java execution path (`POST /api/execute`) remains completely untouched

## Data Files

- `frontend/src/data/adtData.js` renamed to `frontend/src/data/javaAdtData.js` for clarity
- New `frontend/src/data/pythonAdtData.js` with Python-specific:
  - Method signatures (e.g., `append(item)` instead of `push(E item)`)
  - Code examples using Python syntax
  - Descriptions referencing Python modules
  - Same structure (type, name, icon, color, description, timeComplexity, bestFor, keyOperations, pythonExample)

Both files share the same icon and color assignments per ADT type so visualizers stay consistent.

## New Files

| File | Purpose |
|---|---|
| `frontend/src/data/pythonAdtData.js` | Python ADT metadata, methods, examples |
| `frontend/src/services/pyodideService.js` | Pyodide loader, code runner, micropip setup |

## Modified Files

| File | Change |
|---|---|
| `App.jsx` | Add `/:lang/practice/:adtType` route, remove `/practice/:adtType` |
| `HomePage.jsx` | Add language tab toggle, pass active language to ADTSelector |
| `ADTSelector.jsx` | Accept `lang` prop, import correct data file, link to `/:lang/practice/:adtType` |
| `PracticePage.jsx` | Read `:lang` from params, use Pyodide for Python / backend API for Java |
| `CodeEditor.jsx` | Switch Monaco language mode (`java` or `python`) based on `lang` prop |
| `ADTReferencePanel.jsx` | Show Python methods/examples when on a Python route |
| `Navbar.jsx` | Show active language indicator on practice routes |
| `frontend/src/data/adtData.js` | Rename to `javaAdtData.js` |

## Unchanged

- All 6 visualizer components (Stack, Queue, HashMap, LinkedList, TreeMap, PriorityQueue) — language-agnostic animations
- All Learn pages (OOP, Algorithms, Data Structures, Complexity, Strategies)
- Entire backend (Spring Boot, JShell, challenges API, database)

## Design Decisions

1. **Separate data files over merged** — Python and Java ADTs differ enough in method names, module structure, and idioms that a single merged file would be awkward. Separate files are simpler to maintain.
2. **Pyodide over backend execution** — No Python runtime needed on the server. Client-side execution is self-contained and scales without backend changes.
3. **Route-based language selection** — Language in the URL (`/:lang/...`) gives bookmarkable links, clean architecture, and no global state management needed.
4. **On-demand Pyodide loading** — Avoids penalizing Java users with a 10MB download they don't need. Browser caches it after first load.
5. **Shared visualizers** — Visualizers animate data structure operations (push, pop, enqueue), not language syntax. They work identically for both tracks.
