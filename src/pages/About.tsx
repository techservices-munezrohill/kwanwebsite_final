import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { loadPage, PageDocument } from '../utils/content';

const About: React.FC = () => {
  const [doc, setDoc] = useState<PageDocument | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const data = await loadPage('about');
      if (!data) setError('CMS content for About not found.');
      else setDoc(data);
    })();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-stone-50">
        <section className="max-w-5xl mx-auto px-6 py-12">
          <h1 className="text-4xl font-bold text-stone-900 mb-4">About</h1>
          <p className="text-stone-600">{error}</p>
        </section>
      </div>
    );
  }

  if (!doc) {
    return (
      <div className="min-h-screen bg-stone-50">
        <section className="max-w-5xl mx-auto px-6 py-12">
          <p className="text-stone-600">Loading content…</p>
        </section>
      </div>
    );
  }

  const { frontmatter, body } = doc;

  return (
    <div className="min-h-screen bg-stone-50">
      <section className="max-w-5xl mx-auto px-6 py-12">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-stone-900">
            {frontmatter.title || 'About'}
          </h1>
          {frontmatter.heroImage && (
            <img
              src={frontmatter.heroImage}
              alt="About hero"
              className="mt-6 w-full rounded-xl shadow-lg"
            />
          )}
        </header>
        <article className="max-w-none text-stone-800 leading-relaxed text-lg">
          <ReactMarkdown>{body}</ReactMarkdown>
        </article>
      </section>
    </div>
  );
};

export default About;
