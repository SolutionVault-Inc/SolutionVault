import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import axios from 'axios';
import ProblemForm from '../../src/app/components/ProblemForm.tsx';

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
  });
  test('should clear the form when the clear button is clicked', () => {
    render(React.createElement(ProblemForm));

    const titleInput = screen.getByLabelText(/title:/i);
    const descriptionTextarea = screen.getByLabelText(/describe the problem:/i);
    const typeSelect = screen.getByLabelText(/which stack\?/i);
    const clearButton = screen.getByRole('button', { name: /clear/i });

    fireEvent.change(titleInput, { target: { value: 'Sample Title' } });
    fireEvent.change(descriptionTextarea, { target: { value: 'Sample problem description' } });
    fireEvent.change(typeSelect, { target: { value: 'front-end' } });

    // Initially, the form should have the values we just set
    expect(titleInput).toHaveValue('Sample Title');
    expect(descriptionTextarea).toHaveValue('Sample problem description');
    expect(typeSelect).toHaveValue('front-end');

    // Testing the clear button
    fireEvent.click(clearButton);

    // After clicking the clear button, the form fields should be reset
    expect(titleInput).toHaveValue('');
    expect(descriptionTextarea).toHaveValue('');
    expect(typeSelect).toHaveValue('front-end');
  });

  it('should close the Snackbar when the close button is clicked', () => {
    render(React.createElement(ProblemForm));

    // Open the Snackbar first
    fireEvent.click(screen.getByText('Add Problem'));

    // Verify Snackbar is open
    expect(screen.getByText('Problem Added!')).toBeInTheDocument();

    // Close the Snackbar by clicking the close icon button
    fireEvent.click(screen.getByLabelText('close'));

    // Ensure the Snackbar has had enough time to close
    setTimeout(() => {
      expect(screen.queryByText('Problem Added!')).not.toBeInTheDocument();
    }, 1000); // Wait for the Snackbar to close
  });

  it('should not close the Snackbar when handleClose is called with "clickaway" reason', () => {
    render(React.createElement(ProblemForm));

    // Open the Snackbar first
    fireEvent.click(screen.getByText('Add Problem'));

    // Verify Snackbar is open
    expect(screen.getByText('Problem Added!')).toBeInTheDocument();

    // Call handleClose with "clickaway" reason
    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape', reason: 'clickaway' });

    // Ensure the Snackbar is still open
    expect(screen.getByText('Problem Added!')).toBeInTheDocument();
  });

  it('should close the Snackbar when handleClose is called without "clickaway" reason', () => {
    render(React.createElement(ProblemForm));

    // Open the Snackbar first
    fireEvent.click(screen.getByText('Add Problem'));

    // Verify Snackbar is open
    expect(screen.getByText('Problem Added!')).toBeInTheDocument();

    // Call handleClose without "clickaway" reason
    fireEvent.click(screen.getByLabelText('close'));

    // Ensure the Snackbar has had enough time to close
    setTimeout(() => {
      expect(screen.queryByText('Problem Added!')).not.toBeInTheDocument();
    }, 1000); // Wait for the Snackbar to close
  });

  it('should close the Snackbar when handleClose is called with an undefined reason', () => {
    render(React.createElement(ProblemForm));

    // Open the Snackbar first
    fireEvent.click(screen.getByText('Add Problem'));

    // Verify Snackbar is open
    expect(screen.getByText('Problem Added!')).toBeInTheDocument();

    // Call handleClose with an undefined reason
    fireEvent.click(screen.getByLabelText('close'));

    // Ensure the Snackbar has had enough time to close
    setTimeout(() => {
      expect(screen.queryByText('Problem Added!')).not.toBeInTheDocument();
    }, 1000); // Wait for the Snackbar to close
  });

  it('should close the Snackbar when handleClose is called directly with a non-clickaway reason', async () => {
    render(React.createElement(ProblemForm));

    // Open the Snackbar first
    fireEvent.click(screen.getByText('Add Problem'));

    // Verify Snackbar is open
    expect(screen.getByText('Problem Added!')).toBeInTheDocument();

    // Directly simulate a close event with a non-clickaway reason
    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });

    // Ensure the Snackbar has had enough time to close
    await waitFor(() => {
      expect(screen.queryByText('Problem Added!')).not.toBeInTheDocument();
    });
  });
});
