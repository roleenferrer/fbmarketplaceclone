import {render, fireEvent} from '@testing-library/react';
import {screen, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import userEvent from '@testing-library/user-event';

import App from '../App';

const URL = '/v0/marketplace/search/:searchTerm';

const server = setupServer(
  rest.get(URL, (req, res, ctx) => {
    return res(ctx.json([
      {
        'member': 'e3c75a5b-f6a5-4c3f-8b1d-42c110eb4f85',
        'listingID': '0b514c93-49ed-4040-b8cf-7045fb099f1c',
        'listing': {
          'date': '2021-10-23T20:24:55Z',
          'price': '$53,000',
          'title': 'Toyota Sienna 4WD',
          'author': 'Astrid Bristoe',
          'content': {
            'img': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Toyota_Sienna_%28XL30%29_IMG_3635.jpg/1200px-Toyota_Sienna_%28XL30%29_IMG_3635.jpg',
            'description': '4WD can go to many places.',
          },
        },
      },
    ]));
  }),
);

beforeAll(() => server.listen());
afterAll(() => server.close());

test('Search with for Toyota', async () => {
  const app = render(
    <App />,
  );
  const textField = app.container.querySelector('#searchBox');
  userEvent.type(textField, 'Toyota');
  const searchIcon = app.container.querySelector('#submitSearchButton');
  fireEvent.click(searchIcon);
  userEvent.click(await waitFor(() => screen.getByText('Toyota Sienna 4WD')));
});

test('Search with for Audi', async () => {
  const app = render(
    <App />,
  );
  const textField = app.container.querySelector('#searchBox');
  userEvent.type(textField, 'Audi');
  const searchIcon = app.container.querySelector('#submitSearchButton');
  fireEvent.click(searchIcon);
});

test('Search with no input', async () => {
  const app = render(
    <App />,
  );
  const searchIcon = app.container.querySelector('#submitSearchButton');
  fireEvent.click(searchIcon);
});
