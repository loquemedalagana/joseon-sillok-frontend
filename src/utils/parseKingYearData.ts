import * as cheerio from "cheerio";

interface MonthData {
  id: string;
  title: string;
  month: number | string;
}

interface YearData {
  year: string;
  title: string;
  months: MonthData[];
}

export function parseKingYearData(html: string, kingId: string): YearData[] {
  const $ = cheerio.load(html);
  const yearData: YearData[] = [];

  // 각 연도를 나타내는 리스트 요소 순회
  $("ul.king_year2 li").each((_, element) => {
    const yearElement = $(element).find("div").first();
    const title = yearElement.text().split("(")[0].trim(); // 예: 광해 1년
    const yearMatch = yearElement.find("span.king_desc02").text().match(/(\d{4})년/);
    const year = yearMatch ? yearMatch[1] : "";

    if (!year) return;

    const months: MonthData[] = [];
    $(element)
      .find("ul li a")
      .each((_, monthElement) => {
        const monthText = $(monthElement).text().trim(); // 예: 1월, 윤3월
        const href = $(monthElement).attr("href");
        const idMatch = href ? href.match(/search\('(.+?)'/) : null;
        const monthId = idMatch ? idMatch[1] : "";

        if (!monthText || !monthId) return; // 유효하지 않은 월 정보 제거

        const numericMonth = monthText.includes("윤")
          ? monthText // 윤달은 그대로 저장
          : parseInt(monthText.replace("월", ""), 10);

        months.push({
          id: `${kingId}_${monthId.replace(`${kingId}_`, "")}`,
          title: monthText,
          month: numericMonth,
        });
      });

    // 월 정보가 없는 경우 해당 연도도 제외
    if (months.length === 0) return;

    yearData.push({
      year,
      title,
      months,
    });
  });

  return yearData;
}
