import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.resolve.modules.push(path.resolve(process.cwd(), 'node_modules_external'));
        return config;
    },
};

export default nextConfig;
