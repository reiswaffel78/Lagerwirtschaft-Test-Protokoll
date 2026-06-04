import { useTestStore } from '../store/useTestStore';
import { TEST_SECTIONS } from '../data/testcases';
import { TestStatus } from '../types';

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
  const colors = {
    ok: 'bg-emerald-400',
    nok: 'bg-red-400',
    open: 'bg-slate-500',
  };
  return <span className={`w-2 h-2 rounded-full flex-shrink-0 ${colors[status]}`} />;
}

function scrollTo(anchor: string) {
  const el = document.getElementById(anchor);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

interface SidebarProps {
  activeAnchor: string;
}

export function Sidebar({ activeAnchor }: SidebarProps) {
  const { state } = useTestStore();

  return (
    <aside
      className="fixed top-0 left-0 h-screen w-60 flex flex-col overflow-hidden"
      style={{ backgroundColor: '#1e293b' }}
    >
      {/* Logo / Titel */}
      <div className="px-5 py-5 border-b border-slate-700 flex-shrink-0">
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
          <p className="text-slate-400 text-xs mt-2">
            v{state.meta.versionOld} → v{state.meta.versionNew}
          </p>
        )}
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
  );
}

interface ProgressBarProps {
  completed: number;
  total: number;
}

export function ProgressBar({ completed, total }: ProgressBarProps) {
  const pct = total === 0 ? 0 : Math.round((completed / total) * 100);
  return (
    <div
      className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-3 flex items-center gap-4"
    >
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
    </div>
  );
}

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { state } = useTestStore();

  // Track active section via IntersectionObserver
  const completed = state.results.filter(
    (r) => r.status === 'ok' || r.status === 'nok' || r.status === 'na'
  ).length;
  const total = state.results.length;

  // Simple active tracking via scroll position (no router needed)
  const [activeAnchor, setActiveAnchor] = React.useState(NAV_ITEMS[0]?.anchor ?? '');

  React.useEffect(() => {
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
        <ProgressBar completed={completed} total={total} />
        <main className="flex-1 px-6 py-6">{children}</main>
      </div>
    </div>
  );
}

// Need React for hooks used above
import React from 'react';
