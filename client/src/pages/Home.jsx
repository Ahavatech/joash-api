import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Footer from '../components/Footer';
import { getAbout, getSkills, getProjects } from '../utils/api';
import '../styles/pages/Home.css';

const Home = () => {
  const [aboutData, setAboutData] = useState(null);
  const [skillsData, setSkillsData] = useState(null);
  const [projectsData, setProjectsData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [about, skills, projects] = await Promise.all([
          getAbout(),
          getSkills(),
          getProjects()
        ]);
        setAboutData(about);
        setSkillsData(skills);
        setProjectsData(projects);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="home">
      <Header />
      <main>
        <Hero />
        <About aboutData={aboutData} />
        <Skills skillsData={skillsData} />
        <Projects projectsData={projectsData} />
      </main>
      <Footer />
    </div>
  );
};

export default Home;