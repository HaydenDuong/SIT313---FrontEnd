import React from 'react';
import '../CSS/InlineLayout.css';

function QuestionOutcome({ setTitle, setDescription, setTags }) {
  return (
    <div>
      <form>
        <div className='inline-layout'>
          <label htmlFor='title'>Title</label>
          <input type="text" id="title" placeholder='Start your question with how, what, why, etc.'
                 onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div>
          <label htmlFor='description'>Describe your problem</label>
          <textarea id="description" style={{width: '100%', height: '150px'}} onChange={(e) => setDescription(e.target.value)} />
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
