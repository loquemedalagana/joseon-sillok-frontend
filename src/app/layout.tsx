import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
      >
        <div className="flex flex-col min-h-screen">
          {/* 헤더 */}
          <header className="h-20 flex items-center justify-center bg-white dark:bg-gray-800 shadow-md">
            <h1 className="text-xl font-bold">조선왕조실록</h1>
          </header>

          {/* Main Content */}
          <div className="flex-1 flex justify-center items-start w-full">
            {children}
          </div>

          {/* 푸터 */}
          <footer className="h-20 flex gap-6 flex-wrap items-center justify-center bg-white dark:bg-gray-800 mt-8">
            <div className="text-center">
              <p>
                © {new Date().getFullYear()} Image Insight by SWK. All rights
                reserved.
              </p>
            </div>
            <a
              className="flex items-center gap-2 hover:underline hover:underline-offset-4"
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
