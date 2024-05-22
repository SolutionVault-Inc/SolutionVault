import { NextResponse } from 'next/server';
import { db } from '../../../lib/db';

export async function POST(req:any) {
  try {

    const { id } = await req.json();
    console.log(id)
    if (!id) {
      return new NextResponse('Problem ID is required', { status: 400 });
    }
    // Delete the problem from the database based on the ID
    await db.query('DELETE FROM problems WHERE id = $1', [id]);

    const result = await db.query('SELECT * FROM problems ORDER BY created_at DESC', []);
    return NextResponse.json(result.rows);
    } catch (error) {
      console.error('Error deleting problem:', error);
      return new NextResponse('Internal Server Error', { status: 500 });
    }
  }