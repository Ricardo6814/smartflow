import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renderiza o layout CRM com menu', () => {
  render(<App />);
  expect(screen.getByText(/CRM Modelo/i)).toBeInTheDocument();
});
