import React, { createElement } from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RootLayout, { metadata } from '../../src/app/layout';

// Mock the Inter function and inter object
jest.mock('next/font/google', () => ({
  Inter: () => ({
    className: 'inter',
  }),
}));

jest.mock('../../src/app/components/NavBar', () => createElement('div', null, 'Mocked Navbar'));

describe('RootLayout', () => {
  it('renders the Navbar', () => {
    render(createElement(RootLayout, null, createElement('div', null, 'Test Content')));
    expect(screen.getByText('Mocked Navbar')).toBeInTheDocument();
  });

  it('renders the children content', () => {
    render(createElement(RootLayout, null, createElement('div', null, 'Test Content')));
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies the Inter font class to the body', () => {
    render(createElement(RootLayout, null, createElement('div', null, 'Test Content')));
    const body = document.querySelector('body');
    expect(body).toHaveClass('inter'); // Use the mocked className
  });

  it('sets the correct metadata', () => {
    // Check the metadata export to verify its values
    expect(metadata.title).toBe('SolutionVault');
    expect(metadata.description).toBe('Your solution to storing engineering related problem and their answers!');
  });
});
