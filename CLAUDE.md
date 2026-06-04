# Part-DB Testprotokoll App

## Zweck
Interaktive Checklisten-App zum Durchführen und Dokumentieren von
Part-DB Update-Tests. Ausgabe: druckfertiges PDF-Protokoll.

## Stack
- React 18 + Vite + TypeScript
- Tailwind CSS
- @react-pdf/renderer für PDF-Export

## Kernfunktionen
1. Metadaten-Formular (URL, Version, Datum auto, Tester)
2. 11 Testabschnitte mit ~75 Testfällen
3. Status pro Testfall: OK / NOK / n.a. + Bemerkungsfeld
4. NOK-Einträge fließen automatisch ins Fehlerprotokoll
5. Fortschrittsbalken
6. Freigabe-Entscheidung
7. PDF-Export (Layout analog bestehendem Protokoll)

## Testdaten
Alle Testfälle sind in /src/data/testcases.ts definiert
als strukturiertes Array, nicht hardcoded in Komponenten.
