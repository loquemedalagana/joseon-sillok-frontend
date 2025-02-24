import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Static Export 활성화 (SSG)
  assetPrefix: process.env.GITHUB_PAGES ? '/joseon-sillok-frontend/' : '', // GitHub Pages 경로 설정
  images: {
    unoptimized: true, // 이미지 최적화 비활성화 (정적 사이트)
  },
};

export default nextConfig;
