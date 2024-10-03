import React, { useState, useEffect } from 'react';
import { useTheme } from '../Theme/ThemeContext';  // Use the theme context
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const ThemeTestPage = () => {
  const { theme, toggleTheme, saveThemeToFirestore, isPremium } = useTheme();  // Access the current theme and premium status
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const db = getFirestore();
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();

  // Fetch all messages from Firestore
  useEffect(() => {
    const fetchMessages = async () => {
      const messagesSnapshot = await getDocs(collection(db, 'messages'));
      const messagesList = messagesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMessages(messagesList);
    };

    fetchMessages();
  }, [db]);

  // Handle message post
  const handlePostMessage = async () => {
    if (!message.trim()) return;

    try {
      await addDoc(collection(db, 'messages'), {
        message: message,
        createdAt: new Date(),
        userId: user.uid,
        userName: user.displayName || 'Anonymous',
      });

      setMessage('');  // Clear the input after posting
      alert('Message posted successfully!');

      // Refresh the message list after posting
      const messagesSnapshot = await getDocs(collection(db, 'messages'));
      const messagesList = messagesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMessages(messagesList);
      
    } catch (error) {
      console.error('Error posting message:', error);
    }
  };

  // Handle message delete
  const handleDeleteMessage = async (id) => {
    try {
      await deleteDoc(doc(db, 'messages', id));
      setMessages(messages.filter(msg => msg.id !== id));  // Remove the deleted message from state
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  // Handle theme toggle and save for premium users
  const handleToggleTheme = () => {
    toggleTheme();
    if (isPremium) {
      saveThemeToFirestore(theme);  // Save theme for premium users
    }
  };

  const handleHomeRedirect = () => {
    navigate('/');
  };

  return (
    <div style={{ backgroundColor: theme.background, color: theme.text, height: '100vh', padding: '20px' }}>
      <h1>Messages and Theme Testing Page</h1>
      <p>This page allows premium users to switch themes and post messages.</p>

      {/* Theme switching feature for premium users */}
      {isPremium && (
        <div style={{ marginBottom: '20px' }}>
          <button 
            onClick={handleToggleTheme} 
            style={{ 
              backgroundColor: theme.buttonBackground, 
              color: theme.buttonText, 
              padding: '10px 20px', 
              border: 'none', 
              borderRadius: '5px', 
              cursor: 'pointer' 
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = theme.buttonHoverBackground}
            onMouseLeave={(e) => e.target.style.backgroundColor = theme.buttonBackground}
          >
            Switch Theme
          </button>
        </div>
      )}

      {/* Only show input to premium users */}
      {isPremium && (
        <div>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
            style={{ backgroundColor: theme.inputBackground, color: theme.text, padding: '10px', width: '100%', height: '100px' }}
          />
          <button
            onClick={handlePostMessage}
            style={{
              backgroundColor: theme.buttonBackground,
              color: theme.buttonText,
              padding: '10px 20px',
              margin: '10px 0',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = theme.buttonHoverBackground}
            onMouseLeave={(e) => e.target.style.backgroundColor = theme.buttonBackground}
          >
            Post Message
          </button>
        </div>
      )}

      <div style={{ marginTop: '20px' }}>
        <h2>Messages</h2>
        {messages.map(msg => (
          <div
            key={msg.id}
            style={{
              backgroundColor: theme.cardBackground,
              color: theme.text,
              padding: '20px',
              borderRadius: '10px',
              margin: '10px 0',
              boxShadow: theme.cardShadow,
            }}
          >
            <p><strong>{msg.userName}</strong>: {msg.message}</p>
            <p><small>{new Date(msg.createdAt.seconds * 1000).toLocaleString()}</small></p>

            {/* Show delete button only for the owner */}
            {user && msg.userId === user.uid && (
              <button
                onClick={() => handleDeleteMessage(msg.id)}
                style={{
                  backgroundColor: '#ff4d4d',
                  color: '#ffffff',
                  padding: '5px 10px',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Add a button to navigate back to the HomePage */}
      <button 
        onClick={handleHomeRedirect} 
        style={{ 
          backgroundColor: theme.buttonBackground, 
          color: theme.buttonText, 
          padding: '10px 20px', 
          marginTop: '20px', 
          border: 'none', 
          borderRadius: '5px' 
        }}
      >
        Go to Home Page
      </button>
      
    </div>
  );
};

export default ThemeTestPage;
