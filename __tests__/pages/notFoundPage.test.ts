import React from 'react';
import { render, screen } from '@testing-library/react';
import CatchAllPage from '../../src/app/[...slug]/page';
import { notFound } from 'next/navigation';
import Link from 'next/link';

// Mock the next/navigation and next/link components
jest.mock('next/navigation', () => ({
  notFound: jest.fn(),
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: (props: any) => React.createElement('a', { ...props }),
}));

describe('CatchAllPage', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call notFound when slug is missing', () => {
    const params = { slug: undefined };
    render(React.createElement(CatchAllPage, { params }));

    expect(notFound).toHaveBeenCalled();
  });

  it('should call notFound when slug is an empty array', () => {
    const params = { slug: [] };
    render(React.createElement(CatchAllPage, { params }));

    expect(notFound).toHaveBeenCalled();
  });

  it('should render the not found message with the correct slug', () => {
    const params = { slug: ['some', 'nonexistent', 'page'] };
    render(React.createElement(CatchAllPage, { params }));

    expect(notFound).not.toHaveBeenCalled();
    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
    expect(screen.getByText((content, element) => content.startsWith('The page you are looking for does not exist. You tried to access:'))).toBeInTheDocument();
    expect(screen.getByText('/some/nonexistent/page')).toBeInTheDocument();
    expect(screen.getByText('Go back to Home')).toBeInTheDocument();
  });

  it('should render the Link component correctly', () => {
    const params = { slug: ['test'] };
    render(React.createElement(CatchAllPage, { params }));

    expect(screen.getByText('Go back to Home').closest('a')).toHaveAttribute('href', '/');
  });
});
