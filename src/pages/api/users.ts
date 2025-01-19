import db from '@/lib/db';

export default async function handler(req: any, res: any) {
  const { method } = req;

  switch (method) {
    case 'GET': {
      try {
        const data = await db.users.findMany();
        res.status(200).json(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        res
          .status(500)
          .json({ error: 'An error occurred while fetching data' });
      }
      break;
    }

    case 'POST': {
      const { name, email, password } = req.body;

      try {
        if (!name || !email || !password) {
          return res.status(400).json({ error: 'All fields are required' });
        }

        const newUser = await db.users.create({
          data: {
            name,
            email,
            password,
          } as any,
        });

        res.status(201).json(newUser);
      } catch (error) {
        console.error('Error creating user:', error);
        res
          .status(500)
          .json({ error: 'An error occurred while creating user' });
      }
      break;
    }

    case 'PUT': {
      const { id, name, email, password } = req.body;

      try {
        if (!id) {
          return res.status(400).json({ error: 'User ID is required' });
        }

        const updatedUser = await db.users.update({
          where: { id: parseInt(id, 10) },
          data: {
            name,
            email,
            password,
          },
        });

        res.status(200).json(updatedUser);
      } catch (error) {
        console.error('Error updating user:', error);
        res
          .status(500)
          .json({ error: 'An error occurred while updating user' });
      }
      break;
    }

    case 'DELETE': {
      const { id } = req.body;

      try {
        if (!id) {
          return res.status(400).json({ error: 'User ID is required' });
        }

        await db.users.delete({
          where: { id: parseInt(id, 10) },
        });

        res
          .status(200)
          .json({ message: `User with ID ${id} deleted successfully` });
      } catch (error) {
        console.error('Error deleting user:', error);
        res
          .status(500)
          .json({ error: 'An error occurred while deleting user' });
      }
      break;
    }

    default: {
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
    }
  }
}
