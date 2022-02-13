import '@testing-library/jest-dom';
import {render} from '@testing-library/react';
import {getOnlyVisible, getClickable,
  getNotVisible, setNarrow} from './Common.js';
import {waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Listings from '../Listings';
import React from 'react';

import App from '../App';

import {rest} from 'msw';
import {setupServer} from 'msw/node';

// Source for mocking window alert with jest: https://stackoverflow.com/questions/53611098/how-can-i-mock-the-window-alert-method-in-jest

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
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
jest.spyOn(window, 'alert');

/**
 */
test('Listings: renders', async () => {
  const app = render(<App />);
  setNarrow();
  await waitFor(() => app.getByLabelText('all categories text'));
});

test('Listings: click item then close viewer', async () => {
  const app = render(<App />);
  setNarrow();
  const item = await waitFor(() => app.getByLabelText('2007 Honda Shadow'));
  userEvent.click(item);
  const closeButton = await waitFor(() => getClickable('close item viewer'));
  userEvent.click(closeButton);
});

test('Listings: apparel category', async () => {
  const app = render(<App />);
  setNarrow();
  const catButton =
    await waitFor(() => app.getByLabelText('all categories text'));
  userEvent.click(catButton);
  const apparelButton = await waitFor(() => getOnlyVisible('Apparel'));
  userEvent.click(apparelButton);
  await waitFor(() =>
    app.getByLabelText('Chrome Hearts cemetery ring'));
});

test('Listings: search bar', async () => {
  const app = await render(<Listings searchTerm='Airforce'
    specifiedCategory=''/>);
  await waitFor(() =>
    app.getByLabelText('AirForce 1s white'));
  // userEvent.click(searchButton);
});

// ------- Different server for mocking errors -----

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
);

test('Listings: marketplace error', async () => {
  badServer.listen();
  render(<App />);
  setNarrow();
  getNotVisible('Honda Shadow');
  badServer.close();
});

test('Listings: search error', async () => {
  badServer.listen();
  await render(<Listings searchTerm='chrome'
    specifiedCategory=''/>);
  await waitFor(() =>
    getNotVisible('Chrome Hearts cemetery ring'));
  await waitFor(() => {
    expect(window.alert).toHaveBeenCalled();
  });
  badServer.close();
});

test('Listings: category error', async () => {
  badServer.listen();
  await render(
    <Listings searchTerm=''
      specifiedCategory='error'/>,
  );
  await waitFor(() => {
    expect(window.alert).toHaveBeenCalled();
  });
  badServer.close();
});

