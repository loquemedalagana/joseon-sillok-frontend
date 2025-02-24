import { NextConfig } from 'next';

const isGitHubPages = process.env.GITHUB_PAGES === 'true';

const nextConfig: NextConfig = {
  output: 'export', // Static Export 설정
  assetPrefix: isGitHubPages ? '/joseon-sillok-frontend/' : '',
  basePath: isGitHubPages ? '/joseon-sillok-frontend' : '', // GitHub Pages 경로 설정
  images: {
    unoptimized: true, // 이미지 최적화 비활성화
  },
};

export default nextConfig;
