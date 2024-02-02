import type { NextApiRequest, NextApiResponse } from 'next';
import { collection, addDoc, getDocs, query, where, limit, startAfter, orderBy, Query } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '@/lib/firebaseAdmin';
import multer from 'multer';
import path from 'path';

type Data = {
  status: string;
  message: string;
  reportId?: string;
  workoutPlans?: any[];
};

interface MulterRequest extends NextApiRequest {
  file?: Express.Multer.File;
}

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1 * 1024 * 1024, // Maksimal 1 MB
  },
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Hanya file dengan ekstensi .jpeg, .jpg, atau .png yang diperbolehkan.'));
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    upload.single('image')(req as any, res as any, async (err: any) => {
      if (err) {
        return res.status(500).json({ status: 'error', message: err.message });
      }

      const file = (req as MulterRequest).file;

      if (!file) {
        return res.status(400).json({ status: 'error', message: 'File tidak ada.' });
      }

      const fileRef = ref(getStorage(), 'workouts/' + file.originalname);

      await uploadBytes(fileRef, file.buffer);

      const fileURL = await getDownloadURL(fileRef);

      const workoutData = JSON.parse((req as MulterRequest).body.workout);
      workoutData.fileURL = fileURL;

      try {
        const docRef = await addDoc(collection(db, 'workouts'), workoutData);

        res.status(200).json({
          status: 'ok',
          message: 'Workout plan and image submitted successfully!',
          reportId: docRef.id,
        });
      } catch (e) {
        console.error(e);
        res.status(500).json({
          status: 'error',
          message: 'Something went wrong',
        });
      }
    });
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
        const workoutPlan = doc.data();
        workoutPlan.id = doc.id;
        workoutPlans.push(workoutPlan);
      });

      res.status(200).json({
        status: 'ok',
        message: 'Workout plans fetched successfully!',
        workoutPlans: workoutPlans,
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({
        status: 'error',
        message: 'Something went wrong',
      });
    }
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
