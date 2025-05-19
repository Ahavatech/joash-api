import React, { useState, useEffect } from 'react';
import { updateAbout, getAbout } from '../../utils/api';
import '../../styles/Admin/EditAbout.css';

const EditAbout = () => {
  const [formData, setFormData] = useState({
    fullContent: '',
    keywords: [
      'NoCode solutions expert',
      'functional, user-friendly digital products',
      'Bubble.io',
      'Figma',
      'automation tools',
      'responsive, scalable MVPs',
      'landing pages',
      'automated workflows',
      'sleek websites',
      'AI-powered tools like OpenAI'
    ],
    name: '',
    role: '',
    description: '',
    experience: '',
    mission: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      const data = await getAbout();
      if (data) {
        setFormData(prev => ({
          ...prev,
          ...data
        }));
      }
    } catch (err) {
      setError('Failed to fetch about data');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await updateAbout(formData);
      alert('About section updated successfully!');
    } catch (err) {
      setError('Failed to update about section');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleKeywordChange = (index, value) => {
    const newKeywords = [...formData.keywords];
    newKeywords[index] = value;
    setFormData(prev => ({
      ...prev,
      keywords: newKeywords
    }));
  };

  const addKeyword = () => {
    setFormData(prev => ({
      ...prev,
      keywords: [...prev.keywords, '']
    }));
  };

  const removeKeyword = (index) => {
    setFormData(prev => ({
      ...prev,
      keywords: prev.keywords.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="edit-about">
      <h2>Edit About Section</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullContent">Full Content</label>
          <textarea
            id="fullContent"
            name="fullContent"
            value={formData.fullContent}
            onChange={handleChange}
            rows={8}
            placeholder="Enter the complete about section text here..."
          />
        </div>

        <div className="form-group">
          <label>Keywords (Highlighted Terms)</label>
          <div className="keywords-list">
            {formData.keywords.map((keyword, index) => (
              <div key={index} className="keyword-item">
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => handleKeywordChange(index, e.target.value)}
                  placeholder="Enter keyword"
                />
                <button 
                  type="button" 
                  onClick={() => removeKeyword(index)}
                  className="remove-keyword"
                >
                  ×
                </button>
              </div>
            ))}
            <button type="button" onClick={addKeyword} className="add-keyword">
              + Add Keyword
            </button>
          </div>
        </div>

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Updating...' : 'Update About'}
        </button>
      </form>
    </div>
  );
};

export default EditAbout;