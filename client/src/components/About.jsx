import React, { useEffect, useState } from 'react';
import { getAbout } from '../utils/api';
import '../styles/About.css';

const About = () => {
  const [aboutData, setAboutData] = useState({
    content: '',
    keywords: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Add useEffect to fetch data when component mounts
  useEffect(() => {
    fetchAboutContent();
  }, []);

  const fetchAboutContent = async () => {
    try {
      const data = await getAbout();
      console.log('Fetched about data:', data); // Debug log
      
      if (!data) {
        throw new Error('No data received');
      }

      setAboutData({
        content: data.content || '',
        keywords: Array.isArray(data.keywords) ? data.keywords : []
      });
    } catch (error) {
      console.error('Error fetching about content:', error);
      setError('Failed to load content');
    } finally {
      setLoading(false);
    }
  };

  const highlightKeywords = (content, keywords) => {
    if (!content || !Array.isArray(keywords) || keywords.length === 0) {
      return content;
    }

    let highlightedContent = content;
    
    // Debug log
    console.log('Processing keywords:', keywords);

    const sortedKeywords = [...keywords]
      .filter(k => k.highlighted)
      .sort((a, b) => b.text.length - a.text.length);

    sortedKeywords.forEach(keyword => {
      if (!keyword.text) return;
      
      const regex = new RegExp(`(${keyword.text})`, 'gi');
      highlightedContent = highlightedContent.replace(
        regex,
        `<span class="highlight">$1</span>`
      );
    });

    return highlightedContent;
  };

  if (error) {
    return <div className="about error">{error}</div>;
  }

  if (loading) {
    return <div className="about loading">Loading...</div>;
  }

  // Debug log for rendered content
  console.log('Rendering about data:', aboutData);

  return (
    <section className="about" id="about">
      <div className="about-content">
        <h2 className="section-title">About Me<span className="title-line"></span></h2>
        <div className="about-text">
          {aboutData.content ? (
            <div
              className="content"
              dangerouslySetInnerHTML={{
                __html: highlightKeywords(aboutData.content, aboutData.keywords)
              }}
            />
          ) : (
            <p>No content available</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default About;