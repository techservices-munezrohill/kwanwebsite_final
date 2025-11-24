import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { loadPage, PageDocument } from '../utils/content';

const Teaching: React.FC = () => {
  const [doc, setDoc] = useState<PageDocument | null>(null);
  useEffect(() => { (async () => setDoc(await loadPage('teaching')))(); }, []);
  if (doc) {
    const { frontmatter, body } = doc;
    return (
      <div className="min-h-screen bg-stone-50">
        <section className="max-w-5xl mx-auto px-6 py-12">
          <h1 className="text-4xl font-bold text-stone-900">{frontmatter.title || 'Teaching'}</h1>
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
        <h1 className="text-4xl font-bold text-stone-900">Teaching</h1>
        <p className="text-stone-600">CMS content not found yet. Add 	eaching.md in Pages CMS.</p>
      </section>
    </div>
  );
};
export default Teaching;
