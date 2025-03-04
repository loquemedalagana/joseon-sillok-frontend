import { Metadata } from 'next';
import { promises as fs } from 'fs';
import Link from 'next/link';
import path from 'path';

import { kingNameMap } from '@/constants/kings';
import { kingIdentifierList } from '@/constants/kings';

type KingMonthParams = { kingId: string; monthId: string };

export async function generateStaticParams() {
  const kingIds = kingIdentifierList;
  const allParams: KingMonthParams[] = [];

  for (const kingId of kingIds) {
    const fileName = `w${kingId.slice(1)}_monthIds.json`;
    const filePath = path.join(process.cwd(), 'src/data/json/months', fileName);

    try {
      const fileContent = await fs.readFile(filePath, 'utf-8');
      const monthIds: string[] = JSON.parse(fileContent);

      // JSON 배열에서 "waa_1"로 시작하는 값만 필터링
      const matchingMonthIds = monthIds.filter((monthId) =>
        monthId.startsWith(`w${kingId.slice(1)}_1`),
      );

      for (const monthId of matchingMonthIds) {
        // 변환 규칙: monthId의 첫 글자가 w에서 k로 변경
        const transformedMonthId = monthId.replace(/^w/, 'k');
        allParams.push({ kingId, monthId: transformedMonthId });
      }
    } catch (error) {
      console.error(`Error reading file ${fileName}:`, error);
      // 파일이 없거나 읽기 실패 시 추가 처리가 필요하다면 여기에 구현
    }
  }

  return allParams;
}

type ArticleTitle = {
  id: string;
  mainTitle: string;
  date: string;
};

interface MonthDetailPageProps {
  params: Promise<KingMonthParams>;
}

export async function generateMetadata({
  params,
}: MonthDetailPageProps): Promise<Metadata> {
  const { monthId, kingId } = await params;

  const kingKey = kingId.substring(1, 2) as keyof typeof kingNameMap;
  const kingTitle = kingNameMap[kingKey];

  const yearMonthCode = monthId.replace(`${kingId}_1`, '');
  const yearTitle = parseInt(yearMonthCode.substring(0, 2), 10);
  const monthTitle = parseInt(yearMonthCode.substring(2, 4), 10);
  const isLeapMonth = parseInt(yearMonthCode.substring(4, 5), 10);

  const pageTitle = `${kingTitle} ${yearTitle || '즉위'}년 ${isLeapMonth ? '윤' : ''}${monthTitle}월`;

  if (monthId.includes('ja_11002')) {
    return {
      title: pageTitle,
      description: '연산군 외모 묘사',
      keywords: [
        pageTitle,
        '연산군',
        '연산군 외모',
        '외모',
        '연산군 외모 묘사',
        '김수명',
      ],
    };
  }

  return {
    title: pageTitle,
    description: pageTitle,
  };
}

export default async function MonthDetailPage({
  params,
}: MonthDetailPageProps) {
  const { monthId, kingId } = await params;

  const fileName = `w${monthId.slice(1, 7)}_titles.json`;
  const filePath = path.join(
    process.cwd(),
    `src/data/json/titles/w${kingId.slice(1)}`,
    fileName,
  );
  const fileContent = await fs.readFile(filePath, 'utf-8');
  const titleList: ArticleTitle[] = JSON.parse(fileContent);

  const kingKey = kingId.substring(1, 2) as keyof typeof kingNameMap;
  const kingTitle = kingNameMap[kingKey];

  const yearMonthCode = monthId.replace(`${kingId}_1`, '');
  const yearTitle = parseInt(yearMonthCode.substring(0, 2), 10);
  const monthTitle = parseInt(yearMonthCode.substring(2, 4), 10);
  const isLeapMonth = parseInt(yearMonthCode.substring(4, 5), 10);

  const pageTitle = `${kingTitle} ${yearTitle || '즉위'}년 ${isLeapMonth ? '윤' : ''}${monthTitle}월`;

  // const articleList = parseKingMonthData(html, monthId);

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 md:p-8 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 border-b pb-2 dark:border-gray-700">
        {pageTitle}
      </h1>
      <ul className="space-y-3">
        {titleList
          .filter((article) => article.id.includes(monthId.substring(1)))
          .map((article) => (
            <li
              key={article.id}
              className="border-b pb-2 last:border-b-0 dark:border-gray-700"
            >
              <Link
                href={`/${kingId}/${monthId}?id=k${article.id.slice(1)}`}
                className="text-blue-600 dark:text-blue-400 hover:underline block p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {article.mainTitle}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
