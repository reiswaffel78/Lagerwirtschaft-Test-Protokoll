import { useTestStore } from '../store/useTestStore';
import { TestSection as TestSectionType } from '../data/testcases';
import { TestCaseRow } from './TestCaseRow';

interface Props {
  section: TestSectionType;
}

export function TestSection({ section }: Props) {
  const { state } = useTestStore();

  const ids = section.cases.map((c) => c.id);
  const sectionResults = state.results.filter((r) => ids.includes(r.caseId));
  const doneCount = sectionResults.filter(
    (r) => r.status === 'ok' || r.status === 'na'
  ).length;
  const nokCount = sectionResults.filter((r) => r.status === 'nok').length;
  const total = section.cases.length;

  return (
    <section id={`section-${section.id}`} className="mb-10 scroll-mt-16">
      {/* Header — sticky beim Scrollen */}
      <div className="sticky top-[53px] z-10 flex items-center gap-3 mb-3 pb-2 border-b border-gray-200 bg-gray-50 pt-1">
        <h2 className="text-base font-semibold text-gray-900 flex-1">{section.title}</h2>

        {nokCount > 0 && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-700">
            {nokCount} NOK
          </span>
        )}

        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${
            doneCount === total
              ? 'bg-emerald-100 text-emerald-700'
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          {doneCount}/{total}
        </span>
      </div>

      {/* Column header */}
      <div className="grid grid-cols-[80px_1fr_1fr_auto] gap-4 px-4 mb-1">
        <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">ID</span>
        <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">Beschreibung</span>
        <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">Erwartetes Ergebnis</span>
        <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">Status</span>
      </div>

      {/* Rows */}
      <div className="flex flex-col gap-1.5">
        {section.cases.map((tc) => (
          <TestCaseRow key={tc.id} testCase={tc} />
        ))}
      </div>
    </section>
  );
}
