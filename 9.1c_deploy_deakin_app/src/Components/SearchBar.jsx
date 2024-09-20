import React from 'react'
import '../CSS/SearchBar.css'
import {Link} from 'react-router-dom';
import SignOutButton from './SignOutButton';

function SearchBar() {
    return (
        <div className = 'header'>

            <div className = 'header-left'>
                <span className = 'logo'>DEV@Deakin</span>
            </div>

            <div className = 'header-center'>
                <input type = 'text' className = 'search' placeholder= 'Search...'></input>
            </div>

            <div className = 'header-right'>
                <span className = 'link'>Post</span>
                <Link className = 'link' to = '/login'>
                Login
                </Link>
                <SignOutButton />
            </div>
        </div>
    )
}

export default SearchBar