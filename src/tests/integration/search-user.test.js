const mongoose = require('mongoose');
const request = require('supertest');
const { bootstrap } = require('../../express');
const { signUp } = require('../../services/oauth');

jest.setTimeout(10000);

describe('Search for user:id during session', () => {
  let app;

  beforeAll(async () => {
    app = await bootstrap();
  });

  it('should return user data from :id', async () => {
    const user = {
      nome: 'João Carlos',
      email: 'joaocarlos1@gmail.com',
      senha: 'abc@123',
      telefones: [
        {
          numero: '981234567',
          ddd: '11',
        },
      ],
    };
    const session = await signUp(user);

    const response = await request(app)
      .get(`/user/${session._id}`)
      .set('Authorization', `Bearer ${session.token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('nome');
  });

  it('should return unauthorized error for invalid token', async () => {
    const user = {
      nome: 'João Carlos',
      email: 'joaocarlos2@gmail.com',
      senha: 'abc@123',
      telefones: [
        {
          numero: '981234567',
          ddd: '11',
        },
      ],
    };
    const session = await signUp(user);

    session.token = 'eyJhbGciOiJIUzL1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTY3ZThmZjA2Nzg5YmNmY2IwOThjNzciLCJub21lIjoiQSIsImVtYWlsIjoiajk0QGdtYWlsLmNvbSIsInNlbmhhIjoiJDJiJDEyJGl5bTBuUTJQYms5QjhvMjRHUi5sSGU3NTRTc3UvMHE0MzdIb3Q1SmR1Ni52Z2VqbllYS2VlIiwidGVsZWZvbmVzIjpbeyJudW1lcm8iOiI5ODEyMzQ1NjciLCJkZGQiOiIxMSJ9XSwiZGF0YV9jcmlhY2FvIjoiMjAyMS0xMC0xNFQwODoyMzoyNy45MzdaIiwiZGF0YV9hdHVhbGl6YWNhbyI6IjIwMjEtMTAtMTRUMDk6MTg6MDguNDg1WiIsIl9fdiI6MCwidWx0aW1vX2xvZ2luIjoiMjAyMS0xMC0xNFQwOToxODowOC40ODNaIiwiaWF0IjoxNjM0MjAzMDg4LCJleHAiOjE2MzQyMDQ4ODh9.aljurLpmfgkyaTMHL6eZJqkTLxpqOo_nul065H9_lsM';

    const response = await request(app)
      .get(`/user/${session._id}`)
      .set('Authorization', `Bearer ${session.token}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('mensagem');
  });

  it('should return unauthorized error for invalid user:id/insufficient permissions', async () => {
    const user = {
      nome: 'João Carlos',
      email: 'joaocarlos3@gmail.com',
      senha: 'abc@123',
      telefones: [
        {
          numero: '981234567',
          ddd: '11',
        },
      ],
    };
    const session = await signUp(user);

    session._id = '61681a7e1047d4c5e1e90979';

    const response = await request(app)
      .get(`/user/${session._id}`)
      .set('Authorization', `Bearer ${session.token}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('mensagem');
  });

  it('should return invalid param value error', async () => {
    const user = {
      nome: 'João Carlos',
      email: 'joaocarlos4@gmail.com',
      senha: 'abc@123',
      telefones: [
        {
          numero: '981234567',
          ddd: '11',
        },
      ],
    };
    const session = await signUp(user);

    const response = await request(app)
      .get(`/user/${session.nome}`)
      .set('Authorization', `Bearer ${session.token}`);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('mensagem');
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});
