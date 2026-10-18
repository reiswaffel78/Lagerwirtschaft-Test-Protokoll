# Graph Report - lagerwirtschaft-test-protokoll  (2026-10-18)

## Corpus Check
- 27 files · ~13,437 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 3, .css 2)

## Summary
- 228 nodes · 351 edges · 18 communities (14 shown, 4 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `3c16f50c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- ProtokollPDF.tsx
- package.json
- App.tsx
- useTestStore.tsx
- compilerOptions
- compilerOptions
- Layout.tsx
- devDependencies
- BugLog.tsx
- Part-DB Testprotokoll App
- dependencies
- Part-DB Testprotokoll App
- src/data/testcases.ts
- React + TypeScript + Vite
- graphify
- tsconfig.json
- AGENTS.md
- .claude/CLAUDE.md

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 17 edges
2. `useTestStore()` - 16 edges
3. `compilerOptions` - 16 edges
4. `BugLog()` - 11 edges
5. `Sidebar()` - 9 edges
6. `ProtokollPDF()` - 9 edges
7. `react` - 8 edges
8. `AppContent()` - 8 edges
9. `ExportButton()` - 7 edges
10. `MetaForm()` - 7 edges

## Surprising Connections (you probably didn't know these)
- `AppContent()` --calls--> `BugLog()`  [EXTRACTED]
  partdb-testprotokoll/src/App.tsx → partdb-testprotokoll/src/components/BugLog.tsx
- `AppContent()` --calls--> `ExportButton()`  [EXTRACTED]
  partdb-testprotokoll/src/App.tsx → partdb-testprotokoll/src/components/ExportButton.tsx
- `App()` --calls--> `TestStoreProvider()`  [EXTRACTED]
  partdb-testprotokoll/src/App.tsx → partdb-testprotokoll/src/store/useTestStore.tsx
- `BugLog()` --calls--> `useTestStore()`  [EXTRACTED]
  partdb-testprotokoll/src/components/BugLog.tsx → partdb-testprotokoll/src/store/useTestStore.tsx
- `ExportButton()` --calls--> `useTestStore()`  [EXTRACTED]
  partdb-testprotokoll/src/components/ExportButton.tsx → partdb-testprotokoll/src/store/useTestStore.tsx

## Import Cycles
- None detected.

## Communities (18 total, 4 thin omitted)

### Community 0 - "ProtokollPDF.tsx"
Cohesion: 0.14
Nodes (26): ExportButton(), doExport(), handleClick(), generateAndDownload(), OpenCasesModal(), bugLabel(), BugLogPage(), C (+18 more)

### Community 1 - "package.json"
Cohesion: 0.09
Nodes (24): name, private, scripts, build, dev, lint, preview, type (+16 more)

### Community 2 - "App.tsx"
Cohesion: 0.13
Nodes (15): App(), AppContent(), Layout(), Field(), focusStyle, MetaForm(), RequiredStar(), ReleaseDecision() (+7 more)

### Community 3 - "useTestStore.tsx"
Cohesion: 0.11
Nodes (21): CheckItem, DECISIONS, activeColors, BUTTONS, Props, TestCase, Action, generateId() (+13 more)

### Community 4 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib, module, moduleDetection, moduleResolution (+10 more)

### Community 5 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection, moduleResolution, noEmit (+9 more)

### Community 6 - "Layout.tsx"
Cohesion: 0.19
Nodes (13): LayoutProps, NAV_ITEMS, NavItem, ProgressBar(), ProgressBarProps, ResetDialog(), scrollTo(), sectionStatus() (+5 more)

### Community 7 - "devDependencies"
Cohesion: 0.14
Nodes (14): devDependencies, eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, playwright, @types/node (+6 more)

### Community 8 - "BugLog.tsx"
Cohesion: 0.23
Nodes (8): bugLabel(), BugLog(), ConfirmDelete(), ConfirmDeleteProps, PRIORITIES, priorityColors, rowBg(), rowBorder()

### Community 9 - "Part-DB Testprotokoll App"
Cohesion: 0.25
Nodes (7): graphify, Kernfunktionen, Knowledge-graph workflow (graphify-kit), Part-DB Testprotokoll App, Stack, Testdaten, Zweck

### Community 10 - "dependencies"
Cohesion: 0.29
Nodes (7): dependencies, lucide-react, react, react-dom, @react-pdf/renderer, tailwindcss, @tailwindcss/vite

### Community 11 - "Part-DB Testprotokoll App"
Cohesion: 0.33
Nodes (5): Part-DB Testprotokoll App, Regeln, Stack, Struktur, Zweck

### Community 12 - "src/data/testcases.ts"
Cohesion: 0.33
Nodes (3): TEST_SECTIONS, TestCase, TestSection

### Community 13 - "React + TypeScript + Vite"
Cohesion: 0.50
Nodes (3): Expanding the ESLint configuration, React Compiler, React + TypeScript + Vite

## Knowledge Gaps
- **7 isolated node(s):** `graphify-mcp`, `tailwindcss`, `@types/node`, `@types/react`, `@types/react-dom` (+2 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 127 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `useTestStore.tsx` to `BugLog.tsx`, `package.json`, `ProtokollPDF.tsx`, `Layout.tsx`?**
  _High betweenness centrality (0.112) - this node is a cross-community bridge._
- **What connects `graphify-mcp`, `tailwindcss`, `@types/node` to the rest of the system?**
  _7 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `ProtokollPDF.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.13756613756613756 - nodes in this community are weakly interconnected._
- **Why does `devDependencies` connect `devDependencies` to `package.json`?**
  _High betweenness centrality (0.076) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.09401709401709402 - nodes in this community are weakly interconnected._
- **Why does `lucide-react` connect `useTestStore.tsx` to `BugLog.tsx`, `package.json`, `ProtokollPDF.tsx`, `Layout.tsx`?**
  _High betweenness centrality (0.047) - this node is a cross-community bridge._
- **Should `App.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.1339031339031339 - nodes in this community are weakly interconnected._