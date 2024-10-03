import React, { useState } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import ReactMarkdown from 'react-markdown';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/markdown/markdown'; // Ensure Markdown mode is available

const PostEditor = () => {
  const [postContent, setPostContent] = useState(''); // Holds the editor's input
  const [submittedContent, setSubmittedContent] = useState(''); // Holds the submitted content

  // Handle submission of the post
  const handleSubmit = () => {
    setSubmittedContent(postContent); // Render the Markdown content after submission
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Write a Post</h2>
      <CodeMirror
        value={postContent}
        options={{
          mode: 'markdown',
          theme: 'material',
          lineNumbers: true,
        }}
        onBeforeChange={(editor, data, value) => {
          setPostContent(value); // Update the post content
        }}
      />
      <button onClick={handleSubmit} style={{ marginTop: '10px' }}>
        Submit Post
      </button>

      {/* Render the submitted Markdown content */}
      {submittedContent && (
        <div style={{ marginTop: '20px' }}>
          <h3>Preview</h3>
          <div
            style={{
              backgroundColor: '#f9f9f9',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            <ReactMarkdown>{submittedContent}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostEditor;