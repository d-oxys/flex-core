import type { NextApiRequest, NextApiResponse } from "next";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { ref, deleteObject, getStorage } from "firebase/storage";
import { db } from "@/lib/firebaseAdmin";

type Data = {
  status: string;
  message: string;
  workoutPlan?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query;
  const trimmedId = (id as string).trim();

  if (req.method === "GET") {
    try {
      const docRef = doc(db, "workouts", trimmedId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        res.status(200).json({
          status: "ok",
          message: "Workout plan fetched successfully!",
          workoutPlan: docSnap.data(),
        });
      } else {
        res.status(404).json({
          status: "error",
          message: `Workout plan with id ${trimmedId} not found`,
        });
      }
    } catch (e) {
      console.error(e);
      res.status(500).json({
        status: "error",
        message: "Something went wrong",
      });
    }
  }
  // Menambahkan method DELETE
  else if (req.method === "DELETE") {
    try {
      const docRef = doc(db, "workouts", trimmedId);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        return res.status(404).json({
          status: "error",
          message: `Workout plan with id ${trimmedId} not found`,
        });
      }

      // Mengambil URL file dari dokumen
      const workoutData = docSnap.data();
      const fileURL = workoutData?.fileURL;

      // Menghapus dokumen dari Firestore
      await deleteDoc(docRef);

      // Jika ada gambar, hapus dari Storage
      if (fileURL) {
        try {
          const storage = getStorage();
          const imageRef = ref(storage, fileURL);
          await deleteObject(imageRef);
        } catch (imageError) {
          console.warn("Image deletion failed:", imageError);
        }
      }

      res.status(200).json({
        status: "ok",
        message: "Workout plan deleted successfully!",
      });
    } catch (e) {
      console.error("Error deleting workout plan:", e);
      res.status(500).json({
        status: "error",
        message: "Failed to delete workout plan",
      });
    }
  } else {
    res.setHeader("Allow", ["GET", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
