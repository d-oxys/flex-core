import Layout from '@/components/rootLayout';
import ResepComp from '@/components/resep';
import React from 'react';

const Resep = () => {
  return (
    <Layout>
      <div className='bg-white'>
        <ResepComp />
      </div>
    </Layout>
  );
};

export default Resep;
