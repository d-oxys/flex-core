import type { NextApiRequest, NextApiResponse } from 'next';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebaseAdmin';

type Data = {
  status: string;
  message: string;
  workoutPlan?: any;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'GET') {
    const { id } = req.query;
    const trimmedId = (id as string).trim();

    try {
      const docRef = doc(db, 'workouts', trimmedId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        res.status(200).json({
          status: 'ok',
          message: 'Workout plan fetched successfully!',
          workoutPlan: docSnap.data(),
        });
      } else {
        res.status(404).json({
          status: 'error',
          message: `Workout plan with id ${trimmedId} not found`,
        });
      }
    } catch (e) {
      console.error(e);
      res.status(500).json({
        status: 'error',
        message: 'Something went wrong',
      });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
