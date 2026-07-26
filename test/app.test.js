const request = require('supertest');
const app = require('../server');
const pkg = require('../package.json');

describe('DevOps App Unit & Integration Tests', () => {

  test('GET /api/info should return valid application metadata', async () => {
    const res = await request(app).get('/api/info');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('appName');
    expect(res.body.version).toEqual(pkg.version);
    expect(res.body).toHaveProperty('environment');
    expect(res.body).toHaveProperty('port');
    expect(res.body.status).toEqual('ONLINE');
  });

  test('GET /api/health should return HEALTHY status', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toEqual('HEALTHY');
    expect(res.body).toHaveProperty('uptime');
  });

  test('Static UI endpoint should return 200 OK HTML', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toContain('DevOps CI/CD Lab');
  });

});
