import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import recipeJson from '../../../public/data/resep.json';
import Link from 'next/link';
import { Breadcrumb, Button } from 'flowbite-react';
import { FaUtensils } from 'react-icons/fa';
import ArticleLayout from '@/components/ArticleLayout';
import Layout from '@/components/rootLayout';

const RecipeDetailPage = () => {
  type recipeType = typeof recipeJson[0];
  const route = useRouter();
  const [nutritionFacts, setNutritionFacts] = useState<string[][]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [recommendedRecipe, setRecommendedRecipe] = useState<RecomendationArticles[]>([]);
  const [recipe, setRecipe] = useState<recipeType | undefined>(undefined);

  useEffect(() => {
    const findRecipe = recipeJson.find((recipe) => recipe.nama == (route.query.name ?? ''));
    setRecipe(findRecipe);
  }, [route.query]);

  useEffect(() => {
    setIsLoading(false);

    if (recipe) {
      setNutritionFacts(
        recipe.KandunganPerPorsi.map((kandungan) => {
          const nutritions = kandungan.split(' ');
          const nutrition = nutritions.pop() ?? '';

          return [nutritions.join(' '), nutrition];
        })
      );

      const recommendation: RecomendationArticles[] = recipeJson
        .filter((recipeData) => recipeData.Kategori == recipe.Kategori && recipeData.nama != route.query.name)
        .map((recipe) => ({
          title: recipe.nama,
          headline: recipe.funFacts,
        }));

      setRecommendedRecipe(recommendation);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipe]);

  return (
    <Layout>
      <div className='px-6 py-4 lg:px-24 xl:px-36'>
        {isLoading ? (
          <div>
            <p>Mengambil data resep...</p>
          </div>
        ) : (
          <div className='w-full'>
            {!recipe ? (
              <div>
                <p>Maaf resep tidak ditemukan</p>
                <Link href='/resep'>
                  <Button>Kembali ke halaman resep</Button>
                </Link>
              </div>
            ) : (
              <div className=''>
                <Breadcrumb className='mb-6'>
                  <Breadcrumb.Item>
                    <Link href='/resep' className='flex items-center gap-x-2 text-black'>
                      <FaUtensils /> Resep
                    </Link>
                  </Breadcrumb.Item>

                  <Breadcrumb.Item>
                    <Link href={`/resep?Kategori=${recipe.Kategori}`} className='flex items-center gap-x-2 text-black'>
                      {recipe.Kategori}
                    </Link>
                  </Breadcrumb.Item>

                  <Breadcrumb.Item>{recipe.nama}</Breadcrumb.Item>
                </Breadcrumb>

                <ArticleLayout
                  baseUrl='/resep'
                  data={{
                    title: recipe.nama,
                    headline: recipe.funFacts,
                    imageUrl: recipe.fotoResep,
                  }}
                  recomendations={recommendedRecipe}
                >
                  <div className='grid grid-cols-2 gap-y-3 rounded-md border border-gray-300 px-5 py-6 text-center lg:grid-cols-3'>
                    <div className=''>
                      <h2 className='font-bold'>Waktu Memasak :</h2>
                      <p>{recipe['Waktu memasak']}</p>
                    </div>

                    <div className=''>
                      <h2 className='font-bold'>Porsi :</h2>
                      <p>{recipe.Porsi}</p>
                    </div>

                    <div className=''>
                      <h2 className='font-bold'>kategori :</h2>
                      <p>{recipe.Kategori}</p>
                    </div>
                  </div>

                  <h1 className='text-3xl font-bold'>Bahan</h1>
                  <ul className='list-disc space-y-2 pl-5'>
                    {recipe.bahan.map((bahan, k) => (
                      <li key={k}>{bahan}</li>
                    ))}
                  </ul>

                  {recipe.bumbu_halus && (
                    <>
                      <h1 className='text-3xl font-bold'>Bumbu Halus</h1>
                      <ul className='list-disc space-y-2 pl-5'>
                        {recipe.bumbu_halus.map((bumbu, k) => (
                          <li key={k}>{bumbu}</li>
                        ))}
                      </ul>
                    </>
                  )}

                  <h1 className='text-3xl font-bold'>Cara Memasak</h1>

                  {recipe.tutorial.map((tutorial, k) => (
                    <div key={k}>
                      <h3 className='mb-1 font-bold'>Langkah {k + 1}</h3>
                      <p className='pr-14 leading-relaxed lg:pr-2'>{tutorial}</p>
                    </div>
                  ))}

                  <hr className='border-1 border-gray-300' />

                  <h1 className='pt-5 text-3xl font-bold'>
                    Nutrition Facts <span className='text-sm font-normal'>(per sajian)</span>
                  </h1>

                  <div className='grid grid-cols-3 gap-5 md:grid-cols-4 md:gap-6 lg:gap-8'>
                    {nutritionFacts.map((nutritions, k) => (
                      <div key={k}>
                        <h3 className='mb-1 font-bold'>{nutritions[0]}</h3>
                        <p>{nutritions[1]}</p>
                      </div>
                    ))}
                  </div>
                </ArticleLayout>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default RecipeDetailPage;
