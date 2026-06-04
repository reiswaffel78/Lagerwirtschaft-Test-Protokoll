export type TestStatus = 'open' | 'ok' | 'nok' | 'na';

export interface TestResult {
  caseId: string;
  status: TestStatus;
  note: string;
}

export interface BugEntry {
  id: string;
  caseId: string;
  priority: 'P1' | 'P2' | 'P3' | 'P4';
  description: string;
  status: 'open' | 'resolved';
}

export interface TestMeta {
  url: string;
  versionOld: string;
  versionNew: string;
  date: string;
  tester: string;
}

export type ReleaseDecision = 'approved' | 'approved_with_restrictions' | 'rejected' | null;

export interface AppState {
  meta: TestMeta;
  results: TestResult[];
  bugs: BugEntry[];
  releaseDecision: ReleaseDecision;
  releaseNotes: string;
}
