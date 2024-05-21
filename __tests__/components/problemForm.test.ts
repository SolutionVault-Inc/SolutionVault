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

    // Adjust selectors to match the component structure
    const descriptionTextarea = screen.getByRole('paragarph', { name: /Whats you problem\?/i });
    const typeSelect = screen.getByLabelText(/type/i);
    const submitButton = screen.getByRole('button', { name: /send/i });

    fireEvent.change(descriptionTextarea, { target: { value: 'Sample problem description' } });
    fireEvent.change(typeSelect, { target: { value: 'front-end' } });
    fireEvent.click(submitButton);

    await screen.findByText(/success/i);

    expect(mockPost).toHaveBeenCalledWith('/api/problems', {
      description: 'Sample problem description',
      type: 'front-end',
    });
  });
});
