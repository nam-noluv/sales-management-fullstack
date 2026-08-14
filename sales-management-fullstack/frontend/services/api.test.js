import { getAuthHeaders } from './api';

describe('API helper', () => {
  beforeEach(() => {
    const store = { token: 'test-token' };
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn((key) => store[key] ?? null),
        setItem: jest.fn((key, value) => { store[key] = value; }),
        removeItem: jest.fn((key) => { delete store[key]; }),
      },
      configurable: true,
    });
  });

  it('includes bearer token header when token exists', () => {
    expect(getAuthHeaders().Authorization).toBe('Bearer test-token');
  });

  it('returns content-type only when token is missing', () => {
    window.localStorage.getItem.mockReturnValue(null);
    const headers = getAuthHeaders();
    expect(headers.Authorization).toBeUndefined();
    expect(headers['Content-Type']).toBe('application/json');
  });
});
