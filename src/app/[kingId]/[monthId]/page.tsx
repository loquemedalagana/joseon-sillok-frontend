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
  // 1. 모든 kingId 가져오기
  const landingRes = await fetch(SILLOK_LANDING_URL);
  if (!landingRes.ok) {
    throw new Error(`HTTP error! status: ${landingRes.status}`);
  }
  const landingHtml = await landingRes.text();
  const kingInfo = extractKingBasicInfo(landingHtml);
  const kingIds = Object.keys(kingInfo);

  // 2. kingId별로 월(month) 데이터 가져와서 monthId 추출
  const allParams = [];
  for (const kingId of kingIds) {
    const res = await fetch(
      `${SILLOK_SEARCH_BASE_URL}/inspectionMonthList.do?id=${kingId}`,
    );
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const html = await res.text();

    // yearData를 파싱하여 각 연도에 해당하는 monthId 추출
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

  console.log('kingId: ', kingId.substring(1, 2));

  const html = await response.text();
  const kingKey = kingId.substring(1, 2) as keyof typeof kingNameMap;
  const kingTitle = kingNameMap[kingKey];

  const yearMonthCode = monthId.replace(`${kingId}_1`, '');
  const yearTitle = parseInt(yearMonthCode.substring(0, 2), 10);
  const monthTitle = parseInt(yearMonthCode.substring(2, 4), 10);

  const articleList = parseKingMonthData(html, monthId);

  const pageTitle = `${kingTitle} ${yearTitle || '즉위'}년 ${monthTitle}월`;

  return (
    <div>
      <h1>{pageTitle}</h1>
      <ul>
        {articleList.map((article) => (
          <li key={article.id}>
            <Link href={`/${kingId}/${monthId}?id=${article.id}`}>
              {article.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
