import { TestStoreProvider } from './store/useTestStore';
import { Layout } from './components/Layout';
import { MetaForm } from './components/MetaForm';
import { TestSection } from './components/TestSection';
import { BugLog } from './components/BugLog';
import { ReleaseDecision } from './components/ReleaseDecision';
import { TEST_SECTIONS } from './data/testcases';

function AppContent() {
  return (
    <Layout>
      <MetaForm />
      {TEST_SECTIONS.map((s) => (
        <TestSection key={s.id} section={s} />
      ))}

      <BugLog />

      <ReleaseDecision />
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
