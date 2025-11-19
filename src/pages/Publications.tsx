import React, { useState } from 'react';
import { BookOpen, Download, ExternalLink, Calendar, Users, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

// === EDITED: Import publications data ===
import publicationsData from '../data/publications.json'; 

// Import static images (these paths must remain hardcoded as they reference static assets)
import BiologicalConservationCover from '../assets/publications/Biological Conservation journal.jpg';
import CriminalJusticeBehaviorCover from '../assets/publications/Criminal Justice and Behavior journal.jpg';


const { publications, mediaFeatures, publications_hero_text } = publicationsData;
// ===================================

const Publications = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  // NOTE: The hardcoded arrays 'publications' and 'mediaFeatures' are now imported.

  const categories = [
    { id: 'all', name: 'All Publications', count: publications.length },
    { id: 'journal', name: 'Journal Articles', count: publications.filter(p => p.type === 'journal').length },
    { id: 'book', name: 'Books', count: publications.filter(p => p.type === 'book').length },
    { id: 'report', name: 'Reports', count: publications.filter(p => p.type === 'report').length }
  ];

  const filteredPublications = activeFilter === 'all' 
    ? publications 
    : publications.filter(pub => pub.type === activeFilter);

  const featuredPublications = publications.filter(pub => pub.featured);

  // Helper function to map image paths dynamically (as they are static imports)
  const getCoverImage = (imageName: string | null) => {
    switch (imageName) {
      case 'CriminalJusticeBehaviorCover': return CriminalJusticeBehaviorCover;
      case 'BiologicalConservationCover': return BiologicalConservationCover;
      default: return null;
    }
  };


  return (
    <div className="pt-16">
      {/* Hero Section - EDITED: Using imported hero text */}
      <section className="py-20 bg-gradient-to-br from-stone-900 to-amber-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Publications & Media
          </h1>
          <p className="text-xl text-stone-300 max-w-3xl mx-auto leading-relaxed">
            {publications_hero_text}
          </p>
        </div>
      </section>

      {/* Featured Publications - EDITED: Using imported featuredPublications */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
              Featured Publications
            </h2>
            <p className="text-xl text-stone-600 max-w-2xl mx-auto">
              Recent and notable scholarly contributions to the field
            </p>
          </div>
          
          <div className="space-y-8">
            {featuredPublications.map((pub) => {
              // Create anchor ID based on publication title
              let anchorId = '';
              if (pub.id === 1) anchorId = 'social-identity-theory';
              if (pub.id === 3) anchorId = 'decolonizing-criminology';
              
              const coverImage = getCoverImage(pub.image);

              return (
                <div key={pub.id} id={anchorId} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
                  {/* Publication Image */}
                  <div className="lg:col-span-2">
                    {coverImage ? (
                      <div className="h-64 lg:h-full">
                        <img
                          src={coverImage}
                          alt={`${pub.title} cover`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="h-64 lg:h-full bg-gradient-to-br from-amber-500 to-stone-600 flex items-center justify-center">
                        <BookOpen className="h-16 w-16 text-white" />
                      </div>
                    )}
                  </div>
                  
                  {/* Publication Content */}
                  <div className="lg:col-span-3 p-8">
                    <div className="flex items-center space-x-3 mb-4">
                      <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium capitalize">
                        {pub.type}
                      </span>
                      <span className="text-stone-500 text-sm font-medium">{pub.year}</span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-stone-900 mb-4 leading-tight">{pub.title}</h3>
                    
                    <div className="text-stone-600 mb-3">
                      <span className="font-semibold text-stone-800">Authors:</span> {pub.authors.join(', ')}
                    </div>
                    
                    {/* EDITED: Using journal_or_publisher field */}
                    <div className="text-stone-600 mb-4">
                        <span className="font-semibold text-stone-800">{pub.journal_or_publisher}</span>
                        {pub.volume && pub.issue && pub.pages && (
                          <span className="text-stone-500">, Vol. {pub.volume}({pub.issue}), pp. {pub.pages}</span>
                        )}
                    </div>
                    
                    <p className="text-stone-600 leading-relaxed mb-6">{pub.abstract}</p>
                    
                    {/* Action Buttons */}
                    <div className="flex justify-start">
                      {pub.fullUrl && (
                        <a
                          href={pub.fullUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-amber-700 hover:bg-amber-800 text-white py-3 px-8 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2"
                        >
                          <ExternalLink className="h-4 w-4" />
                          <span>Read Full Publication</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )})}
          </div>
        </div>
      </section>

      {/* All Publications - EDITED: Using filteredPublications */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
              All Publications
            </h2>
            <p className="text-xl text-stone-600 max-w-2xl mx-auto">
              Complete bibliography of scholarly work and research contributions
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors duration-200 inline-flex items-center space-x-2 ${
                  activeFilter === category.id
                    ? 'bg-amber-700 text-white'
                    : 'bg-white text-stone-700 hover:bg-stone-100'
                }`}
              >
                <Filter className="h-4 w-4" />
                <span>{category.name}</span>
                <span className="bg-stone-200 text-stone-700 px-2 py-1 rounded-full text-xs">
                  {category.count}
                </span>
              </button>
            ))}
          </div>

          {/* Publications List */}
          <div className="space-y-6">
            {filteredPublications.map((pub) => {
              let anchorId = '';
              if (pub.id === 4) anchorId = 'queer-criminology';
              
              return (
                <div key={pub.id} id={anchorId} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="bg-stone-100 text-stone-700 px-3 py-1 rounded-full text-sm font-medium capitalize">
                        {pub.type}
                      </span>
                      <span className="text-stone-500 text-sm">{pub.year}</span>
                    </div>
                    <h3 className="text-xl font-bold text-stone-900 mb-2">{pub.title}</h3>
                    <div className="text-stone-600 mb-2">
                      <span className="font-medium">Authors:</span> {pub.authors.join(', ')}
                    </div>
                    {/* EDITED: Using journal_or_publisher field */}
                    <div className="text-stone-600">
                        <span className="font-medium">{pub.journal_or_publisher}</span>
                        {pub.volume && pub.issue && pub.pages && `, ${pub.volume}(${pub.issue}), ${pub.pages}`}
                    </div>
                  </div>
                  {pub.fullUrl && (
                    <div className="ml-4">
                      <a
                        href={pub.fullUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-amber-700 hover:bg-amber-800 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 inline-flex items-center space-x-2"
                        title="Read Full Publication"
                      >
                        <ExternalLink className="h-4 w-4" />
                        <span className="hidden sm:inline">Read</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Media Features - EDITED: Using imported mediaFeatures */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
              Media Features
            </h2>
            <p className="text-xl text-stone-600 max-w-2xl mx-auto">
              Interviews, articles, and media appearances discussing research and social justice
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {mediaFeatures.map((feature, index) => (
              <div key={index} className="bg-stone-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium capitalize">
                    {feature.type}
                  </span>
                  <div className="flex items-center text-stone-500 text-sm">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(feature.date).toLocaleDateString()}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-stone-900 mb-2">{feature.title}</h3>
                <div className="text-amber-700 font-semibold mb-3">{feature.outlet}</div>
                <p className="text-stone-600 mb-4 leading-relaxed">{feature.description}</p>
                <a
                  href={feature.url}
                  className="text-amber-700 hover:text-amber-800 font-semibold inline-flex items-center space-x-1"
                >
                  <span>Read/Listen</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-amber-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Stay Updated on New Publications
          </h2>
          <p className="text-xl mb-8 text-amber-100">
            Interested in my latest research? Connect with me to stay informed about 
            new publications and speaking opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-amber-700 hover:bg-stone-100 px-8 py-4 rounded-lg font-semibold transition-colors duration-200"
            >
              Get In Touch
            </Link>
            <a
              href="https://scholar.google.com/citations?user=kwan-lamar-blount-hill"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white hover:bg-white hover:text-amber-700 px-8 py-4 rounded-lg font-semibold transition-colors duration-200 inline-flex items-center space-x-2"
            >
              <span>Google Scholar</span>
              <ExternalLink className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Publications;
