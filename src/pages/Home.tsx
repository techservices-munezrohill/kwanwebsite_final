import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Scale, Heart } from 'lucide-react';
import Photo6 from '../assets/Photo-6.jpg';

// === EDITED: Import homepage data ===
import homepageData from '../data/homepage.json';

const { 
  fullText, 
  subtitle, 
  description, 
  features, 
  stats, 
  recentWorkPreview, 
  cta_headline, 
  cta_subtext,
  hero_image
} = homepageData;
// ===================================

const Home = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [statsAnimated, setStatsAnimated] = useState(false);
  const [statValues, setStatValues] = useState([0, 0, 0, 0]);
  
  // NOTE: fullText is now imported from JSON. It does NOT need to be redefined here.
  
  useEffect(() => {
    let currentIndex = 0;
    const typingSpeed = 100; // milliseconds per character
    
    const typeWriter = () => {
      if (currentIndex < fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
        setTimeout(typeWriter, typingSpeed);
      } else {
        // Hide cursor after typing completes
        setTimeout(() => setShowCursor(false), 500);
        // After typing is complete, show other elements with staggered timing
        setTimeout(() => setShowSubtitle(true), 300);
        setTimeout(() => setShowDescription(true), 800);
        setTimeout(() => setShowButtons(true), 1300);
        setTimeout(() => setShowImage(true), 400);
      }
    };
    
    // Start typing after a brief delay
    const startDelay = setTimeout(typeWriter, 500);
    
    return () => clearTimeout(startDelay);
  }, [fullText]); // Added fullText to dependency array

  // NOTE: The hardcoded features and stats arrays are now removed.
  
  // Scroll observer for stats animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !statsAnimated) {
            setStatsAnimated(true);
            animateStats();
          }
        });
      },
      { threshold: 0.5 }
    );

    const statsSection = document.getElementById('stats-section');
    if (statsSection) {
      observer.observe(statsSection);
    }

    return () => observer.disconnect();
  }, [statsAnimated]);

  // Counter animation function
  const animateStats = () => {
    const duration = 2000; // 2 seconds
    const frameRate = 60;
    const totalFrames = duration / (1000 / frameRate);
    
    let frame = 0;
    
    const animate = () => {
      frame++;
      const progress = frame / totalFrames;
      const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease-out cubic
      
      setStatValues(stats.map((stat) => {
        return Math.min(stat.targetValue * easeProgress, stat.targetValue);
      }));
      
      if (frame < totalFrames) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  };

  // Format stat value for display
  const formatStatValue = (value: number, stat: any) => {
    if (stat.prefix === '$') {
      return `${stat.prefix}${value.toFixed(1)}${stat.suffix}`;
    }
    return `${stat.prefix}${Math.floor(value)}${stat.suffix}`;
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-stone-900 via-amber-900 to-stone-800 text-white pt-4 pb-4 lg:pt-6 lg:pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-2 lg:mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            <div className="flex flex-col justify-start space-y-4 order-2 lg:order-1">
              {/* Animated Name - Uses imported fullText */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight min-h-[4rem] lg:min-h-[5rem]">
                <span className="inline-block">
                  {displayedText}
                  {showCursor && <span className="animate-pulse text-amber-400">|</span>}
                </span>
              </h1>
              
              {/* Animated Subtitle - EDITED: Uses imported subtitle */}
              <div className={`transition-all duration-700 ease-out transform ${
                showSubtitle 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-4'
              }`}>
                <p className="text-xl sm:text-2xl md:text-3xl text-amber-200 font-light">
                  {subtitle}
                </p>
              </div>
              
              {/* Animated Description - EDITED: Uses imported description */}
              <div className={`transition-all duration-700 ease-out transform ${
                showDescription 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-4'
              }`}>
                <p className="text-lg md:text-xl text-stone-300 leading-relaxed max-w-2xl">
                  {description}
                </p>
              </div>
              
              {/* Animated Buttons */}
              <div className={`transition-all duration-700 ease-out transform ${
                showButtons 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-4'
              }`}>
                <div className="flex flex-col sm:flex-row gap-4 pt-2 mb-0">
                  <Link
                    to="/research"
                    className="bg-amber-700 hover:bg-amber-800 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl hover:-translate-y-1"
                  >
                    <span>Explore Research</span>
                    <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                  <Link
                    to="/contact"
                    className="border-2 border-white text-white hover:bg-white hover:text-stone-900 px-8 py-3 rounded-lg font-semibold transition-all duration-200 text-center hover:shadow-lg hover:-translate-y-1"
                  >
                    Get In Touch
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Animated Image */}
            <div className={`flex justify-center items-start order-1 lg:order-2 -mt-4 lg:-mt-6 transition-all duration-1000 ease-out transform ${
              showImage 
                ? 'opacity-100 translate-y-0 scale-100' 
                : 'opacity-0 translate-y-8 scale-95'
            }`}>
              <div className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-300">
                <img
                  src={Photo6}
                  alt={hero_image.alt} 
                  className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                {/* Subtle border glow effect */}
                <div className="absolute inset-0 rounded-2xl ring-1 ring-white/20"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Stats Section - EDITED: Uses imported stats list */}
      <section id="stats-section" className="py-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className={`text-center transform transition-all duration-700 ease-out ${
                  statsAnimated 
                    ? 'opacity-100 translate-y-0 scale-100' 
                    : 'opacity-0 translate-y-8 scale-95'
                }`}
                style={{ 
                  transitionDelay: `${index * 150}ms` // Staggered animation
                }}
              >
                <div className="relative group">
                  {/* Animated background glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-200 to-yellow-200 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 transform scale-110"></div>
                  
                  {/* Counter number */}
                  <div className="relative text-4xl md:text-5xl font-bold text-amber-700 mb-3 py-4">
                    {statsAnimated ? formatStatValue(statValues[index], stat) : '0'}
                  </div>
                  
                  {/* Label */}
                  <div className="text-stone-600 font-semibold text-sm md:text-base">
                    {stat.label}
                  </div>
                  
                  {/* Decorative line */}
                  <div className="mt-3 mx-auto w-12 h-1 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full opacity-60"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - EDITED: Uses imported features list */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
              My Mission
            </h2>
            <p className="text-xl text-stone-600 max-w-2xl mx-auto">
              Bridging academic scholarship, legal advocacy, and social justice to create meaningful change
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="text-amber-700 mb-4">
                   {/* Manually mapping icons based on title is preserved */}
                   {feature.title === 'Scholar' && <BookOpen className="h-8 w-8" />}
                   {feature.title === 'Attorney' && <Scale className="h-8 w-8" />}
                   {feature.title === 'Advocate' && <Heart className="h-8 w-8" />}
                </div>
                <h3 className="text-xl font-semibold text-stone-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-stone-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Work Preview - EDITED: Uses imported recentWorkPreview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
              Recent Work
            </h2>
            <p className="text-xl text-stone-600 max-w-2xl mx-auto">
              Recent research, publications, and advocacy initiatives
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {recentWorkPreview.map((item, index) => (
              <Link 
                key={index} 
                to={item.link}
                className="bg-gray-100 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 hover:shadow-lg block"
              >
                <div className={`bg-gradient-to-br ${item.color} h-48`}></div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-stone-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-stone-600 mb-4">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm">{item.type}</span>
                    <span className="bg-stone-100 text-stone-800 px-3 py-1 rounded-full text-sm">2024</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center">
            <Link
              to="/publications"
              className="bg-amber-700 hover:bg-amber-800 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 inline-flex items-center space-x-2"
            >
              <span>View All Publications</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section - EDITED: Uses imported CTA text */}
      <section className="py-20 bg-gradient-to-r from-amber-700 to-stone-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {cta_headline}
          </h2>
          <p className="text-xl mb-8 text-amber-100">
            {cta_subtext}
          </p>
          <Link
            to="/contact"
            className="bg-white text-amber-700 hover:bg-stone-100 px-8 py-4 rounded-lg font-semibold transition-colors duration-200 inline-flex items-center space-x-2"
          >
            <span>Start a Conversation</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
