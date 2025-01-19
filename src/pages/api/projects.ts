import db from '@/lib/db';

export default async function handler(req: any, res: any) {
  if (req.method === 'GET') {
    const { id } = req.query; // Ambil id dari query parameter

    try {
      // Validasi apakah id tersedia
      if (!id) {
        return res.status(400).json({ error: 'ID is required' });
      }

      // Query data berdasarkan id
      const data = await db.projects.findUnique({
        where: {
          id: parseInt(id, 10), // Pastikan id diubah menjadi angka
        },
      });

      // Cek apakah data ditemukan
      if (!data) {
        return res
          .status(404)
          .json({ error: `Project with ID ${id} not found` });
      }

      res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching data by ID:', error);
      res.status(500).json({ error: 'An error occurred while fetching data' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
