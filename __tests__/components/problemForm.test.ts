import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import ProblemForm from '../../src/app/problemForm';

jest.mock('axios');

describe('ProblemForm', () => {
  test('should submit form data when the form is submitted', async () => {
    const mockPost = jest.spyOn(axios, 'post');
    mockPost.mockResolvedValueOnce({ data: 'Success' });

    render(React.createElement(ProblemForm));

    const titleInput = screen.getByLabelText(/title:/i);
    const descriptionTextarea = screen.getByLabelText(/describe the problem:/i);
    const typeSelect = screen.getByLabelText(/which stack\?/i);
    const submitButton = screen.getByRole('button', { name: /add problem/i });
    const clearButton = screen.getByRole('button', { name: /clear/i });

    fireEvent.change(titleInput, { target: { value: 'Sample Title' } });
    fireEvent.change(descriptionTextarea, { target: { value: 'Sample problem description' } });
    fireEvent.change(typeSelect, { target: { value: 'front-end' } });
    fireEvent.click(submitButton);

    expect(mockPost).toHaveBeenCalledWith('/api/problems', {
      title: 'Sample Title',
      description: 'Sample problem description',
      type: 'front-end',
    });

    // Testing the clear button
    fireEvent.click(clearButton);
    expect(titleInput).toHaveValue('');
    expect(descriptionTextarea).toHaveValue('');
    expect(typeSelect).toHaveValue('front-end');
  });
});
