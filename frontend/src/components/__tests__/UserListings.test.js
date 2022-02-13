import '@testing-library/jest-dom';
import {render} from '@testing-library/react';
import {setNarrow} from './Common.js';
import {waitFor} from '@testing-library/react';
import React from 'react';
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import userEvent from '@testing-library/user-event';
import {getClickable} from './Common';

import App from '../App';

// Source for mocking window alert with jest: https://stackoverflow.com/questions/53611098/how-can-i-mock-the-window-alert-method-in-jest

const jwt =
  require('../../../../backend/node_modules/jsonwebtoken/index');

const URL = 'http://localhost/';

const testData = [
  {
    member: '9bf2a29d-8929-4e84-9e61-a189a4b3b7e9',
    listingID: '0d5962ad-fc33-42d0-a356-38468bb01096',
    listing: {
      date: '2021-07-19T10:13:11Z',
      price: '$25,000',
      title: '2007 Honda Shadow',
      author: 'Astrid Bristoe',
      content: {
        img: 'https://images.unsplash.com/photo-1558981001-5864b3250a69?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aGFybGV5JTIwZGF2aWRzb258ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
        description: 'New, great conditon',
      },
    },
  },
  {
    member: '9bf2a29d-8929-4e84-9e61-a189a4b3b7e9',
    listingID: 'bd9fe197-9fd7-428d-a03e-080d058f99d5',
    listing: {
      date: '2021-04-13T23:06:25Z',
      price: '$1500',
      title: 'Chrome Hearts double cross pendant',
      author: 'Astrid Bristoe',
      content: {
        img: 'https://images.unsplash.com/photo-1558981001-5864b3250a69?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aGFybGV5JTIwZGF2aWRzb258ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
        description: 'New, great conditon',
      },
    },
  },
  {
    member: '9bf2a29d-8929-4e84-9e61-a189a4b3b7e9',
    listingID: '2e752229-b0ba-4f49-ae85-9f657b7be544',
    listing: {
      date: '2021-10-07T04:59:21Z',
      price: '$600',
      title: 'Chrome Hearts cemetery ring',
      author: 'Astrid Bristoe',
      content: {
        img: 'https://images.unsplash.com/photo-1558981001-5864b3250a69?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aGFybGV5JTIwZGF2aWRzb258ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
        description: 'New, great conditon',
      },
    },
  },
];

const apparelData = [
  {
    member: '9bf2a29d-8929-4e84-9e61-a189a4b3b7e9',
    listingID: 'bd9fe197-9fd7-428d-a03e-080d058f99d5',
    listing: {
      date: '2021-04-13T23:06:25Z',
      price: '$1500',
      title: 'Chrome Hearts double cross pendant',
      author: 'Astrid Bristoe',
      content: {
        img: 'https://images.unsplash.com/photo-1558981001-5864b3250a69?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aGFybGV5JTIwZGF2aWRzb258ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
        description: 'New, great conditon',
      },
    },
  },
  {
    member: '9bf2a29d-8929-4e84-9e61-a189a4b3b7e9',
    listingID: '2e752229-b0ba-4f49-ae85-9f657b7be544',
    listing: {
      date: '2021-10-07T04:59:21Z',
      price: '$600',
      title: 'Chrome Hearts cemetery ring',
      author: 'Astrid Bristoe',
      content: {
        img: 'https://images.unsplash.com/photo-1558981001-5864b3250a69?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aGFybGV5JTIwZGF2aWRzb258ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
        description: 'New, great conditon',
      },
    },
  },
  {
    member: '9bf2a29d-8929-4e84-9e61-a189a4b3b7e9',
    listingID: '37d95ebb-5684-4d0f-9c5d-82e1bbc1d84a',
    listing: {
      date: '2021-01-21T00:05:28Z',
      price: '$250',
      title: 'AirForce 1s white',
      author: 'Astrid Bristoe',
      content: {
        img: 'https://images.unsplash.com/photo-1558981001-5864b3250a69?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aGFybGV5JTIwZGF2aWRzb258ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
        description: 'New, great conditon',
      },
    },
  },
];

const server = setupServer(
  rest.get(URL +
      `v0/marketplace/search/Airforce`,
  (req, res, ctx) => {
    return res(ctx.json(apparelData));
  }),
  rest.get(URL + `v0/marketplace/Apparel`,
    (req, res, ctx) => {
      return res(ctx.json(apparelData));
    }),
  rest.get(URL + 'v0/marketplace', (req, res, ctx) => {
    return res(ctx.json(testData));
  }),
  rest.get(URL + 'v0/user/listings', (req, res, ctx) => {
    return res(ctx.json(apparelData));
  }),
);

const mainUser = {
  name: 'Astrid Bristoe',
  email: 'edeport1@scribd.com',
  accessToken: '',
};

const accessToken = jwt.sign(
  {email: mainUser.email, role: mainUser.role},
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWF' +
      'pbCI6ImFubmFAYm9va3MuY29tIiwicm9sZSI6ImFkbWluIiwiaWF' +
        '0IjoxNjA2Mjc3MDAxLCJleHAiOjE2MDYyNzcwNjF9.1nwY0lDMGrb7AUFF' +
          'gSaYd4Q7Tzr-BjABclmoKZOqmr4',
  {expiresIn: '30m',
    algorithm: 'HS256',
  });

mainUser.accessToken = accessToken;

beforeAll(() => server.listen(localStorage
  .setItem('user', JSON.stringify(mainUser))));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
jest.spyOn(window, 'alert');


/**
 */
test('Click Item', async () => {
  const app = await render(<App />);
  localStorage.setItem('user', JSON.stringify(mainUser));
  setNarrow();
  const item = await waitFor(() => app.container
    .querySelector('#user'));
  userEvent.click(item);
  const closeButton = await
  waitFor(() => getClickable('close item viewer user'));
  userEvent.click(closeButton);
});

const badServer = setupServer(
  rest.get(URL + 'v0/marketplace', (req, res, ctx) => {
    return res(ctx.status(500));
  }),
  rest.get(URL + 'v0/marketplace/search/chrome', (req, res, ctx) => {
    return res(ctx.status(500));
  }),
  rest.get(URL + `v0/marketplace/error`,
    (req, res, ctx) => {
      return res(ctx.status(404));
    }),
  rest.get(URL + 'v0/user/listings', (req, res, ctx) => {
    return res(ctx.status(500));
  }),
);

test('Error', async () => {
  badServer.listen();
  render(<App />);
  setNarrow();
  badServer.close();
});

/**
 */
test('Error For User Listings', async () => {
  await render(<App />);
  localStorage.setItem('user', JSON.stringify(mainUser));
  setNarrow();
  await waitFor(() => {
    expect(window.alert).toHaveBeenCalled();
  });
});
