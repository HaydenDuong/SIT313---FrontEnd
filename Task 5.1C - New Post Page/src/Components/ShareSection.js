import React from 'react';
import '../Styles/ShareSection.css';

function ShareSection({postType, setPostType})
{
    // Handling the event
    const handlePostTypeChange = (event) => {
        setPostType(event.target.value);
    };

    return (
        <div>

            <div className = "header">New Post</div>

            <br />
            <form>
                <div>

                    <label>Select Post Type: </label>
                    
                    {/* <input ... />, <img ... />, <br />, <hr /> are the void elements - HTML elements that do not and cannot have any content or children inside them
                        Hence they do not have </input>, </img>, ... . Thus, <input ... />,... is the correct syntax */}
                    <input type = "radio"
                           value = "question"
                           checked = {postType === 'question'}
                           onChange = {handlePostTypeChange}
                    /> Question 
                    
                    &nbsp;&nbsp; {/* Spacing between elements */}

                    <input type = "radio"
                           value = "article"
                           checked = {postType === 'article'}
                           onChange = {handlePostTypeChange}
                    /> Article

                </div>
            </form>
            <br />

            <div className = "header">What do you want to ask or share</div>

            <div>
                {/* <span>...</span> is an inline element, which does not break the flow of the text
                    <p>...</p> is block-level element, which means that it always starts on a new lne and takes up the full width available */}
                <p>This section is designed based on the type of the post. It could be developed by conditional rendering.{' '}

                    {postType === 'question' && (
                        <span className = 'red-text'>For post a question, the following section would be appeared.</span>
                    )} 

                    {postType === 'article' && (
                        <span className = 'red-text'>For post an article, the following section would be appeared.</span>
                    )}
                </p>
            </div>

        </div>
    )
}

export default ShareSection;