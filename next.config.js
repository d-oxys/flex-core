/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'genbest.id',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'www.prenagen.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'blue.kumparan.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'img-global.cpcdn.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'd1sag4ddilekf6.cloudfront.net',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'img.herstory.co.id',
        pathname: '**',
      },
    ],
  },
  // ...
};
