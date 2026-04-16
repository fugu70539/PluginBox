/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  /* Если будешь использовать картинки с внешних ресурсов, добавь их домены сюда */
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
