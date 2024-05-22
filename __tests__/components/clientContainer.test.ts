import React, { createElement } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ClientContainer from '../../src/app/problems/ClientContainer';
import AccordionList from '../../src/app/problems/AccordianList';
import SearchBar from '../../src/app/problems/SearchBar';

jest.mock('../../src/app/problems/AccordianList', () => jest.fn());
jest.mock('../../src/app/problems/SearchBar', () => jest.fn());

describe('ClientContainer', () => {
  let mockProblems: any;

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

    (AccordionList as jest.Mock).mockImplementation(({ problem }) => createElement('div', null, problem.title));
    (SearchBar as jest.Mock).mockImplementation(({ setProblems }) =>
      createElement(
        'button',
        {
          onClick: () => setProblems([{ id: '3', title: 'Problem 3', category: 'Category 3', description: 'Description 3', solution: 'Solution 3', status: 'Open', issue: 'Issue 3', created_at: '2023-01-03T00:00:00Z' }]),
        },
        'Mock SearchBar'
      )
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders problems passed as props', () => {
    render(createElement(ClientContainer, { problems: mockProblems }));

    expect(screen.getByText('Problem 1')).toBeInTheDocument();
    expect(screen.getByText('Problem 2')).toBeInTheDocument();
    expect(AccordionList).toHaveBeenCalledTimes(2);
  });

  it('updates problems state when setProblems is called', async () => {
    render(createElement(ClientContainer, { problems: mockProblems }));

    fireEvent.click(screen.getByText('Mock SearchBar'));

    await waitFor(() => {
      expect(screen.getByText('Problem 3')).toBeInTheDocument();
      expect(AccordionList).toHaveBeenCalledTimes(3);
    });
  });
});
