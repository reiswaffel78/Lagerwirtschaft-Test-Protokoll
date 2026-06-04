# Part-DB Testprotokoll App
## Zweck
Interaktive Checklisten-App zum Durchführen und Dokumentieren von
Part-DB Update-Tests. Ausgabe: druckfertiges PDF-Protokoll.
## Stack
React 18 + Vite + TypeScript + Tailwind CSS + @react-pdf/renderer
## Struktur
- src/data/testcases.ts — alle Testfälle (nicht anfassen)
- src/types/index.ts — alle TypeScript-Typen
- src/store/useTestStore.ts — globaler Zustand (Zustand via useState + Context)
- src/components/ — alle UI-Komponenten
- src/pdf/ — PDF-Generierung
## Regeln
- Keine externen State-Libraries (kein Redux, kein Zustand)
- Kein Backend, alles im Browser
- Deutsche UI-Texte
- Testfälle nie direkt in Komponenten hardcoden, immer aus testcases.ts lesen
