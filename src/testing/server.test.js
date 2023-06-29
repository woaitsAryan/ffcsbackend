const request = require('supertest');
const app = require('../server');

describe('User Registration and Login', () => {
  let testUser = {
    username: 'ary',
    password: 'myepicpassword123',
  };

  let invalidUser = {
    username: 'testuser',
    password: 'test',
  };

  it('should register a new user successfully', async () => {
    const response = await request(app).post('/register').send(testUser);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('User created successfully');
  });

  it('should return an error when registering with an existing username', async () => {
    const response = await request(app).post('/register').send(testUser);
    expect(response.status).toBe(402);
    expect(response.body.error).toBe('Username already exists');
  });

  it('should return an error when registering with a weak password', async () => {
    const response = await request(app).post('/register').send(invalidUser);
    expect(response.status).toBe(402);
    expect(response.body.error).toBe(
      'Password must be at least 8 characters long and contain at least 1 number'
    );
  });

  it('should login with valid credentials', async () => {
    const response = await request(app).post('/login').send(testUser);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Login successful');
  });

  it('should return an error when logging in with invalid credentials', async () => {
    const response = await request(app).post('/login').send(invalidUser);
    expect(response.status).toBe(408);
    expect(response.body.error).toBe('Invalid username or password');
  });
});
