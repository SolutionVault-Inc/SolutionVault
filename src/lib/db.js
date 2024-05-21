import pkg from 'pg';
const { Pool } = pkg;


const PG_URI = 'postgres://crfhcshd:zHtcF8YMBg2X6kA0UcK1XC3YFOpaUN5k@kala.db.elephantsql.com/crfhcshd';

// create a new pool here using the connection string above
const pool = new Pool({
  connectionString: PG_URI
});

export const db = {
  query: (text, params) => pool.query(text, params),
};