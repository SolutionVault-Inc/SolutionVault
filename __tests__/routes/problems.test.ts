// import { NextResponse } from 'next/server'; // Importing NextResponse
// import { GET, POST } from '../../src/app/api/problems/route'; // Adjust the import path as per your project structure
// import { db } from '../../src/lib/db'; // Adjust the import path as per your project structure
// import fetch, { Request } from 'node-fetch'; // Importing fetch and Request from node-fetch

// // Mock the db query function
// jest.mock('../../src/lib/db', () => ({
//   query: jest.fn(),
// }));

// xdescribe('API Route Tests', () => {
//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   xdescribe('GET', () => {
//     it('should return problems ordered by created_at', async () => {
//       const mockRows = [{ id: 1, title: 'Test Problem' }];
//       (db.query as jest.Mock).mockResolvedValueOnce({ rows: mockRows });

//       const response = await GET();

//       expect(db.query).toHaveBeenCalledWith('SELECT * FROM problems ORDER BY created_at DESC', []);
//       expect(response.status).toBe(200);
//       expect(await response.json()).toEqual(mockRows);
//     });

//     it('should handle errors', async () => {
//       (db.query as jest.Mock).mockRejectedValueOnce(new Error('Database Error'));

//       const response = await GET();

//       expect(response.status).toBe(500);
//       expect(await response.text()).toBe('Internal Server Error');
//     });
//   });

//   xdescribe('POST', () => {
//     it('should insert a new problem and return it', async () => {
//       const req = new Request('http://localhost', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           type: 'bug',
//           title: 'New Bug',
//           description: 'Bug description',
//         }),
//       });

//       const mockResponseData = {
//         rows: [{ id: 1, type: 'bug', title: 'New Bug', description: 'Bug description', user_id: 10001 }],
//       };
//       (db.query as jest.Mock).mockResolvedValueOnce(mockResponseData);

//       const response = await POST(req);

//       expect(db.query).toHaveBeenCalledWith('INSERT INTO problems (category, title, description, user_id) VALUES($1, $2, $3, $4) RETURNING *', ['bug', 'New Bug', 'Bug description', 10001]);
//       expect(response.status).toBe(201);
//       expect(await response.json()).toEqual(mockResponseData.rows[0]);
//     });

//     it('should return 400 if required fields are missing', async () => {
//       const req = new Request('http://localhost', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           type: 'bug',
//           title: '',
//           description: '',
//         }),
//       });

//       const response = await POST(req);

//       expect(response.status).toBe(400);
//       expect(await response.text()).toBe('Bad Request');
//     });

//     it('should handle insertion errors', async () => {
//       const req = new Request('http://localhost', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           type: 'bug',
//           title: 'New Bug',
//           description: 'Bug description',
//         }),
//       });

//       (db.query as jest.Mock).mockRejectedValueOnce(new Error('Insertion Error'));

//       const response = await POST(req);

//       expect(response.status).toBe(500);
//       expect(await response.text()).toBe('Internal Server Error');
//     });
//   });
// });
