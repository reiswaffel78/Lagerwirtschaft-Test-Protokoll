import { useRef } from 'react';
import { useTestStore } from '../store/useTestStore';
import { TestCase } from '../data/testcases';
import { TestStatus } from '../types';

const BUTTONS: { status: TestStatus; label: string }[] = [
  { status: 'ok', label: 'OK' },
  { status: 'nok', label: 'NOK' },
  { status: 'na', label: 'n.a.' },
];

const activeColors: Record<string, string> = {
  ok: 'bg-emerald-500 text-white border-emerald-500',
  nok: 'bg-red-500 text-white border-red-500',
  na: 'bg-slate-400 text-white border-slate-400',
};

interface Props {
  testCase: TestCase;
}

export function TestCaseRow({ testCase }: Props) {
  const { state, dispatch } = useTestStore();
  const result = state.results.find((r) => r.caseId === testCase.id);
  const status = result?.status ?? 'open';
  const note = result?.note ?? '';
  const isNok = status === 'nok';
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function setStatus(newStatus: TestStatus) {
    dispatch({
      type: 'SET_RESULT',
      payload: { caseId: testCase.id, status: newStatus, note },
    });
  }

  function setNote(newNote: string) {
    dispatch({
      type: 'SET_RESULT',
      payload: { caseId: testCase.id, status, note: newNote },
    });
  }

  // Arrow-key navigation within the button group
  function handleKeyDown(e: React.KeyboardEvent, index: number) {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      btnRefs.current[(index + 1) % BUTTONS.length]?.focus();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      btnRefs.current[(index - 1 + BUTTONS.length) % BUTTONS.length]?.focus();
    }
  }

  return (
    <div
      id={`testcase-${testCase.id}`}
      className={`rounded-lg border transition-colors ${
        isNok ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white'
      }`}
    >
      <div className="grid grid-cols-[80px_1fr_1fr_auto] gap-4 items-start px-4 py-3">
        {/* ID */}
        <span className="text-xs font-mono text-gray-400 pt-0.5 select-none">
          {testCase.id}
        </span>

        {/* Beschreibung */}
        <p className="text-sm text-gray-800 leading-snug">{testCase.description}</p>

        {/* Erwartetes Ergebnis */}
        <p className="text-sm text-gray-500 leading-snug">{testCase.expected}</p>

        {/* Status-Toggle */}
        <div
          className="flex gap-1 flex-shrink-0"
          role="group"
          aria-label={`Status für ${testCase.id}`}
        >
          {BUTTONS.map(({ status: s, label }, i) => {
            const isActive = status === s;
            return (
              <button
                key={s}
                ref={(el) => { btnRefs.current[i] = el; }}
                data-status={s}
                onClick={() => setStatus(isActive ? 'open' : s)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                aria-pressed={isActive}
                tabIndex={isActive || (status === 'open' && i === 0) ? 0 : -1}
                className={`px-2.5 py-1 text-xs font-semibold rounded border transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-400 ${
                  isActive
                    ? activeColors[s]
                    : 'bg-white text-gray-400 border-gray-300 hover:border-gray-400 hover:text-gray-600'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bemerkung — nur bei NOK */}
      {isNok && (
        <div className="px-4 pb-3">
          <textarea
            rows={1}
            placeholder="Bemerkung / Fehlerbeschreibung…"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            onInput={(e) => {
              const el = e.currentTarget;
              el.style.height = 'auto';
              el.style.height = `${el.scrollHeight}px`;
            }}
            className="w-full resize-none overflow-hidden rounded border border-red-300 bg-white px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition"
            style={{ '--tw-ring-color': '#f87171' } as React.CSSProperties}
          />
        </div>
      )}
    </div>
  );
}
