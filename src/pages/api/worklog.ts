import db from "@/lib/db";

export default async function handler(req: any, res: any) {
  if (req.method === "GET") {
    const { user_id, type } = req.query; // Tambahkan parameter `type`

    try {
      // Validasi apakah user_id tersedia
      if (!user_id) {
        return res.status(400).json({ error: "User ID is required" });
      }

      // Konversi user_id ke angka
      const parsedUserId = parseInt(user_id, 10);

      if (type === "projects") {
        // Query untuk mendapatkan projects dari user_id
        const data = await db.projects.findMany({
          where: {
            worklogs: {
              some: {
                user_id: parsedUserId,
              },
            },
          },
        });

        if (!data || data.length === 0) {
          return res.status(200).json([]);
        }

        return res.status(200).json(data || []);
      }

      // Query data worklogs berdasarkan user_id
      const data = await db.worklogs.findMany({
        where: {
          user_id: parsedUserId,
        },
        include: {
          projects: true,
          users: true,
        },
      });

      // Cek apakah data ditemukan
      if (!data || data.length === 0) {
        return res.status(200).json([]);
      }

      res.status(200).json(data || []);
    } catch (error) {
      console.error("Error fetching data by user_id:", error);
      res.status(500).json({ error: "An error occurred while fetching data" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
