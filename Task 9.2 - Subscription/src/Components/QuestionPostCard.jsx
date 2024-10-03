import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../Utilities/firebase';
import { getDoc, deleteDoc, doc } from 'firebase/firestore';
import { getStorage, ref, deleteObject } from 'firebase/storage'; // Import deleteObject and storage

const QuestionPostCard = ({ post, onPostDeleted }) => {
  const { title, description, tags, imageUrl, user, id, createdAt } = post;
  const [userInfo, setUserInfo] = useState(null);
  const [expanded, setExpanded] = useState(false);  // State for expanding post details
  const [currentUser] = useAuthState(auth);  // Get the current logged-in user

  const storage = getStorage(); // Initialize Firebase Storage

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userDoc = await getDoc(doc(db, 'user', user));
      if (userDoc.exists()) {
        setUserInfo(userDoc.data()); // Fetch user information
      }
    };

    if (user) {
      fetchUserInfo();
    }
  }, [user]);

  // Check if the current user is the owner of the post
  const isOwner = currentUser && currentUser.uid === user;

  // Function to handle post deletion, including image deletion
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        // Delete post from Firestore
        await deleteDoc(doc(db, 'posts', id));

        // If there is an associated image, delete the image from Firebase Storage
        if (imageUrl) {
          // Create a reference to the file to delete
          const imageRef = ref(storage, imageUrl);
          
          // Delete the image from storage
          await deleteObject(imageRef);
          console.log('Image deleted successfully.');
        }

        // Notify parent component about the deletion
        onPostDeleted(id);

        alert('Post deleted successfully!');
      } catch (error) {
        console.error('Error deleting post or image:', error);
      }
    }
  };

  // Toggle expanded state to show more details
  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="post-card">
      {/* Post Image */}
      {imageUrl && <img src={imageUrl} alt={title} />}  {/* Only render image if it exists */}

      {/* Post Summary (Title and Description Preview) */}
      <div className="post-summary" onClick={toggleExpand}>
        <h2>{title}</h2>
        {!expanded && <p>{description.substring(0, 100)}...</p>} {/* Show preview if not expanded */}
      </div>

      {/* Expanded Details */}
      {expanded && (
        <div className="post-details">
          {userInfo && <p>Posted by: {userInfo.displayName}</p>}
          <p>{description}</p>
          <p>Tags: {tags}</p>
          <p>Date: {new Date(createdAt.seconds * 1000).toLocaleDateString()}</p>

          {/* Show Delete Button if user is the owner */}
          {isOwner && (
            <button onClick={handleDelete}>
              Delete Post
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default QuestionPostCard;
