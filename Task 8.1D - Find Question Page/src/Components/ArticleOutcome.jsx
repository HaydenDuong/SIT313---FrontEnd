import React from 'react';
import '../CSS/InlineLayout.css';

function ArticleOutcome({ setTitle, setDescription, setTags }) {
  return (
    <div>
      <form>
        {/* Title Input Section */}
        <div className="inline-layout">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            placeholder="Enter a descriptive title"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Abstract Input Section */}
        <div>
          <label htmlFor="abstract">Abstract</label>
          <textarea
            id="abstract"
            style={{ width: '100%', height: '80px', padding: '10px', marginBottom: '20px', boxSizing: 'border-box' }}
            placeholder="Enter a 1-paragraph abstract"
            onChange={(e) => setDescription(e.target.value)} // Setting this as the description field
            required
          />
        </div>

        {/* Article Text Section */}
        <div>
          <label htmlFor="articleText">Article Text</label>
          <textarea
            id="articleText"
            style={{ width: '100%', height: '150px', padding: '10px', marginBottom: '20px', boxSizing: 'border-box' }}
            placeholder="Write your article content here"
            onChange={(e) => setDescription(e.target.value)} // Also setting this as description
            required
          />
        </div>

        {/* Tags Input Section */}
        <div>
          <label htmlFor="tags">Tags</label>
          <input
            type="text"
            id="tags"
            style={{ width: '100%', padding: '10px', marginBottom: '20px', boxSizing: 'border-box' }}
            placeholder="Please add up to 3 tags to describe what your article is about e.g., Java"
            onChange={(e) => setTags(e.target.value)}
            required
          />
        </div>
      </form>
    </div>
  );
}

export default ArticleOutcome;