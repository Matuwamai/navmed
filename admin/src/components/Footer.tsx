import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub, FaPhone } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-6">
      <div className="container mx-auto text-center">
        {/* Logo and Title */}
        <div className="mb-4">
          <img src="/logo.png" alt="App Logo" className="mb-2 mx-auto w-20" />
          <h4 className="font-bold text-lg">NavMed</h4>
        </div>

        {/* Social Media Links */}
        <div className="mb-4 space-x-4 text-xl">
          <a href="#" className="text-white hover:text-gray-400"><FaFacebook /></a>
          <a href="#" className="text-white hover:text-gray-400"><FaTwitter /></a>
          <a href="#" className="text-white hover:text-gray-400"><FaInstagram /></a>
          <a href="#" className="text-white hover:text-gray-400"><FaLinkedin /></a>
        </div>

        {/* Developer Info */}
        <div className="border-t border-gray-700 pt-4">
          <p className="mb-1">Developed by <strong>Matu Wamai</strong></p>
          <p className="mb-1 flex items-center justify-center gap-2">
            <FaGithub />
            <a href="https://github.com/Matuwamai" className="text-white hover:text-gray-400">GitHub</a>
          </p>
          <p className="mb-2 flex items-center justify-center gap-2">
            <FaPhone />
            <a href="tel:+254714724209" className="text-white hover:text-gray-400">0714724209</a>
          </p>
        </div>

        {/* Copyright */}
        <div className="mt-4 border-t border-gray-700 pt-2">
          <p className="text-sm">&copy; {new Date().getFullYear()} NavMed. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
