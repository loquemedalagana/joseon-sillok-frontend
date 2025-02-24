import { SILLOK_SEARCH_BASE_URL } from '@/constants/endpoints';
import { parseKingYearData } from '@/utils/parseKingYearData';
import { generateMetadata } from '@/utils/extractKingBasicInfo';

export { generateMetadata };

interface KingDetailPageProps {
  params: {
    kingId: string;
  };
}

export default async function Page({ params }: KingDetailPageProps) {
  const { kingId } = await params;
  const response = await fetch(`${SILLOK_SEARCH_BASE_URL}?id=${kingId}`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const html = await response.text();
  const yearData = parseKingYearData(html, kingId);

  return (
    <div className="min-h-screen p-8 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <h1 className="text-3xl font-bold mb-6">상세 기록</h1>
      {yearData.length === 0 ? (
        <div className="text-center text-lg text-gray-500 dark:text-gray-400">
          데이터를 찾을 수 없습니다.
        </div>
      ) : (
        yearData.map((year) => (
          <div key={year.year} className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">
              {year.title} - {year.year}년
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
              {year.months.map((month) => (
                <div
                  key={month.id}
                  className="p-2 bg-blue-100 dark:bg-blue-800 text-center rounded shadow hover:bg-blue-200 dark:hover:bg-blue-700 transition"
                >
                  <a href={`#${month.id}`} className="text-sm font-medium">
                    {month.title}
                  </a>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
