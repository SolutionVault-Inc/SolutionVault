import { POST, fetchAndProcessDescriptions } from '../../src/app/api/search/route';
import { db } from '../../src/lib/db';
import { NextResponse } from 'next/server';

// Mock the database and NextResponse
jest.mock('../../src/lib/db');
jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn(),
  },
}));

describe('POST /api/search', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return solution ids when there is a match in description', async () => {
    const searchTerms = 'example';
    const solutionIds = [1, 2, 3];
    const problems = [
      { id: 1, description: 'example description 1' },
      { id: 2, description: 'another example description' },
      { id: 3, description: 'yet another example' },
    ];

    // Mock fetchAndProcessDescriptions to return solutionIds
    db.query
      .mockResolvedValueOnce({
        rows: [
          { id: 1, description: 'example description 1' },
          { id: 2, description: 'another example description' },
          { id: 3, description: 'yet another example' },
        ],
      })
      .mockResolvedValueOnce({ rows: problems });

    const req = {
      json: jest.fn().mockResolvedValue({ searchTerms }),
    };

    await POST(req);

    expect(req.json).toHaveBeenCalled(); // Ensure req.json() is called
    expect(db.query).toHaveBeenCalledWith('SELECT id, description FROM problems');
    expect(db.query).toHaveBeenCalledWith('SELECT * FROM problems WHERE id = ANY($1::int[])', [solutionIds]); // Correct argument format
    expect(NextResponse.json).toHaveBeenCalledWith(problems);
  });

  test('should return 500 status on error', async () => {
    const errorMessage = 'Internal Server Error';

    // Simulate an error in fetchAndProcessDescriptions
    db.query.mockRejectedValueOnce(new Error('query error'));

    const req = {
      json: jest.fn().mockResolvedValue({ searchTerms: 'example' }),
    };

    await POST(req);

    expect(NextResponse.json).toHaveBeenCalledWith({ error: errorMessage }, { status: 500 });
  });
});

describe('fetchAndProcessDescriptions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return an array of solution ids when there is a match in description', async () => {
    const searchTerms = 'example';
    const expectedSolutions = [1, 2, 3];

    // Mock the database query result
    const dbQueryResult = {
      rows: [
        { id: 1, description: 'example description 1' },
        { id: 2, description: 'another example description' },
        { id: 3, description: 'yet another example' },
        { id: 4, description: 'no match here' },
      ],
    };
    db.query.mockResolvedValueOnce(dbQueryResult);

    // Call the function to test
    const solutions = await fetchAndProcessDescriptions(searchTerms);

    // Check if the returned solutions match the expected ones
    expect(solutions).toEqual(expectedSolutions);
  });

  test('should return an empty array when there is no match in description', async () => {
    const searchTerms = 'example';
    const expectedSolutions = [];

    // Mock the database query result
    const dbQueryResult = { rows: [] };
    db.query.mockResolvedValueOnce(dbQueryResult);

    const solutions = await fetchAndProcessDescriptions(searchTerms);

    expect(solutions).toEqual(expectedSolutions);
  });

  test('should throw an error when the database query fails', async () => {
    const searchTerms = 'example';

    // Mock the database query to throw an error
    db.query.mockRejectedValueOnce(new Error('Failed to execute query'));

    await expect(fetchAndProcessDescriptions(searchTerms)).rejects.toThrow('Failed to fetch descriptions');
  });
});
