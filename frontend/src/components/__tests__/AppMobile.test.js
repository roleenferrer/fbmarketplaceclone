import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import {getOnlyVisible, setNarrow} from './Common.js';
import {screen} from '@testing-library/react';

import App from '../App';

describe('Home Page', () => {
  test('App Renders', async () => {
    render(<App />);
    setNarrow();
  });

  test('Title Visible', async () => {
    render(<App />);
    setNarrow();
    getOnlyVisible('Mugtome Bazaar');
  });

  test('Login Visible', async () => {
    render(<App />);
    setNarrow();
    getOnlyVisible('Login');
  });

  test('All Categories Visible', async () => {
    render(<App />);
    setNarrow();
    getOnlyVisible('All Categories');
  });

  describe('Category Selection Drawer', () => {
    test('Click All Categories', async () => {
      render(<App />);
      setNarrow();
      fireEvent.click(screen.getByText('All Categories'));
      getOnlyVisible('Vehicles');
    });

    test('Click All Categories Then Vehicles', async () => {
      render(<App />);
      setNarrow();
      fireEvent.click(screen.getByText('All Categories'));
      fireEvent.click(screen.getByText('Vehicles'));
    });

    test('Close All Categories', async () => {
      render(<App />);
      setNarrow();
      fireEvent.click(screen.getByText('All Categories'));
      getOnlyVisible('Vehicles');
      fireEvent.keyDown(global, {code: 'Escape'});
      getOnlyVisible('All Categories');
    });
  });
});
