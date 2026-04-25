/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.mm.bing.net", // Wildcard ini akan menangkap tse1, tse2, tse3, tse4, dst.
        port: "",
        pathname: "/th/id/**",     // Mengizinkan akses ke semua gambar di path tersebut
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/a/**",         // Mengizinkan akses ke semua gambar di path tersebut
      }
    ],
  },
}

module.exports = nextConfig