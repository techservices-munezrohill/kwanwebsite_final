import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { loadPage, PageDocument } from '../utils/content';

const CV: React.FC = () => {
  const [doc, setDoc] = useState<PageDocument | null>(null);
  const [embedId, setEmbedId] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const data = await loadPage('cv');
      if (!data) return setDoc(null);
      if (data.frontmatter.source === 'google-doc-embed' && data.frontmatter.googleDocId) {
        setEmbedId(data.frontmatter.googleDocId);
        setDoc(data);
      } else {
        setDoc(data);
      }
    })();
  }, []);

  if (doc) {
    const { frontmatter, body } = doc;
    return (
      <div className="min-h-screen bg-stone-50">
        <section className="max-w-5xl mx-auto px-6 py-12">
          <h1 className="text-4xl font-bold text-stone-900">{frontmatter.title || 'CV'}</h1>
          {frontmatter.source === 'google-doc-embed' && embedId ? (
            <iframe
              src={https://docs.google.com/document/d//preview}
              className="w-full h-[70vh] mt-6 rounded-xl border"
              title="CV Google Doc"
            />
          ) : (
            <article className="prose prose-stone max-w-none mt-6">
              <ReactMarkdown>{body}</ReactMarkdown>
            </article>
          )}
        </section>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-stone-50">
      <section className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-stone-900">CV</h1>
        <p className="text-stone-600">CMS content not found yet. Add cv.md in Pages CMS or keep existing UI.</p>
      </section>
    </div>
  );
};
export default CV;
