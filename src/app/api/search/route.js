import { NextResponse } from 'next/server';
import { db } from '../../../lib/db';

export async function GET(req) {
    try {
        const {searchTerms} = await req.json();
        const solutionIds = await fetchAndProcessDescriptions(searchTerms);

        try {
        const result = await query(
            'SELECT * FROM problems WHERE id = ANY($1::int[])',
            [idArray.map(id => parseInt(id))]
        );
            res.status(200).json(result.rows);
          } catch (error) {
            console.error('Error fetching problems:', error);
            res.status(500).json({ error: 'Internal Server Error' });
          }


    } catch (err) {
        console.log(err);
    }
}

async function fetchAndProcessDescriptions(searchTerms) {

  try {
    const solutions = [];

    const res = await db.query('SELECT id, description FROM problems');
    const problems = res.rows;

    const regex = new RegExp(searchTerms); // Replace with your regex pattern
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
  }
}