'use client'
import '../page.css'
import AccordionList from '../AccordianList';
import SearchBar from '../SearchBar';
import { useState } from 'react';

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

const ClientContainer = (props) => {

  const [ problems, setProblems ] = useState(props.problems)

  return (
    <>
    <SearchBar
      setProblems={setProblems}
    />
    <div className = "accordian">
    {problems.map((problem: Problem) => (
      <AccordionList
        key={crypto.randomUUID()}
        problem={problem}
      />
    ))}
    </div>
    </>
  )
}

export default ClientContainer