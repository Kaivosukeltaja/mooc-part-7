import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

it('renders without crashing', () => {
  const mockProps = {
    votes: {
      good: 0,
      ok: 0,
      bad: 0,
    }
  }
  const div = document.createElement('div');
  ReactDOM.render(<App {...mockProps} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
