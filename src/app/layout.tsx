import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import { URL_HOME } from '@/constants/routes';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '조선왕조실록',
  description: '모바일에 최적화된 조선왕조실록',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
      >
        <div className="flex flex-col min-h-screen">
          {/* 헤더 */}
          <header className="h-16 sm:h-20 flex items-center justify-between px-6 sm:px-10 bg-white dark:bg-gray-800 shadow-md fixed w-full z-10">
            <Link href={URL_HOME}>
              <h1 className="text-lg sm:text-xl font-bold hover:underline">
                조선왕조실록
              </h1>
            </Link>
            <nav className="hidden sm:flex gap-4">
              <Link href="/about" className="hover:underline">
                소개
              </Link>
              <Link href="/contact" className="hover:underline">
                문의
              </Link>
            </nav>
          </header>

          {/* Main Content */}
          <main className="flex-1 flex justify-center items-start w-full pt-20 sm:pt-24 px-4 sm:px-6">
            {children}
          </main>

          {/* 푸터 */}
          <footer className="h-16 sm:h-20 flex flex-col sm:flex-row gap-4 items-center justify-between px-6 sm:px-10 bg-white dark:bg-gray-800 shadow-inner mt-8">
            <p className="text-sm">
              © {new Date().getFullYear()} Image Insight by SWK. All rights
              reserved.
            </p>
            <a
              className="flex items-center gap-2 hover:underline"
              href="https://github.com/loquemedalagana/joseon-sillok-frontend"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Repository
            </a>
          </footer>
        </div>
      </body>
    </html>
  );
}
