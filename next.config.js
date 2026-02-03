/** @type {import('next').NextConfig} */
const nextConfig = {
   distDir: "build",
   output: "export"
};
module.exports = nextConfig;

const path = require("path");
module.exports = {
  env: {
      API_URL: 'https://www.api.hcorealestates.com/',
      token1: 'test',
      token2: 'test1',
  },
  async headers() {
    return [
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
   async redirects() {
      return [
         {
           source: '/sublocation/:id/:url',
           destination: '/project',
           permanent: true,
           statusCode: 301,
         },
         {
           source: '/project/:url/floor-plan',
           destination: '/project/:url',
           permanent: true,
           statusCode: 301,
         },
         {
           source: '/project/:url/specifications',
           destination: '/project/:url',
           permanent: true,
           statusCode: 301,
         },
         {
           source: '/project/:url/price-list',
           destination: '/project/:url',
           permanent: true,
           statusCode: 301,
         },
         {
           source: '/project/:url/location-map',
           destination: '/project/:url',
           permanent: true,
           statusCode: 301,
         },
         {
           source: '/project/:url/master-plan',
           destination: '/project/:url',
           permanent: true,
           statusCode: 301,
         },
         {
           source: '/project/:url/site-plan',
           destination: '/project/:url',
           permanent: true,
           statusCode: 301,
         },
         {
           source: '/project/:url/key-plan',
           destination: '/project/:url',
           permanent: true,
           statusCode: 301,
         },
         {
           source: '/project/:url/elevation-images',
           destination: '/project/:url',
           permanent: true,
           statusCode: 301,
         },
         {
           source: '/project/:url/project-walkthrough',
           destination: '/project/:url',
           permanent: true,
           statusCode: 301,
         },
         {
           source: '/project/:url/construction-images',
           destination: '/project/:url',
           permanent: true,
           statusCode: 301,
         },
         {
           source: '/project/:url/elevation-images-floors',
           destination: '/project/:url',
           permanent: true,
           statusCode: 301,
         },
         {
           source: '/project/vfg',
           destination: 'https://www.hcorealestates.com',
           permanent: true,
           statusCode: 301,
         },
         {
           source: '/project/tata-arabella-sohna',
           destination: 'https://www.hcorealestates.com',
           permanent: true,
           statusCode: 301,
         },
         {
           source: '/project/tata-primanti-garden-estate-gurgaon',
           destination: 'https://www.hcorealestates.com',
           permanent: true,
           statusCode: 301,
         },
         {
           source: '/project/tata-rivage-goa',
           destination: 'https://www.hcorealestates.com',
           permanent: true,
           statusCode: 301,
         },
         {
           source: '/project/ireo-nuspark-sohna',
           destination: 'https://www.hcorealestates.com',
           permanent: true,
           statusCode: 301,
         },
         {
           source: '/project/tata-raisina-gurgaon',
           destination: 'https://www.hcorealestates.com',
           permanent: true,
           statusCode: 301,
         },
         {
           source: '/project/godrej-the-trees-phase-2',
           destination: 'https://www.hcorealestates.com',
           permanent: true,
           statusCode: 301,
         },
         {
           source: '/project/tata-myst-cliffside-kasauli',
           destination: 'https://www.hcorealestates.com',
           permanent: true,
           statusCode: 301,
         },
         {
           source: '/:url*.htm',
           destination: 'https://www.hcorealestates.com',
           permanent: true,
           statusCode: 301,
         },
         {
           source: '/post/category/godrej-miraya-gurgaon',
           destination: '/project/godrej-miraya-gurgaon',
           permanent: true,
           statusCode: 301,
         },
         {
           source: '/post/godrej-miraya-gurgaon',
           destination: '/project/godrej-miraya-gurgaon',
           permanent: true,
           statusCode: 301,
         },
      ];
   },
   images: {
      remotePatterns: [
         {
           protocol: 'https',
           hostname: '*.hcorealestates.com',
           port: '',
           pathname: '/img/**',
         },
      ],
   },
};
