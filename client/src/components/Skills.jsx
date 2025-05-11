import React from 'react';
import '../styles/Skills.css';

const Skills = ({ skills }) => {
  return (
    <section className="skills" id="skills">
      <div className="skills-content">
        <h2 className="section-title">Skills/Tools</h2>
        <p className="skills-intro">
          Over the years, I've mastered a range of no-code tools and platforms that help me bring 
          powerful digital products to life—quickly, efficiently, and without writing traditional code.
          These are the core tools I use to deliver responsive MVPs, automations, and seamless user 
          experiences:
        </p>
        <div className="skills-grid">
          {skills?.map((skill) => (
            <div key={skill._id} className="skill-card">
              <div className="skill-icon" style={{ backgroundColor: skill.backgroundColor }}>
                <img src={skill.icon} alt={skill.name} />
              </div>
              <h3>{skill.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;