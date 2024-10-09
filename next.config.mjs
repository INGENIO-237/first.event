/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        // domains:['',''],
        remotePatterns: [
          {
            protocol: 'http',
            hostname: 'localhost',
            port: '3000',
            pathname: '',
          },
          {
            protocol: 'https',
            hostname: 'images.unsplash.com',
            port: '',
            pathname: '',
          },
          {
            protocol: 'https',
            hostname: 'plus.unsplash.com',
            port: '',
            pathname: '',
          },
        ],
      },
};

export default nextConfig;
