import React from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/markdown/markdown';
import '../CSS/InlineLayout.css';

function QuestionOutcome({ setTitle, setDescription, setTags, markdownContent, setMarkdownContent }) {
  return (
    <div>
      <form>
        <div className='inline-layout'>
          <label htmlFor='title'>Title</label>
          <input type="text" id="title" placeholder='Start your question with how, what, why, etc.'
                 onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div>
          <label htmlFor='description'>Describe your problem (Markdown supported)</label>
          {/* Markdown Editor */}
          <CodeMirror
            value={markdownContent}
            options={{
              mode: 'markdown',
              lineNumbers: true,
            }}
            onBeforeChange={(editor, data, value) => {
              setMarkdownContent(value);
              setDescription(value); // Update description with markdown content
            }}
          />
        </div>

        <div>
          <label htmlFor='tags'>Tags</label>
          <input type="text" id="tags" onChange={(e) => setTags(e.target.value)} />
        </div>
      </form>
    </div>
  );
}

export default QuestionOutcome;

