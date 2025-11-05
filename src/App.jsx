import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Phone, MapPin, Award, Briefcase, GraduationCap, Code, ExternalLink, ChevronDown, Menu, X, Star } from 'lucide-react';

const App = () => {
  const [portfolioData, setPortfolioData] = useState(null);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Load data from JSON file
  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}portfolio-data.json`)  // ← CHANGEMENT ICI
      .then(response => response.json())
      .then(data => setPortfolioData(data))
      .catch(error => console.error('Error loading data:', error));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
      setMobileMenuOpen(false);
    }
  };

  if (!portfolioData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              MB
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'experience', 'projects', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize transition-colors ${activeSection === item ? 'text-purple-400' : 'text-gray-300 hover:text-white'}`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-900/95 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['home', 'about', 'experience', 'projects', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="block w-full text-left px-3 py-2 capitalize hover:bg-slate-800 rounded-md"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-16">
        <div className="max-w-4xl mx-auto text-center">
         <div className="mb-8">
            <img
              src={`${import.meta.env.BASE_URL}avatar.jpeg`} // chemin depuis public/
              alt={portfolioData.personal.name}
              className="w-32 h-32 mx-auto mb-6 rounded-full object-cover border-4 border-purple-500/50"
            />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
            {portfolioData.personal.name}
          </h1>
          <p className="text-2xl md:text-3xl text-purple-300 mb-4">{portfolioData.personal.subtitle}</p>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">{portfolioData.personal.bio}</p>
          
          <div className="flex justify-center space-x-4 mb-8">
            <a href={portfolioData.personal.github} target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-800 hover:bg-purple-600 rounded-full transition-colors">
              <Github size={24} />
            </a>
            <a href={portfolioData.personal.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-800 hover:bg-purple-600 rounded-full transition-colors">
              <Linkedin size={24} />
            </a>
            <a href={`mailto:${portfolioData.personal.email}`} className="p-3 bg-slate-800 hover:bg-purple-600 rounded-full transition-colors">
              <Mail size={24} />
            </a>
          </div>

          <button onClick={() => scrollToSection('projects')} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105">
            View My Work
          </button>

          <div className="mt-12 animate-bounce">
            <ChevronDown size={32} className="mx-auto text-purple-400" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">About Me</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-purple-500/20">
              <GraduationCap className="text-purple-400 mb-4" size={32} />
              <h3 className="text-2xl font-bold mb-4">Education</h3>
              {portfolioData.education.map((edu) => (
                <div key={edu.id} className="mb-6 last:mb-0">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-purple-300">{edu.degree}</h4>
                    <span className="text-sm text-gray-400">{edu.startDate} - {edu.endDate}</span>
                  </div>
                  <p className="text-gray-300 font-medium">{edu.institution}</p>
                  <p className="text-sm text-purple-400 mb-2">{edu.status}</p>
                  {edu.thesis && <p className="text-sm text-gray-400 italic">Thesis: {edu.thesis}</p>}
                </div>
              ))}
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-purple-500/20">
              <Award className="text-purple-400 mb-4" size={32} />
              <h3 className="text-2xl font-bold mb-4">Awards & Recognition</h3>
              {portfolioData.awards.map((award, idx) => (
                <div key={idx} className="mb-4 last:mb-0 flex items-start">
                  <Star className="text-yellow-400 mr-2 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <p className="font-semibold text-purple-300">{award.title}</p>
                    <p className="text-sm text-gray-400">{award.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-purple-500/20">
            <h3 className="text-2xl font-bold mb-6 text-center">Technical Skills</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(portfolioData.skills).map(([category, skills]) => (
                <div key={category}>
                  <h4 className="text-purple-400 font-semibold mb-3">{category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, idx) => (
                      <span key={idx} className="px-3 py-1 bg-purple-900/50 rounded-full text-sm border border-purple-500/30">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4 bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Experience</span>
          </h2>
          
          <div className="space-y-8">
            {portfolioData.experience.map((exp) => (
              <div key={exp.id} className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-purple-500/20 hover:border-purple-500/50 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-purple-300">{exp.title}</h3>
                    <p className="text-lg text-gray-300">{exp.company}</p>
                    <p className="text-sm text-gray-400 flex items-center mt-1">
                      <MapPin size={16} className="mr-1" /> {exp.location}
                    </p>
                  </div>
                  <span className="text-sm text-gray-400">{exp.startDate} - {exp.endDate}</span>
                </div>
                
                <ul className="space-y-2 mb-4">
                  {exp.description.map((item, idx) => (
                    <li key={idx} className="text-gray-300 flex items-start">
                      <span className="text-purple-400 mr-2">▹</span>
                      {item}
                    </li>
                  ))}
                </ul>
                
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, idx) => (
                    <span key={idx} className="px-3 py-1 bg-purple-900/50 rounded-full text-sm border border-purple-500/30">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Featured Projects</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {portfolioData.projects.map((project) => (
              <div key={project.id} className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-purple-500/20 hover:border-purple-500/50 transition-all hover:transform hover:scale-105">
                <div className="flex justify-between items-start mb-4">
                  <Code className="text-purple-400" size={32} />
                  <span className="px-3 py-1 bg-purple-900/50 rounded-full text-xs">{project.category}</span>
                </div>
                
                <h3 className="text-xl font-bold mb-2 text-purple-300">{project.title}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, idx) => (
                    <span key={idx} className="px-2 py-1 bg-slate-700/50 rounded text-xs border border-purple-500/20">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex space-x-3">
                  <a href={project.githubLink} target="_blank" className="flex items-center text-purple-400 hover:text-purple-300 transition-colors">
                    <Github size={18} className="mr-1" /> Code
                  </a>
                  <a href={project.demoLink} target="_blank" className="flex items-center text-purple-400 hover:text-purple-300 transition-colors">
                    <ExternalLink size={18} className="mr-1" /> Demo
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-slate-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Get In Touch</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            I'm currently seeking opportunities. Let's connect!
          </p>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-8">
            <a href={`mailto:${portfolioData.personal.email}`} className="flex items-center text-purple-300 hover:text-purple-400 transition-colors">
              <Mail className="mr-2" /> {portfolioData.personal.email}
            </a>
            <a href={`mailto:${portfolioData.personal.email}`} className="flex items-center text-purple-300 hover:text-purple-400 transition-colors">
              <Mail className="mr-2" /> {portfolioData.personal.email2}
            </a>
            
          </div>
          
          <a href={`mailto:${portfolioData.personal.email}`} className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105">
            Send Message
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-purple-500/20">
        <div className="max-w-6xl mx-auto text-center text-gray-400">
          <p>© 2025 {portfolioData.personal.name}. Mohamed Bachir SANOU</p>
        </div>
      </footer>
    </div>
  );
};

export default App;