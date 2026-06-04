import { useTestStore } from '../store/useTestStore';

function RequiredStar() {
  return <span className="text-red-500 ml-0.5">*</span>;
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">
        {label}
        {required && <RequiredStar />}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  'w-full px-3 py-2 rounded-md border border-gray-300 text-sm text-gray-900 ' +
  'focus:outline-none focus:ring-2 focus:border-transparent transition ' +
  'placeholder:text-gray-400';

const focusStyle = { '--tw-ring-color': '#6B9FCC' } as React.CSSProperties;

export function MetaForm() {
  const { state, dispatch } = useTestStore();
  const { meta } = state;

  function set(field: keyof typeof meta, value: string) {
    dispatch({ type: 'SET_META', payload: { [field]: value } });
  }

  return (
    <section id="section-meta" className="mb-8 scroll-mt-16">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Card header */}
        <div
          className="px-6 py-4 border-b border-gray-100"
          style={{ backgroundColor: '#f8fafc' }}
        >
          <h2 className="text-base font-semibold text-gray-900">Testmetadaten</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Pflichtfelder <RequiredStar /> müssen ausgefüllt sein.
          </p>
        </div>

        {/* Fields */}
        <div className="px-6 py-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Testumgebung URL" required>
            <input
              type="text"
              className={inputClass}
              style={focusStyle}
              placeholder="https://partdb.example.com"
              value={meta.url}
              onChange={(e) => set('url', e.target.value)}
            />
          </Field>

          <Field label="Tester" required>
            <input
              type="text"
              className={inputClass}
              style={focusStyle}
              placeholder="Vor- und Nachname"
              value={meta.tester}
              onChange={(e) => set('tester', e.target.value)}
            />
          </Field>

          <Field label="Version alt">
            <input
              type="text"
              className={inputClass}
              style={focusStyle}
              placeholder="z. B. 1.12.0"
              value={meta.versionOld}
              onChange={(e) => set('versionOld', e.target.value)}
            />
          </Field>

          <Field label="Version neu">
            <input
              type="text"
              className={inputClass}
              style={focusStyle}
              placeholder="z. B. 1.13.0"
              value={meta.versionNew}
              onChange={(e) => set('versionNew', e.target.value)}
            />
          </Field>

          <Field label="Testdatum">
            <input
              type="date"
              className={inputClass}
              style={focusStyle}
              value={meta.date}
              onChange={(e) => set('date', e.target.value)}
            />
          </Field>
        </div>
      </div>
    </section>
  );
}
