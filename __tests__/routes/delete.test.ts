// import { NextResponse, NextRequest } from 'next/server';
// import { db } from '../../src/lib/db';
// import { POST } from '../../src/app/api/delete/route';

// jest.mock('../../src/lib/db');

// class NextRequestMock {
//   constructor(public body: any) {
//     this.body = body;
//   }

//   async json() {
//     return this.body;
//   }
// }

// class NextResponseMock {
//   constructor(public body: any, public status: number) {
//     this.body = body;
//     this.status = status;
//   }

//   static json(body: any, { status }: { status: number }) {
//     return new NextResponseMock(body, status);
//   }

//   async json() {
//     return this.body;
//   }

//   async text() {
//     return typeof this.body === 'string' ? this.body : JSON.stringify(this.body);
//   }
// }

// describe('DELETE /api/delete', () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   it('should delete a problem and return the remaining problems', async () => {
//     // Mock the request
//     const req = new NextRequestMock({ id: '1' });

//     // Mock the database query
//     db.query.mockResolvedValueOnce({}); // Mock delete query
//     db.query.mockResolvedValueOnce({ rows: [{ id: '2', title: 'Remaining Problem' }] }); // Mock select query

//     const response = (await POST(req as any)) as NextResponseMock;
//     const data = await response.json();

//     expect(db.query).toHaveBeenCalledWith('DELETE FROM problems WHERE id = $1', ['1']);
//     expect(db.query).toHaveBeenCalledWith('SELECT * FROM problems ORDER BY created_at DESC', []);
//     expect(data).toEqual([{ id: '2', title: 'Remaining Problem' }]);
//     expect(response.status).toBe(200);
//   });

//   it('should return a 400 error if no ID is provided', async () => {
//     const req = new NextRequestMock({});

//     const response = (await POST(req as any)) as NextResponseMock;
//     expect(response.status).toBe(400);
//     expect(await response.text()).toBe('Problem ID is required');
//   });

//   it('should return a 500 error if there is a server error', async () => {
//     const req = new NextRequestMock({ id: '1' });

//     db.query.mockRejectedValueOnce(new Error('Database error'));

//     const response = (await POST(req as any)) as NextResponseMock;
//     expect(response.status).toBe(500);
//     expect(await response.text()).toBe('Internal Server Error');
//   });
// });
