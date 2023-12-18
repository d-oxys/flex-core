import Link from 'next/link';
import { Button, Card } from 'flowbite-react';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import recipeJson from '../../public/data/resep.json';
import Image from 'next/image';
import { rgbDataURL } from '@/helpers/rgbDataURL';

const RecipeIndexPage = () => {
  const router = useRouter();
  const categories = ['Semua', 'surplus kalori', 'defisit kalori'];
  const [filteredCategory, setFilteredCategory] = useState('Semua');
  const recipes = useMemo(() => {
    const { Kategori = 'Semua' } = router.query;

    const getCategory = (categories.includes(Kategori.toString()) ? Kategori : 'Semua').toString();

    if (getCategory === 'Semua') {
      return recipeJson;
    }

    setFilteredCategory(getCategory);

    return recipeJson.filter((recipe) => recipe.Kategori.toLowerCase() === getCategory.toLowerCase());
  }, [router.query]);

  function filterCategory(category: string) {
    setFilteredCategory(category);

    router.push({
      pathname: 'resep',
      query: {
        Kategori: category,
      },
    });
  }

  return (
    <div className='container m-auto flex min-h-screen flex-col space-y-8 px-4 py-4 capitalize lg:px-12 xl:px-24'>
      <div className='pt-6 text-center'>
        <h1 className='text-base font-bold text-[#3056D3]'>Refrensi Resep Untuk Memenuhi Kebutuhan Kalori</h1>
        <h2 className='mb-3 mt-1 text-2xl font-bold md:text-3xl'>Lorem ipsum dolor sit. </h2>
        <p className='mx-auto text-sm text-[#637381] md:w-3/4 md:text-base xl:w-1/2'> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt adipisci beatae eligendi quidem quisquam.</p>
      </div>

      <div className='grid grid-cols-2 items-center justify-center gap-3 md:grid-cols-3'>
        {categories.map((category, k) => (
          <Button className={`${category.toLowerCase() === filteredCategory.toLowerCase() ? 'bg-primary-2' : 'bg-primary-1'} hover:bg-primary-2 capitalize duration-500`} key={k} onClick={() => filterCategory(category)}>
            {category}
          </Button>
        ))}
      </div>

      <div className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3'>
        {recipes.map((recipe, k) => (
          <Link href={`resep/${recipe.nama}`} key={k}>
            <Card>
              <Image src={recipe.fotoResep} alt={`Gambar ${recipe.nama}`} width='500' height='300' priority={true} placeholder='blur' blurDataURL={rgbDataURL(237, 181, 6)} className='h-52 object-cover object-center' />
              <h4 className='text-center font-bold'>{recipe.nama}</h4>
              <p>Kategori : {recipe.Kategori}</p>
              <div className='line-clamp-2'>
                {recipe.bahan.map((bahan, k) => (
                  <span key={k}>
                    {bahan} <span className='px-xs inline-block text-gray-400'>•</span>{' '}
                  </span>
                ))}
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecipeIndexPage;
