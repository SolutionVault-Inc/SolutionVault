import React from 'react';
import { render, screen } from '@testing-library/react';
import MainBody from '../../src/app/components/Mainbody';
import dropdown from '../../assets/arrow.png';

// Mock the Image component from next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => React.createElement('img', { ...props, src: props.src.src }),
}));

describe('MainBody', () => {
  it('should render the main body content', () => {
    render(React.createElement(MainBody));

    // Check for the first text
    expect(screen.getByText(/No more opening and leaving countless tabs open for one problem./)).toBeInTheDocument();

    // Check for the second text
    expect(screen.getByText(/With Solution Vault, you can store all of your questions and answers in one place, without the hassle of using a spreadsheet./)).toBeInTheDocument();

    // Check for the scroll text
    expect(screen.getByText(/Scroll down to get started./)).toBeInTheDocument();
  });

  it('should render the down arrow image', () => {
    render(React.createElement(MainBody));

    // Check for the image
    const img = screen.getByAltText('down arrow');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', dropdown.src);
  });
});
