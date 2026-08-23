import { getContent } from './s3-storage';
import { categories as staticCategories, type Category } from './products';
import { newsArticles as staticNews, type NewsArticle } from './news';
import {
  defaultSiteSettings,
  defaultBestSellers,
  defaultMediaItems,
  defaultAboutContent,
  defaultProductGroups,
  defaultFooterContent,
  defaultHomeHero,
  type SiteSettings,
  type BestSeller,
  type MediaItem,
  type AboutContent,
  type ProductGroup,
  type FooterContent,
  type HomeHero,
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

export async function getProductGroups(): Promise<ProductGroup[]> {
  const data = await getContent<ProductGroup[]>('product-groups');
  return data ?? defaultProductGroups;
}

export async function getFooterContent(): Promise<FooterContent> {
  const data = await getContent<FooterContent>('footer');
  // Merge so a footer.json saved before a field existed still renders it.
  return { ...defaultFooterContent, ...(data ?? {}) };
}

export async function getHomeHero(): Promise<HomeHero> {
  const data = await getContent<HomeHero>('home-hero');
  return { ...defaultHomeHero, ...(data ?? {}) };
}
