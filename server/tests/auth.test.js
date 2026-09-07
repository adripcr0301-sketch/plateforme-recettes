const request = require('supertest');
const app     = require('../index');

describe('POST /api/auth/register', () => {
  it('should return 400 if email is missing', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ prenom: 'Test', mot_de_passe: 'Test1234!' });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('errors');
  });

  it('should return 400 if password is too short', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ prenom: 'Test', email: 'test@test.fr', mot_de_passe: '123' });
    expect(res.statusCode).toBe(400);
  });
});

describe('POST /api/auth/login', () => {
  it('should return 401 with wrong credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'inconnu@test.fr', mot_de_passe: 'WrongPass!' });
    expect(res.statusCode).toBe(401);
  });

  it('should return 400 if email is invalid', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'pasunemail', mot_de_passe: 'Test1234!' });
    expect(res.statusCode).toBe(400);
  });
});
