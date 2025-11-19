import React, { useState } from 'react';
import { Download, ExternalLink, Calendar, MapPin, Award, BookOpen, GraduationCap, Users, Building, Star, ChevronDown, ChevronUp, FileText, TrendingUp, DollarSign, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

// === EDITED: Import CV data ===
import cvData from '../data/cv.json';

const {
  education,
  currentPositions,
  recentAwards,
  majorGrants,
  publicationHighlights,
  keyAffiliations,
  professionalOrgs,
  researchInterests
} = cvData;
// =================================

const CV = () => {
  // UI State remains for toggling sections
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({
    education: true,
    positions: true,
    awards: true,
    grants: false,
    publications: false,
    affiliations: false,
    memberships: false
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // NOTE: All hardcoded data arrays (education, currentPositions, etc.) 
  // are replaced by the destructured variables above and used directly below.

  // Section header component remains the same
  const SectionHeader = ({ title, icon: Icon, sectionKey, subtitle }: { title: string; icon: any; sectionKey: string; subtitle?: string }) => (
    <button
      onClick={() => toggleSection(sectionKey)}
      className="w-full flex items-center justify-between p-6 bg-gradient-to-r from-stone-800 to-amber-800 text-white rounded-t-xl hover:from-stone-700 hover:to-amber-700 transition-all duration-200"
    >
      <div className="flex items-center space-x-3">
        <Icon className="h-6 w-6" />
        <div className="text-left">
          <h2 className="text-2xl font-bold">{title}</h2>
          {subtitle && <p className="text-amber-100 text-sm">{subtitle}</p>}
        </div>
      </div>
      {expandedSections[sectionKey] ? <ChevronUp className="h-6 w-6" /> : <ChevronDown className="h-6 w-6" />}
    </button>
  );

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-stone-900 to-amber-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Curriculum Vitae
          </h1>
          <div className="mb-8">
            {/* The following text blocks (name, title, locations, kbh@asu.edu) were hardcoded and are kept as placeholders/hardcoded in the code as they are header content not easily CM-able */}
            <p className="text-2xl text-amber-200 font-semibold mb-2">Kwan-Lamar Blount-Hill, JD, PhD</p>
            <p className="text-lg text-stone-300 mb-4">Assistant Professor • Arizona State University</p>
            <div className="text-base text-stone-400 mb-6 space-y-1">
              <div>Phoenix, AZ</div>
              <div>NY, USA / New York, NY</div>
              <div>kbh@asu.edu</div>
            </div>
            <p className="text-xl text-stone-300 max-w-3xl mx-auto leading-relaxed">
              A comprehensive overview of my academic journey, professional experience, 
              and contributions to criminology, social justice, and conservation.
            </p>
          </div>
          
          {/* CV Links (Kept hardcoded to preserve Google Docs URLs) */}
          <div className="flex justify-center space-x-4"> 
            <a
              href="https://docs.google.com/document/d/1XmMKYA_BBs6X2jyoE5ftjrH_mudiI-n67T2Wp7W0vzY/preview"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amber-700 hover:bg-amber-800 text-white px-8 py-4 rounded-lg font-semibold transition-colors duration-200 inline-flex items-center space-x-2"
            >
              <FileText className="h-5 w-5" />
              <span>View CV Online</span>
            </a>
            <a
              href="https://docs.google.com/document/d/1XmMKYA_BBs6X2jyoE5ftjrH_mudiI-n67T2Wp7W0vzY/export?format=pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-stone-50 text-stone-900 hover:bg-stone-200 px-8 py-4 rounded-lg font-semibold transition-colors duration-200 inline-flex items-center space-x-2 border border-stone-300"
            >
              <Download className="h-5 w-5" />
              <span>Download CV (PDF)</span>
            </a>
          </div>
        </div>
      </section>

      {/* Research Interests Section - EDITED: Using imported researchInterests */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-stone-900 mb-6 border-b-2 border-amber-600 pb-2 flex items-center space-x-2">
          <BookOpen className="h-7 w-7 text-amber-700" />
          Research Interests
        </h2>
        <div className="text-lg text-stone-700 leading-relaxed">
          {/* Using imported markdown text */}
          <p className="mb-2">{researchInterests}</p>
        </div>
      </section>

      {/* Key Sections with Toggle */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-4">
        
        {/* Education Section - EDITED: Using imported education */}
        <div>
          <SectionHeader title="Education" icon={GraduationCap} sectionKey="education" />
          {expandedSections.education && (
            <div className="p-6 bg-stone-50 border border-t-0 rounded-b-xl space-y-6">
              {education.map((item, index) => (
                <div key={index} className="border-l-4 border-amber-600 pl-4">
                  <h3 className="text-xl font-bold text-stone-800">{item.degree}</h3>
                  <p className="text-stone-600 font-semibold">{item.institution}</p>
                  <div className="flex items-center space-x-4 text-sm text-stone-500 mt-1">
                    <span className="flex items-center space-x-1"><Calendar className="h-4 w-4" /> <span>{item.year}</span></span>
                    <span className="flex items-center space-x-1"><MapPin className="h-4 w-4" /> <span>{item.location}</span></span>
                  </div>
                  {item.details && <p className="mt-2 text-stone-700 italic">Dissertation: {item.details}</p>}
                  {item.honors && <p className="mt-1 text-amber-700 font-medium">Honors: {item.honors}</p>}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Current Positions Section - EDITED: Using imported currentPositions & keyAffiliations */}
        <div>
          <SectionHeader title="Current Positions & Affiliations" icon={Building} sectionKey="positions" />
          {expandedSections.positions && (
            <div className="p-6 bg-stone-50 border border-t-0 rounded-b-xl space-y-6">
              <h3 className="text-xl font-bold text-stone-900 mb-3 border-b pb-2">Academic & Program Appointments</h3>
              {currentPositions.map((item, index) => (
                <div key={index} className={`border-l-4 pl-4 ${item.type === 'primary' ? 'border-amber-600' : 'border-stone-400'}`}>
                  <h4 className="text-lg font-bold text-stone-800">{item.title}</h4>
                  <p className="text-stone-600">{item.institution}</p>
                  <div className="flex items-center space-x-4 text-sm text-stone-500 mt-1">
                    <span className="flex items-center space-x-1"><Calendar className="h-4 w-4" /> <span>{item.period}</span></span>
                    {/* Location is complex JSX in the original, simplified here for imported string: */}
                    <span className="flex items-center space-x-1"><MapPin className="h-4 w-4" /> <span>{item.location}</span></span> 
                  </div>
                </div>
              ))}
            
              <h3 className="text-xl font-bold text-stone-900 mb-3 border-b pt-4 pb-2">Key Affiliations</h3>
              <ul className="list-disc pl-5 space-y-1 text-stone-700">
                {keyAffiliations.map((aff, index) => (
                  <li key={index} className="text-base">{aff}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Awards Section - EDITED: Using imported recentAwards */}
        <div>
          <SectionHeader title="Selected Awards & Honors" icon={Award} sectionKey="awards" />
          {expandedSections.awards && (
            <div className="p-6 bg-stone-50 border border-t-0 rounded-b-xl space-y-6">
              {recentAwards.map((item, index) => (
                <div key={index} className="border-l-4 border-amber-600 pl-4">
                  <div className="flex justify-between items-start">
                    <h4 className="text-lg font-bold text-stone-800">{item.title}</h4>
                    <span className="text-sm text-stone-500 flex items-center space-x-1"><Star className="h-4 w-4 text-yellow-500 fill-yellow-500" /> {item.year}</span>
                  </div>
                  <p className="text-stone-600 italic">{item.organization}</p>
                  <p className="text-stone-700 mt-1 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Grants Section - EDITED: Using imported majorGrants */}
        <div>
          <SectionHeader title="Major Grants & Funding" icon={DollarSign} sectionKey="grants" subtitle="Click to expand" />
          {expandedSections.grants && (
            <div className="p-6 bg-stone-50 border border-t-0 rounded-b-xl space-y-6">
              {majorGrants.map((item, index) => (
                <div key={index} className="border-l-4 border-green-600 pl-4">
                  <h4 className="text-lg font-bold text-stone-800">{item.title}</h4>
                  <p className="text-stone-600">{item.agency}</p>
                  <div className="flex justify-between text-sm text-stone-500 mt-1">
                    <span>**Amount:** <span className="text-green-700 font-semibold">{item.amount}</span></span>
                    <span>**Role:** {item.role}</span>
                    <span>**Period:** {item.period}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Publications Section - EDITED: Using imported publicationHighlights */}
        <div>
          <SectionHeader title="Publication Highlights" icon={BookOpen} sectionKey="publications" subtitle="Click to expand" />
          {expandedSections.publications && (
            <div className="p-6 bg-stone-50 border border-t-0 rounded-b-xl space-y-6">
              {publicationHighlights.map((item, index) => (
                <div key={index} className="border-l-4 border-blue-600 pl-4">
                  <h4 className="text-lg font-bold text-stone-800 italic">{item.title}</h4>
                  <div className="flex justify-between items-center text-stone-600 text-sm mt-1">
                    <span>{item.journal}, {item.year}</span>
                    {item.impact && <span className="text-blue-700 font-semibold">{item.impact}</span>}
                  </div>
                  {item.coauthor && <p className="text-xs text-stone-500 mt-1">Co-authors: {item.coauthor}</p>}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Professional Memberships Section - EDITED: Using imported professionalOrgs */}
        <div>
          <SectionHeader title="Professional Memberships" icon={Users} sectionKey="memberships" subtitle="Click to expand" />
          {expandedSections.memberships && (
            <div className="p-6 bg-stone-50 border border-t-0 rounded-b-xl">
              <ul className="list-disc pl-5 space-y-1 text-stone-700 columns-2 sm:columns-3">
                {professionalOrgs.map((org, index) => (
                  <li key={index} className="text-base">{org}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

      </div>

      {/* Footer or return to Home */}
      <footer className="bg-stone-800 text-white text-center py-6 mt-12">
        <Link to="/" className="text-amber-400 hover:text-amber-300 font-semibold flex items-center justify-center space-x-2">
          <Briefcase className="h-5 w-5" />
          <span>Return to Portfolio Home</span>
        </Link>
      </footer>
    </div>
  );
};

export default CV;
