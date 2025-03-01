import {
  SILLOK_LANDING_URL,
  SILLOK_SEARCH_BASE_URL,
} from '@/constants/endpoints';
import { kingNameMap } from '@/constants/kings';
import { parseKingYearData } from '@/utils/parseKingYearData';
import { extractKingBasicInfo } from '@/utils/extractKingBasicInfo';
import { parseKingMonthData } from '@/utils/parseKingMonthData';
import Link from 'next/link';

export async function generateStaticParams() {
  const landingRes = await fetch(SILLOK_LANDING_URL);
  if (!landingRes.ok) {
    throw new Error(`HTTP error! status: ${landingRes.status}`);
  }
  const landingHtml = await landingRes.text();
  const kingInfo = extractKingBasicInfo(landingHtml);
  const kingIds = Object.keys(kingInfo);

  const allParams = [];
  for (const kingId of kingIds) {
    const res = await fetch(
      `${SILLOK_SEARCH_BASE_URL}/inspectionMonthList.do?id=${kingId}`,
    );
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const html = await res.text();
    const yearData = parseKingYearData(html, kingId);

    for (const year of yearData) {
      for (const month of year.months) {
        allParams.push({
          kingId,
          monthId: month.id,
        });
      }
    }
  }

  return allParams;
}

interface MonthDetailPageProps {
  params: Promise<{
    monthId: string;
    kingId: string;
  }>;
}

export default async function MonthDetailPage({
  params,
}: MonthDetailPageProps) {
  const { monthId, kingId } = await params;

  const response = await fetch(
    `${SILLOK_SEARCH_BASE_URL}/inspectionDayList.do?id=${monthId}`,
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const html = await response.text();
  const kingKey = kingId.substring(1, 2) as keyof typeof kingNameMap;
  const kingTitle = kingNameMap[kingKey];

  const yearMonthCode = monthId.replace(`${kingId}_1`, '');
  const yearTitle = parseInt(yearMonthCode.substring(0, 2), 10);
  const monthTitle = parseInt(yearMonthCode.substring(2, 4), 10);

  const articleList = parseKingMonthData(html, monthId);
  const pageTitle = `${kingTitle} ${yearTitle || '즉위'}년 ${monthTitle}월`;

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 md:p-8 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 border-b pb-2 dark:border-gray-700">
        {pageTitle}
      </h1>
      <ul className="space-y-3">
        {articleList.map((article) => (
          <li
            key={article.id}
            className="border-b pb-2 last:border-b-0 dark:border-gray-700"
          >
            <Link
              href={`/${kingId}/${monthId}?id=${article.id}`}
              className="text-blue-600 dark:text-blue-400 hover:underline block p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {article.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
