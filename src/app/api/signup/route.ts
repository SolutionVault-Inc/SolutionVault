import { NextRequest,NextResponse } from 'next/server';
import type { NextApiRequest,NextApiResponse } from 'next';
import { db, hashPassword } from '../../../lib/db';
import { sendEmail } from '../../../utils/emailVerification'

export async function GET(req: any) {
try {
  const { url } = req;
    
  // Parse the query parameters using URLSearchParams
  const params = new URLSearchParams(new URL(url).search);
    
  // Access individual parameters
  const verify = params.get('verify');
  const user_id = params.get('userid');

  const results = await db.query(`SELECT verify FROM verification WHERE user_id = $1`, [user_id]);

  if (results.rows[0].verify === verify) {
    await db.query('UPDATE users SET status = $1, WHERE id = $2', [true, user_id]);
    await db.query(`DELETE FROM verify WHERE user_id = $1`, [user_id]);
    return new NextResponse('Verified successfully', { status: 200 });
  } else {
    return new NextResponse('Could not verify', { status: 409 });
  }
} catch (error) {
    console.error('Error verifying:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function POST(req: any) {
  try {
    // Parse the JSON body from the request
    const body = await req.json();

    // Deconstruct the parsed JSON body
    const { username, password, email } = body;
    const isVerified = false;

    // Ensure all required fields are present
    if (!username || !password || !email) {
      console.error('Missing required fields');
      return new NextResponse('Bad Request', { status: 400 });
    }

    const hashedPassword = hashPassword(password)

    const values = [username, hashedPassword, email, isVerified];

    //check if user already exists
    const intialUsers = await db.query(`SELECT * FROM users
                                        WHERE email = $3 OR username = $1`, values)
    
    if (intialUsers.rows > 0) {
      return NextResponse.json('User already exists', { status: 409 });
    }

    // Execute the query to insert data into the database
    const result = await db.query('INSERT INTO users (username, password, email, is_verified) VALUES($1, $2, $3, $4) RETURNING *', values);

    await sendEmail(email, username, result.rows[0].id);

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error('Error inserting:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}