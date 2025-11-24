import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { loadPage, PageDocument, getGoogleDocText } from '../utils/content';

const Service: React.FC = () => {
  const [doc, setDoc] = useState<PageDocument | null>(null);
  const [embedId, setEmbedId] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const data = await loadPage('service');
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
          <h1 className="text-4xl font-bold text-stone-900">{frontmatter.title || 'Service'}</h1>
          {frontmatter.source === 'google-doc-embed' && embedId ? (
            <iframe
              src={https://docs.google.com/document/d//preview}
              className="w-full h-[70vh] mt-6 rounded-xl border"
              title="Service Google Doc"
              allow="clipboard-write"
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
        <h1 className="text-4xl font-bold text-stone-900">Service</h1>
        <p className="text-stone-600">CMS content not found yet. Existing page UI can be restored or add service.md in CMS.</p>
      </section>
    </div>
  );
};
export default Service;
