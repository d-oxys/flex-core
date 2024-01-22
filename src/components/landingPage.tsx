'use client';
import { useEffect, useState } from 'react';
import { Card } from 'flowbite-react';
import Image from 'next/image';
import Link from 'next/link';
import Aos from 'aos';
import DoctorImage from '../../public/images/dokter-min.png';
import ArticleJson from '../../public/data/thumbnail.json';

import TncLogo from '../../public/images/tnc_logo.png';
import 'aos/dist/aos.css';

type ArticleType = typeof ArticleJson[0];

const Home = () => {
  const [articles, setArticles] = useState<ArticleType[]>([]);

  useEffect(() => {
    Aos.init();

    setArticles(ArticleJson.slice(1));
  }, []);

  return (
    <div className='flex flex-col space-y-[70px]'>
      <div className='jumbotron h-[calc(100vh-70px)] w-full bg-[#EAF7FF]'>
        <div className='container mx-auto flex h-full flex-row px-6 lg:space-x-8 lg:px-12 xl:px-24'>
          <div className='flex w-full flex-col items-center justify-center space-y-5 lg:w-[50%] lg:items-start' data-aos='fade-right'>
            <Image className='block lg:hidden' src={TncLogo} width={150} height={150} alt='Logo TNC' />
            <h1 className='font-suisseNeue text-center text-2xl font-bold capitalize leading-normal md:text-3xl lg:text-left lg:text-4xl lg:leading-snug xl:text-5xl xl:leading-normal'>selamat datang di flex core.</h1>
            <h2 className='text-center text-lg font-semibold leading-normal lg:text-left lg:text-xl xl:text-2xl'>
              Yuk Hitung Kebutuhan <br className='hidden xl:block' /> Kalori Mu
            </h2>

            <div className='flex flex-row space-x-3'>
              <Link href='/perhitungan'>
                <button className='bg-primary-1 h-12 rounded-md px-4 text-sm font-semibold text-white  duration-500 hover:bg-blue-700 md:text-base'>Hitung Kebutuhan Kalori</button>
              </Link>

              <Link href='/resep'>
                <button className='bg-primary-2 h-12 rounded-md px-4 text-sm font-semibold text-white duration-500 hover:bg-blue-700 md:text-base'>Resep</button>
              </Link>
            </div>
          </div>

          <div className='relative hidden items-center lg:flex lg:w-[50%]' data-aos='fade-left'>
            <Image src='https://via.placeholder.com/500' alt='Hero' priority={true} fill sizes='(max-width: 500px) 0vw, (max-width: 800px) 30vw, (max-width: 1200px) 40vw, 50vw' className='relative h-auto' />
          </div>
        </div>
      </div>

      <article className='container mx-auto mb-10 mt-6 px-6 lg:px-12 xl:px-24'>
        <div className='' data-aos='fade-up'>
          <div className='text-center'>
            <h1 className='text-base font-bold text-[#3056D3]'>Rekomendasi Artikel</h1>
            <h2 className='mb-4 mt-1 text-3xl font-bold md:text-4xl'>Apakah kamu tahu?</h2>
            <p className='mx-auto text-sm text-[#637381] md:w-3/4 md:text-base xl:w-1/2'>
              {' '}
              Menurut data survei kesehatan indonesia pada tahun 2022 terdapat 4 metode efektif membangun otot. Daripada bingung, yuk cari tahu tentang metode membangun otot yang efektif.
            </p>
          </div>
          <div className='mt-8 grid grid-cols-1 gap-y-5 md:grid-cols-2 md:gap-x-12'>
            <div className='main'>
              <Link href='/workout/ocQKBz9CZM2CvgKVqTSd'>
                <Card className='h-full border-2 border-gray-200 p-4'>
                  <div className='relative h-[250px] w-full sm:h-[300px] lg:h-[350px] xl:h-[400px]'>
                    <Image src={ArticleJson[0].fileURL} alt='gambar artikel' fill className='object-cover' sizes='(max-width: 768px) 40vw, (max-width: 1200px) 50vw, 60vw' />
                  </div>

                  <h3 className='hover:text-primary-2 line-clamp-2 text-xl font-bold leading-snug duration-500'>{ArticleJson[0].nama}</h3>
                  <p className='text-primary-3 line-clamp-3 text-sm'>{ArticleJson[0].funFacts}</p>
                </Card>
              </Link>
            </div>
            <div className='aside flex flex-col space-y-4'>
              {articles.map((article, k) => (
                <Link href={`/workout/${article.id}`} key={k}>
                  <Card className='border-2 border-gray-200 p-4'>
                    <div className='flex flex-col md:flex-row md:space-x-3'>
                      <div className='relative h-[250px] w-full bg-red-300 md:h-[130px] md:w-[40%] xl:h-[150px]'>
                        <Image src={article.fileURL} alt='gambar artikel' sizes='(max-width: 768px) 40vw, (max-width: 1200px) 50vw, 60vw' fill className='object-cover' />
                      </div>

                      <div className='mt-5 md:mt-0 md:w-[60%]'>
                        <h3 className='hover:text-primary-2 line-clamp-2 text-xl font-bold leading-snug duration-500'>{article.nama}</h3>
                        <p className='mt-4 line-clamp-3 text-sm text-[#637381]'>{article.funFacts}</p>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default Home;
