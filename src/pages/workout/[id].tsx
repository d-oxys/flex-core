import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import recipeJson from '../../../public/data/resep.json';
import Link from 'next/link';
import { Breadcrumb, Button } from 'flowbite-react';
import { FaUtensils } from 'react-icons/fa';
import ArticleLayout from '@/components/WorkoutLayout';
import Layout from '@/components/rootLayout';

type WorkoutPlan = {
  nama: string;
  fotoWO: string;
  WaktuLatihan: string;
  Kategori: string;
  funFacts: string;
  energiYangdigunakan: string[];
  alat: string[];
  tutorial: string[];
  fileURL: string;
  id: string;
};

type RecomendationArticles = {
  title: string;
  headline: string;
  id: string;
};

const WorkoutPlanDetail = () => {
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan | null>(null);
  const [recommendedWorkout, setRecommendedWorkout] = useState<RecomendationArticles[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { id } = router.query;

  const getRecommendations = async (kategori: string) => {
    try {
      const response = await fetch(`/api/workout?kategori=${kategori}`);
      const data = await response.json();

      return data.workoutPlans.map((plan: WorkoutPlan) => ({
        title: plan.nama,
        headline: plan.funFacts,
        id: plan.id,
      }));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    if (workoutPlan) {
      getRecommendations(workoutPlan.Kategori).then((recommendations: RecomendationArticles[]) => {
        setRecommendedWorkout(recommendations);
      });
    }
  }, [workoutPlan]);

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
    <>
      {/*  */}
      <Layout>
        <div className='px-6 py-4 capitalize lg:px-24 xl:px-36'>
          <div className=''>
            <Breadcrumb className='mb-6'>
              <Breadcrumb.Item>
                <Link href='/resep' className='flex items-center gap-x-2 text-black'>
                  <FaUtensils /> Resep
                </Link>
              </Breadcrumb.Item>

              <Breadcrumb.Item>
                <Link href={`/workout`} className='flex items-center gap-x-2 text-black'>
                  {workoutPlan?.Kategori}
                </Link>
              </Breadcrumb.Item>

              <Breadcrumb.Item>{workoutPlan?.nama}</Breadcrumb.Item>
            </Breadcrumb>

            <ArticleLayout
              baseUrl='/workout'
              data={{
                title: workoutPlan?.nama || '',
                headline: workoutPlan?.funFacts || '',
                imageUrl: workoutPlan?.fileURL,
              }}
              recomendations={recommendedWorkout}
            >
              <div className='grid grid-cols-2 gap-y-3 rounded-md border border-gray-300 px-5 py-6 text-center lg:grid-cols-3'>
                <div className=''>
                  <h2 className='font-bold'>Waktu Latihan :</h2>
                  <p>{workoutPlan?.WaktuLatihan}</p>
                </div>

                <div className=''>
                  <h2 className='font-bold'></h2>
                  <p></p>
                </div>

                <div className=''>
                  <h2 className='font-bold'>Kategori</h2>
                  <p>{workoutPlan?.Kategori}</p>
                </div>
              </div>

              <h1 className='text-3xl font-bold'>Alat</h1>
              <ul className='list-disc space-y-2 pl-5'>
                {workoutPlan?.alat.map((alat, k) => (
                  <li key={k}>{alat}</li>
                ))}
              </ul>
              <h1 className='text-3xl font-bold'>Tutorial</h1>

              {workoutPlan?.tutorial.map((tutorial, k) => (
                <div key={k}>
                  <h3 className='mb-1 font-bold'>Langkah {k + 1}</h3>
                  <p className='pr-14 leading-relaxed lg:pr-2'>{tutorial}</p>
                </div>
              ))}

              <hr className='border-1 border-gray-300' />

              <h1 className='pt-5 text-3xl font-bold'>
                Energi Facts <span className='text-sm font-normal'>(per latihan)</span>
              </h1>

              <div className='grid grid-cols-3 gap-5 md:grid-cols-4 md:gap-6 lg:gap-8'>
                {workoutPlan?.energiYangdigunakan.map((energiYangdigunakan, k) => (
                  <div key={k}>
                    <h3 className='mb-1 font-bold'>{energiYangdigunakan[0]}</h3>
                    <p>{energiYangdigunakan[1]}</p>
                  </div>
                ))}
              </div>
            </ArticleLayout>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default WorkoutPlanDetail;
