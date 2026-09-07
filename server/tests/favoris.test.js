const request = require('supertest');
const app     = require('../index');

describe('GET /api/favoris', () => {
  it('should return 401 if not authenticated', async () => {
    const res = await request(app).get('/api/favoris');
    expect(res.statusCode).toBe(401);
  });
});

describe('POST /api/favoris/:recetteId', () => {
  it('should return 401 if not authenticated', async () => {
    const res = await request(app).post('/api/favoris/1');
    expect(res.statusCode).toBe(401);
  });
});

describe('DELETE /api/favoris/:recetteId', () => {
  it('should return 401 if not authenticated', async () => {
    const res = await request(app).delete('/api/favoris/1');
    expect(res.statusCode).toBe(401);
  });
});
