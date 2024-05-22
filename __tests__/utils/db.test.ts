import { db, hashPassword } from '../../src/lib/db'; // Adjust the path to your db module
import bcrypt from 'bcrypt';

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

jest.mock('bcrypt', () => ({
  genSalt: jest.fn(),
  hash: jest.fn(),
}));

describe('db query', () => {
  let pool: any;

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

describe('hashPassword', () => {
  test('should hash the password correctly', async () => {
    const password = 'mysecretpassword';
    const salt = 'randomSalt';
    const hashedPassword = 'hashedPassword';

    (bcrypt.genSalt as jest.Mock).mockResolvedValue(salt);
    (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);

    const result = await hashPassword(password);

    expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
    expect(bcrypt.hash).toHaveBeenCalledWith(password, salt);
    expect(result).toBe(hashedPassword);
  });

  test('should handle errors during hashing', async () => {
    const password = 'mysecretpassword';
    const errorMessage = 'Hashing error';

    (bcrypt.genSalt as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await expect(hashPassword(password)).rejects.toThrow(errorMessage);
  });
});
