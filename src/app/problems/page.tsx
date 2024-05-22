// src/app/pages/ProblemsPage.tsx
import React from 'react';
import './page.css';
import AccordionList from './AccordianList';

export interface Problem {
  id: string;
  title: string;
  category: string;
  description: string;
  solution: string;
  status: string;
  issue: string;
  created_at: string;
}

export async function fetchProblems(): Promise<Problem[]> {
  const res = await fetch('http://localhost:3000/api/problems', {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

const ProblemsPage = async () => {
  const problems = await fetchProblems();

  return (
    <>
      <main>
        <div className="accordion">
          {problems.map((problem: Problem) => (
            <AccordionList key={problem.id} problem={problem} />
          ))}
        </div>
      </main>
      <footer></footer>
    </>
  );
};

export default ProblemsPage;
