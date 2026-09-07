const request = require('supertest');
const app     = require('../index');

describe('GET /api/recettes', () => {
  it('should return 200 and an array', async () => {
    const res = await request(app).get('/api/recettes');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe('GET /api/recettes/:id', () => {
  it('should return 404 for unknown recipe', async () => {
    const res = await request(app).get('/api/recettes/99999');
    expect(res.statusCode).toBe(404);
  });
});

describe('POST /api/recettes', () => {
  it('should return 401 if not authenticated', async () => {
    const res = await request(app)
      .post('/api/recettes')
      .send({ titre: 'Test', description: 'Desc', temps_preparation: 30, difficulte: 'facile', categorie_id: 1 });
    expect(res.statusCode).toBe(401);
  });
});

describe('DELETE /api/recettes/:id', () => {
  it('should return 401 if not authenticated', async () => {
    const res = await request(app).delete('/api/recettes/1');
    expect(res.statusCode).toBe(401);
  });
});
