import '@testing-library/jest-dom';
import {render} from '@testing-library/react';
import {getOnlyVisible, getNotVisible, setNarrow} from './Common.js';
import {waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Router} from 'react-router';
import {createBrowserHistory} from 'history';
import React from 'react';

import App from '../App';

import {rest} from 'msw';
import {setupServer} from 'msw/node';

const URL = 'http://localhost/';

const server = setupServer(
  rest.get(URL + 'v0/user/listings', (req, res, ctx) => {
    return res(ctx.json({message: 'Hello CSE183'}));
  }),
  rest.get(URL + 'v0/marketplace', (req, res, ctx) => {
    return res(ctx.json({message: 'Hello CSE183'}));
  }),
  rest.post('http://localhost/authenticate', (req, res, ctx) => {
    if (req.body.password === 'badauth') {
      return res(ctx.status(400));
    }
    return res(ctx.json(
      {name: 'Harrison Ford',
        email: 'harford@gmail.com',
        secretToken: 'secret'}));
  }),
  rest.post(URL + 'v0/user', (req, res, ctx) => {
    if (req.body.password === 'badpassword') {
      return res(ctx.status(400));
    }
    return res(ctx.status(201));
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
jest.spyOn(window, 'alert');

/**
 */
test('Login Valid', async () => {
  const history = createBrowserHistory();
  history.push('/login');
  const app = await render(
    <Router history={history}>
      <App />
    </Router>,
  );
  setNarrow();
  getNotVisible('Mugtome Bazaar');
  getOnlyVisible('Return to Homepage');
  const email = app.container.querySelector('#email');
  userEvent.type(email, 'edeport1@scribd.com');
  const password = app.container.querySelector('#password');
  userEvent.type(password, 'annaadmin');
  const submitButt = app.container.querySelector('#submitButton');
  userEvent.click(submitButt);
  await waitFor(() => {
    getOnlyVisible('Mugtome Bazaar');
    const logoutButt = app.container.querySelector('#logoutButton');
    userEvent.click(logoutButt);
  });
});

test('Login Invalid Auth', async () => {
  const history = createBrowserHistory();
  history.push('/login');
  const app = await render(
    <Router history={history}>
      <App />
    </Router>,
  );
  setNarrow();
  getNotVisible('Mugtome Bazaar');
  getOnlyVisible('Return to Homepage');
  const email = app.container.querySelector('#email');
  userEvent.type(email, 'breadwood0@huffingtonpost.com');
  const password = app.container.querySelector('#password');
  userEvent.type(password, 'badauth');
  const submitButt = app.container.querySelector('#submitButton');
  userEvent.click(submitButt);
  await waitFor(() => {
    expect(window.alert).toHaveBeenCalled();
  });
});
