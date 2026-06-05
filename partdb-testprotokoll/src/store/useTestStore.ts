import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { AppState, TestMeta, TestStatus, BugEntry, ReleaseDecision } from '../types';
import { TEST_SECTIONS } from '../data/testcases';

// ── Initial state ──────────────────────────────────────────────────────────

const today = new Date().toISOString().split('T')[0];

const initialState: AppState = {
  meta: {
    url: '',
    versionOld: '',
    versionNew: '',
    date: today,
    tester: '',
  },
  results: TEST_SECTIONS.flatMap((s) =>
    s.cases.map((c) => ({ caseId: c.id, status: 'open' as TestStatus, note: '' }))
  ),
  bugs: [],
  releaseDecision: null,
  releaseNotes: '',
};

// ── Actions ────────────────────────────────────────────────────────────────

type Action =
  | { type: 'SET_META'; payload: Partial<TestMeta> }
  | { type: 'SET_RESULT'; payload: { caseId: string; status: TestStatus; note: string } }
  | { type: 'ADD_BUG'; payload: Omit<BugEntry, 'id'> }
  | { type: 'UPDATE_BUG'; payload: { id: string } & Partial<Omit<BugEntry, 'id'>> }
  | { type: 'DELETE_BUG'; payload: { id: string } }
  | { type: 'SET_RELEASE_DECISION'; payload: { decision: ReleaseDecision; notes: string } }
  | { type: 'RESET_ALL' };

function generateId(): string {
  return Math.random().toString(36).slice(2, 9);
}

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_META':
      return { ...state, meta: { ...state.meta, ...action.payload } };

    case 'SET_RESULT': {
      const { caseId, status, note } = action.payload;
      const prev = state.results.find((r) => r.caseId === caseId);
      const prevStatus = prev?.status ?? 'open';

      const updatedResults = state.results.map((r) =>
        r.caseId === caseId ? { ...r, status, note } : r
      );

      let updatedBugs = state.bugs;

      if (status === 'nok' && prevStatus !== 'nok') {
        // Auto-create a bug entry when a case becomes NOK
        const newBug: BugEntry = {
          id: generateId(),
          caseId,
          priority: 'P2',
          description: '',
          status: 'open',
        };
        updatedBugs = [newBug, ...state.bugs];
      } else if (prevStatus === 'nok' && status !== 'nok') {
        // Remove auto-created bug if description is still empty
        updatedBugs = state.bugs.filter(
          (b) => !(b.caseId === caseId && b.description === '')
        );
      }

      return { ...state, results: updatedResults, bugs: updatedBugs };
    }

    case 'ADD_BUG': {
      const newBug: BugEntry = { id: generateId(), ...action.payload };
      return { ...state, bugs: [newBug, ...state.bugs] };
    }

    case 'UPDATE_BUG':
      return {
        ...state,
        bugs: state.bugs.map((b) =>
          b.id === action.payload.id ? { ...b, ...action.payload } : b
        ),
      };

    case 'DELETE_BUG':
      return { ...state, bugs: state.bugs.filter((b) => b.id !== action.payload.id) };

    case 'SET_RELEASE_DECISION':
      return {
        ...state,
        releaseDecision: action.payload.decision,
        releaseNotes: action.payload.notes,
      };

    case 'RESET_ALL':
      return { ...initialState, meta: { ...initialState.meta, date: new Date().toISOString().split('T')[0] } };

    default:
      return state;
  }
}

// ── LocalStorage ───────────────────────────────────────────────────────────

const LS_KEY = 'partdb-test-state';

function loadFromStorage(): AppState {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return initialState;
    const parsed = JSON.parse(raw) as AppState;
    // Merge: ensure all current test case IDs exist in results (handles new testcases after save)
    const savedIds = new Set(parsed.results.map((r) => r.caseId));
    const missing = initialState.results.filter((r) => !savedIds.has(r.caseId));
    return { ...parsed, results: [...parsed.results, ...missing] };
  } catch {
    return initialState;
  }
}

export function clearStorage() {
  localStorage.removeItem(LS_KEY);
}

// ── Context ────────────────────────────────────────────────────────────────

interface StoreContextValue {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

const StoreContext = createContext<StoreContextValue | null>(null);

export function TestStoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadFromStorage);

  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(state));
    } catch {
      // storage quota exceeded — fail silently
    }
  }, [state]);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useTestStore(): StoreContextValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useTestStore must be used within TestStoreProvider');
  return ctx;
}
