import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from "../assets/logo.jpeg"
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub, FaPhone } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-black text-white py-4">
      <div className="container text-center">
        {/* Logo & Name */}
        <div className="mb-3">
          <img src={Logo} alt="App Logo" className="mb-2" style={{ width: '80px' }} />
          <h4 className="fw-bold">NavMed</h4>
        </div>

        {/* Social Media Links */}
        <div className="mb-3">
          <a href="#" className="text-white me-3 fs-5"><FaFacebook /></a>
          <a href="#" className="text-white me-3 fs-5"><FaTwitter /></a>
          <a href="#" className="text-white me-3 fs-5"><FaInstagram /></a>
          <a href="#" className="text-white fs-5"><FaLinkedin /></a>
        </div>

        {/* Developer Credit */}
        <div className="border-top pt-3">
          <p className="mb-1">Developed by <strong>Matu Wamai</strong></p>
          <p className="mb-1">
            <FaGithub /> <a href="https://github.com/Matuwamai" className="text-white text-decoration-none"> GitHub</a>
          </p>
          <p className="mb-2">
            <FaPhone /> <a href="tel:+254714724209" className="text-white text-decoration-none">0714724209</a>
          </p>
        </div>

        {/* Copyright Notice */}
        <div className="mt-3 border-top pt-2">
          <p className="mb-0">&copy; {new Date().getFullYear()} NavMed. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
