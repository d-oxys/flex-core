import { SocialMediaBtn } from '@/components/ArticleComponents';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { PropsWithChildren } from 'react';
import { FaArrowRight, FaClipboard, FaFacebook, FaShareAlt, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import { toast } from 'react-toastify';

const ArticleLayout = (props: PropsWithChildren<ArticleLayoutData>) => {
  const { data } = props;

  function copyToClipboard() {
    navigator.clipboard.writeText(window.location.href);

    toast('berhasil copy ke clipboard', {
      type: 'info',
      autoClose: 1500,
      position: 'bottom-center',
    });
  }

  return (
    <div className='container mx-auto'>
      <Head>
        <meta property='og:title' content={`Toddler Nutrition Calculator | ${data.title}`} />
        <meta name='description' content={data.title} />
        <meta property='og:description' content={data.title} />
      </Head>

      <div className='title space-y-5'>
        <h1 className='text-2xl font-bold md:text-4xl'>{data.title}</h1>
        <p className='text-paragraph text-base font-semibold leading-relaxed md:w-[90%] xl:w-[70%]'>{data.headline}</p>

        <div className='flex flex-row space-x-3'>
          <SocialMediaBtn className='bg-gray-400' title='Copy ke Clipboard' Icon={FaClipboard} onClick={() => copyToClipboard()} />

          <SocialMediaBtn className='bg-green-500' title='Bagikan ke Whatsapp' Icon={FaWhatsapp} onClick={() => window.open(`https://wa.me/?text=Cek resep dan artikel untuk balita disini %0a${encodeURIComponent(window.location.href)}`)} />

          <SocialMediaBtn className='bg-blue-500' title='Bagikan ke Facebook' Icon={FaFacebook} onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`)} />

          <SocialMediaBtn
            className='bg-blue-400'
            title='Bagikan ke Twitter'
            Icon={FaTwitter}
            onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=Cek resep dan artikel untuk balita disini`)}
          />
        </div>
      </div>

      <div className='mt-8 flex flex-col space-y-12 lg:flex-row lg:space-x-10 lg:space-y-0'>
        <div className='space-y-6 lg:w-[60%]'>
          {props.data.imageUrl ? (
            <div className={`relative flex min-h-[250px] w-full items-center justify-center rounded-md bg-gray-200 md:min-h-[300px]`}>
              <Image alt={`Foto ${props.data.title}`} title={`Foto ${props.data.title}`} src={props.data.imageUrl} priority={true} width={800} height={300} className='w-full rounded-md object-scale-down' />
            </div>
          ) : (
            <div className='mb-10 h-[300px] w-full rounded-md bg-gray-400'></div>
          )}
          {props.children}
        </div>

        <div className='right-0 h-fit space-y-7 lg:sticky lg:top-[80px] lg:w-[40%]'>
          {props.recomendations.map((recomendation, k) => (
            <div key={k} className='space-y-2 rounded-md border border-gray-200 p-6'>
              <Link href={`${props.baseUrl}/${recomendation.title}`}>
                <h2 className='hover:text-primary-2 line-clamp-2 text-xl font-bold duration-500'>{recomendation.title}</h2>
              </Link>
              <p className='text-paragraph line-clamp-2 md:pr-5 '>{recomendation.headline}</p>
              <Link href={`${props.baseUrl}/${recomendation.title}`} className='text-paragraph hover:text-primary-2 flex items-center gap-x-2 duration-500'>
                Baca Lebih Banyak <FaArrowRight />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticleLayout;
