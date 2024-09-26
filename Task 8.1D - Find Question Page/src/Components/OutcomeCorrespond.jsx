import React from 'react';
import QuestionOutcome from './QuestionOutcome';
import ArticleOutcome from './ArticleOutcome';
import '../CSS/PostButton.css';

function OutcomeCorrespond({ postType, setTitle, setDescription, setTags }) {
  return (
    <div>
      <div>
        {postType === 'question' && (
          <QuestionOutcome setTitle={setTitle} setDescription={setDescription} setTags={setTags} />
        )}
        {postType === 'article' && (
          <ArticleOutcome setTitle={setTitle} setDescription={setDescription} setTags={setTags} />
        )}
      </div>
    </div>
  );
}

export default OutcomeCorrespond;
