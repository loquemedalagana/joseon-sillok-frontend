import {
  SILLOK_SEARCH_BASE_URL,
  SILLOK_LANDING_URL,
} from '@/constants/endpoints';
import { parseKingYearData } from '@/utils/parseKingYearData';
import {
  extractKingBasicInfo,
  extractKingTitle,
} from '@/utils/extractKingBasicInfo';
import { kingIdentifierList } from '@/constants/kings';
import { Metadata } from 'next';
import Link from 'next/link';

export async function generateStaticParams() {
  return kingIdentifierList.map((kingId) => ({
    kingId,
  }));
}

// ✅ generateMetadata - 동적으로 메타데이터 생성
export async function generateMetadata({
  params,
}: {
  params: Promise<{ kingId: string }>;
}): Promise<Metadata> {
  const { kingId } = await params; // ❗ Next.js 15에서는 비동기 사용
  const response = await fetch(SILLOK_LANDING_URL);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const html = await response.text();
  const kingInfo = extractKingBasicInfo(html);

  const kingTitle = kingInfo[kingId] || null;

  return {
    title: kingTitle
      ? `조선왕조실록 - ${kingTitle}`
      : '조선왕조실록 상세 페이지',
    description: kingTitle
      ? `${kingTitle}의 상세 기록입니다.`
      : '조선왕조실록에 대한 기록 페이지입니다.',
  };
}

// ✅ 명확한 타입 정의
interface KingDetailPageProps {
  params: Promise<{
    kingId: string;
  }>;
}

// ✅ 페이지 컴포넌트
export default async function Page({ params }: KingDetailPageProps) {
  const { kingId } = await params; // ✅ 비동기로 처리
  const response = await fetch(
    `${SILLOK_SEARCH_BASE_URL}/inspectionMonthList.do?id=${kingId}`,
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const html = await response.text();
  const kingTitle = await extractKingTitle(html, kingId);
  const yearData = parseKingYearData(html, kingId);

  return (
    <div className="min-h-screen p-8 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <h1 className="text-3xl font-bold mb-6">{kingTitle} 상세 기록</h1>
      {yearData.length === 0 ? (
        <div className="text-center text-lg text-gray-500 dark:text-gray-400">
          데이터를 찾을 수 없습니다.
        </div>
      ) : (
        yearData.map((year) => (
          <section key={year.year} className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">
              {year.title} - {year.year}년
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
              {year.months.map((month) => (
                <Link
                  key={month.id}
                  href={`${kingId}/${month.id}`}
                  className="p-2 bg-blue-100 dark:bg-blue-800 text-center rounded shadow hover:bg-blue-200 dark:hover:bg-blue-700 transition"
                >
                  {month.title}
                </Link>
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
