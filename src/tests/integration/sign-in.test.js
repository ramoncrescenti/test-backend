const mongoose = require('mongoose');
const request = require('supertest');
const { bootstrap } = require('../../express');
const { convertPasswordToHash, createUser } = require('../../services/user');

jest.setTimeout(10000);

describe('User signing in', () => {
  let app;

  beforeAll(async () => {
    app = await bootstrap();
  });

  it('should return the user as the response body including data_criacao, data_atualizacao, ultimo_login and a token', async () => {
    const user = {
      nome: 'João Carlos',
      email: 'joaocarlos@gmail.com',
      senha: await convertPasswordToHash('abc@123'),
      telefones: [
        {
          numero: '981234567',
          ddd: '11',
        },
      ],
    };
    await createUser(user);

    const response = await request(app)
      .post('/signin')
      .send({
        email: 'joaocarlos@gmail.com',
        senha: 'abc@123',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('ultimo_login');
  });

  it('should not finish signing in with invalid credentials', async () => {
    const user = {
      nome: 'João Carlos',
      email: 'joaocarlos@gmail.com',
      senha: await convertPasswordToHash('abc@123'),
      telefones: [
        {
          numero: '981234567',
          ddd: '11',
        },
      ],
    };
    await createUser(user);

    const response = await request(app)
      .post('/signin')
      .send({
        email: 'joao@gmail.com',
        senha: 'xyz@321',
      });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('mensagem');
  });

  it('should not finish signing in with invalid field values', async () => {
    const user = {
      nome: 'João Carlos',
      email: 'joaocarlos@gmail.com',
      senha: await convertPasswordToHash('abc@123'),
      telefones: [
        {
          numero: '981234567',
          ddd: '11',
        },
      ],
    };
    await createUser(user);

    const response = await request(app)
      .post('/signin')
      .send({
        email: 'jonas',
        senha: 'a',
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('mensagem');
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});
