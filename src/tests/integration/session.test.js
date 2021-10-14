// const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
const request = require('supertest');

const { bootstrap } = require('../../express');

describe('insert', () => {
  let app;

  beforeAll(async () => {
    app = await bootstrap();
  });

  it('should return OK', async () => {
    const response = await request(app).get('/status');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status');
  });

  it('should return 201', async () => {
    const response = await request(app)
      .post('/signup')
      .send({
        nome: 'A',
        email: 'j60@gmail.com',
        senha: 'abc123',
        telefones: [
          {
            numero: '981234567',
            ddd: '11',
          },
        ],
      });

    console.log(response.body);

    expect(response.status).toBe(201);
  });

  it('should return 200', async () => {
    const response = await request(app)
      .post('/signin')
      .send({
        email: 'j60@gmail.com',
        senha: 'abc123',
      });

    expect(response.status).toBe(200);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});
