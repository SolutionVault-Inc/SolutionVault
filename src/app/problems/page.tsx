import React, { useEffect } from 'react';
import Navbar from '@/app/components/NavBar';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './page.css'

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

async function fetchProblems(): Promise<Problem[]> {
  const res = await fetch('http://localhost:3000/api/problems', {
    // Optional: Adjust the caching behavior if necessary
    // cache: 'no-store', // Uncomment this line to disable caching
    next: { revalidate: 3600 },
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
      <header>
        <Navbar />
      </header>
      
      <main>
        <div className = "accordian">
        {problems.map((problem: Problem) => (
          <Accordion key={problem.id}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel-${problem.id}-content`}
              id={`panel-${problem.id}-header`}
            >
              <h3>{problem.title}</h3>
            </AccordionSummary>
            <AccordionDetails>
              <p>
                <strong>Type:</strong> {problem.category}
              </p>
              <p>
                <strong>Description:</strong> {problem.description}
              </p>
              <p>
                <strong>Solution:</strong> {problem.solution}
              </p>
              <p>
                <strong>Status:</strong> {problem.status}
              </p>
              <p>
                <strong>Created At:</strong> {new Date(problem.created_at).toLocaleString()}
              </p>
            </AccordionDetails>
          </Accordion>
          
        ))}
        </div>
      </main>
      
      <footer></footer>
    </>
  );
};

export default ProblemsPage;
