'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/NavBar';
import axios from 'axios';
import { GetServerSideProps } from 'next';

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

interface HomeProps {
  problems: Problem[];
}

export default function Problems({ problems }: HomeProps) {
  // const testObj = {
  //   id: '',
  //   title: '',
  //   category: '',
  //   description: '',
  //   solution: '',
  //   status: '',
  //   issue: '',
  //   created_at: '',
  // };
  // const [problems, setProblems] = useState<Problem[]>([testObj]);

  // useEffect(() => {
  //   async function fetchProblems() {
  //     try {
  //       const response = await axios('/api/problems');
  //       console.log('Response', response);
  //       setProblems(response.data);
  //     } catch (e) {
  //       console.error('Error fetching problems:', e);
  //     }
  //   }
  //   fetchProblems();
  // }, []);
  console.log(problems);
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        {problems.map((problem: Problem) => (
          <div key={problem.id} className="problem">
            <h3>{problem.title}</h3>
            <p>
              <strong>Category:</strong> {problem.category}
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
          </div>
        ))}
      </main>
      <footer></footer>
    </>
  );
}

// export const GetServerSideProps:
