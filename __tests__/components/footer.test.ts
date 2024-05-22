import React, { createElement } from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // Updated import statement
import Footer from '../../src/app/components/Footer';
import github from '../../assets/github-mark-white.svg';
import linked from '../../assets/icons8-linkedin-30.png';

describe('Footer', () => {
  beforeEach(() => {
    render(createElement(Footer));
  });

  it('renders connect message', () => {
    expect(screen.getByText('Connect with us:')).toBeInTheDocument();
  });

  it('renders team member names with GitHub and LinkedIn links', () => {
    const members = [
      { name: 'Mike Tagg', github: 'https://github.com/mdtagg', linkedin: 'https://www.linkedin.com/in/miketagg/' },
      { name: 'Sean Ryan', github: 'https://github.com/sfryan95', linkedin: 'https://www.linkedin.com/in/sean-francis-ryan/' },
      { name: 'Haider Ali', github: 'https://github.com/hali03', linkedin: 'https://www.linkedin.com/in/haideralias2/' },
      { name: 'Sofia Sarhiri', github: 'https://github.com/sarhiri', linkedin: 'https://www.linkedin.com/in/sofia-sarhiri/' },
    ];

    members.forEach((member) => {
      expect(screen.getByText(member.name)).toBeInTheDocument();
      expect(screen.getAllByAltText('user image').some((img) => (img as HTMLImageElement).src.includes(github))).toBe(true);
      expect(screen.getAllByAltText('user image').some((img) => (img as HTMLImageElement).src.includes(linked))).toBe(true);
      expect((screen.getAllByRole('link')[0] as HTMLAnchorElement).href === member.github).toBe(true);
      expect((screen.getAllByRole('link')[1] as HTMLAnchorElement).href === member.linkedin).toBe(true);
    });
  });

  it('renders GitHub and LinkedIn images', () => {
    expect(screen.getAllByAltText('user image').length).toBe(8); // 4 GitHub + 4 LinkedIn images
  });
});
