const supertest = require('supertest');
const http = require('http');

const db = require('./db');
const app = require('../app');


let server;

beforeAll(() => {
  server = http.createServer(app);
  server.listen();
  request = supertest(server);
  return db.reset();
});

afterAll((done) => {
  server.close(done);
});

test('GET Valid User', async () => {
  const email = 'edeport1%40scribd.com';
  await request.get(`/v0/user?email=${email}`)
    .expect(200)
    .expect('Content-Type', /json/)
    .then((res) => {
      expect(res).toBeDefined();
    });
});

test('GET Invalid User', async () => {
  const email = 'edeport1%40scrd.com';
  await request.get(`/v0/user?email=${email}`)
    .expect(404);
});

test('Post Valid User', async () => {
  const email = 'harrisonford%40gmail.com';
  const user = {
    password: 'HarrisonFord',
    fname: 'Harrison',
    lname: 'Ford',
    email: 'harrisonford@gmail.com',
  };
  await request.post('/v0/user/')
    .send(user)
    .expect(201);
  await request.get(`/v0/user?email=${email}`)
    .expect(200)
    .expect('Content-Type', /json/)
    .then((res) => {
      expect(res).toBeDefined();
    });
});

test('Post Invalid User: Duplicate Email', async () => {
  const user = {
    password: 'HarrisonFord',
    fname: 'Harrison',
    lname: 'Ford',
    email: 'edeport1@scribd.com',
  };
  await request.post('/v0/user/')
    .send(user)
    .expect(400);
});
