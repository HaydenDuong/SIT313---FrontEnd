import React, { useState } from 'react';
import ShareSection from '../Components/ShareSection';
import ImageUploadSection from '../Components/ImageUploadSection';
import OutcomeCorrespond from '../Components/OutcomeCorrespond';
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from '../Utilities/firebase';
import '../CSS/PostPage.css';
import { useAuthState } from 'react-firebase-hooks/auth';

const PostPage = () => {
  const [postType, setPostType] = useState('question'); // Default to 'question'
  const [currentUser] = useAuthState(auth);  // Get the current logged-in user
  const [imageUrl, setImageUrl] = useState('');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');

  // Function to handle the post submission
  const handleSubmitPost = async () => {
    if (!title || !description || !tags || !imageUrl) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      const post = {
        title,
        description,
        tags,
        imageUrl,
        postType,
        user: currentUser.uid,
        createdAt: new Date()
      };

      await addDoc(collection(db, 'posts'), post);
      alert('Post submitted successfully!');

      // Clear form fields after submission
      setTitle('');
      setDescription('');
      setTags('');
      setImageUrl('');
    } catch (error) {
      console.error('Error submitting post:', error);
    }
  };

  return (
    <div className="unique-container">
      <ShareSection postType={postType} setPostType={setPostType} />
      <ImageUploadSection setImageUrl={setImageUrl} />
      <OutcomeCorrespond postType={postType} setTitle={setTitle} setDescription={setDescription} setTags={setTags} />
      <button className="post-button" onClick={handleSubmitPost}>
        Post
      </button>
    </div>
  );
}

export default PostPage;

