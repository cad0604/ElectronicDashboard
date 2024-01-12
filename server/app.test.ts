import { app } from './app';
import request from 'supertest';

describe('/api/usage', () => {
  test('it returns 200 OK', async () => {
    const resp = await request(app).get('/api/usage');

    expect(resp.status).toBe(200);
  });
});
