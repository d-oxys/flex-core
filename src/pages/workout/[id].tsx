import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

type WorkoutPlan = {
  nama: string;
  fotoWO: string;
  WaktuLatihan: string;
  Kategori: string;
  funFacts: string;
  energiYangdigunakan: string[];
  alat: string[];
  tutorial: string[];
};

const WorkoutPlanDetail = () => {
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    fetch(`/api/workout/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setWorkoutPlan(data.workoutPlan);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='p-4'>
      <h1 className='text-xl font-bold'>{workoutPlan?.nama}</h1>
      <img src={workoutPlan?.fotoWO} alt={workoutPlan?.nama} className='mt-4 h-64 w-full object-cover' />
      <p className='mt-4'>
        <strong>Waktu Latihan:</strong> {workoutPlan?.WaktuLatihan}
      </p>
      <p>
        <strong>Kategori:</strong> {workoutPlan?.Kategori}
      </p>
      <p>
        <strong>Fun Facts:</strong> {workoutPlan?.funFacts}
      </p>
      <p>
        <strong>Energi Yang Digunakan:</strong> {workoutPlan?.energiYangdigunakan}
      </p>
      <p>
        <strong>Alat:</strong> {workoutPlan?.alat}
      </p>
      <h2 className='mt-4 text-lg font-bold'>Tutorial:</h2>
      <ol className='list-inside list-decimal'>
        {workoutPlan?.tutorial.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
    </div>
  );
};

export default WorkoutPlanDetail;
