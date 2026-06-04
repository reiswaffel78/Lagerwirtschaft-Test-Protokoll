import { TestStoreProvider } from './store/useTestStore';
import { Layout } from './components/Layout';
import { MetaForm } from './components/MetaForm';
import { TestSection } from './components/TestSection';
import { TEST_SECTIONS } from './data/testcases';

function AppContent() {
  return (
    <Layout>
      <MetaForm />
      {TEST_SECTIONS.map((s) => (
        <TestSection key={s.id} section={s} />
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
