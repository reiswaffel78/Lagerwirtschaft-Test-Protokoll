import { useState } from 'react';
import { useTestStore } from '../store/useTestStore';
import { ReleaseDecision as ReleaseDecisionType } from '../types';
import { CheckCircle2, Circle, AlertTriangle, CheckCheck, AlertCircle, XCircle } from 'lucide-react';

interface CheckItem {
  label: string;
  checked: boolean;
  auto: boolean;
}

const DECISIONS: {
  value: ReleaseDecisionType;
  label: string;
  sublabel: string;
  icon: React.ReactNode;
  active: string;
  inactive: string;
}[] = [
  {
    value: 'approved',
    label: 'Freigabe',
    sublabel: 'Alle Kriterien erfüllt',
    icon: <CheckCheck size={20} />,
    active: 'bg-emerald-600 border-emerald-600 text-white shadow-lg',
    inactive: 'bg-white border-gray-300 text-gray-600 hover:border-emerald-400 hover:text-emerald-600',
  },
  {
    value: 'approved_with_restrictions',
    label: 'Freigabe mit Einschränkung',
    sublabel: 'Bekannte Einschränkungen dokumentiert',
    icon: <AlertCircle size={20} />,
    active: 'bg-amber-500 border-amber-500 text-white shadow-lg',
    inactive: 'bg-white border-gray-300 text-gray-600 hover:border-amber-400 hover:text-amber-600',
  },
  {
    value: 'rejected',
    label: 'Keine Freigabe',
    sublabel: 'Kritische Fehler nicht behoben',
    icon: <XCircle size={20} />,
    active: 'bg-red-600 border-red-600 text-white shadow-lg',
    inactive: 'bg-white border-gray-300 text-gray-600 hover:border-red-400 hover:text-red-600',
  },
];

function StatPill({ label, value, highlight }: { label: string; value: number; highlight?: string }) {
  return (
    <div className={`flex flex-col items-center px-4 py-2.5 rounded-lg border ${highlight ?? 'bg-gray-50 border-gray-200'}`}>
      <span className="text-xl font-bold text-gray-900">{value}</span>
      <span className="text-xs text-gray-500 mt-0.5">{label}</span>
    </div>
  );
}

export function ReleaseDecision() {
  const { state, dispatch } = useTestStore();
  const { bugs, results, releaseDecision, releaseNotes } = state;

  const [manualChecks, setManualChecks] = useState({ cleaned: false, workarounds: false });

  // Auto-computed checks
  const p1Open = bugs.filter((b) => b.priority === 'P1' && b.status === 'open').length;
  const p2Open = bugs.filter((b) => b.priority === 'P2' && b.status === 'open').length;
  const p1Total = bugs.filter((b) => b.priority === 'P1').length;
  const p2Total = bugs.filter((b) => b.priority === 'P2').length;
  const allP1Fixed = p1Total === 0 || p1Open === 0;
  const allP2Assessed = p2Total === 0 || p2Open === 0;

  const checks: CheckItem[] = [
    { label: 'Alle P1-Fehler behoben', checked: allP1Fixed, auto: true },
    { label: 'Alle P2-Fehler bewertet', checked: allP2Assessed, auto: true },
    { label: 'Testdaten bereinigt', checked: manualChecks.cleaned, auto: false },
    { label: 'Workarounds dokumentiert', checked: manualChecks.workarounds, auto: false },
  ];

  // Summary stats
  const total = results.length;
  const okCount = results.filter((r) => r.status === 'ok').length;
  const nokCount = results.filter((r) => r.status === 'nok').length;
  const naCount = results.filter((r) => r.status === 'na').length;
  const openCount = results.filter((r) => r.status === 'open').length;
  const bugTotal = bugs.length;
  const bugOpen = bugs.filter((b) => b.status === 'open').length;

  const showP1Warning =
    releaseDecision === 'approved' && p1Open > 0;

  function setDecision(value: ReleaseDecisionType) {
    dispatch({
      type: 'SET_RELEASE_DECISION',
      payload: { decision: releaseDecision === value ? null : value, notes: releaseNotes },
    });
  }

  function setNotes(notes: string) {
    dispatch({
      type: 'SET_RELEASE_DECISION',
      payload: { decision: releaseDecision, notes },
    });
  }

  return (
    <section id="section-release" className="mb-10 scroll-mt-16">
      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200">
        <h2 className="text-base font-semibold text-gray-900">Freigabe</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Left column */}
        <div className="flex flex-col gap-5">
          {/* Checklist */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Voraussetzungen</h3>
            <ul className="space-y-2.5">
              {checks.map((item, i) => (
                <li key={i} className="flex items-center gap-2.5">
                  {item.auto ? (
                    item.checked ? (
                      <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0" />
                    ) : (
                      <Circle size={18} className="text-gray-300 flex-shrink-0" />
                    )
                  ) : (
                    <button
                      onClick={() =>
                        setManualChecks((prev) =>
                          i === 2
                            ? { ...prev, cleaned: !prev.cleaned }
                            : { ...prev, workarounds: !prev.workarounds }
                        )
                      }
                      className="flex-shrink-0"
                      aria-label={item.label}
                    >
                      {item.checked ? (
                        <CheckCircle2 size={18} className="text-emerald-500" />
                      ) : (
                        <Circle size={18} className="text-gray-300 hover:text-gray-400 transition-colors" />
                      )}
                    </button>
                  )}
                  <span
                    className={`text-sm ${item.checked ? 'text-gray-700' : 'text-gray-500'}`}
                  >
                    {item.label}
                  </span>
                  {item.auto && (
                    <span className="text-xs text-gray-400 ml-auto">auto</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Notes */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              Anmerkungen zur Freigabe
            </h3>
            <textarea
              rows={4}
              placeholder="Einschränkungen, Hinweise, offene Punkte…"
              value={releaseNotes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full resize-none rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition"
              style={{ '--tw-ring-color': '#6B9FCC' } as React.CSSProperties}
            />
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-5">
          {/* Decision buttons */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Entscheidung</h3>

            {showP1Warning && (
              <div className="flex items-center gap-2 mb-3 px-3 py-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                <AlertTriangle size={16} className="flex-shrink-0" />
                <span className="font-medium">Achtung: Offene P1-Fehler vorhanden ({p1Open})</span>
              </div>
            )}

            <div className="flex flex-col gap-2.5">
              {DECISIONS.map((d) => {
                const isActive = releaseDecision === d.value;
                return (
                  <button
                    key={d.value}
                    onClick={() => setDecision(d.value)}
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-lg border-2 transition-all text-left ${
                      isActive ? d.active : d.inactive
                    }`}
                  >
                    <span className="flex-shrink-0">{d.icon}</span>
                    <div>
                      <div className="font-semibold text-sm">{d.label}</div>
                      <div
                        className={`text-xs mt-0.5 ${
                          isActive ? 'opacity-80' : 'text-gray-400'
                        }`}
                      >
                        {d.sublabel}
                      </div>
                    </div>
                    {isActive && (
                      <span className="ml-auto text-xs font-semibold opacity-90 uppercase tracking-wide">
                        Aktiv
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Summary */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Zusammenfassung</h3>

            <div className="mb-3">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                Testfälle
              </p>
              <div className="grid grid-cols-5 gap-2">
                <StatPill label="Gesamt" value={total} />
                <StatPill label="OK" value={okCount} highlight="bg-emerald-50 border-emerald-200" />
                <StatPill
                  label="NOK"
                  value={nokCount}
                  highlight={nokCount > 0 ? 'bg-red-50 border-red-200' : undefined}
                />
                <StatPill label="n.a." value={naCount} highlight="bg-slate-50 border-slate-200" />
                <StatPill
                  label="Offen"
                  value={openCount}
                  highlight={openCount > 0 ? 'bg-amber-50 border-amber-200' : undefined}
                />
              </div>
            </div>

            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                Fehler
              </p>
              <div className="grid grid-cols-4 gap-2">
                <StatPill label="Gesamt" value={bugTotal} />
                <StatPill
                  label="P1"
                  value={p1Total}
                  highlight={p1Total > 0 ? 'bg-red-50 border-red-200' : undefined}
                />
                <StatPill
                  label="P2"
                  value={p2Total}
                  highlight={p2Total > 0 ? 'bg-orange-50 border-orange-200' : undefined}
                />
                <StatPill
                  label="Offen"
                  value={bugOpen}
                  highlight={bugOpen > 0 ? 'bg-amber-50 border-amber-200' : undefined}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
