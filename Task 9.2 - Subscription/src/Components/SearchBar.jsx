import React, { useEffect, useState } from 'react';
import '../CSS/SearchBar.css';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for programmatic navigation
import SignOutButton from './SignOutButton';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // Assuming Firebase auth is being used

function SearchBar() {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication state
    const navigate = useNavigate(); // useNavigate hook for redirection

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    const handlePostClick = () => {
        if (isAuthenticated) {
            // Redirect to the posting page
            navigate('/posting');
        } else {
            // Show an alert and prevent navigation
            alert('Please sign in to create a post.');
        }
    };

    return (
        <div className="header">
            <div className="header-left">
                <span className="logo">DEV@Deakin</span>
            </div>

            <div className="header-center">
                <input type="text" className="search" placeholder="Search..." />
            </div>

            <div className="header-right">
                <button className="link" onClick={handlePostClick}>
                    Post
                </button>
                {!isAuthenticated && (
                    <Link className="link" to="/login">
                        Login
                    </Link>
                )}
                {isAuthenticated && <SignOutButton />}
            </div>
        </div>
    );
}

export default SearchBar;
