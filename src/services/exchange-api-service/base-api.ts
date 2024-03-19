export class BaseApi {
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

    const url = `${this.endPoint}${path}`;

    console.debug('FETCH:', url, options);

    const response = await fetch(url, options);

    if (!response.ok) {
      console.log('RESPONSE STATUS:', response.status);

      throw new Error(`FETCH ERROR: ${response.status}`);
    }

    const json = await response.json();

    console.debug('RESPONSE:', json);

    return json;
  }
}
