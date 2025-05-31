import React, { useState } from 'react';
import { FaBars, FaSearch, FaUserCircle } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import logo from '../../assets/website-logo/website Logo.png';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { isLoggedIn, isAdminLoggedIn } = useAuth();

  const NAVDATA = [
    { name: 'Skincare', href: '/skincare' },
    { name: 'Brands', href: '/brands' },
    { name: 'Fragrance', href: '/fragrance' },
  ];

  // Animation variants
  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
  };

  const searchVariants = {
    hidden: { width: 0, opacity: 0 },
    visible: { width: '100%', opacity: 1 }
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
      className="fixed w-full bg-gradient-to-r from-pink-50 to-pink-100 h-20 px-4 sm:px-8 md:px-16 lg:px-24 z-50 text-pink-900 border-b border-pink-200 shadow-sm backdrop-blur-sm bg-opacity-90"
    >
      <div className="flex justify-between items-center h-full max-w-7xl mx-auto">
        {/* Logo */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex items-center"
        >
          <Link to="/" className="flex items-center">
            <motion.img 
              initial={{ rotate: -15 }}
              animate={{ rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className='w-12 h-12 rounded-full object-cover border-2 border-pink-300 shadow-md hover:shadow-lg transition-shadow'
              src={logo} 
              alt="Aura Beauty Logo"
            />
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="ml-3 text-xl font-serif font-bold text-pink-800 hidden sm:block"
            >
              Aura Beauty
            </motion.span>
          </Link>
        </motion.div>
        
        {/* Desktop Navigation */}
        <div className='hidden md:flex items-center gap-10'>
          <ul className="flex gap-6 lg:gap-8 items-center font-medium">
            {NAVDATA.map((item, index) => (
              <motion.li 
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  to={item.href} 
                  className="relative group hover:text-pink-600 transition duration-300 text-sm uppercase tracking-wider font-medium px-1 py-2"
                >
                  {item.name}
                  <motion.span 
                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-600 group-hover:w-full transition-all duration-300"
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                  />
                </Link>
              </motion.li>
            ))}
          </ul>

          <div className='flex gap-4 lg:gap-6 items-center'>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-pink-700 focus:outline-none"
            >
            
              <FaSearch className="text-xl" />
            
            </motion.button>

            {isLoggedIn && isAdminLoggedIn ? (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/profile" className="flex items-center">
                  <FaUserCircle className="text-2xl text-pink-700" />
                </Link>
              </motion.div>
            ) : (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to='/signUp'>
                  <button className='bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 transition-all px-5 py-2 rounded-full text-pink-50 font-medium text-sm tracking-wider uppercase shadow-md hover:shadow-lg'>
                    Sign Up
                  </button>
                </Link>
              </motion.div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className='md:hidden flex items-center gap-4'>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setSearchOpen(!searchOpen)}
            className="text-pink-700 focus:outline-none"
          >
            <FaSearch className="text-xl" onClick={()=>setMenuOpen(false)} />
          </motion.button>

          {isLoggedIn && isAdminLoggedIn && (
            <Link to="/profile" className="flex items-center">
              <FaUserCircle className="text-2xl text-pink-700" />
            </Link>
          )}

          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-pink-700 focus:outline-none"
          >
            {menuOpen ? (
              <IoCloseSharp className='text-2xl' />
            ) : (
              <FaBars className='text-2xl' />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div 
            variants={searchVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="absolute top-20 left-0 w-full bg-white px-4 py-3 shadow-md z-40"
          >
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 border border-pink-200 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="absolute top-20 left-0 w-full bg-gradient-to-b from-pink-50 to-pink-100 text-pink-900 z-40 shadow-lg border-t border-pink-200"
          >
            <ul className='flex flex-col text-center space-y-6 py-6 px-4'>
              {NAVDATA.map((item, index) => (
                <motion.li 
                  key={index}
                  variants={itemVariants}
                >
                  <Link 
                    to={item.href} 
                    onClick={() => setMenuOpen(false)}
                    className="block py-2 hover:text-pink-600 text-sm uppercase tracking-wider transition font-medium"
                  >
                    {item.name}
                  </Link>
                </motion.li>
              ))}
              <motion.li 
                variants={itemVariants}
                className="pt-4"
              >
                <Link 
                  to='/signUp' 
                  onClick={() => setMenuOpen(false)}
                  className="inline-block"
                >
                  <button className='bg-gradient-to-r from-pink-600 to-pink-700 text-pink-50 px-8 py-3 rounded-full hover:from-pink-700 hover:to-pink-800 transition-all uppercase text-sm tracking-wider shadow-md'>
                    Sign In
                  </button>
                </Link>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

