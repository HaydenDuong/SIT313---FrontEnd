import React from 'react';
import '../CSS/Item.css'

function Item({ imageUrl, title, description, rating, author }) {
  return (
    <div className = "article">

      <div className = "image-placeholder">

        <img src = {imageUrl} alt = {title} className = "article-image" />

      </div>

      <h2>{title}</h2>

      <p>{description}</p>

      <div className = "rating">

        <span className = "star">★</span>

        <span>{rating}</span>

        <span className = "author">{author}</span>

      </div>
      
    </div>
  );
}

export default Item