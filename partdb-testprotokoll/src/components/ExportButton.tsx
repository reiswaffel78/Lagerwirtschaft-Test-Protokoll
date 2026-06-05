import { useState } from 'react';
import { pdf } from '@react-pdf/renderer';
import { Download, Loader2, AlertTriangle } from 'lucide-react';
import { useTestStore } from '../store/useTestStore';
import { ProtokollPDF } from '../pdf/ProtokollPDF';
import type { AppState } from '../types';

function OpenCasesModal({
  openCount,
  onConfirm,
  onCancel,
}: {
  openCount: number;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full mx-4">
        <div className="flex items-start gap-3 mb-3">
          <AlertTriangle className="text-amber-500 flex-shrink-0 mt-0.5" size={20} />
          <div>
            <h3 className="text-base font-semibold text-gray-900">
              {openCount} Testfall{openCount !== 1 ? 'e' : ''} nicht bewertet
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {openCount} Testfall{openCount !== 1 ? 'e haben' : ' hat'} noch keinen
              Status. Im PDF werden nur bewertete Fälle angezeigt. Trotzdem exportieren?
            </p>
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Zurück
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm rounded-md text-white transition-colors"
            style={{ backgroundColor: '#6B9FCC' }}
          >
            Trotzdem exportieren
          </button>
        </div>
      </div>
    </div>
  );
}

async function generateAndDownload(state: AppState, filename: string) {
  const blob = await pdf(<ProtokollPDF state={state} />).toBlob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function ExportButton() {
  const { state } = useTestStore();
  const { meta } = state;
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const disabled = !meta.url.trim() || !meta.tester.trim();
  const openCount = state.results.filter((r) => r.status === 'open').length;

  const filename = [
    'PartDB_Test',
    meta.versionNew.trim() ? meta.versionNew.trim().replace(/[^a-zA-Z0-9._-]/g, '_') : 'v?',
    meta.date || new Date().toISOString().split('T')[0],
  ].join('_') + '.pdf';

  async function doExport() {
    setShowModal(false);
    setLoading(true);
    try {
      await generateAndDownload(state, filename);
    } finally {
      setLoading(false);
    }
  }

  function handleClick() {
    if (disabled || loading) return;
    if (openCount > 0) {
      setShowModal(true);
    } else {
      doExport();
    }
  }

  return (
    <>
      {showModal && (
        <OpenCasesModal
          openCount={openCount}
          onConfirm={doExport}
          onCancel={() => setShowModal(false)}
        />
      )}

      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
        {disabled && (
          <div className="bg-gray-800 text-white text-xs px-3 py-1.5 rounded-lg shadow-lg opacity-90 max-w-48 text-center leading-snug">
            URL und Tester ausfüllen um Export zu aktivieren
          </div>
        )}
        <button
          onClick={handleClick}
          disabled={disabled || loading}
          title={disabled ? 'Pflichtfelder (URL, Tester) ausfüllen' : `Als ${filename} exportieren`}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl shadow-xl text-sm font-semibold transition-all select-none ${
            disabled
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-md'
              : loading
              ? 'text-white cursor-wait shadow-lg'
              : 'text-white hover:shadow-2xl hover:scale-105 active:scale-95'
          }`}
          style={disabled ? undefined : { backgroundColor: '#6B9FCC' }}
        >
          {loading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Download size={16} />
          )}
          {loading ? 'Wird erstellt…' : 'PDF exportieren'}
        </button>
      </div>
    </>
  );
}
