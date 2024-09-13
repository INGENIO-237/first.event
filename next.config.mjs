/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains:['images.unsplash.com','plus.unsplash.com'],
        remotePatterns: [
          {
            protocol: 'http',
            hostname: 'localhost',
            port: '3000',
            pathname: '',
          },
        ],
      },
};

export default nextConfig;
