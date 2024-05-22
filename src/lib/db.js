import pkg from 'pg';
const { Pool } = pkg;
import bcrypt from 'bcrypt'


const PG_URI = 'postgres://crfhcshd:zHtcF8YMBg2X6kA0UcK1XC3YFOpaUN5k@kala.db.elephantsql.com/crfhcshd';

// create a new pool here using the connection string above
const pool = new Pool({
  connectionString: PG_URI
}); 

export const db = {
  query: (text, params) => pool.query(text, params),
};

export async function hashPassword (password) {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};