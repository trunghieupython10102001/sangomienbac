import { getContent } from './blob-storage';
import { categories as staticCategories, type Category } from './products';
import { newsArticles as staticNews, type NewsArticle } from './news';
import {
  defaultSiteSettings,
  defaultBestSellers,
  defaultMediaItems,
  defaultAboutContent,
  type SiteSettings,
  type BestSeller,
  type MediaItem,
  type AboutContent,
} from './default-data';

export async function getSiteSettings(): Promise<SiteSettings> {
  const data = await getContent<SiteSettings>('site-settings');
  return data ?? defaultSiteSettings;
}

export async function getProducts(): Promise<Category[]> {
  const data = await getContent<Category[]>('products');
  return data ?? staticCategories;
}

export async function getBestSellers(): Promise<BestSeller[]> {
  const data = await getContent<BestSeller[]>('best-sellers');
  return data ?? defaultBestSellers;
}

export async function getNewsArticles(): Promise<NewsArticle[]> {
  const data = await getContent<NewsArticle[]>('news');
  return data ?? staticNews;
}

export async function getMediaItems(): Promise<MediaItem[]> {
  const data = await getContent<MediaItem[]>('media');
  return data ?? defaultMediaItems;
}

export async function getAboutContent(): Promise<AboutContent> {
  const data = await getContent<AboutContent>('about');
  return data ?? defaultAboutContent;
}
