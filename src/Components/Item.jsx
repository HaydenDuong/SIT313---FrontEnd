import React from 'react';
import './Item.css'

function Item({ imageUrl, title, description, rating, author }) {
  return (
    <div class = "article">

      <div class = "image-placeholder">

        <img src = {imageUrl} alt = {title} class = "article-image" />

      </div>

      <h2>{title}</h2>

      <p>{description}</p>

      <div class = "rating">

        <span class = "star">★</span>

        <span>{rating}</span>

        <span class = "author">{author}</span>

      </div>
      
    </div>
  );
}

export default Item