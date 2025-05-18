import React, { useEffect, useState } from 'react';
import { getProfileImage } from '../utils/api';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Reviews from '../components/Reviews';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import '../styles/pages/Home.css';

const Home = () => {
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const { imageUrl } = await getProfileImage();
        setProfileImage(imageUrl);
      } catch (error) {
        console.error('Error fetching profile image:', error);
      }
    };

    fetchProfileImage();
  }, []);

  return (
    <div className="home">
      <Hero profileImage={profileImage} />
      <About />
      <Skills />
      <Projects />
      <Reviews />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;