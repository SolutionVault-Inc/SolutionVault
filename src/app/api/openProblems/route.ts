import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/db';

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const result = await db.query(`SELECT * FROM problems 
                                   WHERE status = 'open' ORDER BY created_at DESC`);
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching problems:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { id, solution } = await req.json();
    
    if (!id || !solution) {
      return new NextResponse('Problem ID and solution is required', { status: 400 });
    }

    await db.query('UPDATE problems SET status = $1, solution = $3 WHERE id = $2', ['closed', id, solution]);

    return new NextResponse('Problem status updated to closed', { status: 200 });
  } catch (error) {
    console.error('Error updating problem status:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}