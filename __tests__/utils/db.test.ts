import pkg from 'pg';
import { db } from '../../src/lib/db'; // Adjust the path to your db module

jest.mock('pg', () => {
  const mClient = {
    query: jest.fn(),
    connect: jest.fn(),
    end: jest.fn(),
  };
  const mPool = {
    connect: jest.fn(() => mClient),
    query: jest.fn(),
    end: jest.fn(),
  };
  return { Pool: jest.fn(() => mPool) };
});

describe('db query', () => {
  let pool;

  beforeAll(() => {
    const { Pool } = require('pg');
    pool = new Pool();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should call pool.query with the correct arguments', async () => {
    const queryText = 'SELECT * FROM users WHERE id = $1';
    const queryParams = [1];

    pool.query.mockResolvedValueOnce({ rows: [{ id: 1, name: 'John Doe' }] });

    const result = await db.query(queryText, queryParams);

    expect(pool.query).toHaveBeenCalledWith(queryText, queryParams);
    expect(result).toEqual({ rows: [{ id: 1, name: 'John Doe' }] });
  });

  test('should handle query errors', async () => {
    const queryText = 'SELECT * FROM users WHERE id = $1';
    const queryParams = [1];
    const errorMessage = 'Database error';

    pool.query.mockRejectedValueOnce(new Error(errorMessage));

    await expect(db.query(queryText, queryParams)).rejects.toThrow(errorMessage);
  });
});
