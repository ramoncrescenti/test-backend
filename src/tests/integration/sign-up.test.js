const mongoose = require('mongoose');
const request = require('supertest');

const { bootstrap } = require('../../express');

describe('Signing up a user', () => {
  let app;

  beforeAll(async () => {
    app = await bootstrap();
  });

  it('should return the user as the response body including data_criacao, data_atualizacao, ultimo_login and a token', async () => {
    const response = await request(app)
      .post('/signup')
      .send({
        nome: 'João Pedro',
        email: 'joaopedro@gmail.com',
        senha: 'abc@123',
        telefones: [
          {
            numero: '981234567',
            ddd: '11',
          },
        ],
      });

    expect(response.status).toBe(201);
    expect(response.body.nome).toBe('João Pedro');
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});
