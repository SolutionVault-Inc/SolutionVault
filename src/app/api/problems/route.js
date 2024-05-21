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
    console.log("FORM DATA",req.body);
    const { name } = await req.json();
    const result = await query('INSERT INTO users(name) VALUES($1) RETURNING *', [name]);
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    return NextResponse.error({ status: 500, body: 'Internal Server Error' });
  }
}