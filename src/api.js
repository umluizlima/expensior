import axios from 'axios';

const client = axios.create({
  baseURL: 'https://expensior.herokuapp.com/api',
  json: true,
});

class requestHandler {
  constructor(resource) {
    this.resource = resource;
  }

  async execute(method, resource, data) {
    this.accessToken = localStorage.getItem('token') || '';
    return client({
      method,
      url: resource,
      data,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
  }
}

export class API extends requestHandler {
  get() {
    return this.execute('get', `${this.resource}`);
  }

  create(data) {
    return this.execute('post', `${this.resource}`, data);
  }
}
