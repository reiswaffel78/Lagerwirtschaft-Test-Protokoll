import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';
import { AppState } from '../types';
import { TEST_SECTIONS } from '../data/testcases';

// ── Styles ─────────────────────────────────────────────────────────────────

const ACCENT = '#6B9FCC';
const NOK_BG = '#fdecea';
const HEADER_BG = '#1e293b';

const s = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 9,
    color: '#1a1a1a',
    paddingTop: 40,
    paddingBottom: 36,
    paddingHorizontal: 36,
  },

  // Title page
  titleBlock: { marginTop: 80, marginBottom: 40 },
  titleMain: { fontSize: 22, fontFamily: 'Helvetica-Bold', color: HEADER_BG, marginBottom: 6 },
  titleSub: { fontSize: 13, color: '#475569', marginBottom: 32 },
  metaTable: { marginTop: 16 },
  metaRow: { flexDirection: 'row', marginBottom: 5 },
  metaLabel: { width: 120, fontSize: 9, color: '#64748b', fontFamily: 'Helvetica-Bold' },
  metaValue: { fontSize: 9, color: '#1a1a1a', flex: 1 },

  // Section header
  sectionHeader: {
    backgroundColor: ACCENT,
    paddingVertical: 5,
    paddingHorizontal: 8,
    marginTop: 16,
    marginBottom: 4,
    borderRadius: 3,
  },
  sectionHeaderText: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 10,
    color: '#ffffff',
  },

  // Table
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#e2e8f0',
    paddingVertical: 4,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#cbd5e1',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 4,
    paddingHorizontal: 4,
    borderBottomWidth: 0.5,
    borderBottomColor: '#e5e7eb',
  },
  tableRowNok: { backgroundColor: NOK_BG },
  tableRowAlt: { backgroundColor: '#f8fafc' },
  colId: { width: 48, fontSize: 8, fontFamily: 'Helvetica-Bold', color: '#64748b' },
  colDesc: { flex: 2, fontSize: 8 },
  colExpected: { flex: 2, fontSize: 8, color: '#475569' },
  colStatus: { width: 36, fontSize: 8, textAlign: 'center' },
  colNote: { flex: 1.5, fontSize: 8, color: '#475569' },
  thText: { fontFamily: 'Helvetica-Bold', fontSize: 8, color: '#475569' },

  // Bug table
  bugColId: { width: 52, fontSize: 8, fontFamily: 'Helvetica-Bold', color: '#64748b' },
  bugColCase: { width: 48, fontSize: 8 },
  bugColPrio: { width: 28, fontSize: 8, textAlign: 'center' },
  bugColDesc: { flex: 3, fontSize: 8 },
  bugColStatus: { width: 52, fontSize: 8, textAlign: 'center' },

  // Release
  releaseCard: {
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 4,
    padding: 12,
  },
  releaseDecisionBox: {
    marginTop: 10,
    borderRadius: 4,
    padding: 10,
  },
  releaseDecisionText: {
    fontSize: 13,
    fontFamily: 'Helvetica-Bold',
    textAlign: 'center',
  },
  checkRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
  checkBox: {
    width: 10,
    height: 10,
    borderWidth: 1,
    borderColor: '#64748b',
    borderRadius: 2,
    marginRight: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkMark: { fontSize: 7, color: '#059669', fontFamily: 'Helvetica-Bold' },
  checkLabel: { fontSize: 9, color: '#374151' },

  // Heading
  h2: { fontSize: 12, fontFamily: 'Helvetica-Bold', color: HEADER_BG, marginBottom: 4 },
  body: { fontSize: 9, lineHeight: 1.5 },
  notesText: { fontSize: 9, color: '#374151', lineHeight: 1.5, marginTop: 6 },

  // Footer
  footer: {
    position: 'absolute',
    bottom: 16,
    left: 36,
    right: 36,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 0.5,
    borderTopColor: '#cbd5e1',
    paddingTop: 5,
  },
  footerText: { fontSize: 7.5, color: '#94a3b8' },

  divider: { borderBottomWidth: 0.5, borderBottomColor: '#e2e8f0', marginVertical: 8 },
  emptyNote: { fontSize: 8, color: '#94a3b8', fontStyle: 'italic', paddingVertical: 6 },
  pill: {
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 1,
  },
});

// ── Helpers ────────────────────────────────────────────────────────────────

function statusLabel(status: string) {
  if (status === 'ok') return 'OK';
  if (status === 'nok') return 'NOK';
  if (status === 'na') return 'n.a.';
  return '–';
}

function statusColor(status: string) {
  if (status === 'ok') return '#059669';
  if (status === 'nok') return '#dc2626';
  if (status === 'na') return '#64748b';
  return '#9ca3af';
}

function bugLabel(index: number) {
  return `BUG-${String(index + 1).padStart(3, '0')}`;
}

function prioColor(prio: string) {
  if (prio === 'P1') return '#dc2626';
  if (prio === 'P2') return '#ea580c';
  if (prio === 'P3') return '#ca8a04';
  return '#6b7280';
}

function decisionLabel(d: string | null) {
  if (d === 'approved') return '✓  FREIGABE ERTEILT';
  if (d === 'approved_with_restrictions') return '⚠  FREIGABE MIT EINSCHRÄNKUNG';
  if (d === 'rejected') return '✗  KEINE FREIGABE';
  return 'Keine Entscheidung getroffen';
}

function decisionBg(d: string | null) {
  if (d === 'approved') return '#d1fae5';
  if (d === 'approved_with_restrictions') return '#fef9c3';
  if (d === 'rejected') return '#fee2e2';
  return '#f1f5f9';
}

function decisionTextColor(d: string | null) {
  if (d === 'approved') return '#065f46';
  if (d === 'approved_with_restrictions') return '#713f12';
  if (d === 'rejected') return '#7f1d1d';
  return '#475569';
}

// ── Footer ─────────────────────────────────────────────────────────────────

function PageFooter({ meta }: { meta: AppState['meta'] }) {
  return (
    <View style={s.footer} fixed>
      <Text style={s.footerText}>
        Part-DB Testprotokoll · {meta.tester} · {meta.date}
      </Text>
      <Text style={s.footerText} render={({ pageNumber, totalPages }) =>
        `Seite ${pageNumber} / ${totalPages}`
      } />
    </View>
  );
}

// ── Title page ─────────────────────────────────────────────────────────────

function TitleSection({ meta }: { meta: AppState['meta'] }) {
  const metaRows = [
    { label: 'Testumgebung', value: meta.url },
    { label: 'Version (alt → neu)', value: `${meta.versionOld} → ${meta.versionNew}` },
    { label: 'Testdatum', value: meta.date },
    { label: 'Tester', value: meta.tester },
  ];

  return (
    <View style={s.titleBlock}>
      <Text style={s.titleMain}>Part-DB Update Testprotokoll</Text>
      <Text style={s.titleSub}>Funktionstest nach Update</Text>
      <View style={s.divider} />
      <View style={s.metaTable}>
        {metaRows.map((r) => (
          <View key={r.label} style={s.metaRow}>
            <Text style={s.metaLabel}>{r.label}</Text>
            <Text style={s.metaValue}>{r.value || '–'}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

// ── Test sections ──────────────────────────────────────────────────────────

function TestSectionBlock({ section, results }: {
  section: typeof TEST_SECTIONS[0];
  results: AppState['results'];
}) {
  const filledCases = section.cases
    .map((tc) => ({ tc, result: results.find((r) => r.caseId === tc.id) }))
    .filter(({ result }) => result && result.status !== 'open');

  if (filledCases.length === 0) return null;

  return (
    <View wrap={false} style={{ marginBottom: 8 }}>
      <View style={s.sectionHeader}>
        <Text style={s.sectionHeaderText}>{section.title}</Text>
      </View>

      {/* Column headers */}
      <View style={s.tableHeader}>
        <Text style={[s.colId, s.thText]}>ID</Text>
        <Text style={[s.colDesc, s.thText]}>Beschreibung</Text>
        <Text style={[s.colExpected, s.thText]}>Erwartet</Text>
        <Text style={[s.colStatus, s.thText]}>Status</Text>
        <Text style={[s.colNote, s.thText]}>Bemerkung</Text>
      </View>

      {filledCases.map(({ tc, result }, i) => {
        const isNok = result!.status === 'nok';
        const isAlt = i % 2 === 1 && !isNok;
        return (
          <View
            key={tc.id}
            style={[s.tableRow, isNok ? s.tableRowNok : isAlt ? s.tableRowAlt : {}]}
          >
            <Text style={s.colId}>{tc.id}</Text>
            <Text style={s.colDesc}>{tc.description}</Text>
            <Text style={s.colExpected}>{tc.expected}</Text>
            <Text style={[s.colStatus, { color: statusColor(result!.status), fontFamily: 'Helvetica-Bold' }]}>
              {statusLabel(result!.status)}
            </Text>
            <Text style={s.colNote}>{result!.note || ''}</Text>
          </View>
        );
      })}
    </View>
  );
}

// ── Bug log ────────────────────────────────────────────────────────────────

function BugLogSection({ bugs }: { bugs: AppState['bugs'] }) {
  return (
    <View>
      <View style={s.sectionHeader}>
        <Text style={s.sectionHeaderText}>Fehlerprotokoll</Text>
      </View>

      {bugs.length === 0 ? (
        <Text style={s.emptyNote}>Keine Fehlereinträge.</Text>
      ) : (
        <>
          <View style={s.tableHeader}>
            <Text style={[s.bugColId, s.thText]}>Fehler-ID</Text>
            <Text style={[s.bugColCase, s.thText]}>Testfall</Text>
            <Text style={[s.bugColPrio, s.thText]}>Prio</Text>
            <Text style={[s.bugColDesc, s.thText]}>Beschreibung</Text>
            <Text style={[s.bugColStatus, s.thText]}>Status</Text>
          </View>
          {bugs.map((bug, i) => {
            const isAlt = i % 2 === 1;
            return (
              <View key={bug.id} style={[s.tableRow, isAlt ? s.tableRowAlt : {}]}>
                <Text style={s.bugColId}>{bugLabel(i)}</Text>
                <Text style={s.bugColCase}>{bug.caseId || '–'}</Text>
                <Text style={[s.bugColPrio, { color: prioColor(bug.priority), fontFamily: 'Helvetica-Bold' }]}>
                  {bug.priority}
                </Text>
                <Text style={s.bugColDesc}>{bug.description || '(keine Beschreibung)'}</Text>
                <Text style={[
                  s.bugColStatus,
                  { color: bug.status === 'resolved' ? '#059669' : '#dc2626', fontFamily: 'Helvetica-Bold' },
                ]}>
                  {bug.status === 'resolved' ? 'Behoben' : 'Offen'}
                </Text>
              </View>
            );
          })}
        </>
      )}
    </View>
  );
}

// ── Release section ────────────────────────────────────────────────────────

function ReleaseSection({
  state,
  p1Open,
  allP1Fixed,
  allP2Assessed,
}: {
  state: AppState;
  p1Open: number;
  allP1Fixed: boolean;
  allP2Assessed: boolean;
}) {
  const { releaseDecision, releaseNotes } = state;

  const checks = [
    { label: 'Alle P1-Fehler behoben', ok: allP1Fixed },
    { label: 'Alle P2-Fehler bewertet', ok: allP2Assessed },
  ];

  return (
    <View style={s.releaseCard}>
      <Text style={s.h2}>Freigabe-Entscheidung</Text>

      {/* Checklist */}
      <View style={{ marginBottom: 8 }}>
        {checks.map((c) => (
          <View key={c.label} style={s.checkRow}>
            <View style={s.checkBox}>
              {c.ok && <Text style={s.checkMark}>✓</Text>}
            </View>
            <Text style={s.checkLabel}>{c.label}</Text>
          </View>
        ))}
      </View>

      <View style={s.divider} />

      {/* Decision */}
      <View style={[
        s.releaseDecisionBox,
        { backgroundColor: decisionBg(releaseDecision) },
      ]}>
        <Text style={[s.releaseDecisionText, { color: decisionTextColor(releaseDecision) }]}>
          {decisionLabel(releaseDecision)}
        </Text>
      </View>

      {/* P1 warning */}
      {releaseDecision === 'approved' && p1Open > 0 && (
        <View style={{ backgroundColor: '#fee2e2', borderRadius: 3, padding: 6, marginTop: 6 }}>
          <Text style={{ fontSize: 8, color: '#991b1b', fontFamily: 'Helvetica-Bold' }}>
            ⚠ Achtung: {p1Open} offene P1-Fehler bei erteilter Freigabe
          </Text>
        </View>
      )}

      {/* Notes */}
      {releaseNotes.trim() && (
        <>
          <View style={s.divider} />
          <Text style={{ fontSize: 8, fontFamily: 'Helvetica-Bold', color: '#475569' }}>
            Anmerkungen:
          </Text>
          <Text style={s.notesText}>{releaseNotes}</Text>
        </>
      )}
    </View>
  );
}

// ── Document ───────────────────────────────────────────────────────────────

interface Props {
  state: AppState;
}

export function ProtokollPDF({ state }: Props) {
  const { meta, results, bugs } = state;

  const p1Open = bugs.filter((b) => b.priority === 'P1' && b.status === 'open').length;
  const p1Total = bugs.filter((b) => b.priority === 'P1').length;
  const p2Total = bugs.filter((b) => b.priority === 'P2').length;
  const p2Open = bugs.filter((b) => b.priority === 'P2' && b.status === 'open').length;
  const allP1Fixed = p1Total === 0 || p1Open === 0;
  const allP2Assessed = p2Total === 0 || p2Open === 0;

  return (
    <Document
      title={`Part-DB Testprotokoll v${meta.versionNew}`}
      author={meta.tester}
      subject="Part-DB Update Funktionstest"
    >
      <Page size="A4" style={s.page}>
        <PageFooter meta={meta} />
        <TitleSection meta={meta} />

        {TEST_SECTIONS.map((section) => (
          <TestSectionBlock key={section.id} section={section} results={results} />
        ))}

        <View style={{ marginTop: 16 }}>
          <BugLogSection bugs={bugs} />
        </View>

        <View style={{ marginTop: 16 }}>
          <ReleaseSection
            state={state}
            p1Open={p1Open}
            allP1Fixed={allP1Fixed}
            allP2Assessed={allP2Assessed}
          />
        </View>
      </Page>
    </Document>
  );
}
