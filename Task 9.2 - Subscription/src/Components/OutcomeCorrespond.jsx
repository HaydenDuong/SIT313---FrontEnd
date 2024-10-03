import React from 'react';
import QuestionOutcome from './QuestionOutcome';
import ArticleOutcome from './ArticleOutcome';

const OutcomeCorrespond = ({ postType, setTitle, setDescription, setTags, markdownContent, setMarkdownContent }) => {
  return (
    <div>
      {postType === 'question' ? (
        <QuestionOutcome
          setTitle={setTitle}
          setDescription={setDescription}
          setTags={setTags}
          markdownContent={markdownContent} // Pass markdown content state
          setMarkdownContent={setMarkdownContent} // Pass markdown setter
        />
      ) : (
        <ArticleOutcome
          setTitle={setTitle}
          setDescription={setDescription}
          setTags={setTags}
        />
      )}
    </div>
  );
};

export default OutcomeCorrespond;

