import React from 'react';
import '../Styles/InlineLayout.css';

function ArticleOutcome() 
{
    return (
        <div>
            <form>
                {/* Title Input Section */}
                <div className = 'inline-layout'>
                    <label htmlFor = 'title'>Title</label>
                    <input type = "text"
                           id = "title"
                           placeholder = 'Enter a descriptive title'
                    />
                </div>

                {/* Abstract Input Section */}
                <div>
                    <label htmlFor = 'abstract'>Abstract</label>
                    <textarea id = "abstact"
                              style = {{width: '100%', height: '80px', padding: '10px', marginBottom: '20px', boxSizing: 'border-box'}}  
                              placeholder = 'Enter a 1-paragraph abstract'
                    />       
                </div>

                {/* Article Text Section */}
                <div>
                    <label htmlFor = 'articleText'>Article Text</label>
                    <textarea id = "articleText"
                              style = {{width: '100%', height: '150px', padding: '10px', marginBottom: '20px', boxSizing: 'border-box'}}
                              placeholder = 'Enter a paragraph'
                    />
                </div>

                {/* Tags Input Section */}
                <div>
                    <label htmlFor = 'tags'>Tags</label>
                    <input type = "text"
                           id = "tag"
                           style = {{width: '100%', padding: '10px', marginBottom: '20px', boxSizing: 'border-box'}}
                           placeholder = 'Please add up to 3 tags to describe what your article is about e.g., Java'
                    />
                </div>
            </form>
        </div>
    )
}

export default ArticleOutcome;
