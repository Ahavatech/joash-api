import React, { useState, useEffect } from 'react';
import { getAbout, updateAbout } from '../../utils/api';
import '../../styles/Admin/EditAbout.css';

const EditAbout = () => {
  const [content, setContent] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [newKeyword, setNewKeyword] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAboutContent();
  }, []);

  const fetchAboutContent = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAbout();
      setContent(data.content || '');
      setKeywords(data.keywords?.map(k => ({
        text: k.text,
        highlighted: k.highlighted ?? true
      })) || []);
    } catch (error) {
      setError('Failed to load about content. Please try again.');
      console.error('Error fetching about content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddKeyword = (e) => {
    e.preventDefault();
    const trimmedKeyword = newKeyword.trim();
    if (!trimmedKeyword) return;

    // Check for duplicates
    if (keywords.some(k => k.text.toLowerCase() === trimmedKeyword.toLowerCase())) {
      setError('This keyword already exists');
      return;
    }

    setKeywords([...keywords, { 
      text: trimmedKeyword, 
      highlighted: true 
    }]);
    setNewKeyword('');
    setError(null);
  };

  const handleRemoveKeyword = (indexToRemove) => {
    setKeywords(prevKeywords => 
      prevKeywords.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleToggleHighlight = (index) => {
    setKeywords(prevKeywords => 
      prevKeywords.map((keyword, i) => 
        i === index 
          ? { ...keyword, highlighted: !keyword.highlighted }
          : keyword
      )
    );
  };

  const handleSave = async () => {
    if (!content.trim()) {
      setError('About content cannot be empty');
      return;
    }

    try {
      setSaving(true);
      setError(null);
      await updateAbout({
        content: content.trim(),
        keywords: keywords.map(k => ({
        text: k.text,
        highlighted: k.highlighted}))
      });
      setSaving(false);
    } catch (error) {
      setError('Failed to save changes. Please try again.');
      console.error('Error updating about content:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="edit-about">
        <div className="loading-state">Loading content...</div>
      </div>
    );
  }

  return (
    <div className="edit-about">
      {error && <div className="error-message">{error}</div>}
      
      <div className="about-content-editor">
        <label htmlFor="about-content">About Content</label>
        <textarea
          id="about-content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter your about section content..."
          rows={10}
        />
      </div>

      <div className="keywords-section">
        <h3>Keywords (Click to toggle highlight)</h3>
        <div className="keywords-list">
          {keywords.map((keyword, index) => (
            <div 
              key={index} 
              className={`keyword-item ${keyword.highlighted ? 'highlighted' : ''}`}
              onClick={() => handleToggleHighlight(index)}
              title={keyword.highlighted ? 'Click to unhighlight' : 'Click to highlight'}
            >
              <span className="keyword-text">{keyword.text}</span>
              <button
                type="button"
                className="remove-keyword"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveKeyword(index);
                }}
                title="Remove keyword"
                aria-label={`Remove keyword ${keyword.text}`}
              >
                ×
              </button>
            </div>
          ))}
          {keywords.length === 0 && (
            <div className="empty-keywords">No keywords added yet</div>
          )}
        </div>

        <form onSubmit={handleAddKeyword} className="add-keyword-form">
          <input
            type="text"
            value={newKeyword}
            onChange={(e) => setNewKeyword(e.target.value)}
            placeholder="Add new keyword"
            className="add-keyword-input"
          />
          <button 
            type="submit" 
            className="add-keyword-button"
            disabled={!newKeyword.trim()}
          >
            Add Keyword
          </button>
        </form>
      </div>

      <button 
        className="save-button" 
        onClick={handleSave}
        disabled={saving || !content.trim()}
      >
        {saving ? 'Saving...' : 'Save Changes'}
      </button>
    </div>
  );
};

export default EditAbout;