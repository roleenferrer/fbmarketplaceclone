import '@testing-library/jest-dom';
import {render} from '@testing-library/react';
import {getManyVisible, getOnlyVisible, getNotVisible,
  setNarrow} from './Common.js';
import {waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Router} from 'react-router';
import {createBrowserHistory} from 'history';
import React from 'react';

import App from '../App';

import {rest} from 'msw';
import {setupServer} from 'msw/node';

/**
 * Spying with jest on alert source: https://stackoverflow.com/questions/53611098/how-can-i-mock-the-window-alert-method-in-jest
 */

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

test('Create Account Invalid at Auth', async () => {
  const history = createBrowserHistory();
  history.push('/createaccount');
  const app = await render(
    <Router history={history}>
      <App />
    </Router>,
  );
  setNarrow();
  getNotVisible('Mugtome Bazaar');
  getManyVisible('Create Account');
  const fname = app.container.querySelector('#first name');
  const lname = app.container.querySelector('#last name');
  userEvent.type(fname, 'Harrison');
  userEvent.type(lname, 'Ford');
  const email = app.container.querySelector('#email');
  userEvent.type(email, 'breadwood0@huffingtonpost.com');
  const password = app.container.querySelector('#password');
  userEvent.type(password, 'badauth');
  const submitButt = app.container.querySelector('#createAccountButt');
  userEvent.click(submitButt);
  await waitFor(() => {
    expect(window.alert).toHaveBeenCalled();
  });
});

test('Create Account Valid', async () => {
  const history = createBrowserHistory();
  history.push('/createaccount');
  const app = await render(
    <Router history={history}>
      <App />
    </Router>,
  );
  setNarrow();
  getNotVisible('Mugtome Bazaar');
  getManyVisible('Create Account');
  const fname = app.container.querySelector('#first name');
  const lname = app.container.querySelector('#last name');
  userEvent.type(fname, 'Harrison');
  userEvent.type(lname, 'Ford');
  const email = app.container.querySelector('#email');
  userEvent.type(email, 'breadwood0@huffingtonpost.com');
  const password = app.container.querySelector('#password');
  userEvent.type(password, 'mollymember');
  const submitButt = app.container.querySelector('#createAccountButt');
  userEvent.click(submitButt);
  await waitFor(() => {
    getOnlyVisible('Mugtome Bazaar');
  });
});

test('Create Account Invalid', async () => {
  const history = createBrowserHistory();
  history.push('/createaccount');
  const app = await render(
    <Router history={history}>
      <App />
    </Router>,
  );
  setNarrow();
  getNotVisible('Mugtome Bazaar');
  getManyVisible('Create Account');
  const fname = app.container.querySelector('#first name');
  const lname = app.container.querySelector('#last name');
  userEvent.type(fname, 'Harrison');
  userEvent.type(lname, 'Ford');
  const email = app.container.querySelector('#email');
  userEvent.type(email, 'breadwood0@huffingtonpost.com');
  const password = app.container.querySelector('#password');
  userEvent.type(password, 'badpassword');
  const submitButt = app.container.querySelector('#createAccountButt');
  userEvent.click(submitButt);
  await waitFor(() => {
    expect(window.alert).toHaveBeenCalled();
  });
});
