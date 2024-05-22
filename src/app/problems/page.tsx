
import React from 'react';
import './page.css'
import AccordionList from './AccordianList';

interface Problem {
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
    // Optional: Adjust the caching behavior if necessary
    cache: 'no-store', // Uncomment this line to disable caching
    // next: { revalidate: 3600 },
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
        <div className = "accordian">
        {problems.map((problem: Problem) => (
          <AccordionList
            key={crypto.randomUUID()}
            problem={problem}
          />
        ))}
        </div>
      </main>

      <footer></footer>
    </>
  );
};

export default ProblemsPage;
