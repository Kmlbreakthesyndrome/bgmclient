import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {faInstagram, faPinterest, faTiktok, faYoutube} from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  const socialMedia = [
    { icon: faInstagram, name: 'instagram' },
    { icon: faPinterest, name: 'pinterest' },
    { icon: faTiktok, name: 'tiktok' },
    { icon: faYoutube, name: 'youtube' },
  ];
  
  const footerLinks = [
    { 
      title: 'Makeup', 
      items: ['Eyes', 'Lips', 'Complexion', 'Brushes'],
      icon: 'fas fa-palette'
    },
    { 
      title: 'Skincare', 
      items: ['Cleansers', 'Serums', 'Masks', 'Sunscreen'],
      icon: 'fas fa-spa'
    },
    { 
      title: 'Brand', 
      items: ['Our Story', 'Sustainability', 'Ingredients', 'Artists'],
      icon: 'fas fa-crown'
    },
    { 
      title: 'Contact', 
      items: [
        '🎨 Studio 42, Art District, Paris', 
        '✉️ create@artistrybeauty.com', 
        '📞 +33 456 789 012'
      ], 
      isTextOnly: true,
      icon: 'fas fa-phone-alt'
    },
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-gray-300 select-none">
      {/* Newsletter Section */}
      <div className="border-t border-b border-opacity-20 border-white py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-2xl md:text-3xl font-serif mb-4 text-white">
            Join Our Artistic Community
          </h3>
          <p className="mb-6 max-w-2xl mx-auto">
            Subscribe to receive beauty inspiration, exclusive offers, and early access to new collections.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow px-4 py-3 bg-gray-800 border border-gray-700 rounded-sm focus:outline-none focus:ring-1 focus:ring-pink-300 text-white"
            />
            <button className="px-6 py-3 bg-gradient-to-r from-rose-500 to-amber-500 text-white font-medium rounded-sm hover:opacity-90 transition-opacity">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="px-6 py-12 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {/* Logo/Brand Section */}
        <div className="lg:col-span-2">
          <h6 className="text-2xl font-serif text-white mb-4 flex items-center">
            <span className="bg-gradient-to-r from-rose-400 to-amber-300 bg-clip-text text-transparent">
              Aura Beauty
            </span>
          </h6>
          <p className="mb-6">
            Where beauty meets artistry. Our products are designed for creators who see makeup as self-expression.
          </p>
          <div className="flex gap-4">
        {socialMedia.map(({ icon, name }) => (
          <a 
            key={name} 
            href="#" 
            className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gradient-to-r from-rose-500 to-amber-500 transition-all duration-300"
          >
            <FontAwesomeIcon icon={icon} className="text-lg" />
          </a>
        ))}
      </div>
        </div>

        {/* Links Sections */}
        {footerLinks.map(({ title, items, isTextOnly, icon }) => (
          <div key={title}>
            <h6 className="text-white uppercase text-sm font-medium mb-4 flex items-center">
              <i className={`${icon} mr-2 text-rose-400`}></i>
              {title}
            </h6>
            <ul className="space-y-2">
              {items.map((item, index) => (
                <li
                  key={index}
                  className={!isTextOnly ? 
                    'hover:text-white cursor-pointer transition-colors duration-200 flex items-start' : 
                    'flex items-start'
                  }
                >
                  {!isTextOnly && (
                    <span className="text-rose-400 mr-2 text-xs mt-1">✦</span>
                  )}
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Copyright Section */}
      <div className="text-center py-6 border-t border-opacity-10 border-white">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs tracking-wider opacity-70">
            © 2025 Artistry Beauty. Makeup is art. Beauty is spirit. 
            All products are cruelty-free and designed for artistic expression.
          </p>
          <div className="flex justify-center gap-4 mt-4 text-xs">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <span>|</span>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <span>|</span>
            <a href="#" className="hover:text-white transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}