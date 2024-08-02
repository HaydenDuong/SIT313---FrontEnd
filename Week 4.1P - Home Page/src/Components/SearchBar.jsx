import React from 'react'
import './SearchBar.css'

function SearchBar() {
    return (
        <div class = "header">

            <div class = "header-left">
                <span class = "logo">DEV@Deakin</span>
            </div>

            <div class = "header-center">
                <input type = "text" class = "search" placeholder= "Search..."></input>
            </div>

            <div class = "header-right">
                <span class = "link">Post</span>
                <span class = "link">Login</span>
            </div>
        </div>
    )
}

export default SearchBar