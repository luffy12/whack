import { render, screen, cleanup } from '@testing-library/react';
import * as ReactDOM from 'react-dom';
import App from './App';

afterEach(cleanup);
test('renders learn react link', () => {
  // const root =document.createElement("div");
  render(<App />);
  const heading = screen.getByTestId('heading');
  const Startbutton = screen.getByTestId('Startbutton');

  expect(heading).toHaveTextContent("Whack-a-mole");
  expect(Startbutton).toHaveTextContent("Start");
});

