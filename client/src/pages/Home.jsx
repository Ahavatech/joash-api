import React, { useEffect, useState } from 'react';
import { getProfile } from '../utils/api';
import Header from '../components/Header';
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
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const profile = await getProfile();
        // Make sure we're using the secure_url from Cloudinary
        if (profile?.imageUrl) {
          setProfileImage(profile.imageUrl);
        }
        setProfileData(profile);
        console.log('Fetched profile:', profile); // Debug log
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
    // Poll for updates every 3 seconds while the component is mounted
    const interval = setInterval(fetchProfileData, 3000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home">
      <Header/>
      <Hero 
        profileImage={profileImage} 
        profileData={profileData} 
        key={profileImage} // Force re-render when image changes
      />
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