import matter from 'gray-matter';

export type PageFrontmatter = {
  title: string;
  slug: string;
  heroImage?: string;
};

export type PageDocument = {
  frontmatter: PageFrontmatter;
  body: string;
};

const pageFiles = import.meta.glob('/src/content/pages/*.md', { as: 'raw' });

export async function loadPage(slug: string): Promise<PageDocument | null> {
  const filename = /src/content/pages/.md;
  const loader = (pageFiles as Record<string, () => Promise<string>>)[filename];
  if (!loader) return null;
  const raw = await loader();
  const parsed = matter(raw);
  return { frontmatter: parsed.data as PageFrontmatter, body: parsed.content };
}
