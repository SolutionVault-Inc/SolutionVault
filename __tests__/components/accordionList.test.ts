import React, { createElement } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AccordionList from '../../src/app/problems/AccordianList';
import { useRouter } from 'next/navigation';

// Mock the useRouter hook
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('AccordionList', () => {
  let mockProblem: any;
  let mockUseRouter: any;

  beforeEach(() => {
    mockProblem = {
      id: '1',
      title: 'Test Problem',
      category: 'front-end',
      description: 'Test Description',
      solution: 'Test Solution',
      status: 'open',
      issue: 'Test Issue',
      created_at: '2023-01-01T00:00:00Z',
    };

    mockUseRouter = {
      refresh: jest.fn(),
    };

    (useRouter as jest.Mock).mockReturnValue(mockUseRouter);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders problem details', () => {
    render(createElement(AccordionList, { problem: mockProblem }));

    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByText('Category:')).toBeInTheDocument();
    expect(screen.getByText('front-end')).toBeInTheDocument();
    expect(screen.getByText('Description:')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('Solution:')).toBeInTheDocument();
    expect(screen.getByText('Test Solution')).toBeInTheDocument();
    expect(screen.getByText('Status:')).toBeInTheDocument();
    expect(screen.getByText('open')).toBeInTheDocument();
    expect(screen.getByText(new Date(mockProblem.created_at).toLocaleString())).toBeInTheDocument();
  });

  it('opens modal on delete click', () => {
    render(createElement(AccordionList, { problem: mockProblem }));

    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByText('Delete'));
    expect(screen.getByText('Are you sure you want to delete this problem?')).toBeInTheDocument();
  });

  it('handles edit form submission', async () => {
    render(createElement(AccordionList, { problem: mockProblem }));

    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByText('Edit'));

    fireEvent.change(screen.getByLabelText('Category:'), { target: { value: 'back-end' } });
    fireEvent.change(screen.getByPlaceholderText('Test Description'), { target: { value: 'Updated Description' } });
    fireEvent.change(screen.getByPlaceholderText('Test Solution'), { target: { value: 'Updated Solution' } });
    // fireEvent.change(screen.getByLabelText(/Status:/i), { target: { value: 'closed' } });

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(mockUseRouter.refresh).toHaveBeenCalled();
    });
  });

  it('handles delete confirmation', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({}),
      })
    ) as jest.Mock;

    render(createElement(AccordionList, { problem: mockProblem }));

    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByText('Delete'));
    fireEvent.click(screen.getByText('DELETE'));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/delete/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: mockProblem.id }),
      });
      expect(mockUseRouter.refresh).toHaveBeenCalled();
    });
  });
});
