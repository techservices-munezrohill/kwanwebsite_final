import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Calendar, BookOpen, CheckCircle, AlertCircle } from 'lucide-react';
import { sendEmail, ContactFormData } from '../utils/emailService';

// === EDITED: Import contact data ===
import contactData from '../data/contact.json';

const { 
  email, 
  location_1, 
  location_2, 
  faqs, 
  social_links, 
  response_time 
} = contactData;
// ===================================

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    inquiryType: 'research-collaboration'
  });
  
  const [submissionStatus, setSubmissionStatus] = useState<{
    isSubmitting: boolean;
    isSuccess: boolean;
    isError: boolean;
    message: string;
  }>({
    isSubmitting: false,
    isSuccess: false,
    isError: false,
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset previous status
    setSubmissionStatus({ isSubmitting: true, isSuccess: false, isError: false, message: '' });
    
    try {
      // NOTE: The sendEmail utility might need updating to reflect the contact email being imported, 
      // but the component logic for submission remains the same.
      const result = await sendEmail(formData as ContactFormData);
      
      if (result.success) {
        setSubmissionStatus({
          isSubmitting: false,
          isSuccess: true,
          isError: false,
          message: result.message
        });
        
        // Reset form on successful submission
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          inquiryType: 'research-collaboration'
        });
      } else {
        setSubmissionStatus({
          isSubmitting: false,
          isSuccess: false,
          isError: true,
          message: result.message
        });
      }
    } catch (error) {
      setSubmissionStatus({
        isSubmitting: false,
        isSuccess: false,
        isError: true,
        message: `An unexpected error occurred. Please try again or email directly at ${email}`
      });
    }
    
    // Clear status message after 5 seconds
    setTimeout(() => {
      setSubmissionStatus({ isSubmitting: false, isSuccess: false, isError: false, message: '' });
    }, 5000);
  };

  // === EDITED: Replaced contactInfo hardcoding with dynamic data from JSON ===
  const contactInfoDynamic = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: 'Email',
      value: email,
      link: `mailto:${email}`
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: 'Location',
      value: (
        <div className="space-y-1">
          <div>{location_1}</div>
          <div>{location_2}</div>
        </div>
      ),
      link: '#'
    }
  ];
  // === Removed hardcoded faqs and social media arrays ===
  
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-stone-900 to-amber-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Connect & Collaborate
          </h1>
          <p className="text-xl text-stone-300 max-w-3xl mx-auto leading-relaxed">
            Interested in research collaboration, speaking engagements, consultation, 
            or discussing justice-centered initiatives? I'd love to connect.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-stone-900 mb-4">Send a Message</h2>
                <p className="text-stone-600">
                  Fill out the form below and I'll get back to you within 24 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  {/* Email Input */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Inquiry Type Select */}
                  <div>
                    <label htmlFor="inquiryType" className="block text-sm font-medium text-stone-700 mb-2">
                      Inquiry Type
                    </label>
                    <select
                      id="inquiryType"
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                    >
                      <option value="research-collaboration">Research Collaboration</option>
                      <option value="speaking-engagement">Speaking Engagement</option>
                      <option value="consulting">Consulting</option>
                      <option value="media-interview">Media Interview</option>
                      <option value="student-inquiry">Student Inquiry</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  {/* Subject Input */}
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-stone-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                      placeholder="Brief subject line"
                    />
                  </div>
                </div>

                {/* Message Textarea */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors resize-none"
                    placeholder="Please provide details about your inquiry, including timeline, goals, and any specific requirements..."
                  ></textarea>
                </div>

                {/* Status Messages */}
                {submissionStatus.message && (
                  <div className={`p-4 rounded-lg flex items-center space-x-3 ${
                    submissionStatus.isSuccess 
                      ? 'bg-green-50 text-green-800 border border-green-200' 
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}>
                    {submissionStatus.isSuccess ? (
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                    )}
                    <p className="text-sm">{submissionStatus.message}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submissionStatus.isSubmitting}
                  className="w-full bg-amber-700 hover:bg-amber-800 disabled:bg-amber-400 disabled:cursor-not-allowed text-white px-8 py-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  {submissionStatus.isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Info & Additional Options */}
            <div className="space-y-8">
              {/* Contact Information - EDITED: Using dynamic contactInfoDynamic array */}
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold text-stone-900 mb-6">Get in Touch</h3>
                <div className="space-y-4">
                  {contactInfoDynamic.map((info, index) => (
                    <a
                      key={index}
                      href={info.link}
                      className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors group"
                    >
                      <div className="text-amber-700 group-hover:text-amber-800">
                        {info.icon}
                      </div>
                      <div>
                        <div className="text-sm text-stone-500">{info.title}</div>
                        <div className="text-stone-900 font-medium">{info.value}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Options - EDITED: Pulling links from social_links list */}
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold text-stone-900 mb-6">Other Ways to Connect</h3>
                <div className="space-y-4">
                  {social_links.filter(link => link.platform.includes('Scholar') || link.platform.includes('ResearchGate') || link.platform.includes('ORCID')).map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-4 p-4 rounded-lg border border-stone-200 hover:border-amber-300 hover:bg-amber-50 transition-colors group"
                    >
                      <BookOpen className="h-6 w-6 text-amber-600 group-hover:text-amber-700" />
                      <div>
                        <div className="font-medium text-stone-900">{link.platform}</div>
                        <div className="text-sm text-stone-500">{link.platform.includes('ID') ? link.url.split('/').pop() : `View my complete publication record`}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Social Media - EDITED: Pulling social links from social_links list */}
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold text-stone-900 mb-6">Social Media & Professional Networks</h3>
                <div className="grid grid-cols-2 gap-4">
                  {social_links.filter(link => link.platform.includes('LinkedIn') || link.platform.includes('Twitter') || link.platform.includes('Facebook') || link.platform.includes('Instagram')).map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 p-3 rounded-lg border border-stone-200 hover:border-amber-300 hover:bg-amber-50 transition-colors group"
                    >
                      <BookOpen className="h-5 w-5 text-amber-600 group-hover:text-amber-700" />
                      <span className="text-stone-900 font-medium text-sm">{link.platform}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Response Time - EDITED: Using imported response_time text */}
              <div className="bg-amber-50 p-6 rounded-xl">
                <h4 className="font-semibold text-amber-900 mb-2">Response Time</h4>
                <p className="text-amber-800 text-sm">
                  {response_time}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - EDITED: Using imported faqs list */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-stone-600">
              Quick answers to common questions about collaboration and engagement
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-stone-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-stone-900 mb-3">{faq.question}</h3>
                <p className="text-stone-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
