export class Api {
  constructor(protected endPoint: string) {}

  async get(path: string, params?: unknown, headers?: unknown) {
    return this.request('GET', path, params, {}, headers);
  }

  async post(path: string, data?: unknown, headers?: unknown) {
    return this.request('POST', path, {}, data, headers);
  }

  async request(method: 'GET' | 'POST', path: string, params?: unknown, data?: unknown, headers?: unknown) {
    // TODO: introduce timeout
    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (params && Object.keys(params).length > 0) {
      Object.assign(options, { params });
    }
    if (data && Object.keys(data).length > 0) {
      Object.assign(options, { data });
    }
    if (headers && Object.keys(headers).length > 0) {
      Object.assign(options, { headers });
    }

    const response = await fetch(`${this.endPoint}${path}`, options);

    if (!response.ok) {
      throw new Error(`fetch error: ${response.status}`);
    }

    const json = await response.json();

    return json;
  }
}
