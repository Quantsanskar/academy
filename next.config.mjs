/** @type {import('next').NextConfig} */
const nextConfig = {
    rewrites: async () => [
        {
            source: "/public/myfile.html",
            destination: "/pages/api/myfile.js",
        },
    ],
};

export default nextConfig;
