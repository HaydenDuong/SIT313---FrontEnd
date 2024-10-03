import React, { useState } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import ReactMarkdown from 'react-markdown';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/markdown/markdown'; // Ensure Markdown mode is available

const MarkdownTestPage = () => {
  const [markdownContent, setMarkdownContent] = useState(''); // Holds the editor's input
  const [submittedContent, setSubmittedContent] = useState(''); // Holds the submitted content

  // Handle submission of the Markdown content
  const handleSubmit = () => {
    setSubmittedContent(markdownContent); // Render the Markdown content after submission
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Markdown Test Page</h2>
      <p>This page allows you to write and preview Markdown content.</p>

      <CodeMirror
        value={markdownContent}
        options={{
          mode: 'markdown',
          theme: 'material',
          lineNumbers: true,
        }}
        onBeforeChange={(editor, data, value) => {
          setMarkdownContent(value); // Update the content in the editor
        }}
      />

      <button onClick={handleSubmit} style={{ marginTop: '10px' }}>
        Submit
      </button>

      {/* Render the submitted Markdown content */}
      {submittedContent && (
        <div style={{ marginTop: '20px' }}>
          <h3>Markdown Preview</h3>
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

export default MarkdownTestPage;
