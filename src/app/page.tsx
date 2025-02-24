import Link from 'next/link';
import { extractKingBasicInfo } from '@/utils/extractKingBasicInfo';
import { SILLOK_LANDING_URL } from '@/constants/endpoints';

export default async function Home() {
  const response = await fetch(SILLOK_LANDING_URL);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const html = await response.text();
  const kings = extractKingBasicInfo(html); // { koa: "광해군중초본(1608년~)", kob: "광해군정초본(1608년~)" }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]  text-gray-800 dark:text-gray-200">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-mono">
          {Object.entries(kings).map(([id, name]) => (
            <li key={id} className="mb-2">
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
