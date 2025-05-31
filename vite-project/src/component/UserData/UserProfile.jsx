import React from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { FaEnvelope, FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';

export default function UserProfile() {
  const { userData } = useAuth();
  const img = userData?.img?.[0]?.url;

  const socialLinks = [
    { icon: <FaGithub className="text-xl" />, url: "#" },
    { icon: <FaLinkedin className="text-xl" />, url: "#" },
    { icon: <FaTwitter className="text-xl" />, url: "#" },
    { icon: <FaInstagram className="text-xl" />, url: "#" }
  ];

  return (
    <div className="flex justify-center items-center h-screen bg-[url('/asphalt-texture.jpg')] bg-cover bg-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-black text-white border-4 border-red-600 racing-font rounded-xl w-full max-w-3xl flex flex-col md:flex-row shadow-2xl"
      >
        {/* Left Side - Image */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="md:w-1/3 bg-red-600 flex items-center justify-center p-6"
        >
          <div className="relative">
            <div className="absolute -inset-2 bg-red-400 blur-lg rounded-full"></div>
            <img
              src={img}
              alt={userData.name}
              className="relative w-40 h-40 rounded-full object-cover border-4 border-white shadow-xl z-10"
            />
          </div>
        </motion.div>

        {/* Right Side - Details */}
        <div className="md:w-2/3 p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="space-y-4"
          >
            <h1 className="text-4xl font-bold text-red-500 uppercase tracking-widest flex items-center gap-2">
              {userData.name}
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2, repeatDelay: 3 }}
              >
                🏎️
              </motion.span>
            </h1>

            <div className="flex items-center text-gray-300 space-x-3">
              <FaEnvelope className="text-red-400" />
              <span>{userData.email}</span>
            </div>

            <div className="pt-4">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Pit Lane Socials
              </h3>
              <div className="flex space-x-4">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -2, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gray-900 hover:bg-red-700 text-white p-3 rounded-full transition-all"
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
