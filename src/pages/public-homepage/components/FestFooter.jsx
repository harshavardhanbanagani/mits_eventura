import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const FestFooter = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Quick Links",
      links: [
        { label: "Home", path: "/public-homepage" },
        { label: "Events", path: "/event-registration-form" },
        { label: "Registration", path: "/event-registration-form" },
        { label: "Admin Login", path: "/admin-login" }
      ]
    },
    {
      title: "Departments",
      links: [
        { label: "Computer Science", path: "#" },
        { label: "Electronics", path: "#" },
        { label: "Mechanical", path: "#" },
        { label: "Civil Engineering", path: "#" }
      ]
    },
    {
      title: "Support",
      links: [
        { label: "Help Center", path: "#" },
        { label: "Contact Us", path: "#contact" },
        { label: "FAQs", path: "#" },
        { label: "Technical Support", path: "#" }
      ]
    }
  ];

  const socialLinks = [
    { name: "Facebook", icon: "Facebook", url: "#", color: "hover:text-blue-600" },
    { name: "Twitter", icon: "Twitter", url: "#", color: "hover:text-blue-400" },
    { name: "Instagram", icon: "Instagram", url: "#", color: "hover:text-pink-600" },
    { name: "LinkedIn", icon: "Linkedin", url: "#", color: "hover:text-blue-700" },
    { name: "YouTube", icon: "Youtube", url: "#", color: "hover:text-red-600" }
  ];

  const contactInfo = [
    {
      icon: "MapPin",
      title: "Address",
      content: "MITS Campus, Madanapalle\nAndhra Pradesh - 517325"
    },
    {
      icon: "Phone",
      title: "Phone",
      content: "+91 8571-255-555\n+91 8571-255-556"
    },
    {
      icon: "Mail",
      title: "Email",
      content: "techfest@mits.edu\ninfo@mits.edu"
    }
  ];

  return (
    <footer className="bg-foreground text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* College Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Calendar" size={28} color="white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">MITS</h3>
                <p className="text-sm text-white/70">TechFest 2025</p>
              </div>
            </div>
            
            <p className="text-white/80 text-sm mb-6 leading-relaxed">
              Madanapalle Institute of Technology & Science presents the biggest technical festival of the year. Join us for innovation, competition, and excellence.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  className={`w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center transition-all duration-300 ${social.color} hover:bg-white/20`}
                  aria-label={social.name}
                >
                  <Icon name={social.icon} size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="text-lg font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    {link.path.startsWith('#') ? (
                      <button
                        onClick={() => {
                          const element = document.querySelector(link.path);
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                          }
                        }}
                        className="text-white/70 hover:text-white transition-colors duration-150 text-sm"
                      >
                        {link.label}
                      </button>
                    ) : (
                      <Link
                        to={link.path}
                        className="text-white/70 hover:text-white transition-colors duration-150 text-sm"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Information */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <h4 className="text-lg font-semibold mb-6">Contact Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactInfo.map((contact, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name={contact.icon} size={18} className="text-primary" />
                </div>
                <div>
                  <h5 className="font-medium mb-1">{contact.title}</h5>
                  <p className="text-white/70 text-sm whitespace-pre-line">
                    {contact.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-white/70">
              <p>© {currentYear} MITS TechFest. All rights reserved.</p>
              <span className="hidden md:inline">|</span>
              <p className="hidden md:inline">Developed by MITS CSE Department</p>
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <a href="#" className="text-white/70 hover:text-white transition-colors duration-150">
                Privacy Policy
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors duration-150">
                Terms of Service
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors duration-150">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FestFooter;