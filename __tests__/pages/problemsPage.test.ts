import React, { createElement } from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProblemsPage, { fetchProblems, Problem } from '../../src/app/problems/page';
import ClientContainer from '../../src/app/problems/ClientContainer';

// Mock the fetchProblems function and ClientContainer component
jest.mock('../../src/app/problems/page', () => ({
  ...jest.requireActual('../../src/app/problems/page'),
  fetchProblems: jest.fn(),
}));

jest.mock('../../src/app/problems/ClientContainer', () => jest.fn());

describe('ProblemsPage', () => {
  let mockProblems: Problem[];

  beforeEach(() => {
    mockProblems = [
      {
        id: '1',
        title: 'Problem 1',
        category: 'Category 1',
        description: 'Description 1',
        solution: 'Solution 1',
        status: 'Open',
        issue: 'Issue 1',
        created_at: '2023-01-01T00:00:00Z',
      },
      {
        id: '2',
        title: 'Problem 2',
        category: 'Category 2',
        description: 'Description 2',
        solution: 'Solution 2',
        status: 'Closed',
        issue: 'Issue 2',
        created_at: '2023-01-02T00:00:00Z',
      },
    ];

    (fetchProblems as jest.Mock).mockResolvedValue(mockProblems);
    (ClientContainer as jest.Mock).mockImplementation(({ problems }) =>
      createElement(
        'div',
        null,
        problems.map((problem) => createElement('div', { key: problem.id }, problem.title))
      )
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders problems fetched from API', async () => {
    await act(async () => {
      render(createElement(ProblemsPage));
    });

    await waitFor(() => {
      expect(screen.getByText('Problem 1')).toBeInTheDocument();
      expect(screen.getByText('Problem 2')).toBeInTheDocument();
    });

    // Check that ClientContainer is called with the correct problems
    expect(ClientContainer).toHaveBeenCalledWith({ problems: mockProblems }, {});
  });

  it('displays an error message when fetch fails', async () => {
    (fetchProblems as jest.Mock).mockRejectedValue(new Error('Failed to fetch data'));

    await act(async () => {
      render(createElement(ProblemsPage));
    });

    await waitFor(() => {
      expect(screen.getByText('Failed to fetch data')).toBeInTheDocument();
    });
  });
});
