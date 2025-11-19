import React, { useState, useEffect } from 'react';
import { Users, Award, Building, BookOpen, ExternalLink, RefreshCw, ChevronDown, ChevronUp, Star } from 'lucide-react';

// === EDITED: Import service data from JSON file ===
import serviceContent from '../data/service.json';

const { serviceData } = serviceContent;
// ===================================================

// NOTE: Since the data is loaded locally now, we remove the API key and doc ID definitions.
// The `fetchServiceDataFromGoogleDocs` utility is no longer needed for primary data loading.

interface ServiceItem {
  organization: string;
  role: string;
  period: string;
  description?: string;
  type: 'community' | 'university' | 'academic';
}

const Service = () => {
  // We use the imported serviceData array directly, setting loading to false initially.
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>('Local Data'); // Edited: Reflects local source
  
  // UI state for content management
  const [collapsedSections, setCollapsedSections] = useState<{[key: string]: boolean}>({
    community: false,
    university: false,
    academic: false
  });
  const [showMoreSections, setShowMoreSections] = useState<{[key: string]: boolean}>({
    community: false,
    university: false,
    academic: false
  });
  
  const ITEMS_TO_SHOW_INITIALLY = 4; // Show 4 items initially, rest behind "Show More"

  // EDITED: Load function is removed as data is imported directly.
  // We keep useEffect for potential initial UI setup if needed.
  useEffect(() => {
    // Optionally trigger something once data is loaded/available
    setLastUpdated(new Date().toLocaleDateString());
  }, []);

  // EDITED: The serviceData is now the imported 'serviceData' array.
  
  const getServiceIcon = (type: string) => {
    switch (type) {
      case 'community':
        return <Users className="h-5 w-5" />;
      case 'university':
        return <Building className="h-5 w-5" />;
      case 'academic':
        return <BookOpen className="h-5 w-5" />;
      default:
        return <Award className="h-5 w-5" />;
    }
  };

  const getServiceColor = (type: string) => {
    switch (type) {
      case 'community':
        return 'from-green-500 to-emerald-600';
      case 'university':
        return 'from-blue-500 to-indigo-600';
      case 'academic':
        return 'from-purple-500 to-violet-600';
      default:
        return 'from-amber-500 to-orange-600';
    }
  };

  // Group services based on the imported data
  const groupedServices = {
    community: serviceData.filter(item => item.type === 'community'),
    university: serviceData.filter(item => item.type === 'university'),
    academic: serviceData.filter(item => item.type === 'academic')
  };

  const sectionTitles = {
    community: 'Service to the Community',
    university: 'Service to the University',
    academic: 'Service to the Academic Profession'
  };

  // Helper functions for UI management
  const toggleSection = (sectionType: string) => {
    setCollapsedSections(prev => ({
      ...prev,
      [sectionType]: !prev[sectionType]
    }));
  };

  const toggleShowMore = (sectionType: string) => {
    setShowMoreSections(prev => ({
      ...prev,
      [sectionType]: !prev[sectionType]
    }));
  };

  // Get highlighted (current/recent) services
  const getHighlightedServices = () => {
    const currentYear = new Date().getFullYear();
    return serviceData.filter(service => { // EDITED: Uses imported serviceData
      // Show current roles (containing "present") or recent roles (2023+)
      return service.period.toLowerCase().includes('present') || 
             service.period.includes('2024') || 
             service.period.includes('2025') ||
             service.period.includes(currentYear.toString());
    }).slice(0, 6); // Limit to 6 highlighted items
  };

  const highlightedServices = getHighlightedServices();

  // Get services to display for each section (with show more/less logic)
  const getServicesToDisplay = (services: ServiceItem[], sectionType: string) => {
    const showMore = showMoreSections[sectionType];
    return showMore ? services : services.slice(0, ITEMS_TO_SHOW_INITIALLY);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-12 w-12 text-amber-600 animate-spin mx-auto mb-4" />
          <p className="text-stone-600">Loading professional service information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/30 to-orange-50/20 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-stone-800 mb-4">
            Professional Service
          </h1>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto">
            Commitment to advancing justice, scholarship, and community through leadership and service
          </p>
        </div>

        {/* Highlights Section */}
        {highlightedServices.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center mb-8">
              <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-2 rounded-lg mr-4">
                <Star className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-stone-800">Current & Recent Service</h2>
                <p className="text-stone-600 mt-1">Key leadership roles and ongoing commitments (Last Updated: {lastUpdated})</p>
              </div>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {highlightedServices.map((service, index) => (
                <div 
                  key={index}
                  className="bg-gradient-to-br from-white via-amber-50/20 to-orange-50/10 rounded-xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 p-6 border border-amber-100 relative overflow-hidden backdrop-blur-sm"
                >
                  <div className="absolute top-2 right-2">
                    <Star className="h-4 w-4 text-amber-500" />
                  </div>
                  <h3 className="font-semibold text-stone-800 mb-2 pr-6">
                    {service.organization}
                  </h3>
                  <p className="text-amber-700 font-medium mb-2">
                    {service.role}
                  </p>
                  <p className="text-stone-600 text-sm mb-3 font-medium">
                    {service.period}
                  </p>
                  {service.description && (
                    <p className="text-stone-700 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Service Sections with Collapsible Design */}
        {Object.entries(groupedServices).map(([type, services]) => (
          services.length > 0 && (
            <div key={type} className="mb-12">
              <button
                onClick={() => toggleSection(type)}
                className="w-full flex items-center justify-between mb-6 group hover:bg-stone-50 p-4 rounded-lg transition-colors duration-200"
              >
                <div className="flex items-center">
                  <div className={`bg-gradient-to-r ${getServiceColor(type)} p-2 rounded-lg mr-4 group-hover:scale-105 transition-transform duration-200`}>
                    <div className="text-white">
                      {getServiceIcon(type)}
                    </div>
                  </div>
                  <div className="text-left">
                    <h2 className="text-2xl font-bold text-stone-800">
                      {sectionTitles[type as keyof typeof sectionTitles]}
                    </h2>
                    <p className="text-stone-600 text-sm">
                      {services.length} {services.length === 1 ? 'role' : 'roles'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {collapsedSections[type] ? (
                    <ChevronDown className="h-6 w-6 text-stone-600" />
                  ) : (
                    <ChevronUp className="h-6 w-6 text-stone-600" />
                  )}
                </div>
              </button>

              {!collapsedSections[type] && (
                <div className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {getServicesToDisplay(services, type).map((service, index) => (
                      <div 
                        key={index}
                        className="bg-gradient-to-br from-white via-stone-50/10 to-amber-50/5 rounded-lg shadow-md hover:shadow-xl hover:scale-[1.01] transition-all duration-300 p-6 border-l-4 border-amber-400 backdrop-blur-sm"
                      >
                        <h3 className="font-semibold text-stone-800 mb-2">
                          {service.organization}
                        </h3>
                        <p className="text-amber-700 font-medium mb-2">
                          {service.role}
                        </p>
                        <p className="text-stone-600 text-sm mb-3">
                          {service.period}
                        </p>
                        {service.description && (
                          <p className="text-stone-700 text-sm leading-relaxed">
                            {service.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  {/* Show More/Less Button */}
                  {services.length > ITEMS_TO_SHOW_INITIALLY && (
                    <div className="text-center">
                      <button
                        onClick={() => toggleShowMore(type)}
                        className="inline-flex items-center space-x-2 px-6 py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg transition-colors duration-200 font-medium"
                      >
                        {showMoreSections[type] ? (
                          <>
                            <ChevronUp className="h-4 w-4" />
                            <span>Show Less</span>
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-4 w-4" />
                            <span>Show {services.length - ITEMS_TO_SHOW_INITIALLY} More</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        ))}

      </div>
    </div>
  );
};

export default Service;
