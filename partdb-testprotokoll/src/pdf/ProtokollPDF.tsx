import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from '@react-pdf/renderer';
import type { AppState } from '../types';
import { TEST_SECTIONS } from '../data/testcases';

// ── Design tokens ──────────────────────────────────────────────────────────

const C = {
  accent:    '#6B9FCC',
  accentDark:'#4a7fac',
  dark:      '#1e293b',
  gray:      '#64748b',
  grayLight: '#94a3b8',
  border:    '#e2e8f0',
  bgAlt:     '#f8fafc',
  bgGray:    '#f1f5f9',
  green:     '#059669',
  greenBg:   '#d1fae5',
  greenText: '#065f46',
  red:       '#dc2626',
  redBg:     '#fee2e2',
  redText:   '#7f1d1d',
  amber:     '#d97706',
  amberBg:   '#fef9c3',
  amberText: '#713f12',
  white:     '#ffffff',
  nokRowBg:  '#fff0f0',
  body:      '#1a1a1a',
};

const FONT = {
  normal: 'Helvetica',
  bold:   'Helvetica-Bold',
  oblique:'Helvetica-Oblique',
};

// ── Styles ─────────────────────────────────────────────────────────────────

const s = StyleSheet.create({
  page: {
    fontFamily: FONT.normal,
    fontSize: 9,
    color: C.body,
    paddingTop: 44,
    paddingBottom: 40,
    paddingHorizontal: 40,
    lineHeight: 1.4,
  },

  // ── Footer ────────────────────────────────────────────────────────────────
  footer: {
    position: 'absolute',
    bottom: 18,
    left: 40,
    right: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 0.5,
    borderTopColor: C.border,
    paddingTop: 5,
  },
  footerText: { fontSize: 7.5, color: C.grayLight },

  // ── Title page ────────────────────────────────────────────────────────────
  titlePage: { paddingTop: 60 },
  titleLabel: {
    fontSize: 9,
    color: C.grayLight,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  titleMain: {
    fontSize: 26,
    fontFamily: FONT.bold,
    color: C.dark,
    marginBottom: 4,
    lineHeight: 1.2,
  },
  titleSub: { fontSize: 12, color: C.gray, marginBottom: 32 },
  divider: { borderBottomWidth: 1, borderBottomColor: C.border, marginVertical: 20 },
  thinDivider: { borderBottomWidth: 0.5, borderBottomColor: C.border, marginVertical: 10 },

  metaGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 0 },
  metaCell: { width: '50%', marginBottom: 10 },
  metaLabel: { fontSize: 7.5, color: C.grayLight, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 2 },
  metaValue: { fontSize: 10, color: C.dark, fontFamily: FONT.bold },

  // ── Result block ──────────────────────────────────────────────────────────
  resultBlock: {
    borderRadius: 4,
    padding: 14,
    marginTop: 8,
    marginBottom: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  resultEmoji: { fontSize: 20 },
  resultLabel: { fontSize: 14, fontFamily: FONT.bold, marginBottom: 2 },
  resultSub: { fontSize: 9 },

  // ── Summary pills ─────────────────────────────────────────────────────────
  pillsRow: { flexDirection: 'row', gap: 6, marginTop: 14, flexWrap: 'wrap' },
  pill: {
    borderRadius: 3,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  pillNum: { fontSize: 12, fontFamily: FONT.bold },
  pillLabel: { fontSize: 7.5, color: C.gray, marginTop: 1 },

  // ── Section block ─────────────────────────────────────────────────────────
  sectionBlock: { marginBottom: 16 },
  sectionHeader: {
    backgroundColor: C.accent,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginBottom: 6,
    borderRadius: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: { fontSize: 10.5, fontFamily: FONT.bold, color: C.white },
  sectionBadge: {
    fontSize: 8,
    color: C.white,
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  goalRow: { flexDirection: 'row', marginBottom: 8, gap: 4 },
  goalLabel: { fontSize: 8, color: C.gray, fontFamily: FONT.bold, width: 32 },
  goalText: { fontSize: 8, color: C.gray, fontFamily: FONT.oblique, flex: 1 },

  // ── Test table ────────────────────────────────────────────────────────────
  tableLabel: { fontSize: 7.5, color: C.grayLight, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 4 },
  tableHead: {
    flexDirection: 'row',
    backgroundColor: C.bgGray,
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  tableHeadText: { fontSize: 7.5, fontFamily: FONT.bold, color: C.gray },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: C.border,
  },
  tableRowNok: { backgroundColor: C.nokRowBg },
  tableRowAlt: { backgroundColor: C.bgAlt },
  colId: { width: 44, fontSize: 8, fontFamily: FONT.bold, color: C.gray },
  colDesc: { flex: 1, fontSize: 8.5 },
  colStatus: { width: 36, fontSize: 8, textAlign: 'center', fontFamily: FONT.bold },
  noteRow: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    paddingBottom: 4,
    paddingTop: 1,
    backgroundColor: C.nokRowBg,
    borderBottomWidth: 0.5,
    borderBottomColor: C.border,
  },
  noteIndent: { width: 44 },
  noteText: { flex: 1, fontSize: 7.5, color: C.red, fontFamily: FONT.oblique },

  // ── Auffälligkeiten ───────────────────────────────────────────────────────
  auffBox: {
    marginTop: 6,
    borderLeftWidth: 3,
    borderLeftColor: C.red,
    paddingLeft: 8,
    paddingVertical: 4,
    backgroundColor: '#fff8f8',
  },
  auffLabel: { fontSize: 8, fontFamily: FONT.bold, color: C.red, marginBottom: 4 },
  auffItem: { fontSize: 8, color: C.body, marginBottom: 3 },
  auffBugRef: { fontSize: 7.5, color: C.gray },

  // ── Bug log ───────────────────────────────────────────────────────────────
  bugColId: { width: 56, fontSize: 8, fontFamily: FONT.bold, color: C.gray },
  bugColCase: { width: 44, fontSize: 8 },
  bugColPrio: { width: 28, fontSize: 8, textAlign: 'center', fontFamily: FONT.bold },
  bugColDesc: { flex: 1, fontSize: 8 },
  bugColStatus: { width: 50, fontSize: 8, textAlign: 'center', fontFamily: FONT.bold },
  bugRowP1: { backgroundColor: C.redBg },
  bugRowResolved: { backgroundColor: C.greenBg },

  // ── Release ───────────────────────────────────────────────────────────────
  checkRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
  checkBox: {
    width: 10, height: 10,
    borderWidth: 1, borderColor: C.gray,
    borderRadius: 2,
    marginRight: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkMark: { fontSize: 7, color: C.green, fontFamily: FONT.bold },
  checkLabel: { fontSize: 9, color: C.body },
  decisionBlock: {
    borderRadius: 4,
    padding: 12,
    marginTop: 10,
    marginBottom: 6,
    alignItems: 'center',
  },
  decisionText: { fontSize: 15, fontFamily: FONT.bold, textAlign: 'center' },

  // ── Fazit ─────────────────────────────────────────────────────────────────
  fazitBox: {
    backgroundColor: C.bgAlt,
    borderRadius: 4,
    padding: 12,
    marginTop: 8,
    borderWidth: 1,
    borderColor: C.border,
  },
  fazitText: { fontSize: 9, lineHeight: 1.6, color: C.body },

  // ── Page heading ──────────────────────────────────────────────────────────
  pageHeading: {
    fontSize: 13,
    fontFamily: FONT.bold,
    color: C.dark,
    marginBottom: 12,
    paddingBottom: 6,
    borderBottomWidth: 1.5,
    borderBottomColor: C.accent,
  },
  subHeading: {
    fontSize: 10,
    fontFamily: FONT.bold,
    color: C.dark,
    marginTop: 14,
    marginBottom: 6,
  },
});

// ── Helpers ────────────────────────────────────────────────────────────────

function statusLabel(status: string) {
  if (status === 'ok')   return 'OK';
  if (status === 'nok')  return 'NOK';
  if (status === 'na')   return 'n.a.';
  return 'offen';
}

function statusColor(status: string) {
  if (status === 'ok')  return C.green;
  if (status === 'nok') return C.red;
  if (status === 'na')  return C.gray;
  return C.grayLight;
}

function bugLabel(i: number) {
  return `BUG-${String(i + 1).padStart(3, '0')}`;
}

function prioColor(p: string) {
  if (p === 'P1') return C.red;
  if (p === 'P2') return '#ea580c';
  if (p === 'P3') return C.amber;
  return C.gray;
}

function decisionBg(d: string | null) {
  if (d === 'approved')                  return C.greenBg;
  if (d === 'approved_with_restrictions') return C.amberBg;
  if (d === 'rejected')                  return C.redBg;
  return C.bgGray;
}

function decisionTextColor(d: string | null) {
  if (d === 'approved')                  return C.greenText;
  if (d === 'approved_with_restrictions') return C.amberText;
  if (d === 'rejected')                  return C.redText;
  return C.gray;
}

function decisionLabel(d: string | null) {
  if (d === 'approved')                  return '✓  FREIGABE ERTEILT';
  if (d === 'approved_with_restrictions') return '⚠  FREIGABE MIT EINSCHRÄNKUNG';
  if (d === 'rejected')                  return '✗  KEINE FREIGABE';
  return 'Keine Entscheidung getroffen';
}

// ── Footer (fixed, every page) ─────────────────────────────────────────────

function PageFooter({ meta }: { meta: AppState['meta'] }) {
  return (
    <View style={s.footer} fixed>
      <Text style={s.footerText}>
        Testbericht Part-DB Update · {meta.tester} · {meta.date}
      </Text>
      <Text
        style={s.footerText}
        render={({ pageNumber, totalPages }) => `Seite ${pageNumber} / ${totalPages}`}
      />
    </View>
  );
}

// ── Title page ─────────────────────────────────────────────────────────────

function TitlePage({ state, stats }: {
  state: AppState;
  stats: ReturnType<typeof computeStats>;
}) {
  const { meta, releaseDecision } = state;
  const { total, ok, nok, na, bugTotal, p1Total, p2Total } = stats;

  const RESULT_CONF = {
    approved:                  { bg: C.greenBg, textColor: C.greenText, icon: '✓', label: 'Freigabe erteilt',            sub: 'Das Update kann produktiv eingespielt werden.' },
    approved_with_restrictions: { bg: C.amberBg, textColor: C.amberText, icon: '⚠', label: 'Freigabe mit Einschränkung', sub: 'Freigabe unter Berücksichtigung dokumentierter Einschränkungen.' },
    rejected:                  { bg: C.redBg,   textColor: C.redText,   icon: '✗', label: 'Keine Freigabe',             sub: 'Das Update darf nicht produktiv eingespielt werden.' },
  } as const;
  const fallbackConf = { bg: C.bgGray, textColor: C.gray, icon: '–', label: 'Kein Urteil', sub: 'Freigabeentscheidung noch ausstehend.' };
  const resultConf = releaseDecision && releaseDecision in RESULT_CONF
    ? RESULT_CONF[releaseDecision]
    : fallbackConf;

  return (
    <Page size="A4" style={s.page}>
      <PageFooter meta={meta} />
      <View style={s.titlePage}>
        <Text style={s.titleLabel}>Qualitätssicherung</Text>
        <Text style={s.titleMain}>Testbericht{'\n'}Part-DB Update</Text>
        <Text style={s.titleSub}>
          Version {meta.versionOld || '?'} → {meta.versionNew || '?'}
        </Text>

        <View style={s.divider} />

        <View style={s.metaGrid}>
          <View style={s.metaCell}>
            <Text style={s.metaLabel}>Testdatum</Text>
            <Text style={s.metaValue}>{meta.date || '–'}</Text>
          </View>
          <View style={s.metaCell}>
            <Text style={s.metaLabel}>Tester</Text>
            <Text style={s.metaValue}>{meta.tester || '–'}</Text>
          </View>
          <View style={s.metaCell}>
            <Text style={s.metaLabel}>Version alt</Text>
            <Text style={s.metaValue}>{meta.versionOld || '–'}</Text>
          </View>
          <View style={s.metaCell}>
            <Text style={s.metaLabel}>Version neu</Text>
            <Text style={s.metaValue}>{meta.versionNew || '–'}</Text>
          </View>
          <View style={[s.metaCell, { width: '100%' }]}>
            <Text style={s.metaLabel}>Testumgebung</Text>
            <Text style={s.metaValue}>{meta.url || '–'}</Text>
          </View>
        </View>

        <View style={s.divider} />

        {/* Gesamtergebnis */}
        <View style={[s.resultBlock, { backgroundColor: resultConf.bg }]}>
          <Text style={[s.resultEmoji, { color: resultConf.textColor }]}>
            {resultConf.icon}
          </Text>
          <View style={{ flex: 1 }}>
            <Text style={[s.resultLabel, { color: resultConf.textColor }]}>
              {resultConf.label}
            </Text>
            <Text style={[s.resultSub, { color: resultConf.textColor, opacity: 0.85 }]}>
              {resultConf.sub}
            </Text>
          </View>
        </View>

        {/* Summary pills */}
        <View style={s.pillsRow}>
          {[
            { num: total,    label: 'Testfälle',  bg: C.bgGray,   num_color: C.dark },
            { num: ok,       label: 'OK',          bg: C.greenBg,  num_color: C.green },
            { num: nok,      label: 'NOK',         bg: C.redBg,    num_color: C.red },
            { num: na,       label: 'n.a.',        bg: C.bgGray,   num_color: C.gray },
            { num: total-ok-nok-na, label: 'Offen', bg: C.amberBg, num_color: C.amber },
            { num: bugTotal, label: 'Fehler',      bg: nok > 0 ? C.redBg : C.bgGray, num_color: nok > 0 ? C.red : C.gray },
            { num: p1Total,  label: 'P1-Fehler',  bg: p1Total > 0 ? C.redBg : C.bgGray, num_color: p1Total > 0 ? C.red : C.gray },
            { num: p2Total,  label: 'P2-Fehler',  bg: C.bgGray,   num_color: C.gray },
          ].map((item) => (
            <View key={item.label} style={[s.pill, { backgroundColor: item.bg }]}>
              <Text style={[s.pillNum, { color: item.num_color }]}>{item.num}</Text>
              <Text style={s.pillLabel}>{item.label}</Text>
            </View>
          ))}
        </View>
      </View>
    </Page>
  );
}

// ── Test section block ─────────────────────────────────────────────────────

function TestSectionBlock({ section, results, bugs }: {
  section: typeof TEST_SECTIONS[0];
  results: AppState['results'];
  bugs: AppState['bugs'];
}) {
  const ids = section.cases.map((c) => c.id);
  const sectionResults = results.filter((r) => ids.includes(r.caseId));
  const okCount = sectionResults.filter((r) => r.status === 'ok' || r.status === 'na').length;
  const nokResults = sectionResults.filter((r) => r.status === 'nok');

  // Bug references for this section
  const sectionBugs = bugs.filter((b) => ids.includes(b.caseId));
  const bugIndexMap = new Map(bugs.map((b, i) => [b.id, i]));

  return (
    <View style={s.sectionBlock} wrap={false}>
      {/* Section header */}
      <View style={s.sectionHeader}>
        <Text style={s.sectionTitle}>{section.title}</Text>
        <Text style={s.sectionBadge}>
          {okCount}/{section.cases.length} abgeschlossen
        </Text>
      </View>

      {/* Goal */}
      <View style={s.goalRow}>
        <Text style={s.goalLabel}>Ziel:</Text>
        <Text style={s.goalText}>{section.goal}</Text>
      </View>

      {/* Durchgeführte Tests */}
      <Text style={s.tableLabel}>Durchgeführte Tests</Text>

      {/* Table header */}
      <View style={s.tableHead}>
        <Text style={[s.tableHeadText, s.colId]}>ID</Text>
        <Text style={[s.tableHeadText, s.colDesc]}>Beschreibung</Text>
        <Text style={[s.tableHeadText, s.colStatus]}>Status</Text>
      </View>

      {/* Rows */}
      {section.cases.map((tc, i) => {
        const result = results.find((r) => r.caseId === tc.id);
        const status = result?.status ?? 'open';
        const isNok = status === 'nok';
        const isAlt = i % 2 === 1 && !isNok;
        const hasNote = isNok && result?.note?.trim();

        return (
          <View key={tc.id}>
            <View style={[s.tableRow, isNok ? s.tableRowNok : isAlt ? s.tableRowAlt : {}]}>
              <Text style={s.colId}>{tc.id}</Text>
              <Text style={s.colDesc}>{tc.description}</Text>
              <Text style={[s.colStatus, { color: statusColor(status) }]}>
                {statusLabel(status)}
              </Text>
            </View>
            {hasNote && (
              <View style={s.noteRow}>
                <View style={s.noteIndent} />
                <Text style={s.noteText}>↳ {result!.note}</Text>
              </View>
            )}
          </View>
        );
      })}

      {/* Auffälligkeiten */}
      {nokResults.length > 0 && (
        <View style={s.auffBox}>
          <Text style={s.auffLabel}>Aufgetretene Auffälligkeiten:</Text>
          {nokResults.map((r) => {
            const tc = section.cases.find((c) => c.id === r.caseId);
            const linkedBugs = sectionBugs.filter((b) => b.caseId === r.caseId);
            return (
              <View key={r.caseId} style={{ marginBottom: 3 }}>
                <Text style={s.auffItem}>
                  • [{r.caseId}] {tc?.description ?? ''}
                  {r.note?.trim() ? `: ${r.note}` : ''}
                </Text>
                {linkedBugs.map((b) => {
                  const idx = bugIndexMap.get(b.id) ?? 0;
                  return (
                    <Text key={b.id} style={s.auffBugRef}>
                      {'  '}→ {bugLabel(idx)} ({b.priority}
                      {b.description ? `: ${b.description}` : ''})
                    </Text>
                  );
                })}
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
}

// ── Bug log page ───────────────────────────────────────────────────────────

function BugLogPage({ state, meta }: { state: AppState; meta: AppState['meta'] }) {
  const { bugs } = state;
  return (
    <Page size="A4" style={s.page}>
      <PageFooter meta={meta} />
      <Text style={s.pageHeading}>Fehlerprotokoll</Text>

      {bugs.length === 0 ? (
        <Text style={{ fontSize: 9, color: C.gray, fontFamily: FONT.oblique }}>
          Keine Fehler dokumentiert.
        </Text>
      ) : (
        <>
          <View style={s.tableHead}>
            <Text style={[s.tableHeadText, s.bugColId]}>Fehler-ID</Text>
            <Text style={[s.tableHeadText, s.bugColCase]}>Testfall</Text>
            <Text style={[s.tableHeadText, s.bugColPrio]}>Prio</Text>
            <Text style={[s.tableHeadText, s.bugColDesc]}>Beschreibung</Text>
            <Text style={[s.tableHeadText, s.bugColStatus]}>Status</Text>
          </View>
          {bugs.map((bug, i) => {
            const isP1Open = bug.priority === 'P1' && bug.status === 'open';
            const isResolved = bug.status === 'resolved';
            const isAlt = i % 2 === 1 && !isP1Open && !isResolved;
            return (
              <View
                key={bug.id}
                style={[
                  s.tableRow,
                  isP1Open ? s.bugRowP1 : isResolved ? s.bugRowResolved : isAlt ? s.tableRowAlt : {},
                ]}
              >
                <Text style={s.bugColId}>{bugLabel(i)}</Text>
                <Text style={s.bugColCase}>{bug.caseId || '–'}</Text>
                <Text style={[s.bugColPrio, { color: prioColor(bug.priority) }]}>
                  {bug.priority}
                </Text>
                <Text style={s.bugColDesc}>
                  {bug.description || '(keine Beschreibung)'}
                </Text>
                <Text style={[
                  s.bugColStatus,
                  { color: isResolved ? C.green : C.red },
                ]}>
                  {isResolved ? 'Behoben' : 'Offen'}
                </Text>
              </View>
            );
          })}
        </>
      )}
    </Page>
  );
}

// ── Release + Fazit page ───────────────────────────────────────────────────

function ReleasePage({ state, stats, meta }: {
  state: AppState;
  stats: ReturnType<typeof computeStats>;
  meta: AppState['meta'];
}) {
  const { releaseDecision, releaseNotes, bugs } = state;
  const { total, ok, nok, na, bugTotal, p1Total, p2Total, p1Open, p2Open } = stats;

  const allP1Fixed = p1Total === 0 || p1Open === 0;
  const allP2Assessed = p2Total === 0 || p2Open === 0;
  const bugOpen = bugs.filter((b) => b.status === 'open').length;

  const checks = [
    { label: 'Alle P1-Fehler behoben', ok: allP1Fixed },
    { label: 'Alle P2-Fehler bewertet', ok: allP2Assessed },
  ];

  // Fazit text
  const fazit = [
    `Die neue Version ${meta.versionNew || '?'} wurde am ${meta.date || '?'} von ${meta.tester || '?'} gegen Version ${meta.versionOld || '?'} getestet.`,
    `Von ${total} Testfällen wurden ${ok} erfolgreich bestätigt, ${nok} wiesen Auffälligkeiten auf${na > 0 ? `, ${na} wurden als nicht zutreffend bewertet` : ''}.`,
    bugTotal > 0
      ? `Es wurden ${bugTotal} Fehler dokumentiert, davon ${p1Total} mit Priorität P1 und ${p2Total} mit Priorität P2. ${bugOpen > 0 ? `${bugOpen} Fehler sind noch offen.` : 'Alle Fehler sind behoben.'}`
      : 'Es wurden keine Fehler dokumentiert.',
  ].join(' ');

  return (
    <Page size="A4" style={s.page}>
      <PageFooter meta={meta} />

      <Text style={s.pageHeading}>Freigabeentscheidung</Text>

      {/* Checkliste */}
      <Text style={s.subHeading}>Voraussetzungen</Text>
      {checks.map((c) => (
        <View key={c.label} style={s.checkRow}>
          <View style={s.checkBox}>
            {c.ok && <Text style={s.checkMark}>✓</Text>}
          </View>
          <Text style={s.checkLabel}>{c.label}</Text>
        </View>
      ))}

      {/* Decision */}
      <View style={[s.decisionBlock, { backgroundColor: decisionBg(releaseDecision) }]}>
        <Text style={[s.decisionText, { color: decisionTextColor(releaseDecision) }]}>
          {decisionLabel(releaseDecision)}
        </Text>
      </View>

      {/* P1 warning */}
      {releaseDecision === 'approved' && p1Open > 0 && (
        <View style={{ backgroundColor: C.redBg, borderRadius: 3, padding: 8, marginBottom: 8 }}>
          <Text style={{ fontSize: 8, color: C.redText, fontFamily: FONT.bold }}>
            ⚠ Achtung: {p1Open} offene P1-Fehler bei erteilter Freigabe
          </Text>
        </View>
      )}

      {/* Anmerkungen */}
      {releaseNotes?.trim() && (
        <>
          <Text style={s.subHeading}>Anmerkungen</Text>
          <Text style={{ fontSize: 9, color: C.body, lineHeight: 1.5 }}>{releaseNotes}</Text>
        </>
      )}

      <View style={[s.divider, { marginTop: 20 }]} />

      {/* Fazit */}
      <Text style={s.pageHeading}>Fazit</Text>
      <View style={s.fazitBox}>
        <Text style={s.fazitText}>{fazit}</Text>
      </View>

      {releaseNotes?.trim() && (
        <>
          <Text style={[s.subHeading, { marginTop: 12 }]}>Weitere Anmerkungen</Text>
          <Text style={{ fontSize: 9, color: C.body, lineHeight: 1.5 }}>{releaseNotes}</Text>
        </>
      )}
    </Page>
  );
}

// ── Stats helper ───────────────────────────────────────────────────────────

function computeStats(state: AppState) {
  const { results, bugs } = state;
  return {
    total:    results.length,
    ok:       results.filter((r) => r.status === 'ok').length,
    nok:      results.filter((r) => r.status === 'nok').length,
    na:       results.filter((r) => r.status === 'na').length,
    bugTotal: bugs.length,
    p1Total:  bugs.filter((b) => b.priority === 'P1').length,
    p2Total:  bugs.filter((b) => b.priority === 'P2').length,
    p1Open:   bugs.filter((b) => b.priority === 'P1' && b.status === 'open').length,
    p2Open:   bugs.filter((b) => b.priority === 'P2' && b.status === 'open').length,
  };
}

// ── Document ───────────────────────────────────────────────────────────────

interface Props {
  state: AppState;
}

// Chunk sections into groups so test content fits across pages
const CHUNK_SIZE = 3;

export function ProtokollPDF({ state }: Props) {
  const { meta, results, bugs } = state;
  const stats = computeStats(state);

  // Split sections into pages of CHUNK_SIZE sections each
  const sectionChunks: (typeof TEST_SECTIONS[0])[][] = [];
  for (let i = 0; i < TEST_SECTIONS.length; i += CHUNK_SIZE) {
    sectionChunks.push(TEST_SECTIONS.slice(i, i + CHUNK_SIZE));
  }

  return (
    <Document
      title={`Testbericht Part-DB Update v${meta.versionNew}`}
      author={meta.tester}
      subject="Part-DB Update Funktionstest"
      creator="Part-DB Testprotokoll App"
    >
      {/* 1. Titelseite */}
      <TitlePage state={state} stats={stats} />

      {/* 2. Testsektionen — je CHUNK_SIZE Sektionen pro Seite */}
      {sectionChunks.map((chunk, ci) => (
        <Page key={ci} size="A4" style={s.page}>
          <PageFooter meta={meta} />
          {ci === 0 && (
            <Text style={s.pageHeading}>Testdurchführung</Text>
          )}
          {chunk.map((section) => (
            <TestSectionBlock
              key={section.id}
              section={section}
              results={results}
              bugs={bugs}
            />
          ))}
        </Page>
      ))}

      {/* 3. Fehlerprotokoll */}
      <BugLogPage state={state} meta={meta} />

      {/* 4+5. Freigabe + Fazit */}
      <ReleasePage state={state} stats={stats} meta={meta} />
    </Document>
  );
}
