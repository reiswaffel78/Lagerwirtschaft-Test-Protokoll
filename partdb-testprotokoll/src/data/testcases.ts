// src/data/testcases.ts
// Part-DB Update Funktionstest — alle Testfälle
// Automatisch generiert aus Testprotokoll v1.0 (04.06.2026)

export interface TestCase {
  id: string;
  description: string;
  expected: string;
}

export interface TestSection {
  id: string;
  title: string;
  goal: string;
  cases: TestCase[];
}

export const TEST_SECTIONS: TestSection[] = [
  {
    id: "S0",
    title: "0 · Vorbereitung",
    goal: "Sicherstellen dass die Testumgebung korrekt eingerichtet ist und alle Voraussetzungen für einen reproduzierbaren Funktionstest erfüllt sind.",
    cases: [
      {
        id: "V-1",
        description: "Testumgebung öffnen — NICHT Produktivsystem",
        expected: "URL eindeutig als Test/Staging erkennbar",
      },
      {
        id: "V-2",
        description: "Als normaler Nutzer (Gruppe 'users') anmelden",
        expected: "Login erfolgreich, keine Admin-Sidebar",
      },
      {
        id: "V-3",
        description: "5–10 reale Teile vorab notieren: Name, IPN, Bestand",
        expected: "Referenzliste als Grundlage für Datenmigration",
      },
      {
        id: "V-4",
        description: "Browser DevTools öffnen (F12 → Konsole)",
        expected: "Konsole sichtbar, bereit für Fehlerbeobachtung",
      },
    ],
  },
  {
    id: "S1",
    title: "1 · Login & Oberfläche",
    goal: "Verifizieren dass Authentifizierung, Rechtevergabe und die allgemeine Benutzeroberfläche nach dem Update korrekt funktionieren und keine unerwünschten Regressionen aufweisen.",
    cases: [
      {
        id: "A-01",
        description: "Login mit korrekten Zugangsdaten",
        expected: "Startseite / Teileliste erreichbar",
      },
      {
        id: "A-02",
        description: "Login mit falschem Passwort",
        expected: "Fehlermeldung, kein Zugang",
      },
      {
        id: "A-03",
        description: "Admin-Menüs nicht sichtbar (System, Benutzer, Gruppen)",
        expected: "Keine Admin-Einträge in Sidebar oder Nutzermenü",
      },
      {
        id: "A-04",
        description: "Sprache, Datumsformat, Währung prüfen",
        expected: "Wie vor dem Update konfiguriert",
      },
      {
        id: "A-05",
        description: "Responsive: Seite im schmalen Fenster (~600px)",
        expected: "Sidebar kollabiert, Inhalt noch lesbar",
      },
      {
        id: "A-06",
        description: "Browser-Konsole: Startseite + Teiledetailseite aufrufen",
        expected: "Keine wiederkehrenden roten JS-Fehler",
      },
    ],
  },
  {
    id: "S2",
    title: "2 · Datenmigration — bestehende Daten",
    goal: "Sicherstellen dass alle vor dem Update vorhandenen Daten (Teile, Kategorien, Lagerorte, Anhänge, Parameter) vollständig und korrekt in die neue Version übernommen wurden.",
    cases: [
      {
        id: "D-01",
        description: "Stichprobe: 5–10 reale Teile öffnen",
        expected: "Name, Kategorie, IPN, MPN, Bestand korrekt",
      },
      {
        id: "D-02",
        description: "Kategorienbaum aufklappen (Edit → Categories)",
        expected: "Hierarchie vollständig, kein Datenverlust",
      },
      {
        id: "D-03",
        description: "Stichprobe: 3–5 Lagerorte öffnen",
        expected: "Bezeichnung, Hierarchie, Teileanzahl plausibel",
      },
      {
        id: "D-04",
        description: "Hersteller-Liste öffnen (Edit → Manufacturers)",
        expected: "Einträge vollständig, keine Leerzeilen",
      },
      {
        id: "D-05",
        description: "Attachment / Datenblatt öffnen (min. 3 reale Teile)",
        expected: "Datei lädt korrekt, kein 404 / 403",
      },
      {
        id: "D-06",
        description: "Vorschaubild eines Footprints prüfen",
        expected: "Bild wird angezeigt, kein Platzhalter-Icon",
      },
      {
        id: "D-07",
        description: "Teil mit Parametern öffnen → Tab 'Spezifikationen'",
        expected: "Parameter mit Werten + Einheiten vorhanden",
      },
      {
        id: "D-08",
        description: "Teil mit Einkaufsinfo öffnen → Tab 'Einkauf'",
        expected: "Lieferant, Bestellnr., Preisstaffeln korrekt",
      },
    ],
  },
  {
    id: "S3",
    title: "3 · Suche & Filter",
    goal: "Überprüfen dass die Volltextsuche, IPN/MPN-Suche sowie alle Filterfunktionen nach dem Update korrekte und vollständige Ergebnisse liefern.",
    cases: [
      {
        id: "S-01",
        description: "Schnellsuche: bekannter Teilename (Volltext)",
        expected: "Treffer erscheint in Ergebnisliste",
      },
      {
        id: "S-02",
        description: "Schnellsuche: IPN des bekannten Teils",
        expected: "Korrekte Teil-Detailseite geöffnet",
      },
      {
        id: "S-03",
        description: "Schnellsuche: MPN des bekannten Teils",
        expected: "Treffer erscheint",
      },
      {
        id: "S-04",
        description: "Suche mit Teilstring (z. B. erste 3 Buchstaben)",
        expected: "Relevantergebnis in Liste",
      },
      {
        id: "S-05",
        description: "Suche nach nicht existierendem Begriff",
        expected: "Leere Ergebnisliste, kein Fehler",
      },
      {
        id: "S-06",
        description: "Kategorie in Sidebar anklicken → Teileliste filtern",
        expected: "Nur Teile dieser Kategorie angezeigt",
      },
      {
        id: "S-07",
        description: "Erweiterte Suche: Filter nach Lagerort setzen",
        expected: "Nur Teile an diesem Lagerort angezeigt",
      },
      {
        id: "S-08",
        description: "Erweiterte Suche: Filter nach Tag setzen",
        expected: "Nur Teile mit diesem Tag angezeigt",
      },
    ],
  },
  {
    id: "S4",
    title: "4 · Teile anlegen & bearbeiten",
    goal: "Sicherstellen dass das Anlegen, Bearbeiten und Löschen von Teilen korrekt funktioniert und alle Pflichtfelder, Parameter sowie Metadaten zuverlässig gespeichert werden.",
    cases: [
      {
        id: "P-01",
        description: "Neues Teil anlegen: Name TEST_UPDATE_DATUM, Kategorie wählen",
        expected: "Teil gespeichert, Detailseite öffnet",
      },
      {
        id: "P-02",
        description: "Beschreibung + MPN + Hersteller eintragen, speichern",
        expected: "Felder nach Reload erhalten",
      },
      {
        id: "P-03",
        description: "Tag hinzufügen, speichern, reload",
        expected: "Tag sichtbar auf Detailseite",
      },
      {
        id: "P-04",
        description: "Footprint zuweisen, speichern, reload",
        expected: "Footprint-Name + ggf. Vorschau sichtbar",
      },
      {
        id: "P-05",
        description: "Parameter anlegen: Name, Wert, Einheit, Gruppe",
        expected: "Parameter auf Tab 'Spezifikationen' sichtbar",
      },
      {
        id: "P-06",
        description: "Teil ohne Pflichtfeld (Name) speichern",
        expected: "Validierungsfehler, kein Speichern",
      },
      {
        id: "P-07",
        description: "Vorhandenes Teil bearbeiten: Beschreibung ändern, speichern",
        expected: "Änderung nach Reload erhalten",
      },
      {
        id: "P-08",
        description: "Favorit-Flag setzen, speichern, reload",
        expected: "Stern-Icon sichtbar",
      },
      {
        id: "P-09",
        description: "Teil duplizieren (falls Feature vorhanden)",
        expected: "Kopie angelegt mit 'Copy of...' o. ä.",
      },
      {
        id: "P-10",
        description: "Testteil löschen",
        expected: "Nicht mehr in Suche auffindbar",
      },
    ],
  },
  {
    id: "S5",
    title: "5 · Bestand / Part Lots",
    goal: "Verifizieren dass Lagerbestände korrekt erfasst, aktualisiert und summiert werden und die Bestandsverwaltung fehlerfrei mit mehreren Lagerorten umgeht.",
    cases: [
      {
        id: "L-01",
        description: "Bestand-Lot anlegen: Lagerort + Menge 20",
        expected: "Menge + Lagerort gespeichert, Summe = 20",
      },
      {
        id: "L-02",
        description: "Zweites Lot am anderen Lagerort anlegen: Menge 5",
        expected: "Gesamtbestand = 25",
      },
      {
        id: "L-03",
        description: "Menge eines Lots ändern: 20 → 15",
        expected: "Gesamtbestand = 20 nach Reload",
      },
      {
        id: "L-04",
        description: "Menge mit Text 'abc' eingeben",
        expected: "Validierungsfehler, kein Speichern",
      },
      {
        id: "L-05",
        description: "Lot auf 'Menge unbekannt' setzen",
        expected: "Symbol für unbekannte Menge erscheint",
      },
      {
        id: "L-06",
        description: "Lot löschen",
        expected: "Gesamtbestand aktualisiert",
      },
      {
        id: "L-07",
        description: "Bestand eines bestehenden Realteils prüfen",
        expected: "Stimmt mit Referenzwert aus V-3 überein",
      },
    ],
  },
  {
    id: "S6",
    title: "6 · Anhänge (Attachments)",
    goal: "Sicherstellen dass Dateianhänge (PDFs, Bilder, externe Links) hochgeladen, angezeigt, heruntergeladen und gelöscht werden können.",
    cases: [
      {
        id: "AT-01",
        description: "Datei hochladen (PDF): Testteil → Tab Anhänge",
        expected: "Datei gespeichert, Download-Link erscheint",
      },
      {
        id: "AT-02",
        description: "Hochgeladene Datei öffnen / herunterladen",
        expected: "Datei lädt, Inhalt korrekt",
      },
      {
        id: "AT-03",
        description: "Bild hochladen als Vorschaubild setzen",
        expected: "Bild erscheint auf Detailseite + Teileliste",
      },
      {
        id: "AT-04",
        description: "Externe URL als Anhang verlinken",
        expected: "Link öffnet externe Seite",
      },
      {
        id: "AT-05",
        description: "Anhang löschen",
        expected: "Nicht mehr in Anhang-Tab sichtbar",
      },
    ],
  },
  {
    id: "S7",
    title: "7 · Projekte (BOM)",
    goal: "Überprüfen dass Projekte angelegt, Stücklisten (BOM) bearbeitet und die Baubarkeitsberechnung auf Basis verfügbarer Bestände korrekt durchgeführt wird.",
    cases: [
      {
        id: "PR-01",
        description: "Neues Projekt anlegen: Name TEST_PROJEKT",
        expected: "Projekt gespeichert, in Projektliste sichtbar",
      },
      {
        id: "PR-02",
        description: "Teil zur BOM hinzufügen: Testteil, Menge 3",
        expected: "Teil in BOM-Liste des Projekts sichtbar",
      },
      {
        id: "PR-03",
        description: "'Wie oft baubar?' prüfen",
        expected: "Anzahl berechnet auf Basis verfügbarem Bestand",
      },
      {
        id: "PR-04",
        description: "Testteil aus BOM entfernen",
        expected: "BOM-Liste aktualisiert",
      },
      {
        id: "PR-05",
        description: "Testprojekt löschen",
        expected: "Nicht mehr in Projektliste",
      },
    ],
  },
  {
    id: "S8",
    title: "8 · Labels & Barcode-Ausgabe",
    goal: "Sicherstellen dass der Label-Generator korrekte Vorschauen und druckbare PDFs mit lesbaren Barcodes/QR-Codes für Teile und Lagerorte erzeugt.",
    cases: [
      {
        id: "G-01",
        description: "Label-Generator öffnen (Tools → Label Generator)",
        expected: "Dialog öffnet ohne Fehler",
      },
      {
        id: "G-02",
        description: "Label für Testteil erzeugen (Part Label)",
        expected: "Vorschau zeigt Name, IPN, Lagerort",
      },
      {
        id: "G-03",
        description: "Barcode/QR im Label vollständig + nicht abgeschnitten",
        expected: "Code lesbar dargestellt",
      },
      {
        id: "G-04",
        description: "Lagerort-Label erzeugen",
        expected: "Name + QR des Lagerorts sichtbar",
      },
      {
        id: "G-05",
        description: "Label-PDF drucken / Druckvorschau",
        expected: "Layout korrekt, keine abgeschnittenen Felder",
      },
      {
        id: "G-06",
        description: "Bestehendes Label-Profil laden + anwenden",
        expected: "Profil-Einstellungen übernommen",
      },
    ],
  },
  {
    id: "S9",
    title: "9 · Event Log",
    goal: "Verifizieren dass alle benutzerrelevanten Aktionen im Event Log protokolliert werden und die Filterfunktionen sowie Detailansichten korrekt funktionieren.",
    cases: [
      {
        id: "EL-01",
        description: "Event Log öffnen (Tools → Event Log)",
        expected: "Log öffnet, Einträge sichtbar",
      },
      {
        id: "EL-02",
        description: "Eigene Aktionen aus diesem Test sichtbar",
        expected: "Mindestens Teil-Erstellt + Bestand-Geändert geloggt",
      },
      {
        id: "EL-03",
        description: "Log nach eigenem Nutzer filtern",
        expected: "Nur eigene Einträge angezeigt",
      },
      {
        id: "EL-04",
        description: "Detailansicht eines Log-Eintrags öffnen",
        expected: "Geänderte Felder / Vorher-Nachher sichtbar",
      },
    ],
  },
  {
    id: "S10",
    title: "10 · Nutzereinstellungen",
    goal: "Sicherstellen dass Benutzerprofile, Spracheinstellungen und Passwortänderungen korrekt gespeichert werden und nach einem Neuanmelden wirksam sind.",
    cases: [
      {
        id: "U-01",
        description: "Nutzerprofil öffnen (Nutzer-Icon → Einstellungen)",
        expected: "Profilseite lädt",
      },
      {
        id: "U-02",
        description: "Sprache ändern, speichern, reload",
        expected: "UI-Sprache wechselt",
      },
      {
        id: "U-03",
        description: "Sprache zurückstellen auf Originalwert",
        expected: "Originalsprache wiederhergestellt",
      },
      {
        id: "U-04",
        description: "Passwort ändern → mit neuem Passwort neu anmelden",
        expected: "Login mit neuem Passwort funktioniert",
      },
      {
        id: "U-05",
        description: "Passwort zurück auf Originalwert setzen",
        expected: "Login wie zuvor funktioniert",
      },
    ],
  },
  {
    id: "S11",
    title: "11 · Sicherheit & Negativtests",
    goal: "Überprüfen dass nicht autorisierte Zugriffe auf Admin-Bereiche abgeblockt werden, XSS-Eingaben escaped dargestellt werden und Session-Handling korrekt funktioniert.",
    cases: [
      {
        id: "N-01",
        description: "Admin-URL direkt aufrufen (/admin, /en/system/...)",
        expected: "403 oder Redirect auf Login/Dashboard",
      },
      {
        id: "N-02",
        description: "Benutzerverwaltungs-URL direkt aufrufen",
        expected: "403 oder Redirect",
      },
      {
        id: "N-03",
        description: "Logout → geschützte Seite direkt aufrufen",
        expected: "Redirect auf Login",
      },
      {
        id: "N-04",
        description: "<script>alert(1)</script> in Teilename eingeben",
        expected: "Kein Alert, Text escaped dargestellt",
      },
    ],
  },
];

// Hilfsfunktionen
export const getTotalCaseCount = (): number =>
  TEST_SECTIONS.reduce((sum, s) => sum + s.cases.length, 0);

export const getSectionById = (id: string): TestSection | undefined =>
  TEST_SECTIONS.find((s) => s.id === id);
