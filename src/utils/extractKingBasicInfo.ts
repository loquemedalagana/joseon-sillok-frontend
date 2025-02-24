import * as cheerio from 'cheerio';
import { Metadata } from 'next';
import {
  SILLOK_LANDING_URL,
  SILLOK_SEARCH_BASE_URL,
} from '@/constants/endpoints';

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

export async function generateStaticParams() {
  const response = await fetch(SILLOK_LANDING_URL);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const html = await response.text();
  const kingIds = Object.keys(extractKingBasicInfo(html)); // { koa: "광해군중초본", kob: "광해군정초본" }

  return kingIds.map((kingId) => ({
    kingId,
  }));
}

export async function extractKingTitle(
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
