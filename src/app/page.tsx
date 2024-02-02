import Layout from '@/components/rootLayout';
import LandingPage from '@/components/landingPage';
import React from 'react';

const Home = () => {
  return (
    <Layout>
      <div className='bg-white'>
        <LandingPage />
      </div>
    </Layout>
  );
};

export default Home;
