const puppeteer = require('puppeteer');
const http = require('http');
const path = require('path');
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

require('dotenv').config();
const app = require('../../backend/src/app');

let backend;
let frontend;
let browser;
let page;

beforeAll(() => {
  backend = http.createServer(app);
  backend.listen(3010, () => {
    console.log('Backend Running at http://localhost:3010');
  });
  frontend = http.createServer(
    express()
      .use('/v0', createProxyMiddleware({ 
        target: 'http://localhost:3010/',
        changeOrigin: true}))
      .use(express.static(path.join(__dirname, '..', '..', 'frontend', 'build')))
  );
  frontend.listen(3000, () => {
    console.log('Frontend Running at http://localhost:3000');
  });
});

afterAll((done) => {
  backend.close(() => { 
    frontend.close(done);
  });
});

beforeEach(async () => {
  browser = await puppeteer.launch({
    args: [
      '--no-sandbox',
      '--headless',
    ],
  });
  page = await browser.newPage();
});

afterEach(async () => {
  await browser.close();
});

test('Get Title', async () => {
    await page.goto('http://localhost:3000');
    const label = await page.$('aria/toolbar title');
    let cont = await (await label.getProperty('textContent')).jsonValue();
    expect(cont).toBe('Mugtome Bazaar');
  });

test('Category Selection Drawer', async () => {
  await page.goto('http://localhost:3000');
  let label = await page.$('aria/all categories text');
  let cont = await (await label.getProperty('textContent')).jsonValue();
  expect(cont).toBe('All Categories');
  await page.click('aria/all categories button[role="button"]'); // May not be clicking
  // label = await page.$('aria/Vehicles');
  // cont = await (await label.getProperty('textContent')).jsonValue();
  // console.log('Vehicles', cont);
});

// test('Login', async () => {
//   await page.goto('http://localhost:3000/login');
//   let label = await page.$('aria/login text');
//   let cont = await (await label.getProperty('textContent')).jsonValue();
//   expect(cont).toBe('Login');
  
// });


test('2007 Honda Shadow', async () => {
  await page.goto('http://localhost:3000');
  await page.click('aria/2007 Honda Shadow');
});
