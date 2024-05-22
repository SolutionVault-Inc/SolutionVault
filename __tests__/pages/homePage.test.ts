import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../../src/app/page.tsx';
import Navbar from '../../src/app/components/NavBar.tsx';
import ProblemForm from '../../src/app/components/ProblemForm.tsx';

// Mock the Navbar and ProblemForm components
jest.mock('../../src/app/components/NavBar.tsx', () => ({
  __esModule: true,
  default: () => React.createElement('div', null, 'Mocked Navbar'),
}));

jest.mock('../../src/app/components/ProblemForm.tsx', () => ({
  __esModule: true,
  default: () => React.createElement('div', null, 'Mocked ProblemForm'),
}));

describe('Home', () => {
  it('should render the Navbar component', () => {
    render(React.createElement(Home));
    expect(screen.getByText('Mocked Navbar')).toBeInTheDocument();
  });

  it('should render the ProblemForm component', () => {
    render(React.createElement(Home));
    expect(screen.getByText('Mocked ProblemForm')).toBeInTheDocument();
  });
});
