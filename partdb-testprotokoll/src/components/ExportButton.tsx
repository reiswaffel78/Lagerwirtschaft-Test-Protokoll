import { useState } from 'react';
import { pdf } from '@react-pdf/renderer';
import { Download, Loader2 } from 'lucide-react';
import { useTestStore } from '../store/useTestStore';
import { ProtokollPDF } from '../pdf/ProtokollPDF';

export function ExportButton() {
  const { state } = useTestStore();
  const { meta } = state;
  const [loading, setLoading] = useState(false);

  const disabled = !meta.url.trim() || !meta.tester.trim();

  const filename = [
    'PartDB_Test',
    meta.versionNew.trim() ? meta.versionNew.trim().replace(/[^a-zA-Z0-9._-]/g, '_') : 'v?',
    meta.date || new Date().toISOString().split('T')[0],
  ].join('_') + '.pdf';

  async function handleExport() {
    if (disabled || loading) return;
    setLoading(true);
    try {
      const blob = await pdf(<ProtokollPDF state={state} />).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {disabled && (
        <div className="bg-gray-800 text-white text-xs px-3 py-1.5 rounded-lg shadow-lg opacity-90 max-w-48 text-center leading-snug">
          URL und Tester ausfüllen um Export zu aktivieren
        </div>
      )}
      <button
        onClick={handleExport}
        disabled={disabled || loading}
        title={disabled ? 'Pflichtfelder (URL, Tester) ausfüllen' : `Als ${filename} exportieren`}
        className={`flex items-center gap-2 px-5 py-3 rounded-xl shadow-xl text-sm font-semibold transition-all select-none ${
          disabled
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-md'
            : loading
            ? 'text-white cursor-wait shadow-lg'
            : 'text-white hover:shadow-2xl hover:scale-105 active:scale-95'
        }`}
        style={
          disabled
            ? undefined
            : { backgroundColor: '#6B9FCC' }
        }
      >
        {loading ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <Download size={16} />
        )}
        {loading ? 'Wird erstellt…' : 'PDF exportieren'}
      </button>
    </div>
  );
}
