import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { loadPage, PageDocument } from '../utils/content';

const Home: React.FC = () => {
  const [doc, setDoc] = useState<PageDocument | null>(null);

  useEffect(() => {
    (async () => setDoc(await loadPage('home')))();
  }, []);

  if (doc) {
    const { frontmatter, body } = doc;
    return (
      <div className="min-h-screen bg-stone-50">
        <section className="max-w-5xl mx-auto px-6 py-12">
          <h1 className="text-4xl font-bold text-stone-900 text-center">{frontmatter.title || 'Home'}</h1>
          {frontmatter.heroImage && (
            <img src={frontmatter.heroImage} alt="Home hero" className="mt-6 w-full rounded-xl shadow-lg" />
          )}
          <article className="prose prose-stone max-w-none mt-6">
            <ReactMarkdown>{body}</ReactMarkdown>
          </article>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <section className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-stone-900">Home</h1>
        <p className="text-stone-600">CMS content not found yet. Add home.md in Pages CMS to override.</p>
      </section>
    </div>
  );
};

export default Home;
