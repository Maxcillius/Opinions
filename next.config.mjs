/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: [process.env.AWS_DOMAIN_NAME],
      },
};

export default nextConfig;
