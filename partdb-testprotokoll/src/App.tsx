import { TestStoreProvider } from './store/useTestStore';

function App() {
  return (
    <TestStoreProvider>
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <p className="p-8 text-center text-gray-500">Part-DB Testprotokoll — Komponenten folgen</p>
      </div>
    </TestStoreProvider>
  );
}

export default App;
