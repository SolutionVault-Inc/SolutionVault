import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBar from '../../src/app/problems/SearchBar';
import fetchMock from 'jest-fetch-mock';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('SearchBar', () => {
  const mockSetProblems = jest.fn();

  beforeEach(() => {
    fetchMock.resetMocks();
    jest.clearAllMocks();
  });

  test('renders the search bar and button', () => {
    render(React.createElement(SearchBar, { setProblems: mockSetProblems }));

    const input = screen.getByPlaceholderText('Search');
    const button = screen.getByText('Search');

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('updates the searchContent state on input change', () => {
    render(React.createElement(SearchBar, { setProblems: mockSetProblems }));

    const input = screen.getByPlaceholderText('Search');

    fireEvent.change(input, { target: { value: 'test search' } });

    expect(input).toHaveValue('test search');
  });

  test('handles the search button click', async () => {
    const mockRefresh = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ refresh: mockRefresh });

    fetchMock.mockResponseOnce(JSON.stringify({ results: [] }));

    render(React.createElement(SearchBar, { setProblems: mockSetProblems }));

    const input = screen.getByPlaceholderText('Search');
    const button = screen.getByText('Search');

    fireEvent.change(input, { target: { value: 'test search' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ searchTerms: 'test search' }),
      });

      expect(mockSetProblems).toHaveBeenCalledWith({ results: [] });
      expect(input).toHaveValue('');
      expect(mockRefresh).toHaveBeenCalledTimes(1);
    });
  });

  test('logs the response and refreshes the router', async () => {
    const mockRefresh = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ refresh: mockRefresh });

    const mockResponse = { results: [] };
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

    render(React.createElement(SearchBar, { setProblems: mockSetProblems }));

    const input = screen.getByPlaceholderText('Search');
    const button = screen.getByText('Search');

    fireEvent.change(input, { target: { value: 'test search' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(mockSetProblems).toHaveBeenCalledWith(mockResponse);
      expect(mockRefresh).toHaveBeenCalledTimes(1);
    });
  });
});
