import * as cheerio from 'cheerio';
import { Metadata } from 'next';
import { SILLOK_SEARCH_BASE_URL } from '@/constants/endpoints';

export const extractKingBasicInfo = (html: string) => {
  const $ = cheerio.load(html);
  const result: Record<string, string> = {};

  $('a[href^="javascript:search"]').each((_, element) => {
    const href = $(element).attr('href');
    const text = $(element).text().trim();

    if (href) {
      // `koa`, `kob` 등 ID 추출
      const match = href.match(/search\('(.+?)'\)/);
      if (match) {
        const id = match[1];
        result[id] = text;
      }
    }
  });

  return result;
};

async function extractKingTitle(
  html: string,
  kingId: string,
): Promise<string | null> {
  const $ = cheerio.load(html);

  const kingElement = $(`li#${kingId} a[title]`);
  if (kingElement.length > 0) {
    return kingElement.attr('title') || null;
  }

  return null;
}

export async function generateMetadata({
  params,
}: {
  params: {
    kingId: string;
  };
}): Promise<Metadata> {
  const { kingId } = await params;
  const response = await fetch(`${SILLOK_SEARCH_BASE_URL}?id=${kingId}`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const html = await response.text();
  const kingTitle = await extractKingTitle(html, kingId);

  return {
    title: kingTitle
      ? `조선왕조실록 - ${kingTitle}`
      : '조선왕조실록 - 상세 페이지',
    description: kingTitle
      ? `${kingTitle}에 대한 상세 기록입니다.`
      : '조선왕조실록의 상세 기록 페이지입니다.',
  };
}
