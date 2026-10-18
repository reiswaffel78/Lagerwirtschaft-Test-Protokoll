# Graph Report - lagerwirtschaft-test-protokoll  (2026-10-18)

## Corpus Check
- 21 files · ~12,475 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 4, .css 2)

## Summary
- 207 nodes · 335 edges · 13 communities (12 shown, 1 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `8384527a`
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
- ReleaseDecision.tsx
- src/data/testcases.ts
- React + TypeScript + Vite
- tsconfig.json

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
- `AppContent()` --calls--> `ReleaseDecision()`  [EXTRACTED]
  partdb-testprotokoll/src/App.tsx → partdb-testprotokoll/src/components/ReleaseDecision.tsx
- `App()` --calls--> `TestStoreProvider()`  [EXTRACTED]
  partdb-testprotokoll/src/App.tsx → partdb-testprotokoll/src/store/useTestStore.tsx
- `BugLog()` --calls--> `useTestStore()`  [EXTRACTED]
  partdb-testprotokoll/src/components/BugLog.tsx → partdb-testprotokoll/src/store/useTestStore.tsx

## Import Cycles
- None detected.

## Communities (13 total, 1 thin omitted)

### Community 0 - "ProtokollPDF.tsx"
Cohesion: 0.16
Nodes (23): ExportButton(), doExport(), handleClick(), generateAndDownload(), OpenCasesModal(), bugLabel(), BugLogPage(), C (+15 more)

### Community 1 - "package.json"
Cohesion: 0.07
Nodes (31): dependencies, lucide-react, react, react-dom, @react-pdf/renderer, tailwindcss, @tailwindcss/vite, name (+23 more)

### Community 2 - "App.tsx"
Cohesion: 0.20
Nodes (12): App(), AppContent(), Layout(), Field(), focusStyle, MetaForm(), RequiredStar(), TestCaseRow() (+4 more)

### Community 3 - "useTestStore.tsx"
Cohesion: 0.13
Nodes (19): activeColors, BUTTONS, Props, TEST_SECTIONS, TestCase, Props, Action, generateId() (+11 more)

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

### Community 9 - "ReleaseDecision.tsx"
Cohesion: 0.17
Nodes (8): CheckItem, DECISIONS, ReleaseDecision(), StatPill(), ReleaseDecision, lucide-react, react, react-dom

### Community 12 - "src/data/testcases.ts"
Cohesion: 0.33
Nodes (3): TEST_SECTIONS, TestCase, TestSection

### Community 13 - "React + TypeScript + Vite"
Cohesion: 0.50
Nodes (3): Expanding the ESLint configuration, React Compiler, React + TypeScript + Vite

## Knowledge Gaps
- **6 isolated node(s):** `tailwindcss`, `@types/node`, `@types/react`, `@types/react-dom`, `playwright` (+1 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 109 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `ReleaseDecision.tsx` to `ProtokollPDF.tsx`, `package.json`, `useTestStore.tsx`, `Layout.tsx`, `BugLog.tsx`?**
  _High betweenness centrality (0.136) - this node is a cross-community bridge._
- **What connects `tailwindcss`, `@types/node`, `@types/react` to the rest of the system?**
  _6 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.07130124777183601 - nodes in this community are weakly interconnected._
- **Why does `devDependencies` connect `devDependencies` to `package.json`?**
  _High betweenness centrality (0.092) - this node is a cross-community bridge._
- **Should `useTestStore.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.12666666666666668 - nodes in this community are weakly interconnected._
- **Why does `lucide-react` connect `ReleaseDecision.tsx` to `BugLog.tsx`, `package.json`, `ProtokollPDF.tsx`, `Layout.tsx`?**
  _High betweenness centrality (0.057) - this node is a cross-community bridge._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._