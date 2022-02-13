import {render} from '@testing-library/react';
import {screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import '@testing-library/jest-dom';

import App from '../App';
import CategorySelectionDrawer from '../CategorySelectionDrawer';

const URL = '/v0/marketplace/:category';

const server = setupServer(
  rest.get(URL, (req, res, ctx) => {
    return res(ctx.json([
      'Trucks',
      'Motorcycles',
      'Cars',
    ]));
  }),
);

beforeAll(() => server.listen());
afterAll(() => server.close());

let selectedCategory;
const handleCategoryClicked = (text) => {
  selectedCategory = text;
};

test('Select Category Vehicles', async () => {
  render(
    <CategorySelectionDrawer
      handleCategoryClicked={handleCategoryClicked}/>,
  );
  userEvent.click(await waitFor(() => screen.getByText('All Categories')));
  userEvent.click(await waitFor(() => screen.getByText('Vehicles')));
  expect(selectedCategory).toBe('Vehicles');
});

test('Select Category Apparel', async () => {
  render(
    <CategorySelectionDrawer
      handleCategoryClicked={handleCategoryClicked}/>,
  );
  userEvent.click(await waitFor(() => screen.getByText('All Categories')));
  userEvent.click(await waitFor(() => screen.getByText('Apparel')));
  expect(selectedCategory).toBe('Apparel');
});

test('Select Subcategory', async () => {
  render(
    <App />,
  );
  userEvent.click(await waitFor(() => screen.getByText('All Categories')));
  userEvent.click(await waitFor(() => screen.getByText('Vehicles')));
  userEvent.click(await waitFor(() => screen.getByText('Trucks')));
});

test('Select More Subcategories', async () => {
  render(
    <App />,
  );
  userEvent.click(await waitFor(() => screen.getByText('All Categories')));
  userEvent.click(await waitFor(() => screen.getByText('Vehicles')));
  userEvent.click(await waitFor(() => screen.getByText('Cars')));
});
