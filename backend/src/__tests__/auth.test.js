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

test('AUTHENTICATE Valid User', async () => {
  const email = 'breadwood0@huffingtonpost.com';
  const password = 'mollymember';
  await request.post(`/authenticate`)
    .send({email: email, password: password})
    .expect(200)
    .expect('Content-Type', /json/)
    .then((res) => {
      expect(res).toBeDefined();
    });
});

test('AUTHENTICATE Invalid User', async () => {
  const email = 'breadwood0@huffingtonpost.com';
  const password = 'mollymembe';
  await request.post(`/authenticate`)
    .send({email: email, password: password})
    .expect(401);
});

test('AUTHENTICATE Check User', async () => {
  const email = 'breadwood0@huffingtonpost.com';
  const password = 'mollymember';
  const response = await request.post(`/authenticate`)
    .send({email: email, password: password})
    .expect(200)
    .expect('Content-Type', /json/)
    .then((res) => {
      expect(res).toBeDefined();
      return res;
    });
  await request.get('/v0/user/listings?name=Tyrus%20Sjostrom')
    .set('Authorization', `Bearer ${response.body.accessToken}`)
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .send()
    .expect(200);
});

test('AUTHENTICATE Check User Invalid', async () => {
  await request.get('/v0/user/listings?name=Tyrus%20Sjostrom')
    .set('Authorization', `Bearer NotRealToken`)
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .send()
    .expect(403);
});

test('AUTHENTICATE Check User No Header', async () => {
  await request.get('/v0/user/listings')
    .expect(401);
});
