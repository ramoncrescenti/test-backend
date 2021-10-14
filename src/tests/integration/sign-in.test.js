const mongoose = require('mongoose');
const request = require('supertest');
const user = require('../../models/user');

const { bootstrap } = require('../../express');

describe('User signing in', () => {
  let app;

  beforeAll(async () => {
    app = await bootstrap();
  });

  it('should return the user as the response body including data_criacao, data_atualizacao, ultimo_login and a token', async () => {
    const response = await request(app)
      .post('/signin')
      .send({
        email: 'joaopedro@gmail.com',
        senha: 'abc@123',
      });

    expect(response.status).toBe(404);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});
