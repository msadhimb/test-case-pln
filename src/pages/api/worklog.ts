import db from '@/lib/db';

export default async function handler(req: any, res: any) {
  if (req.method === 'GET') {
    try {
      const data = await db.worklogs.findMany({
        include: {
          projects: true,
          users: true,
        },
      });

      // Validasi data sebelum mengirim respons
      if (!data || data.length === 0) {
        return res.status(404).json({ error: 'No worklogs found' });
      }

      res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Menyediakan pesan error yang lebih detail
      res.status(500).json({
        error: 'An error occurred while fetching data',
      });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
