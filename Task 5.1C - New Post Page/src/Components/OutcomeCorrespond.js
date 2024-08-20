import React from 'react';
import QuestionOutcome from './QuestionOutcome';
import ArticleOutcome from './ArticleOutcome';
import '../Styles/PostButton.css';

function OutcomeCorrespond({postType}) 
{
    return (
        <div>
            {/* Outcome Correspond Section */}
            <div>
                {postType === 'question' && (
                    <QuestionOutcome />       
                )}

                {postType === 'article' && (
                    <ArticleOutcome />
                )}
            </div>

            {/* Post Button */}
            <div>
                <button type = "submit"
                        className = "post-button"
                >Post</button>
            </div>
        </div>
    )
}

export default OutcomeCorrespond;