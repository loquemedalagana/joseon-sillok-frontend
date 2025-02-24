import Link from 'next/link';
import { extractKingBasicInfo } from '@/utils/extractKingBasicInfo';
import { SILLOK_LANDING_URL } from '@/constants/endpoints';

export default async function Home() {
  const response = await fetch(SILLOK_LANDING_URL);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const html = await response.text();
  const kings = extractKingBasicInfo(html);

  return (
    <div className="grid min-h-screen items-center justify-items-center p-8 sm:p-20 gap-16 text-gray-800 dark:text-gray-200">
      <main className="flex flex-col gap-8 items-center w-full max-w-3xl">
        <h2 className="text-2xl font-bold">조선의 군왕들</h2>
        <ol className="list-decimal list-inside space-y-4">
          {Object.entries(kings).map(([id, name]) => (
            <li key={id}>
              <Link
                href={`/${id}`}
                className="text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-800 dark:hover:text-blue-200 transition-colors"
              >
                {name}
              </Link>
            </li>
          ))}
        </ol>
      </main>
    </div>
  );
}
