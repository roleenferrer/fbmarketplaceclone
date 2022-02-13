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

test('GET Marketplace', async () => {
  await request.get('/v0/marketplace')
    .expect(200)
    .expect('Content-Type', /json/)
    .then((res) => {
      expect(res).toBeDefined();
      expect(res.body[0].listing.title).toBe('2007 Honda Shadow');
      expect(res.body.length).toEqual(10);
    });
});

test('GET Marketplace Specific Category', async () => {
  await request.get('/v0/marketplace?category=Vehicles')
    .expect(200)
    .then((res) => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      // Check first element of Category Query
      expect(res.body[0].listing.title).toBe('Ford F150');
      expect(res.body[0].listing.author).toBe('Astrid Bristoe');
      expect(res.body[0].listing.price).toBe('$42,000');
    });
});

test('GET Marketplace Specific Category INVALID', async () => {
  await request.get('/v0/marketplace?category=foo')
    .expect(404);
});

test('GET Marketplace Subcategory', async () => {
  await request.get('/v0/marketplace/Vehicles')
    .expect(200)
    .then((res) => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      // Check first element of Subcategory Query
      expect(res.body[0]).toBe('Trucks');
    });
});

test('GET Marketplace Deep Subcategory', async () => {
  await request.get('/v0/marketplace/Minivans')
    .expect(200)
    .then((res) => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      // Check first element of Subcategory Query
      expect(res.body[0]).toBe('4 Wheel Drive');
    });
});

test('GET Marketplace Subcategory INVALID', async () => {
  await request.get('/v0/marketplace/None')
    .expect(404);
});

test('GET Search Results for \'chr\'', async () => {
  await request.get('/v0/marketplace/search/chr')
    .expect(200)
    .then((res) => {
      const regex = /chr/i;
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      for (const l of res.body) {
        if (l) {
          expect(regex.test(l.listing.title)).toBe(true);
        }
      };
    });
});

test('GET Search Results for \'$\'', async () => {
  await request.get('/v0/marketplace/search/%24')
    .expect(200)
    .then((res) => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.length).toEqual(0);
    });
});
