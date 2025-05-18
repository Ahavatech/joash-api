import React, { useState } from 'react';
import '../styles/Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="logo">
        <a href="#hero">
          <span className="logo-text">Joash</span>
          <span className="logo-text secondary">adeoye.</span>
        </a>
      </div>
      <button 
        className={`hamburger ${isMenuOpen ? 'active' : ''}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <nav className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
        <a href="#hero" onClick={handleNavClick}>Home</a>
        <a href="#about" onClick={handleNavClick}>About</a>
        <a href="#projects" onClick={handleNavClick}>Projects</a>
        <a href="#contact" onClick={handleNavClick} className="get-in-touch">Get in touch</a>
      </nav>
    </header>
  );
};

export default Header;