import { TestStoreProvider } from './store/useTestStore';
import { Layout } from './components/Layout';
import { TEST_SECTIONS } from './data/testcases';

function Placeholder({ id, title }: { id: string; title: string }) {
  return (
    <section id={`section-${id}`} className="mb-10 scroll-mt-16">
      <h2 className="text-lg font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-200">
        {title}
      </h2>
      <p className="text-gray-400 text-sm">Testfälle folgen…</p>
    </section>
  );
}

function AppContent() {
  return (
    <Layout>
      {TEST_SECTIONS.map((s) => (
        <Placeholder key={s.id} id={s.id} title={s.title} />
      ))}

      <section id="section-bugs" className="mb-10 scroll-mt-16">
        <h2 className="text-lg font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-200">
          Fehlerprotokoll
        </h2>
        <p className="text-gray-400 text-sm">NOK-Einträge erscheinen hier automatisch.</p>
      </section>

      <section id="section-release" className="mb-10 scroll-mt-16">
        <h2 className="text-lg font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-200">
          Freigabe
        </h2>
        <p className="text-gray-400 text-sm">Freigabe-Entscheidung folgt.</p>
      </section>
    </Layout>
  );
}

function App() {
  return (
    <TestStoreProvider>
      <AppContent />
    </TestStoreProvider>
  );
}

export default App;
