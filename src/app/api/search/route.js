import { NextResponse } from 'next/server';
import { db } from '../../../lib/db';

export async function POST(req) {
  try {
    const { searchTerms } = await req.json();
    console.log({searchTerms})
    const solutionIds = await fetchAndProcessDescriptions(searchTerms);

    const result = await db.query(
      'SELECT * FROM problems WHERE id = ANY($1::int[])',
      [solutionIds]
    );
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching problems:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

async function fetchAndProcessDescriptions(searchTerms) {
  try {
    const solutions = [];
    const res = await db.query('SELECT id, description FROM problems');
    const problems = res.rows;

    const regex = new RegExp(searchTerms); // Adjust your regex pattern as needed
    problems.forEach(problem => {
      if (regex.test(problem.description)) {
        solutions.push(problem.id);
        console.log(`Match found in description with id ${problem.id}: ${problem.description}`);
      } else {
        console.log(`No match in description with id ${problem.id}`);
      }
    });
    return solutions;
  } catch (err) {
    console.error('Error executing query', err.stack);
    throw new Error('Failed to fetch descriptions');
  }
}