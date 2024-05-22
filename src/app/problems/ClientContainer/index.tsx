'use client';
import '../page.css';
import AccordionList from '../AccordianList';
import SearchBar from '../SearchBar';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

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

const ClientContainer = (props: any) => {
  const [problems, setProblems] = useState(props.problems);

  return (
    <>
      <SearchBar setProblems={setProblems} />
      <div className="accordian">
        {problems.map((problem: Problem) => (
          <AccordionList key={uuidv4()} problem={problem} />
        ))}
      </div>
    </>
  );
};

export default ClientContainer;
