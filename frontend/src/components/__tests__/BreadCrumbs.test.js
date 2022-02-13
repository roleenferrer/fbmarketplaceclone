import {render} from '@testing-library/react';
import {screen, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import {rest} from 'msw';
import {setupServer} from 'msw/node';

import App from '../App';

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

test('BreadCrumbs then back', async () => {
  const app = render(<App />);
  userEvent.click(await waitFor(() => screen.getByText('All Categories')));
  userEvent.click(await waitFor(() => screen.getByText('Vehicles')));
  const vehicles = app.container.querySelector('#VehiclesBc');
  userEvent.click(vehicles); // Click on 'Vehicles' bread crumb
  const marketplace = app.container.querySelector('#MarketplaceBc');
  userEvent.click(marketplace); // 'Click on 'Marketplace' bread crumb
});

test('Vehicles category click and then marketplace bc', async () => {
  const app = render(
    <App />,
  );
  userEvent.click(await waitFor(() => screen.getByText('All Categories')));
  userEvent.click(await waitFor(() => screen.getByText('Vehicles')));
  userEvent.click(await waitFor(() =>
    app.container.querySelector('#MarketplaceBc')));
});

test('More', async () => {
  const app = render(
    <App />,
  );
  userEvent.click(await waitFor(() => screen.getByText('All Categories')));
  userEvent.click(await waitFor(() => screen.getByText('Vehicles')));
  userEvent.click(await waitFor(() => screen.getByText('Cars')));
  userEvent.click(await waitFor(() =>
    app.container.querySelector('#VehiclesBc')));
});
