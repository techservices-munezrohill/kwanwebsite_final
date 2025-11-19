import React, { useState } from 'react';
import { ExternalLink, Calendar, Users, Award, Filter, MapPin, Heart } from 'lucide-react';

// === EDITED: Import combined projects data ===
import projectsData from '../data/projects.json';

const { 
  projects, 
  impactSummary 
} = projectsData;
// ===========================================

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  // === EDITED: Derive categories dynamically for UI filtering ===
  const projectCategories = [
    { id: 'all', name: 'All Projects', count: projects.length },
    { id: 'academic', name: 'Academic', count: projects.filter(p => p.category === 'academic').length },
    { id: 'research', name: 'Research', count: projects.filter(p => p.category === 'research').length },
    { id: 'advocacy', name: 'Advocacy', count: projects.filter(p => p.category === 'advocacy').length },
    { id: 'community', name: 'Community', count: projects.filter(p => p.category === 'community').length }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const featuredProjects = projects.filter(project => project.featured);

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-stone-900 to-amber-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Projects & Initiatives
          </h1>
          <p className="text-xl text-stone-300 max-w-3xl mx-auto leading-relaxed">
            A portfolio of research, advocacy, and community engagement projects 
            advancing justice, equity, and liberation through collaborative action.
          </p>
        </div>
      </section>

      {/* Featured Projects - Uses imported featuredProjects */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
              Featured Projects
            </h2>
            <p className="text-xl text-stone-600 max-w-2xl mx-auto">
              Highlighted initiatives demonstrating impact and innovation in justice work
            </p>
          </div>
          
          <div className="space-y-12">
            {featuredProjects.map((project) => (
              <div key={project.id} className="bg-stone-50 rounded-xl overflow-hidden shadow-lg">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div className={`bg-gradient-to-r ${project.image} h-64 lg:h-auto flex items-center justify-center`}>
                    <div className="text-white text-center p-8">
                      <Heart className="h-16 w-16 mx-auto mb-4" />
                      <span className="text-lg font-medium">Project Impact</span>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex items-center space-x-3 mb-4">
                      <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                        {project.type}
                      </span>
                      <div className="flex items-center text-stone-500 text-sm">
                        <Calendar className="h-4 w-4 mr-1" />
                        {project.period}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-stone-900 mb-3">{project.title}</h3>
                    <div className="flex items-center text-stone-600 mb-4">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{project.location}</span> 
                    </div>
                    <p className="text-stone-600 mb-4 leading-relaxed">{project.description}</p>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold text-stone-800 mb-2">Key Outcomes:</h4>
                      <ul className="space-y-1">
                        {project.outcomes.map((outcome, idx) => (
                          <li key={idx} className="flex items-start space-x-2 text-stone-600 text-sm">
                            <div className="w-2 h-2 bg-amber-600 rounded-full mt-2 flex-shrink-0"></div>
                            <span>{outcome}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-amber-50 p-4 rounded-lg mb-4">
                      <h4 className="font-semibold text-amber-800 mb-2">Impact:</h4>
                      <p className="text-amber-700 text-sm">{project.impact}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-stone-800 mb-2">Collaborators:</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.collaborators.map((collab, idx) => (
                          <span key={idx} className="bg-stone-100 text-stone-700 px-3 py-1 rounded-full text-sm">
                            {collab}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Projects - Uses filteredProjects */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
              All Projects
            </h2>
            <p className="text-xl text-stone-600 max-w-2xl mx-auto">
              Complete portfolio of justice-centered work across research, advocacy, and community engagement
            </p>
          </div>

          {/* Filter Buttons - Uses projectCategories */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {projectCategories.map((category) => (
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

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <div key={project.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className={`bg-gradient-to-r ${project.image} h-48 flex items-center justify-center`}>
                  <div className="text-white text-center">
                    <Users className="h-12 w-12 mx-auto mb-2" />
                    <span className="font-medium">{project.type}</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-stone-100 text-stone-700 px-3 py-1 rounded-full text-sm font-medium capitalize">
                      {project.category}
                    </span>
                    <div className="flex items-center text-stone-500 text-sm">
                      <Calendar className="h-4 w-4 mr-1" />
                      {project.period.split(' - ')[0]}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-stone-900 mb-2">{project.title}</h3>
                  <div className="flex items-center text-stone-600 mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{project.location}</span>
                  </div>
                  <p className="text-stone-600 mb-4 text-sm leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                  <div className="bg-stone-50 p-3 rounded-lg mb-4">
                    <p className="text-stone-700 text-xs font-medium">{project.impact}</p>
                  </div>
                  <button className="text-amber-700 hover:text-amber-800 font-semibold text-sm inline-flex items-center space-x-1">
                    <span>Learn More</span>
                    <ExternalLink className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Summary - Uses imported impactSummary list */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
              Collective Impact
            </h2>
            <p className="text-xl text-stone-600 max-w-2xl mx-auto">
              Measuring the reach and effectiveness of justice-centered work
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {impactSummary.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-amber-700 mb-2">
                  {stat.number}
                </div>
                <div className="text-stone-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-amber-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Partner with Me on Justice Work
          </h2>
          <p className="text-xl mb-8 text-amber-100">
            Interested in collaboration, consultation, or learning more about any of these projects? 
            Let's explore how we can work together to advance justice and equity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-amber-700 hover:bg-stone-100 px-8 py-4 rounded-lg font-semibold transition-colors duration-200"
            >
              Start a Conversation
            </a>
            <a
              href="/research"
              className="border-2 border-white text-white hover:bg-white hover:text-amber-700 px-8 py-4 rounded-lg font-semibold transition-colors duration-200"
            >
              View Research
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
