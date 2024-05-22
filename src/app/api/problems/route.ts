// app/api/problems/route.js
import { NextRequest,NextResponse } from 'next/server';
import type { NextApiRequest,NextApiResponse } from 'next';
import { db } from '../../../lib/db';

export async function GET(req:any,res:any) {
  try {
    const result = await db.query('SELECT * FROM problems ORDER BY created_at DESC', []);
    return NextResponse.json(result.rows);
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
    // return NextResponse.error({ status: 500, body: 'Internal Server Error' });
  }
}

export async function POST(req: any) {
  try {
    // Parse the JSON body from the request
    const body = await req.json();

    // Deconstruct the parsed JSON body
    const { type, title, description } = body;

    // Ensure all required fields are present
    if (!type || !title || !description) {
      console.error('Missing required fields');
      return new NextResponse('Bad Request', { status: 400 });
    }

    const user_id = 10001;
    const values = [type, title, description, user_id];

    // Execute the query to insert data into the database
    const result = await db.query('INSERT INTO problems (category, title, description, user_id) VALUES($1, $2, $3, $4) RETURNING *', values);

    if (result.rows.length > 0) {
      return NextResponse.json(result.rows[0], { status: 201 });
    } else {
      console.error('No rows returned.');
      return new NextResponse('Insertion failed', { status: 500 });
    }
  } catch (error) {
    console.error('Error inserting:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}