import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar from '../../src/app/components/NavBar.tsx';

test('renders navbar with correct logo', () => {
  render(React.createElement(Navbar));
  const logoElement = screen.getByText(/Solution Vault/i);
  expect(logoElement).toBeInTheDocument();
});

test('renders navbar with correct navigation links', () => {
  render(React.createElement(Navbar));
  const homeLink = screen.getByText(/Home/i);
  const problemsLink = screen.getByText(/Problems/i);
  const aboutLink = screen.getByText(/About/i);
  expect(homeLink).toBeInTheDocument();
  expect(problemsLink).toBeInTheDocument();
  expect(aboutLink).toBeInTheDocument();
});
