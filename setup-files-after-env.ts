beforeEach(() => {
  vi.mock('@react-native-async-storage/async-storage', () => ({ default: { getItem: vi.fn(), setItem: vi.fn() } }));
  vi.mock('./src/services/expo-service', () => ({ initialized: false, DdLogs: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() } }));
});

afterEach(() => {
  vi.clearAllMocks();
});

export type {};
