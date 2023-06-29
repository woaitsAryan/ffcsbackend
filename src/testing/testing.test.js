const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../server');

const jwtSecretToken = 'CSI-is-the-best';

describe('User Registration and Login', () => {
  let token;

  it('should register a new user and return a valid JWT token', async () => {
    const response = await request(app)
      .post('/register')
      .send({ username: 'testuser', password: 'Password123' });

    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBeDefined();

    token = response.body.token;
    const decodedToken = jwt.verify(token, jwtSecretToken);
    expect(decodedToken.message).toBe('User created successfully');
  });

  it('should log in with valid credentials and return a valid JWT token', async () => {
    const response = await request(app)
      .post('/login')
      .send({ username: 'testuser', password: 'Password123' });

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();

    const decodedToken = jwt.verify(response.body, jwtSecretToken);
    expect(decodedToken.message).toBe('Login successful');
  });
});