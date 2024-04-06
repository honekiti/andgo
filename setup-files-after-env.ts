beforeEach(() => {
  vi.mock('@react-native-async-storage/async-storage', () => ({ default: { getItem: vi.fn(), setItem: vi.fn() } }));
});

afterEach(() => {
  vi.clearAllMocks();
});

export type {};
