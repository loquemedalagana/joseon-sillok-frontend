import * as cheerio from 'cheerio';

interface ArticleTitle {
  id: string;
  title: string;
}

interface ParsedHeader {
  kingTitle: string; // 예: "광해군일기[중초본]"
  yearTitle: string; // 예: "광해 즉위년"
  monthTitle: string; // 예: "광해 즉위년 3월"
}

export const parseKingMonthData = (html: string, monthId: string) => {
  const $ = cheerio.load(html);
  const articles: ArticleTitle[] = [];

  console.log('monthId', monthId);

  // 원하는 영역을 찾아 li 태그에 있는 a 태그를 순회
  $('dl.ins_list_main dd ul li a').each((_, element) => {
    const href = $(element).attr('href');
    // 예: href = "javascript:searchView('koa_10003001_002');"
    // 아래 정규식으로 'koa_10003001_002' 부분 추출
    const match = href?.match(/searchView\('([^']+)'\)/);
    const id = match ? match[1] : '';
    const title = $(element).text().trim();

    if (id && title) {
      articles.push({
        id,
        title,
      });
    }
  });

  return articles;
};

/**
 * ul/li/a 태그 중
 *  - inspectionMonthList.do?id= ~ 으로 시작하는 링크 -> [0]: 왕명, [1]: "광해 즉위년"
 *  - inspectionDayList.do?id= ~ 에 loc_thispage 클래스로 되어있는 li 태그 -> "광해 즉위년 3월"
 */
export function parseKingMonthHeader(
  html: string,
  kingId: string, // 예: "kna"
  monthId: string, // 예: "kna_102090"
): ParsedHeader {
  const $ = cheerio.load(html);

  // location 영역만 먼저 잡기
  const locUl = $('ul.location');

  // "/search/inspectionMonthList.do?id=kna" 로 된 링크 2개를 찾는다
  const monthListAnchors = locUl.find(
    `a[href="/search/inspectionMonthList.do?id=${kingId}"]`,
  );

  // 첫 번째 anchor 텍스트 → "선조실록"
  const kingTitle = monthListAnchors.eq(0).text().trim();
  // 두 번째 anchor 텍스트 → "선조 2년"
  const yearTitle = monthListAnchors.eq(1).text().trim();

  // loc_thispage + "/search/inspectionDayList.do?id=kna_102090" → "선조 2년 9월"
  const dayListAnchor = locUl.find(
    `li.loc_thispage a[href="/search/inspectionDayList.do?id=${monthId}"]`,
  );
  const monthTitle = dayListAnchor.text().trim();

  console.log(monthTitle, 'res', html.length);

  return { kingTitle, yearTitle, monthTitle };
}
