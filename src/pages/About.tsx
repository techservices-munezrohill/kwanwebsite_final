import React from 'react';
// Import the JSON data file
import aboutPageData from '../data/about.json'; 
import { Download, Award, Calendar, MapPin, Heart, Scale, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

// Destructure the imported data for easier use
const { 
  personalValues, 
  keyAchievements, 
  hero_subtitle, 
  hero_description,
  journey_sections,
  mission_quote,
  mission_follow_up
} = aboutPageData;

const About = () => {

  // 1. Define the path to your image (kept as hardcoded JS logic)
  const profilePhotoPath = import.meta.env.BASE_URL + 'kwanbh-photo.jpg';
  
  // NOTE: The hardcoded arrays 'keyAchievements' and 'personalValues' 
  // have been replaced by the destructured variables above.
  
  // The original component code remains below, now using the imported data:

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-stone-900 to-amber-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                About Dr. Kwan‑Lamar Blount‑Hill
              </h1>
              {/* === EDITED: Using imported hero_subtitle === */}
              <p className="text-xl text-stone-300 mb-6 leading-relaxed">
                {hero_subtitle}
              </p>
              {/* === EDITED: Using imported hero_description === */}
              <p className="text-lg text-stone-300 mb-8 leading-relaxed">
                {hero_description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/cv"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 inline-flex items-center justify-center space-x-2"
                >
                  <Download className="h-5 w-5" />
                  <span>View Full CV</span>
                </Link>
              </div>
            </div>
            
            {/* MODIFIED IMAGE BLOCK */}
            <div className="relative">
              <div className="bg-gradient-to-r from-amber-600 to-stone-700 rounded-2xl h-[550px] w-full overflow-hidden shadow-2xl"> {/* HEIGHT INCREASED TO 550PX */}
                <img 
                  src={profilePhotoPath} 
                  alt="Dr. Kwan-Lamar Blount-Hill Professional Headshot" 
                  className="w-full h-full object-cover object-top transition-all duration-300 hover:scale-105" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Personal Values Section - EDITED: Using imported personalValues */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
              Personal Values
            </h2>
            <p className="text-xl text-stone-600 max-w-2xl mx-auto">
              The personal foundations that shape who I am and guide my work
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {personalValues.map((value, index) => (
              <div key={index} className="bg-stone-50 p-8 rounded-xl shadow-lg text-center">
                {/* NOTE: Icons must still be manually mapped in code or defined in the JSON */}
                <div className="text-amber-700 mb-4 flex justify-center">
                  {/* Using a switch statement or simple logic to map titles to icons */}
                  {value.title === 'Faith & Justice' && <Heart className="h-8 w-8" />}
                  {value.title === 'Lived Experience' && <Scale className="h-8 w-8" />}
                  {value.title === 'Liberation Through Learning' && <BookOpen className="h-8 w-8" />}
                </div>
                <h3 className="text-xl font-bold text-stone-900 mb-3">{value.title}</h3>
                <p className="text-stone-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Key Milestones Section - EDITED: Using imported keyAchievements */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
              Key Milestones
            </h2>
            <p className="text-xl text-stone-600">
              Defining moments in my journey as a scholar and advocate
            </p>
          </div>
          
          <div className="space-y-8">
            {keyAchievements.map((achievement, index) => (
              <div key={index} className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="bg-amber-700 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold">
                    <Award className="h-6 w-6" />
                  </div>
                </div>
                <div className="flex-1 bg-white p-6 rounded-xl shadow-md">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <h3 className="text-xl font-semibold text-stone-900">
                      {achievement.title}
                    </h3>
                    <span className="text-amber-700 font-medium">{achievement.year}</span>
                  </div>
                  <p className="text-stone-600">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Personal Journey - EDITED: Using imported journey_sections/mission_quote */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
              My Journey
            </h2>
            <p className="text-xl text-stone-600">
              The personal experiences and pivotal moments that shaped my calling
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {journey_sections.map((section, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold text-stone-900 mb-4">{section.title}</h3>
                {/* Use the newlines/markdown from JSON content */}
                {section.content.split('\n\n').map((paragraph, pIndex) => (
                    <p key={pIndex} className="text-lg text-stone-600 leading-relaxed mb-4">
                      {paragraph}
                    </p>
                ))}
              </div>
            ))}
          </div>
          
          <div className="bg-gradient-to-r from-amber-50 to-stone-100 p-8 rounded-xl">
            <h3 className="text-2xl font-bold text-stone-900 mb-6 text-center">Today's Mission</h3>
            {/* Using the same logic for the pre-quote text */}
            {mission_quote.split('\n\n')[0] && (
                <p className="text-lg text-stone-600 leading-relaxed mb-4 text-center">
                    {mission_quote.split('\n\n')[0]}
                </p>
            )}
            <blockquote className="text-xl text-stone-700 leading-relaxed italic text-center border-l-4 border-amber-600 pl-6">
              {mission_quote.split('"')[1]} 
            </blockquote>
            <p className="text-center text-stone-600 mt-4 font-medium">
              {mission_follow_up}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
