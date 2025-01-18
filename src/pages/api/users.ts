import db from '@/lib/db';

export default async function handler(req: any, res: any) {
  if (req.method === 'GET') {
    try {
      // Replace `YourModelName` with the actual model name from your Prisma schema
      const data = await db.users.findMany();
      res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'An error occurred while fetching data' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
