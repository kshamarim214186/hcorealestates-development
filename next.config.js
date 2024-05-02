/** @type {import('next').NextConfig} */
const nextConfig = {
   distDir: "build",
   output: "export"
};
module.exports = nextConfig;

const path = require("path");
module.exports = {
   env: {
      API_URL: 'https://www.api.hcorealestates.org/',
      token1: 'test',
      token2: 'test1',
   },
   async redirects() {
      return [
         {
           source: '/sublocation/:id/:url',
           destination: '/properties',
           permanent: true,
         },
         {
           source: '/project/:url/floor-plan',
           destination: '/project/:url',
           permanent: true,
         },
         {
           source: '/project/:url/specifications',
           destination: '/project/:url',
           permanent: true,
         },
         {
           source: '/project/:url/price-list',
           destination: '/project/:url',
           permanent: true,
         },
         {
           source: '/project/:url/location-map',
           destination: '/project/:url',
           permanent: true,
         },
         {
           source: '/project/:url/master-plan',
           destination: '/project/:url',
           permanent: true,
         },
         {
           source: '/project/:url/site-plan',
           destination: '/project/:url',
           permanent: true,
         },
         {
           source: '/project/:url/elevation-images',
           destination: '/project/:url',
           permanent: true,
         },
         {
           source: '/project/:url/project-walkthrough',
           destination: '/project/:url',
           permanent: true,
         },
         {
           source: '/project/:url/construction-images',
           destination: '/project/:url',
           permanent: true,
         },
      ];
   },
   images: {
      remotePatterns: [
         {
           protocol: 'https',
           hostname: '*.hcorealestates.org',
           port: '',
           pathname: '/img/**',
         },
      ],
   },
};
