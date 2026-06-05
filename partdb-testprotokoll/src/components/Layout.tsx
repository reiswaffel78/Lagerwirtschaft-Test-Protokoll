import React, { useState, useEffect } from 'react';
import { RotateCcw, ChevronsDown } from 'lucide-react';
import { useTestStore, clearStorage } from '../store/useTestStore';
import { TEST_SECTIONS } from '../data/testcases';
import type { TestStatus } from '../types';

interface NavItem {
  id: string;
  label: string;
  anchor: string;
}

const NAV_ITEMS: NavItem[] = [
  ...TEST_SECTIONS.map((s) => ({ id: s.id, label: s.title, anchor: `section-${s.id}` })),
  { id: 'bugs', label: 'Fehlerprotokoll', anchor: 'section-bugs' },
  { id: 'release', label: 'Freigabe', anchor: 'section-release' },
];

function sectionStatus(
  sectionId: string,
  results: { caseId: string; status: TestStatus }[]
): 'ok' | 'nok' | 'open' {
  const section = TEST_SECTIONS.find((s) => s.id === sectionId);
  if (!section) return 'open';
  const ids = section.cases.map((c) => c.id);
  const sectionResults = results.filter((r) => ids.includes(r.caseId));
  if (sectionResults.some((r) => r.status === 'nok')) return 'nok';
  if (sectionResults.every((r) => r.status === 'ok' || r.status === 'na')) return 'ok';
  return 'open';
}

function StatusDot({ status }: { status: 'ok' | 'nok' | 'open' }) {
  const colors = { ok: 'bg-emerald-400', nok: 'bg-red-400', open: 'bg-slate-500' };
  return <span className={`w-2 h-2 rounded-full flex-shrink-0 ${colors[status]}`} />;
}

function scrollTo(anchor: string) {
  const el = document.getElementById(anchor);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ── Reset confirm dialog ───────────────────────────────────────────────────

function ResetDialog({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full mx-4">
        <h3 className="text-base font-semibold text-gray-900 mb-2">Neuen Test starten?</h3>
        <p className="text-sm text-gray-600 mb-5">
          Alle eingegebenen Daten werden unwiderruflich gelöscht und der gespeicherte
          Fortschritt aus dem Browser entfernt.
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Abbrechen
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors"
          >
            Zurücksetzen
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Sidebar ────────────────────────────────────────────────────────────────

interface SidebarProps {
  activeAnchor: string;
}

export function Sidebar({ activeAnchor }: SidebarProps) {
  const { state, dispatch } = useTestStore();
  const [showResetDialog, setShowResetDialog] = useState(false);

  function handleReset() {
    clearStorage();
    dispatch({ type: 'RESET_ALL' });
    setShowResetDialog(false);
  }

  return (
    <>
      {showResetDialog && (
        <ResetDialog
          onConfirm={handleReset}
          onCancel={() => setShowResetDialog(false)}
        />
      )}

      <aside
        className="fixed top-0 left-0 h-screen w-60 flex flex-col overflow-hidden"
        style={{ backgroundColor: '#1e293b' }}
      >
        {/* Logo / Titel */}
        <div className="px-5 py-4 border-b border-slate-700 flex-shrink-0">
          <div className="flex items-center gap-2 mb-1">
            <div
              className="w-7 h-7 rounded flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
              style={{ backgroundColor: '#6B9FCC' }}
            >
              PT
            </div>
            <span className="text-white font-semibold text-sm leading-tight">
              Part-DB<br />Testprotokoll
            </span>
          </div>
          {state.meta.versionNew && (
            <p className="text-slate-400 text-xs mt-1.5">
              v{state.meta.versionOld} → v{state.meta.versionNew}
            </p>
          )}
          <button
            onClick={() => setShowResetDialog(true)}
            className="mt-3 w-full flex items-center justify-center gap-1.5 px-3 py-1.5 rounded text-xs text-slate-400 border border-slate-600 hover:border-red-500 hover:text-red-400 transition-colors"
          >
            <RotateCcw size={11} />
            Neuen Test starten
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-3 px-2">
          {NAV_ITEMS.map((item) => {
            const isTestSection = TEST_SECTIONS.some((s) => s.id === item.id);
            const status = isTestSection
              ? sectionStatus(item.id, state.results)
              : 'open';
            const isActive = activeAnchor === item.anchor;

            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.anchor)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded text-left text-xs transition-colors mb-0.5 ${
                  isActive
                    ? 'text-white'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                }`}
                style={isActive ? { backgroundColor: '#6B9FCC22', color: '#6B9FCC' } : undefined}
              >
                {isTestSection && <StatusDot status={status} />}
                {!isTestSection && (
                  <span className="w-2 h-2 rounded-full flex-shrink-0 bg-slate-600" />
                )}
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-slate-700 flex-shrink-0">
          <p className="text-slate-500 text-xs">Part-DB Testprotokoll</p>
        </div>
      </aside>
    </>
  );
}

// ── Progress bar + Jump-to-next button ────────────────────────────────────

interface ProgressBarProps {
  completed: number;
  total: number;
  openCount: number;
  openIds: Set<string>;
}

export function ProgressBar({ completed, total, openCount, openIds }: ProgressBarProps) {
  const pct = total === 0 ? 0 : Math.round((completed / total) * 100);

  function jumpToNextOpen() {
    for (const section of TEST_SECTIONS) {
      for (const tc of section.cases) {
        if (!openIds.has(tc.id)) continue;
        const el = document.getElementById(`testcase-${tc.id}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          const btn = el.querySelector<HTMLButtonElement>('button[data-status]');
          btn?.focus();
          return;
        }
      }
    }
  }

  return (
    <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-3 flex items-center gap-4">
      <span className="text-sm text-gray-600 whitespace-nowrap flex-shrink-0">
        <span className="font-semibold text-gray-900">{completed}</span> von{' '}
        <span className="font-semibold text-gray-900">{total}</span> Testfällen abgeschlossen
      </span>
      <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className="h-2 rounded-full transition-all duration-300"
          style={{ width: `${pct}%`, backgroundColor: '#6B9FCC' }}
        />
      </div>
      <span className="text-sm font-semibold text-gray-700 w-10 text-right flex-shrink-0">
        {pct}%
      </span>
      {openCount > 0 && (
        <button
          onClick={jumpToNextOpen}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border border-gray-300 text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors whitespace-nowrap flex-shrink-0"
          title="Zum nächsten offenen Testfall springen"
        >
          <ChevronsDown size={13} />
          Nächster offen ({openCount})
        </button>
      )}
    </div>
  );
}

// ── Layout ─────────────────────────────────────────────────────────────────

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { state } = useTestStore();

  const completed = state.results.filter(
    (r) => r.status === 'ok' || r.status === 'nok' || r.status === 'na'
  ).length;
  const openResults = state.results.filter((r) => r.status === 'open');
  const openCount = openResults.length;
  const openIds = new Set(openResults.map((r) => r.caseId));
  const total = state.results.length;

  const [activeAnchor, setActiveAnchor] = useState(NAV_ITEMS[0]?.anchor ?? '');

  useEffect(() => {
    const anchors = NAV_ITEMS.map((n) => n.anchor);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          const topmost = visible.reduce((a, b) =>
            a.boundingClientRect.top < b.boundingClientRect.top ? a : b
          );
          setActiveAnchor(topmost.target.id);
        }
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    );
    anchors.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activeAnchor={activeAnchor} />
      <div className="flex-1 flex flex-col" style={{ marginLeft: '240px' }}>
        <ProgressBar completed={completed} total={total} openCount={openCount} openIds={openIds} />
        <main className="flex-1 px-6 py-6">{children}</main>
      </div>
    </div>
  );
}
