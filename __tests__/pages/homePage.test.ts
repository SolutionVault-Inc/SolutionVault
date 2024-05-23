import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../../src/app/page.tsx';
import Mainbody from '../../src/app/components/Mainbody.tsx';
import ProblemForm from '../../src/app/components/ProblemForm.tsx';

// Mock the Mainbody and ProblemForm components
jest.mock('../../src/app/components/Mainbody.tsx', () => ({
  __esModule: true,
  default: () => React.createElement('div', null, 'Mocked Mainbody'),
}));

jest.mock('../../src/app/components/ProblemForm.tsx', () => ({
  __esModule: true,
  default: () => React.createElement('div', null, 'Mocked ProblemForm'),
}));

describe('Home', () => {
  it('should render the Mainbody component', () => {
    render(React.createElement(Home));
    expect(screen.getByText('Mocked Mainbody')).toBeInTheDocument();
  });

  it('should render the ProblemForm component', () => {
    render(React.createElement(Home));
    expect(screen.getByText('Mocked ProblemForm')).toBeInTheDocument();
  });
});
