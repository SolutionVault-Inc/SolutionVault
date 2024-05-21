// app/api/problems/route.js
import { NextResponse } from 'next/server';
import { db } from '../../../lib/db';

export async function GET() {
  try {
    const result = await db('SELECT * FROM problems', []);
    return NextResponse.json(result.rows);
  } catch (error) {
    return NextResponse.error({ status: 500, body: 'Internal Server Error' });
  }
}

export async function POST(req) {
  try {
    //deconstruct
    const { type,  title, description, solution} = await req.json();
    // const type ='example';
    // const title = 'example';
    // const description = 'example';
    // const solution = 'example';
    const user_id = 10001;
    //make array
    const values = [type, title, description, solution, user_id];
    //run query
    const result = await db('INSERT INTO problems (category, title, description, solution, user_id) VALUES($1, $2, $3, $4, $5) RETURNING *', values);
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    return NextResponse.error({ status: 500, body: 'Internal Server Error' });
  }
}