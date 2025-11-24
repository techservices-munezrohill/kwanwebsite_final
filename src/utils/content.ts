import matter from 'gray-matter';

export type SourceType = 'cms' | 'google-doc-embed' | 'google-doc-fetch';

export type PageFrontmatter = {
  title: string;
  slug: string;
  heroImage?: string;
  source?: SourceType;
  googleDocId?: string;
};

export type PageDocument = {
  frontmatter: PageFrontmatter;
  body: string;
};

const pageFiles = import.meta.glob('/src/content/pages/*.md', { as: 'raw' });

export async function getGoogleDocText(docId: string): Promise<string> {
  const url = https://docs.google.com/document/d//export?format=txt;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Unable to fetch Google Doc');
  return await res.text();
}

export async function loadPage(slug: string): Promise<PageDocument | null> {
  const filename = /src/content/pages/.md;
  const loader = (pageFiles as Record<string, () => Promise<string>>)[filename];
  if (!loader) return null;
  const raw = await loader();
  const parsed = matter(raw);
  const fm = parsed.data as PageFrontmatter;

  if (fm.source === 'google-doc-fetch' && fm.googleDocId) {
    try {
      const text = await getGoogleDocText(fm.googleDocId);
      return { frontmatter: fm, body: text };
    } catch {
      return { frontmatter: fm, body: parsed.content };
    }
  }

  return { frontmatter: fm, body: parsed.content };
}
