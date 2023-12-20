import type { NextApiRequest, NextApiResponse } from 'next';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../lib/firebaseAdmin';

type Data = {
  status: string;
  message: string;
  reportId?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    const workoutData = req.body;

    try {
      // Menambahkan data latihan ke koleksi 'workouts' di Firestore
      const docRef = await addDoc(collection(db, 'workouts'), workoutData);

      res.status(200).json({
        status: 'ok',
        message: 'Workout plan submitted successfully!',
        reportId: docRef.id,
      });
    } catch (e) {
      console.error(e); // Menambahkan console log untuk mencetak detail kesalahan
      res.status(500).json({
        status: 'error',
        message: 'Something went wrong',
      });
    }
  } else {
    // Menangani permintaan selain POST
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
