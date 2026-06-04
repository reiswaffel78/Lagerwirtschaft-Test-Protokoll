import { useState } from 'react';
import { useTestStore } from '../store/useTestStore';
import { BugEntry } from '../types';
import { PlusCircle, Trash2 } from 'lucide-react';

const PRIORITIES = ['P1', 'P2', 'P3', 'P4'] as const;

function bugLabel(index: number) {
  return `BUG-${String(index + 1).padStart(3, '0')}`;
}

function rowBg(bug: BugEntry) {
  if (bug.status === 'resolved') return 'bg-emerald-50';
  if (bug.priority === 'P1') return 'bg-red-50';
  return 'bg-white';
}

function rowBorder(bug: BugEntry) {
  if (bug.status === 'resolved') return 'border-emerald-200';
  if (bug.priority === 'P1') return 'border-red-200';
  return 'border-gray-200';
}

const priorityColors: Record<string, string> = {
  P1: 'text-red-700 bg-red-100 border-red-200',
  P2: 'text-orange-700 bg-orange-100 border-orange-200',
  P3: 'text-yellow-700 bg-yellow-100 border-yellow-200',
  P4: 'text-gray-600 bg-gray-100 border-gray-200',
};

interface ConfirmDeleteProps {
  onConfirm: () => void;
  onCancel: () => void;
}

function ConfirmDelete({ onConfirm, onCancel }: ConfirmDeleteProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full mx-4">
        <h3 className="text-base font-semibold text-gray-900 mb-2">Fehler löschen?</h3>
        <p className="text-sm text-gray-600 mb-5">
          Dieser Eintrag wird unwiderruflich aus dem Fehlerprotokoll entfernt.
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
            Löschen
          </button>
        </div>
      </div>
    </div>
  );
}

export function BugLog() {
  const { state, dispatch } = useTestStore();
  const { bugs } = state;
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  function updateBug(id: string, patch: Partial<Omit<BugEntry, 'id'>>) {
    dispatch({ type: 'UPDATE_BUG', payload: { id, ...patch } });
  }

  function addManualBug() {
    dispatch({
      type: 'ADD_BUG',
      payload: { caseId: '', priority: 'P2', description: '', status: 'open' },
    });
  }

  function confirmDelete() {
    if (deleteTargetId) {
      dispatch({ type: 'DELETE_BUG', payload: { id: deleteTargetId } });
      setDeleteTargetId(null);
    }
  }

  return (
    <section id="section-bugs" className="mb-10 scroll-mt-16">
      {deleteTargetId && (
        <ConfirmDelete
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTargetId(null)}
        />
      )}

      {/* Header */}
      <div className="flex items-center gap-3 mb-4 pb-2 border-b border-gray-200">
        <h2 className="text-base font-semibold text-gray-900 flex-1">Fehlerprotokoll</h2>
        {bugs.length > 0 && (
          <span className="text-xs text-gray-500">
            {bugs.filter((b) => b.status === 'open').length} offen /{' '}
            {bugs.length} gesamt
          </span>
        )}
        <button
          onClick={addManualBug}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border transition-colors text-white"
          style={{ backgroundColor: '#6B9FCC', borderColor: '#6B9FCC' }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#5a8fbb')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#6B9FCC')}
        >
          <PlusCircle size={13} />
          Manuellen Fehler hinzufügen
        </button>
      </div>

      {/* Empty state */}
      {bugs.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white py-12 text-center">
          <p className="text-sm font-medium text-emerald-600">
            Keine Fehler — alle Testfälle bestanden oder n.a.
          </p>
          <p className="text-xs text-gray-400 mt-1">
            NOK-Einträge aus den Testabschnitten erscheinen hier automatisch.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {/* Column headers */}
          <div className="grid grid-cols-[90px_90px_80px_1fr_110px_36px] gap-3 px-4 py-2 bg-gray-50 border-b border-gray-200">
            {['Fehler-ID', 'Testfall', 'Priorität', 'Beschreibung', 'Status', ''].map(
              (h) => (
                <span key={h} className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                  {h}
                </span>
              )
            )}
          </div>

          {/* Rows */}
          <div className="divide-y divide-gray-100">
            {bugs.map((bug, index) => (
              <div
                key={bug.id}
                className={`grid grid-cols-[90px_90px_80px_1fr_110px_36px] gap-3 px-4 py-3 items-start border-l-4 transition-colors ${rowBg(bug)} ${rowBorder(bug)}`}
              >
                {/* Fehler-ID */}
                <span className="text-xs font-mono text-gray-500 pt-1 select-none">
                  {bugLabel(index)}
                </span>

                {/* Testfall-ID */}
                <span className="text-xs font-mono text-gray-500 pt-1">
                  {bug.caseId || <span className="text-gray-300 italic">manuell</span>}
                </span>

                {/* Priorität */}
                <select
                  value={bug.priority}
                  onChange={(e) =>
                    updateBug(bug.id, { priority: e.target.value as BugEntry['priority'] })
                  }
                  className={`text-xs font-semibold rounded border px-1.5 py-0.5 focus:outline-none cursor-pointer ${priorityColors[bug.priority]}`}
                >
                  {PRIORITIES.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>

                {/* Beschreibung */}
                <textarea
                  rows={1}
                  placeholder="Fehlerbeschreibung (Pflichtfeld)…"
                  value={bug.description}
                  onChange={(e) => updateBug(bug.id, { description: e.target.value })}
                  onInput={(e) => {
                    const el = e.currentTarget;
                    el.style.height = 'auto';
                    el.style.height = `${el.scrollHeight}px`;
                  }}
                  className={`w-full resize-none overflow-hidden rounded border px-2 py-1 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition ${
                    !bug.description
                      ? 'border-orange-300 bg-orange-50 focus:ring-orange-300'
                      : 'border-gray-200 bg-white focus:ring-blue-300'
                  }`}
                />

                {/* Status */}
                <button
                  onClick={() =>
                    updateBug(bug.id, {
                      status: bug.status === 'open' ? 'resolved' : 'open',
                    })
                  }
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full border transition-colors ${
                    bug.status === 'resolved'
                      ? 'bg-emerald-100 text-emerald-700 border-emerald-300 hover:bg-emerald-200'
                      : 'bg-red-100 text-red-700 border-red-300 hover:bg-red-200'
                  }`}
                >
                  {bug.status === 'resolved' ? '✓ Behoben' : '● Offen'}
                </button>

                {/* Löschen */}
                <button
                  onClick={() => setDeleteTargetId(bug.id)}
                  className="p-1 rounded text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors mt-0.5"
                  title="Fehler löschen"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
