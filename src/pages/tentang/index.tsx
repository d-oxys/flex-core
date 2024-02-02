'use client';

import { teams } from '@/helpers/content';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '@/components/rootLayout';
import { RiInstagramLine, RiGithubFill, RiLinkedinBoxFill } from 'react-icons/ri';
import { motion } from 'framer-motion';

export default function Page() {
  return (
    <Layout>
      <section className='font-poppins'>
        <div className=''>
          <motion.div
            className='border-b bg-white py-10'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              ease: 'easeInOut',
              duration: 0.5,
            }}
          >
            <div className='mx-auto flex max-w-6xl flex-col items-center px-4'>
              <h1 className='text-2xl font-bold'>Tentang Flex Force</h1>
              <div className='bg-primary mt-2 h-[2px] w-28'></div>
              <p className='mt-8 max-w-5xl text-center '>
                FlexForce adalah aplikasi kebugaran yang membantu user mencapai target kebugaran mereka dengan alat, motivasi, dan dukungan. Aplikasi ini memungkinkan pengguna merencanakan makanan, menghitung kalori, melacak aktivitas
                fisik, dan memantau kemajuan. Fitur uniknya adalah fokus pada kolaborasi antar pengguna melalui komunitas dan dukungan saling berbagi, menciptakan semangat tim yang kuat dalam perjalanan kebugaran.
              </p>
            </div>
          </motion.div>

          <div className='mx-auto mt-12 max-w-6xl px-4 '>
            <motion.div
              className='flex flex-col items-center'
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                ease: 'easeInOut',
                duration: 0.5,
              }}
            >
              <h1 className='text-center text-2xl font-bold'>Berkenalan dengan Tim Kami</h1>
              <div className='bg-primary mt-2 h-[2px] w-28'></div>
              <p className='mb-10 mt-4 max-w-5xl text-center'>Salah satu alasan FlexForce dibuat adalah sebagai project UAS Desain Kreatif Aplikasi dan Game, adalah Tim Kami.</p>
            </motion.div>
            <div className='mb-16 mt-10'>
              <ul className='mx-auto grid grid-cols-1 gap-16 md:max-w-3xl lg:max-w-6xl lg:grid-cols-2'>
                {teams.map((team, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      ease: 'easeInOut',
                      duration: 0.5,
                      y: { duration: 0.5 },
                    }}
                    className='flex flex-col items-center gap-6 border-b pb-5 text-center sm:items-start sm:text-left md:flex-row lg:border-none'
                  >
                    <div>
                      <Image src={team.imageUrl} width={200} height={200} alt={team.name} className='h-52 rounded-xl object-cover object-top' />
                    </div>
                    <div>
                      <div>
                        <h4 className='text-xl font-bold'>{team.name}</h4>
                        <p className=' text-zinc-400'>{team.role}</p>
                      </div>
                      <p className='mt-4 text-lg font-medium'>{team.univesity}</p>
                      <div className='mt-4 flex justify-center gap-3 sm:justify-start'>
                        <Link href={team.socialMedia.linkedin} target='_blank' className='text-2xl text-zinc-600 hover:text-blue-900'>
                          <RiLinkedinBoxFill />
                        </Link>
                        <Link href={team.socialMedia.instagram} target='_blank' className='text-2xl text-zinc-600 hover:text-red-600'>
                          <RiInstagramLine />
                        </Link>
                        <Link href={team.socialMedia.github} target='_blank' className='text-2xl text-zinc-600 hover:text-black'>
                          <RiGithubFill />
                        </Link>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
