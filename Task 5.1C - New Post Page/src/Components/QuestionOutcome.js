import React from 'react';
import '../Styles/InlineLayout.css';

function QuestionOutcome() 
{
    return (
        <div>
            <form>
                {/* Title Input Section */}
                <div className = 'inline-layout'>
                    {/* htmlFor is used to links the <label> to the <input>, or <textarea> with the corresponding id
                        This is aiding for assistive technologies screen reader, ... */}
                    <label htmlFor = 'title'>Title</label>
                    <input type = "text"
                           id = "title"
                           placeholder= 'Start your question with how, what, why, etc.'
                    />
                </div>

                {/* Problem Description Section */}
                <div>
                    <label htmlFor = 'description'>Describe your problem</label>
                    <textarea id = "description"
                              style = {{width: '100%', height: '150px', padding: '10px', marginBottom: '20px', boxSizing: 'border-box'}}
                              placeholder = ''
                    />
                </div>

                {/* Tags Input Section */}
                <div>
                    <label htmlFor = 'tags'>Tags</label>
                    <input type = "text"
                           id = "tag"
                           style = {{width: '100%', padding: '10px', marginBottom: '20px', boxSizing: 'border-box'}}
                           placeholder = 'Please add up to 3 tags to describe what your question is about e.g., Java'
                    />
                </div>
            </form>
        </div>
    )
}

export default QuestionOutcome;