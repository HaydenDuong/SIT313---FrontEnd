import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../Utilities/firebase';
import PostCard from '../Components/PostCard';
import '../CSS/PostCard.css';

const QuestionsPage = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [filter, setFilter] = useState({ title: '', tag: '', date: '' });

  useEffect(() => {
    const fetchQuestions = async () => {
      const questionsSnapshot = await getDocs(collection(db, 'posts'));
      const questionsList = questionsSnapshot.docs
        .filter(doc => doc.data().postType === 'question')
        .map(doc => ({ ...doc.data(), id: doc.id }));
      
      setPosts(questionsList); // Set all posts
      setFilteredPosts(questionsList); // Initially show all posts in filtered state
    };

    fetchQuestions();
  }, []);

  // Function to remove a post from the list when it's deleted
  const handlePostDeleted = (deletedPostId) => {
    const updatedPosts = posts.filter(post => post.id !== deletedPostId);
    setPosts(updatedPosts);
    setFilteredPosts(updatedPosts);
  };

  // Filter posts based on the title, tag, and date inputs
  const handleFilterChange = (type, value) => {
    setFilter(prev => ({ ...prev, [type]: value }));

    let filtered = posts;
    if (filter.title) {
      filtered = filtered.filter(post => post.title.toLowerCase().includes(filter.title.toLowerCase()));
    }
    if (filter.tag) {
      filtered = filtered.filter(post => post.tags.includes(filter.tag));
    }
    if (filter.date) {
      filtered = filtered.filter(post => new Date(post.createdAt.seconds * 1000).toLocaleDateString() === filter.date);
    }

    setFilteredPosts(filtered);
  };

  return (
    <div>
      <h2>Questions</h2>
      {/* Filter Input Section */}
      <div>
        <input 
          placeholder="Filter by title" 
          onChange={(e) => handleFilterChange('title', e.target.value)} 
        />
        <input 
          placeholder="Filter by tag" 
          onChange={(e) => handleFilterChange('tag', e.target.value)} 
        />
        <input 
          type="date" 
          onChange={(e) => handleFilterChange('date', e.target.value)} 
        />
      </div>

      <div className='posts-container'>
        {filteredPosts.map((post) => (
          <PostCard key={post.id} post={post} onPostDeleted={handlePostDeleted} />
        ))}
      </div>
    </div>
  );
};

export default QuestionsPage;
