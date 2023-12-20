import type { NextApiRequest, NextApiResponse } from 'next';
import { collection, addDoc, getDocs, query, where, limit, startAfter, orderBy, Query } from 'firebase/firestore';
import { db } from '../../lib/firebaseAdmin';

type Data = {
  status: string;
  message: string;
  reportId?: string;
  workoutPlans?: any[];
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
  } else if (req.method === 'GET') {
    const { q, l, skip } = req.query;

    try {
      let workoutPlansQuery: Query = collection(db, 'workouts');
      let qArray = [];

      if (q) {
        qArray.push(where('Kategori', '>=', q));
        qArray.push(where('Kategori', '<', q + '\uf8ff'));
      }
      if (l) {
        qArray.push(limit(Number(l)));
      }
      if (skip) {
        const lastSnapshot = await getDocs(query(workoutPlansQuery, orderBy('Kategori'), limit(Number(l))));
        const lastDocumentSnapshot = lastSnapshot.docs[lastSnapshot.docs.length - 1];
        qArray.push(startAfter(lastDocumentSnapshot));
      }

      workoutPlansQuery = query(workoutPlansQuery, ...qArray);

      const workoutPlans: any[] = [];
      const querySnapshot = await getDocs(workoutPlansQuery);
      querySnapshot.forEach((doc) => {
        workoutPlans.push(doc.data());
      });

      res.status(200).json({
        status: 'ok',
        message: 'Workout plans fetched successfully!',
        workoutPlans: workoutPlans,
      });
    } catch (e) {
      console.error(e); // Menambahkan console log untuk mencetak detail kesalahan
      res.status(500).json({
        status: 'error',
        message: 'Something went wrong',
      });
    }
  } else {
    // Menangani permintaan selain POST dan GET
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
